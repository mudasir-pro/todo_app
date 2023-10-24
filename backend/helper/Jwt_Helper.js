import jwt from "jsonwebtoken";
import CreateError from 'http-errors'
import { response } from "express";

export const AccessGenerator=(userId)=>{
    
    const payload={userId};
    const secrate=process.env.ACCESS_SECRATE
    const Options={
        expiresIn:'2h',
        issuer:'todo_app'
    }
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,secrate,Options,(err,token)=>{
        if (err){
            reject(err)
        }
        else{
            resolve(token)
        }}    )   

    })
}

export const RefreshGenerator=(userId)=>{
    const payload={userId}
    const secrate=process.env.REFRESH_SECRATE
    const Optinos={
        expiresIn:"60d",
        issuer:"todo_app"
    }
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,secrate,Optinos,(err,token)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(token)
            }
        })
    })
}

export const varifyAccess=(req,res,next)=>{
    try {
        const accesToken=req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(accesToken,process.env.ACCESS_SECRATE)
        req.userId=decoded.userId
        next()
        
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            next(CreateError.Unauthorized(error.name))
        }
        else{
            console.log(req.headers)
            next(CreateError.Forbidden('Invalid Token'))
        }
        
    }

}
