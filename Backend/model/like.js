import mongoose from "mongoose";


const likeSchema = mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
},{timestamps:true,});

const Like = mongoose.model("Like",likeSchema) ;

export default Like ;




