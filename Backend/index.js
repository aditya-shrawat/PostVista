
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
import postRouter from './routes/post.js'
import { getRecentBookmarks, getSavedPosts } from './controllers/savePosts.js';
import multer from 'multer';
import { getUserProfileDetails, updateUserInfo, updateUserProfilePic } from './controllers/profile.js';
import homeRouter from './routes/home.js';
import settingsRouter from './routes/settings.js';

mongoose.connect(process.env.mongodbURL)
.then(console.log("MongoDb is connected successfully"))

const app = express() ;
const PORT = 3000 ;

app.use(cookieParser()) ;
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));

const profilePicsStorage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,'./uploads/profilePics');
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() ;
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        cb(null, uniqueSuffix + '-' + file.fieldname + '.' + fileExtension);
    }
})
const uploadProfilePics = multer({storage:profilePicsStorage}) ;

const blogPostImageStorage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,'./uploads/blogImages');
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() ;
        const fileExtension = file.originalname.split('.').pop(); 
        cb(null, uniqueSuffix + '-' + file.fieldname + '.' + fileExtension);
    }
})
const uploadBlogPostImage = multer({storage:blogPostImageStorage}) ;

app.use(express.json()) 

app.get("/profile",checkTokenAuthentication,async (req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.use('/home',homeRouter);
app.get('/my/bookmarks',checkTokenAuthentication,getSavedPosts) ;
app.get('/recent/bookmarks',checkTokenAuthentication,getRecentBookmarks);
app.get('/recommend/accounts',checkTokenAuthentication,async (req,res)=>{
    try {
        const recommendAccounts = await User.find({}).limit(3).sort({createdAt:-1}).select('username name profilePicURL');
        
        return res.status(200).json({message:'Recommended accounts fetched.',recommendAccounts});
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
})
app.use('/settings',settingsRouter) ;

app.get('/search',checkTokenAuthentication,async (req,res)=>{
    try {
        const {query} = req.query ;

        if(!query){
            return res.status(400).json({error:"Search query is required"});
        }

        const accounts = await User.find({
            username:{ $regex: query, $options: "i" }
        }).select("username name profilePicURL")

        return res.status(200).json({message:"Users searched.",accounts});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})
app.use('/post',postRouter) ;
app.post('/new-blog',checkTokenAuthentication,uploadBlogPostImage.single('coverImage'),creatingNewPost)
app.use('/user',userRouter) ;

app.get('/:username',checkTokenAuthentication,getUserProfileDetails);
app.put('/:username',checkTokenAuthentication,updateUserInfo) ;
app.put('/:username/profile-picture',checkTokenAuthentication,uploadProfilePics.single('ProfilePic'),updateUserProfilePic);

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)) ;
