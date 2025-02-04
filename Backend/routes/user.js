import express from 'express'
import { handleSignin, handleSignup } from '../controllers/user.js';
import { checkTokenAuthentication } from '../middleware/authentication.js';
import Post from '../model/post.js';

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

export default route ;

