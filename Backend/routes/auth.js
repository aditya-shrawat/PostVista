// routes/auth.js
import express from 'express';
import { checkTokenAuthentication } from '../middleware/authentication.js';

const router = express.Router();

router.get('/check-auth', checkTokenAuthentication, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
});

export default router;
