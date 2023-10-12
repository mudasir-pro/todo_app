import user from "../models/User.js"
import authRefresh from "../models/refreshAuth.js"
import { resgisterSchema ,loginSchema} from "../validationSchema/authSchema.js"
import CreateError from "http-errors"
import {AccessGenerator,RefreshGenerator} from '../helper/Jwt_Helper.js'
import jwt from 'jsonwebtoken'




export const login=async (req,res,next)=>{
    try {
        const validateData=await loginSchema.validateAsync(req.body)
        const User=await user.findOne({email:validateData.email})
        if (!User){
            throw CreateError.BadRequest('Incorrect Email/password')
        }
        const isMatch=await User.isValidPassword(validateData.password)
        if(!isMatch) throw CreateError.BadRequest('Incorrect Email/Password')
        
        const accessToken=await AccessGenerator(User._id)
        const previousRefresh=await authRefresh.findOne({'userId':User._id})
        if (previousRefresh){
            await authRefresh.deleteOne(previousRefresh);
        }
        const refresh=await RefreshGenerator(User._id)
        await authRefresh({'userId':User._id, 'refresh':refresh}).save()
        res.send({'id':User._id,accessToken,refresh,'username':User.username})
    } catch (error) {
        if(error.isJoi){
            next(CreateError.BadRequest('Incorrect Correct Email/Password'))
        }
        else{
            next(error)

        }
    }
}


export const logout=async (req,res,next)=>{
    res.send("From Logout")
}

export const register=async (req,res,next)=>{
    try {
        const ValidatedData=await resgisterSchema.validateAsync(req.body)
        const User=user(ValidatedData)
        const resp=await User.save()
        const accessToken=await AccessGenerator(resp._id)
        const refreshToken=await RefreshGenerator(resp._id)
        authRefresh({'userId':resp._id, 'refresh':refreshToken}).save()
        res.send({'id':User._id,accessToken,refreshToken,'username':User.username})
        
    } catch (error) {
        if(error.isJoi){
            next(CreateError.NotAcceptable("Enter Correct Credentials"))
        }else if(error.code===11000){
            next(CreateError.Conflict("Email is Already Exist"))
        }
        else{
            next(error)
        }
    }
}

export const refresh=async (req,res,next)=>{
    try {
        const OldRefresh=jwt.verify(req.body.refresh,process.env.REFRESH_SECRATE)
        const updateRefresh=await authRefresh.updateOne({'userId': OldRefresh.userId},
        {$set:{refresh:await RefreshGenerator(OldRefresh.userId)}})
        if(updateRefresh.modifiedCount===0){
            throw CreateError.BadRequest("Invalid Token")
        }
        else{
            const accessToken= await AccessGenerator(OldRefresh.userId)
            const {refresh}=await authRefresh.findOne({'userId':OldRefresh.userId})
            res.send({accessToken,"refreshToken":refresh})
            }
        }
     catch (error) {
        next(error)
        }

    }