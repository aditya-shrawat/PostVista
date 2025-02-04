import express from 'express'
import { handleSignin, handleSignup } from '../controllers/user.js';
import { checkTokenAuthentication } from '../middleware/authentication.js';
import Post from '../model/post.js';
import Follower from '../model/follower.js';
import User from '../model/user.js';

const route = express.Router() ;


route.post('/signup',handleSignup)

route.post('/signin',handleSignin)

route.get('/logout',async (req,res)=>{
    try {
        return res.clearCookie("token").status(200).json({message:"Logout successfully."});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
})

route.get('/:id/post',checkTokenAuthentication,async (req,res)=>{
    try {
        const userId = req.params.id ;

        const allPosts = await Post.find({createdBy:userId,}) ;
        return res.status(200).json({allPosts,});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
})

route.get('/:id/follower',checkTokenAuthentication,async (req,res)=>{
    try {
        const accountId = req.params.id ;

        const followers = await Follower.find({account:accountId,}).populate('followedBy',"username ") ;
        const accountData = await User.findById(accountId).select("username") ;
        return res.status(200).json({followers,accountData,message:"Followers fetched successfully."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
})

route.post('/:id/follower',checkTokenAuthentication,async (req,res)=>{
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
})

route.get('/:id/follower/count',checkTokenAuthentication,async (req,res)=>{
    try {
        const accountId = req.params.id ;

        const followerCount = await Follower.countDocuments({account:accountId,}) ;
        const followingCount = await Follower.countDocuments({followedBy:accountId,}) ;
        const isFollowed = await Follower.findOne({account:accountId,followedBy:req.user.id}) ;
        return res.status(200).json({followerCount,followingCount,isFollowed,message:"Followers counted successfully."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
})

export default route ;

