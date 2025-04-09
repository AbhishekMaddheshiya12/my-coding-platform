import { uploadImage } from "../config/cloudinary.js";
import { getBase64 } from "../constants/config.js";
import { Message } from "../models/messages.js";
import { User } from "../models/user.js";

const getUserDetails = async(req,res) => {
    try{
      const {userId} = req.params;
      console.log(userId);
      const user = await User.findById(userId);
      if(!user){
        return res.status(400).json({
          success:false,
          message:"User Not Found"
        })
      }
  
      return res.status(200).json({
        success:true,
        message:"User Fetched Successfully",
        user
      })
    }catch(error){
      return res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }

  const myDetails = async(req,res) => {
    try{
      const userId = req.user;
      console.log(userId);
      const user = await User.findById(userId);
      if(!user){
        return res.status(400).json({
          success:false,
          message:"User Not Found"
        })
      }
  
      return res.status(200).json({
        success:true,
        message:"User Fetched Successfully",
        user
      })
    }catch(error){
      return res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }

  const getMessage = async(req,res) => {
    try{
      const messages = await Message.find({}).sort({createdAt: -1}).lean().populate("sender");

      return res.status(200).json({
        success: true,
        message: messages.reverse(),
      });
      
    }catch(error){
      return res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }


  const uploadAvatar = async(req,res) => {
    try{
      const userId = req.user;
      console.log(userId);
      const user = await User.findById(userId);
      console.log(user);
      if(!req.file){
        return res.status(400).json({
          success:false,
          message:"No file uploaded"
        })
      }
      console.log("Hello");
      const result = await uploadImage(getBase64(req.file));
      console.log(result);
      user.avatarUrl = result.secure_url;
      await user.save();
      return res.status(200).json({
        success:true,
        message:"Image uploaded successfully",
        avatarUrl:result.secure_url
      })
    }catch(error){
      console.log(error);
      return res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }

export {getUserDetails,myDetails,getMessage,uploadAvatar};