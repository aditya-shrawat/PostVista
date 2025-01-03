
import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:{
        type:String,required:true,unique:true,
    },
    email:{
        type:String,required:true,unique:true,
    },
    password:{
        type:String,required:true,
    },
    profileImageURL:{
        type:String,default:"/images/default.png"
    },
})

 const User = mongoose.model('User',userSchema) ;

 export default User;


