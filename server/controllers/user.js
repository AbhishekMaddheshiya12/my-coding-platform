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
      const {page = 1} = req.params;
      const skip = (parseInt(page) - 1) * 20;
      const resultPerPage = 20;
      
      // const [messages,countMessages] = await Promise.all([
      //   Message.find({}).sort({createdAt: -1}).skip(skip).limit(resultPerPage).lean(),Message.countDocuments({})
      // ])

      // const totalpages = Math.ceil(countMessages / resultPerPage);
      const messages = await Message.find({}).sort({createdAt: -1}).lean().populate("sender");

      return res.status(200).json({
        success: true,
        message: messages.reverse(),
        // totalpages,
      });
      
    }catch(error){
      return res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }

export {getUserDetails,myDetails,getMessage};