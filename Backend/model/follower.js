import mongoose from "mongoose";


const followerSchema = mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    followedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{timestamps:true,});

const Follower = mongoose.model('Follower',followerSchema) ;

export default Follower ;

