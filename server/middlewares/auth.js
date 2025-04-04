import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const authMiddleware = (req,res,next) => {
    // we can here use header instead of using cookie
    const token = req.cookies.codeCraft;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorised Access"
        })
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
        if(err){
            return res.status(401).json({
                success:false,
                message:"Unauthorised Access"
            })
        }
        req.user = decoded._id;
        next();
    })
}

export default authMiddleware;