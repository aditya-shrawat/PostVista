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

    const token = jwt.sign(payLoad,secretKey);
    return token ;
}

export const verifyToken = (token)=>{
    const payload = jwt.verify(token,secretKey) ;
    return payload ;
}







