
import {verifyToken}  from '../services/authentication.js';



export const checkTokenAuthentication = (req,res,next)=>{
    const token = req.cookies['token'] ;
    if(!token){
        return res.status(400).json({error:"token is not present or expired"}) ;
    }

    try {
        const payload = verifyToken(token) ;
        req.user = payload ;
        next();
    } catch (error) {
        return res.status(500).json({error:`unauthorized, something wrong`})
    }
}



