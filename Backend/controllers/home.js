import mongoose from "mongoose";
import Follower from "../model/follower.js";
import Post from "../model/post.js";
import User from "../model/user.js";

export const getGeneralPosts = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('blockedUsers');

        // const allPosts = await Post.find({createdBy:{$nin:user.blockedUsers}})
        // .populate('createdBy','username name bio profilePicURL').sort({ createdAt: -1 });

        const blockedUsers = user.blockedUsers || [];
        blockedUsers.push(new mongoose.Types.ObjectId(req.user.id));
        const matchStage = { createdBy: { $nin: blockedUsers } };
        
        const allPosts = await Post.aggregate([
            { $match: matchStage},
            { $sample: {size:50} }
        ]);

        const populatedPosts = await Post.populate(allPosts, {
            path: 'createdBy',
            select: 'username name bio profilePicURL'
        });


        return res.status(200).json({allPosts:populatedPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}


const findingFollowingFeed = async (authors)=>{
    try {
        return await Post.find({ createdBy: { $in: authors } })
            .sort({ createdAt: -1 })
            .limit(authors.length)
            .populate('createdBy', 'username name bio profilePicURL');
    } catch (error) {
        return [];
    }
}

export const getFollowingPosts = async (req,res)=>{
    try {
        const userId = req.user.id ;
        const user = await User.findById(userId);
        const following = await Follower.find({followedBy:userId}).populate('account',"_id");

        const followingIds = 
            following
            .map(author => author.account._id)
            .filter(id => !user.blockedUsers?.includes(id));

        const allPosts = await findingFollowingFeed(followingIds);
        
        return res.status(200).json({message:"Posts fetched successfully.",allPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
};

