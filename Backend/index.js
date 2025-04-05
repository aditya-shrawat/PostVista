
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
import Follower from './model/follower.js';

// mongoose.connect(process.env.mongodbURL)
// .then(console.log("MongoDb is connected successfully"))

const mongoClusterURL = process.env.mongodb_Cluster;

mongoose.connect(mongoClusterURL)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Connection Error:", err));

const app = express() ;
const PORT = process.env.PORT || 3000;

const frontend = process.env.FrontendURL;
app.use(cookieParser()) ;
app.use(cors({
    origin: frontend, // frontend URL
    credentials: true
}));

// const profilePicsStorage = multer.diskStorage({
//     destination :function(req,file,cb){
//         cb(null,'./uploads/profilePics');
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix = Date.now() ;
//         const fileExtension = file.originalname.split('.').pop(); // Extract file extension
//         cb(null, uniqueSuffix + '-' + file.fieldname + '.' + fileExtension);
//     }
// })
// const uploadProfilePics = multer({storage:profilePicsStorage}) ;

// const blogPostImageStorage = multer.diskStorage({
//     destination :function(req,file,cb){
//         cb(null,'./uploads/blogImages');
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix = Date.now() ;
//         const fileExtension = file.originalname.split('.').pop(); 
//         cb(null, uniqueSuffix + '-' + file.fieldname + '.' + fileExtension);
//     }
// })
// const uploadBlogPostImage = multer({storage:blogPostImageStorage}) ;

const uploadProfilePics = multer({ storage: multer.memoryStorage() });
const uploadBlogPostImage = multer({ storage: multer.memoryStorage() });

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
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const following = await Follower.find({ followedBy: req.user.id }).select('account');
        const followingIds = following.map(f => f.account);

        const excludeIds = [userId, ...followingIds];
        const recommendAccounts = await User.aggregate([
            {
                $match:{ _id:{$nin:excludeIds}}
            },
            {
                $sample: {size:3}
            },
            {
                $project:{username:1,name:1,profilePicURL:1} 
            }
        ]);
        
        return res.status(200).json({message:'Recommended accounts fetched.',recommendAccounts});
    } catch (err) {
        console.log("Error ",err)
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
