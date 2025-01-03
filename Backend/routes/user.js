import express from 'express'
import { handleSignup } from '../controllers/user.js';

const route = express.Router() ;


route.post('/signup',handleSignup)

export default route ;

