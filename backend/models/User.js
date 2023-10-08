import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }

})
schema.pre('save',async function(next){
    try {
        const hashPassword=await bcrypt.hash(this.password,10);
        this.password=hashPassword
    } catch (error) {
        next(error)   
    }
})

schema.methods.isValidPassword=async function(password){
    try {
        return await bcrypt.compare(password,this.password)
    } 
    catch (error) {
        throw error
    }
}

const user=mongoose.model('user',schema)

export default user