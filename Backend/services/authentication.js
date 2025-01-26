import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRETKEY ;

export const createToken = (user)=>{
    const payLoad = {
        id:user._id,
        username:user.username,
        email:user.email,
        profileImageUrl: user.profileImageURL,
    }

    const token = jwt.sign(payLoad,secretKey);
    return token ;
}

export const verifyToken = (token)=>{
    const payload = jwt.verify(token,secretKey) ;
    return payload ;
}







