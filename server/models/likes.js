import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    problems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

export const Like = mongoose.model.LiKe||mongoose.model("Like",likeSchema)