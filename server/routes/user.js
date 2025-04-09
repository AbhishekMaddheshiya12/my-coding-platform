import express from 'express'
import { login,setAttempt, SignUp,getSubmission, Logout } from '../controllers/auth.js';
import authMiddleware from '../middlewares/auth.js';
import { getMessage, getUserDetails, myDetails, uploadAvatar } from '../controllers/user.js';
import { judgeSubmission } from '../controllers/problems.js';
import { multerUploads } from '../middlewares/multer.js';

const router = express.Router();

router.post('/signup',SignUp)
router.post('/login',login)
router.post('/judge0-callback',setAttempt)
router.get('/getSubmission/:userId/:problemId',getSubmission)
router.get('/getUserDetails/:userId',authMiddleware,getUserDetails);
router.get('/me',authMiddleware,myDetails);
router.get('/logout',authMiddleware,Logout);
router.get('/getMessages/:page',getMessage);
router.post('/getSubmission',judgeSubmission)
router.post("/upload-avatar", authMiddleware,multerUploads.single("avatar"), uploadAvatar);


export default router;

