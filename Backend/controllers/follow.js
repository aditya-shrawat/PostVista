import Follower from "../model/follower.js";
import User from "../model/user.js";


export const getFollowers = async (req,res)=>{
    try {
        const accountId = req.params.id ;

        const followers = await Follower.find({account:accountId,}).populate('followedBy',"username name bio profilePicURL") ;
        const accountData = await User.findById(accountId).select("username name") ;
        return res.status(200).json({followers,accountData,message:"Followers fetched successfully."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}

export const getFollowing = async (req,res)=>{
    try {
        const accountId = req.params.id ;
    
        const following = await Follower.find({followedBy:accountId,}).populate('account',"username name bio profilePicURL") ;
        const accountData = await User.findById(accountId).select("username name") ;
        return res.status(200).json({following,accountData,message:"Following fetched successfully."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}

export const postFollower = async (req,res)=>{
    try {
        const accountId = req.params.id ;
        const userId = req.user.id ;

        const isFollowed = await Follower.findOneAndDelete({account:accountId,followedBy:userId}) ;
        if(!isFollowed && accountId!==userId){
            await Follower.create({account:accountId,followedBy:userId}) ;
            return res.status(200).json({isFollowed:true,message:"Followed successfully."}) ;
        }
        return res.status(200).json({isFollowed:false,message:"unFollowed successfully."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}

export const countFollowerFollowingCount = async (req,res)=>{
    try {
        const accountId = req.params.id ;

        const followerCount = await Follower.countDocuments({account:accountId,}) ;
        const followingCount = await Follower.countDocuments({followedBy:accountId,}) ;
        return res.status(200).json({followerCount,followingCount,message:"Followers counted successfully."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}


export const checkFollowStatus = async (req,res)=>{
    try {
        const accountId = req.params.id ;
        const userId = req.user.id ;

        const isYou = accountId.toString() === userId.toString() ;
        const uFollow = await Follower.findOne({account:accountId,followedBy:userId}) ;
        if(uFollow){
            return res.status(200).json({isFollowed:true,isYou,message:"Followed by you."});
        }
        return res.status(200).json({isFollowed:false,isYou,message:"Not followed by you."});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}


