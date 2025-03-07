import Follower from "../model/follower.js";
import Post from "../model/post.js";
import User from "../model/user.js";

export const getGeneralPosts = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('blockedUsers');
        const allPosts = await Post.find({createdBy:{$nin:user.blockedUsers}}).populate('createdBy','username name bio profilePicURL').sort({ createdAt: -1 });
        return res.status(200).json({allPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}


const findingFollowingFeed = async (createdBy)=>{
    try {
        const posts = await Post.find({createdBy:createdBy}).sort({ createdAt: -1 }).limit(1).populate('createdBy','username name bio profilePicURL');
        return posts ;
    } catch (error) {
        console.log("error in finding author psots ",error);
    }
}

export const getFollowingPosts = async (req,res)=>{
    try {
        const userId = req.user.id ;
        const user = await User.findById(userId);
        const following = await Follower.find({followedBy:userId}).populate('account',"_id");

        // let allPosts = [];
        // for(const author of following){
        //     const posts = await findingFollowingFeed(author.account._id);
        //     for(const post of posts){
        //         allPosts.push(post);
        //     }
        // }

        const allPosts = (await Promise.all(
            following
            .filter(author => !user.blockedUsers.includes(author.account._id))
            .map(author =>{
                return findingFollowingFeed(author.account._id)
            } )
        )).flat();
        
        allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return res.status(200).json({message:"Posts fetched successfully.",allPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
};

