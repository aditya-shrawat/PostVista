import express from 'express'
import { handleSignin, handleSignup } from '../controllers/user.js';

const route = express.Router() ;


route.post('/signup',handleSignup)

route.post('/signin',handleSignin)

route.get('/logout',async (req,res)=>{
    try {
        return res.clearCookie("token").status(200).json({message:"Logout successfully."});
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
})

export default route ;

