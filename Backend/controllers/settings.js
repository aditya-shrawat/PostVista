
import User from '../model/user.js';
import SavedPosts from '../model/savePosts.js';
import Post from '../model/post.js';
import Follower from '../model/follower.js';
import Comment from '../model/comment.js';
import Like from '../model/like.js';
import bcrypt from 'bcrypt' 



export const getAccountInfo = async (req,res)=>{
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).select('username bio name email profilePicURL')
        return res.status(200).json({message:'Account-information is fetched successfully.',userDetails});
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const changePasswordFxn = async (req,res)=>{
    try {
        const {currentPassword,newPassword,confirmPassword} = req.body
        const userId = req.user.id ;
        const user = await User.findById(userId).select("password") ;
        if(!user){
            return res.status(400).json({error:"User doesn't exist."})
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({error:"Enter same password"});
        }

        const allowToChange = await bcrypt.compare(currentPassword,user.password) ;
        if(!allowToChange){
            return res.status(400).json({error:"Password is wrong."});
        }

        const newHashedPassword = await bcrypt.hash(newPassword,12) ;
        user.password = newHashedPassword;
        await user.save() ;

        return res.status(201).json({message:"Password reset."});
    } catch (err) {
        return res.status(500).json({ error: "Internal server error, try again later.",err });
    }
}


export const getBlockedAccounts = async (req,res)=>{
    try {
        const userId = req.user.id ;
        const user = await User.findById(userId).select('blockedUsers') ;

        const blockedAccountsId = user.blockedUsers ;

        const blockedAccounts = await Promise.all(blockedAccountsId.map(async (accountId)=>{
            return User.findById(accountId).select("username name profilePicURL")
        }));
       
        return res.status(200).json({message:"Blocked accounts fetched successfully.",blockedAccounts})
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteAccount = async (req,res)=>{
    try {
        const enteredPassword = req.body.enteredPassword ;
        const userId = req.user.id ;

        const user = await User.findById(userId).select('password') ;
        if(!user){
            return res.status(400).json({message:"User doesn't exist."})
        }

        if(enteredPassword.trim()===``){
            return res.status(400).json({error:"Enter your account password."})
        }

        const isPasswordCorrect = await bcrypt.compare(enteredPassword,user.password) ;
        if(!isPasswordCorrect){
            return res.status(400).json({error:"Wrong password."});
        }

        const allPosts = await Post.find({createdBy:userId});
        const allPostIds = allPosts.map(post => post._id);
        if (allPostIds.length > 0){
            await SavedPosts.deleteMany({ post: { $in: allPostIds } });
        }

        await Post.deleteMany({createdBy:userId});
        await Follower.deleteMany({followedBy:userId});
        await Follower.deleteMany({account:userId});
        await Comment.deleteMany({user:userId});
        await Like.deleteMany({userId:userId});

        await User.findByIdAndDelete(userId);
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });

        return res.status(200).json({message:"Account deleted successfully."})
    } catch (err) {
        return res.status(500).json({error:"Internal server error."})
    }
}





