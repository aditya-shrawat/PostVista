
import Post from "../model/post.js";
import SavedPosts from "../model/savePosts.js";


export const getSavedPosts = async (req,res)=>{
    try {
        const userId = req.user.id ;

        const response = await SavedPosts.find({savedBy:userId}).populate({
            path:'post',
            populate:{
                path:'createdBy',select:'username name profilePicURL'
            }
        }) ;
        const savedPosts = response.map((item)=>item.post) ;

        return res.status(200).json({message:"Saved posts fetched successfully.",savedPosts}) ;
    } catch (error) {
        return res.status(500).json({error:"Internal server error."}) ;
    }
}

export const bookmarkPost = async (req,res)=>{
    try {
        const postId = req.params.id
        const userId = req.user.id ;

        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({ message: "Post not found." });
        }

        const isSaved = await SavedPosts.findOneAndDelete({savedBy:userId,post:postId});

        if(!isSaved){
            await SavedPosts.create({savedBy:userId,post:postId}) ;
            return res.status(200).json({message:"Posted saved successfully.",isSaved:true});
        }
        return res.status(200).json({message:"Posted unsaved successfully.",isSaved:false});
    } catch (error) {
        return res.status(500).json({error:"Internal server error."}) ;
    }
}


export const checkBookmarkStatus = async (req,res)=>{
    try {
        const postId = req.params.id ;
        const userId = req.user.id ;

        const bookmarked = await SavedPosts.findOne({savedBy:userId,post:postId}) ;
        return res.status(200).json({message:"Bookmark staus fetchend successfully.",bookmarked:!!bookmarked})
    } catch (error) {
        return res.status(500).json({error:"Internal server error."}) ;
    }
}



