
import express from 'express'
import { checkTokenAuthentication } from '../middleware/authentication.js';
import { getFollowingPosts, getGeneralPosts } from '../controllers/home.js';

const route = express.Router();

route.get('/',checkTokenAuthentication,getGeneralPosts) ;
route.get('/following',checkTokenAuthentication,getFollowingPosts) ;

export default route ;



