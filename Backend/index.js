
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
import multer from 'multer';
import { getUserProfileDetails, updateUserInfo, updateUserProfilePic } from './controllers/profile.js';

mongoose.connect(process.env.mongodbURL)
.then(console.log("MongoDb is connected successfully"))

const app = express() ;
const PORT = 3000 ;

app.use(cookieParser()) ;
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));

const storage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,'./uploads/profilePics');
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() ;
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        cb(null, uniqueSuffix + '-' + file.fieldname + '.' + fileExtension);
    }
})
const upload = multer({storage:storage}) ;

app.use(express.json()) 

app.get("/profile",checkTokenAuthentication,async (req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})


app.get('/:username',checkTokenAuthentication,getUserProfileDetails);
app.put('/:username',checkTokenAuthentication,updateUserInfo) ;
app.put('/:username/profile-picture',checkTokenAuthentication,upload.single('ProfilePic'),updateUserProfilePic);

app.get('/',checkTokenAuthentication,async (req,res)=>{
    try {
        const allPosts = await Post.find({}).populate('createdBy','username name bio profilePicURL').sort({ createdAt: -1 });
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
