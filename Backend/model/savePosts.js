import mongoose from "mongoose";


const savePostsSchema = mongoose.Schema({
    savedBy:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    }
},{timestamps:true,}) ;

const SavedPosts = mongoose.model("SavedPosts",savePostsSchema) ;

export default SavedPosts ;





