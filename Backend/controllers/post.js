import Like from '../model/like.js';
import Comment from '../model/comment.js';
import Post from '../model/post.js';
import SavedPosts from '../model/savePosts.js';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.Cloudinary_CloudName , 
    api_key: process.env.Cloudinary_API , 
    api_secret: process.env.Cloudinary_APIsecret 
});


export const creatingNewPost = async (req,res)=>{
    try {
        const {title,body} = req.body ; 
        const filePath = req.file ? req.file.path : null ;

        let imageURL = '' ;
        if(req.file){
            try {
                const response = await cloudinary.uploader.upload(filePath,{
                    folder:'coverImages',
                    // type:'upload',
                    // access_mode: 'authenticated',
                    transformation: [
                        { quality: "auto:low" }
                    ]
                })
    
                imageURL = response.secure_url ;
            } catch (error) {
                console.error("Error in cover image uploading:", err);
                return res.status(500).json({ message: "Failed to upload cover image of Post" });
            }
            finally{
                if(filePath){
                    try {
                        fs.unlinkSync(filePath) ;
                    } catch (error) {
                        console.log("Failed to delete cover image localy. ",error)
                    }
                }
            }
        }

        await Post.create({
            title:title,
            body:body,
            coverImage: imageURL ,
            createdBy:req.user.id,
        });
        
        return res.status(201).json({message:"Post created successfully."}) ;
    } catch (error) {
        res.status(500).json({message:"Intenal server error.",error})
    }
};

export const calculatingCounts = async (req,res)=>{
    try {
        const PostId = req.params.id ;

        const likeCount = await Like.countDocuments({postId:PostId,});
        const commentCount = await Comment.countDocuments({postId:PostId,});

        return res.status(200).json({likeCount,commentCount}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."});
    }
}

export const fetchingPostData = async (req,res)=>{
    try {
        const PostId = req.params.id ;

        const post = await Post.findById(PostId).populate('createdBy','username name bio profilePicURL') ;
        return res.status(200).json({post}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}

export const getLike = async (req,res)=>{
    try {
        const PostId = req.params.id ;
        const UserId = req.user.id

        const liked = await Like.findOne({postId:PostId,userId:UserId}) ;
        if(liked){
            return res.status(200).json({isLiked:true,message:"Post liked."}) ;
        }
        else{
            return res.status(200).json({isLiked:false,message:"Post unliked."}) ;
        }
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}

export const postLike = async (req,res)=>{
    try {
        const PostId = req.params.id ;
        const UserId = req.user.id

        const liked = await Like.findOneAndDelete({postId:PostId,userId:UserId}) ;
        if(!liked){
            await Like.create({postId:PostId,userId:UserId})
            return res.status(200).json({isLiked:true,message:"Post liked."}) ;
        }
        return res.status(200).json({isLiked:false,message:"Post unliked."}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}


export const deletePost = async (req,res)=>{
    try {
        const postId = req.params.id ;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ err: "Post not found." });
        }

        await Like.deleteMany({postId});
        await Comment.deleteMany({postId});
        await SavedPosts.deleteMany({post:postId}) ;
        await Post.deleteOne({_id:postId});
        
        return res.status(200).json({message:'Post deleted successfully.'});
    } catch (error) {
        return res.status(500).json({err:"Internal server error."}) ;
    }
}

