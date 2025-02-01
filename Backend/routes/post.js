import express from 'express' ;
import { calculatingCounts, fetchingPostData, getLike, postLike } from '../controllers/post.js';
import { checkTokenAuthentication } from '../middleware/authentication.js';

const route = express.Router() ;

route.get('/:id',fetchingPostData)
route.get('/:id/counts',calculatingCounts)
route.get('/:id/like',checkTokenAuthentication,getLike);
route.post('/:id/like',checkTokenAuthentication,postLike);


export default route ;