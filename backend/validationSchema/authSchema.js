import Joi from "joi";

export const resgisterSchema=Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(
        new RegExp('^(?=.*\\d)(?=.*[!@#$%^&/*])(?=.*[A-Z])(?=.*[a-z]).{8,}$')).required()    
})

export const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
})
