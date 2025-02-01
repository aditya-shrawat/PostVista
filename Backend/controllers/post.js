import Like from '../model/like.js';
import Comment from '../model/comment.js';
import Post from '../model/post.js';

export const creatingNewPost = async (req,res)=>{
    try {
        const {title,body} = req.body ;
        const post = await Post.create({
            title:title,
            body:body,
            createdBy:req.user.id,
        });
        console.log("post - ",post)
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

        const post = await Post.findById(PostId).populate('createdBy','username ') ;
        return res.status(200).json({post}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}


