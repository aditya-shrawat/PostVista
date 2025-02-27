
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
    bio:{
        type:String,required:false,
        default:""
    },
    name:{
        type:String,required:false,
        default:""
    },
    profilePicURL:{
        type:String,required:false,
        default:'https://res.cloudinary.com/dmeaz48sd/image/upload/v1740665174/defaultProfilePic_qjozwa.jpg'
    }
},{timestamps:true})

 const User = mongoose.model('User',userSchema) ;

 export default User;


