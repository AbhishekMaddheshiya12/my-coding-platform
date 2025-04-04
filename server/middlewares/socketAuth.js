import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.js";
export const socketAuthMiddleware = async(err, socket, next) => {
  try {
    if (err) return err;

    const token = socket.request.cookies.codeCraft;
    if (!token){
        return next("Please login to access the route",400);
    }
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if(!user){
        return next("Please login to access the route",400);
    }

    socket.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return next("Please login to access the route",400);
  }
};

export const getmessages = async(req,res) => {
  try{
    
  }catch(error){

  }
}
