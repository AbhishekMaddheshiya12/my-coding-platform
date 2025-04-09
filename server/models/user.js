import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    attempts:[
        {
            problemId:String,
            attemptCount:Number,
            attemptTypes:String,
            success:Boolean,
            lastAttempt:Date
        }
    ],
    problemSolved:[{
        type:String,
    }],
    languages:[{
        type:String,
    }],
    avatarUrl:{
        type:String,
    }
},{timestamps:true});

export const User = mongoose.model.User || mongoose.model("User",userSchema)