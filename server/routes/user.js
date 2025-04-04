import express from 'express'
import { login,setAttempt, SignUp,getSubmission, Logout } from '../controllers/auth.js';
import authMiddleware from '../middlewares/auth.js';
import { getUserDetails, myDetails } from '../controllers/user.js';

const router = express.Router();

router.post('/signup',SignUp)
router.post('/login',login)
router.post('/judge0-callback',setAttempt)
router.get('/getSubmission/:userId/:problemId',getSubmission)
router.get('/getUserDetails/:userId',authMiddleware,getUserDetails);
router.get('/me',authMiddleware,myDetails);
router.get('/logout',authMiddleware,Logout);

export default router;

