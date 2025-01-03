import express from 'express'
import { handleSignin, handleSignup } from '../controllers/user.js';

const route = express.Router() ;


route.post('/signup',handleSignup)

route.post('/signin',handleSignin)

export default route ;

