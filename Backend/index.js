
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

mongoose.connect(process.env.mongodbURL)
.then(console.log("MongoDb is connected successfully"))

const app = express() ;
const PORT = 8000 ;

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

app.get("/:username",async (req,res)=>{
    const username = req.params.username ;

    try {
        const user = await User.findOne({username}) ;
        if(user){
            return res.status(200).json({
                username:user.username,
            }) ;
        }
        return res.status(400).json({message:"User does not exist"}) ;
    } catch (error) {
        return res.status(500).json({ message: "Internal server error",error:error });
    }
})

app.get('/',checkTokenAuthentication,async (req,res)=>{
    try {
        const allPosts = await Post.find({}).populate('createdBy','username ').sort({ createdAt: -1 });
        return res.status(200).json({allPosts});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
})

app.use('/post',postRouter) ;
app.post('/new-blog',checkTokenAuthentication,creatingNewPost)
app.use('/user',userRouter) ;


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)) ;
