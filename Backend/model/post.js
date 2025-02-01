import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,required:true,
    },
    body:{
        type:String,required:true,
    },
    coverImage:{
        type:String,required:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required:true,
    },
},{timestamps:true})

const Post = mongoose.model('Post',postSchema) ;

export default Post ;
