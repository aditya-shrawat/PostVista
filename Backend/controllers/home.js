import Follower from "../model/follower.js";
import Post from "../model/post.js";

export const getGeneralPosts = async (req,res)=>{
    try {
        const allPosts = await Post.find({}).populate('createdBy','username name bio profilePicURL').sort({ createdAt: -1 });
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
        const user = req.user.id ;
        const following = await Follower.find({followedBy:user}).populate('account',"_id");

        // let allPosts = [];
        // for(const author of following){
        //     const posts = await findingFollowingFeed(author.account._id);
        //     for(const post of posts){
        //         allPosts.push(post);
        //     }
        // }

        const allPosts = (await Promise.all(
            following.map(author => findingFollowingFeed(author.account._id))
        )).flat();
        
        allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return res.status(200).json({message:"Posts fetched successfully.",allPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
};

