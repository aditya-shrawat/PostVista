import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String,required:false,
    }
},{timestamps:true,});

const Comment = mongoose.model("Comment",commentSchema) ;

export default Comment ;



