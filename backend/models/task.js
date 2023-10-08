import mongoose from "mongoose";

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    body:{
        type:String
    },
    CreationTimeAndDate:{
        type:Date,
        default: Date.now
    },
    WantToCompleteAT:{
        type:Date
    },
    UserId:{
        type:String,
        require:true
    }
})

const task=mongoose.model('task',schema)

export default task