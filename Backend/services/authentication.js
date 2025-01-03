import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRETKEY ;

export const createToken = (user)=>{
    const payLoad = {
        username:user.username,
        email:user.email,
    }

    const token = jwt.sign(payLoad,secretKey);
    return token ;
}








