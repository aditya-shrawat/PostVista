import express from 'express'
import { checkEmail, createAccount, handleSignin } from '../controllers/user.js';
import { checkTokenAuthentication } from '../middleware/authentication.js';
import Post from '../model/post.js';
import { checkFollowStatus, countFollowerFollowingCount, getFollowers, getFollowing, postFollower } from '../controllers/follow.js';

const route = express.Router() ;


route.post('/check-email',checkEmail) ;
route.post('/create-account',createAccount)
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

route.get('/:id/follower',checkTokenAuthentication,getFollowers) ;
route.get('/:id/following',checkTokenAuthentication,getFollowing)
route.post('/:id/follower',checkTokenAuthentication,postFollower)
route.get('/:id/follower/count',checkTokenAuthentication,countFollowerFollowingCount)
route.get('/:id/follow/status',checkTokenAuthentication,checkFollowStatus)

export default route ;

