import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRETKEY ;

export const createToken = (user)=>{
    const payLoad = {
        id:user._id,
        username:user.username,
        profilePicURL:user.profilePicURL,
    }

    const token = jwt.sign(payLoad,secretKey,{expiresIn: "7d"});
    return token ;
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}







