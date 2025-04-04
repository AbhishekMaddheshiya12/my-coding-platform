import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
       id:{
        type:Number,
        required:true,
       },
       title:{
        type:String,
        required:true,
       },
       difficulty:{
        type:String,
        required:true,
       },
       likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
       }],
       dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DisLike",
       }],
       description:{
        type:String,
        required:true,
       },
       examples:[{
        input:String,
        output:String,
        explanation:String,
       }],
       constraints:[String],
       testCases:[{
        id:Number,
        input:String,
        expectedOutput:String,
       }],
    },
    {
    timestamps:true
    }
)

export const Problem = mongoose.model.Problem || mongoose.model("Problem",problemSchema);