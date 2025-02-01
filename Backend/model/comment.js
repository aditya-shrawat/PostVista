import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
});

const Comment = mongoose.model("Comment",commentSchema) ;

export default Comment ;



