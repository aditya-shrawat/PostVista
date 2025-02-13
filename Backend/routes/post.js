import express from 'express' ;
import { calculatingCounts, fetchingPostData, getLike, postLike } from '../controllers/post.js';
import { getComments, postComments } from '../controllers/comment.js';
import { checkTokenAuthentication } from '../middleware/authentication.js';
import { bookmarkPost, checkBookmarkStatus } from '../controllers/savePosts.js';

const route = express.Router() ;

route.get('/:id',fetchingPostData)
route.get('/:id/counts',calculatingCounts)
route.get('/:id/like',checkTokenAuthentication,getLike);
route.post('/:id/like',checkTokenAuthentication,postLike);
route.get('/:id/comment',checkTokenAuthentication,getComments);
route.post('/:id/comment',checkTokenAuthentication,postComments);

route.post('/:id/bookmark-post',checkTokenAuthentication,bookmarkPost) ;
route.get('/:id/check-bookmark',checkTokenAuthentication,checkBookmarkStatus) ;

export default route ;