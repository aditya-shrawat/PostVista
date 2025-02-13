
import dotenv from 'dotenv'
dotenv.config()


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.js';
import { checkTokenAuthentication } from './middleware/authentication.js';
import User from './model/user.js';
import { creatingNewPost, } from './controllers/post.js';
import Post from './model/post.js';
import postRouter from './routes/post.js'
import { getSavedPosts } from './controllers/savePosts.js';

mongoose.connect(process.env.mongodbURL)
.then(console.log("MongoDb is connected successfully"))

const app = express() ;
const PORT = 3000 ;

app.use(cookieParser()) ;
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));

app.use(express.json()) 

app.get("/profile",checkTokenAuthentication,async (req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.get("/:username",checkTokenAuthentication,async (req,res)=>{
    try {
        const username = req.params.username ;
        const user = await User.findOne({username}) ;

        const isYou = username === req.user.username ;
        if(user){
            return res.status(200).json({
                User:{id:user._id,
                username:user.username,
                name:user.name,
                bio:user.bio,},
                isYou:isYou,
            }) ;
        }
        return res.status(400).json({message:"User does not exist"}) ;
    } catch (error) {
        return res.status(500).json({ message: "Internal server error",error:error });
    }
})

app.put('/:username',checkTokenAuthentication,async (req,res)=>{
    try {
        const newInfo = req.body ;
        const username = req.params.username ;

        if(username !== req.user.username){
            return res.status(400).json({message:"You are not authorized to update this profile."});
        }

        const user = await User.findOne({username}) ;
        if(!user){
            return res.status(400).json({message:"User not found."}) ;
        }
        Object.assign(user,newInfo) ;
        await user.save();
        return res.status(200).json({message:"Profile updated successfully."});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error",error:error });
    }
})

app.get('/',checkTokenAuthentication,async (req,res)=>{
    try {
        const allPosts = await Post.find({}).populate('createdBy','username name bio').sort({ createdAt: -1 });
        return res.status(200).json({allPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
})

app.get('/my/bookmarks',checkTokenAuthentication,getSavedPosts) ;

app.use('/post',postRouter) ;
app.post('/new-blog',checkTokenAuthentication,creatingNewPost)
app.use('/user',userRouter) ;


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)) ;
