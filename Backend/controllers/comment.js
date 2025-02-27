import Comment from '../model/comment.js';


export const getComments = async (req,res)=>{
    try {
        const postId = req.params.id ;

        const allComments = await Comment.find({postId:postId,}).populate('user',"username name profilePicURL").sort({ createdAt: -1 });
        const commentCount = await Comment.countDocuments({postId:postId}) ;
        return res.status(200).json({allComments,commentCount}) ;
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}

export const postComments = async (req,res)=>{
    try {
        const postId = req.params.id ;
        const userId = req.user.id ;
        const content = req.body.content ;

        const comment =await Comment.create({postId:postId,user:userId,content:content,});
        return res.status(201).json({message:"Comment posted successfully.",comment})
    } catch (error) {
        return res.status(500).json({message:"Internal server error."}) ;
    }
}

