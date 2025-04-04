import mongoose from "mongoose";

const dislikeSchema = new mongoose.Schema({
    problems:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

export const DisLike = mongoose.model.DisLiKe||mongoose.model("Like",dislikeSchema)