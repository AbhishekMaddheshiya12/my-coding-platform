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

export {getUserDetails,myDetails};