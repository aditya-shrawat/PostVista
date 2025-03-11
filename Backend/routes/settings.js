
import express from 'express'
import { checkTokenAuthentication } from '../middleware/authentication.js';

import { changePasswordFxn, deleteAccount, getAccountInfo, getBlockedAccounts } from '../controllers/settings.js';

const route = express.Router();


route.get("/account-information",checkTokenAuthentication,getAccountInfo)

route.put('/change-password',checkTokenAuthentication,changePasswordFxn)

route.get('/blocked-accounts',checkTokenAuthentication,getBlockedAccounts)

route.post('/delete-account',checkTokenAuthentication,deleteAccount)


export default route ;



