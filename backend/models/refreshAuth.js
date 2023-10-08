
import mongoose from "mongoose";



const schema=new mongoose.Schema({
    'userId':String,
    'refresh':String,
})

const authRefresh=mongoose.model('authrefresh',schema)

export default authRefresh