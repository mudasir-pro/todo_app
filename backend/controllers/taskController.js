import task from "../models/task.js"
import CreateError from "http-errors"


export const getTasks=async (req,res,next)=>{
    try {
        const tasks=await task.find({UserId:req.userId})
        res.send(tasks)
    } catch (error) {
        next(error)
    }
}

export const getTasksById=async (req,res,next)=>{
    try {
        const taskId=req.params.id
        const Task=await task.findById(taskId)
        if(Task && Task.UserId===req.userId){
            res.send(Task)
        }
        else{
            throw CreateError.NotFound("Task is not Found")
        }
        
    } catch (error) {
        next(error)
    }
    
}

export const addTask=async (req,res,next)=>{
    try {
        console.log(req.body)
        const Task=task({...req.body,'UserId':req.userId})
        const resp=await Task.save()
        res.status(201).json({
            "message":"Task is created",
            "id":Task._id
        })
        
    } catch (error) {
        next(error)
    }

}

export const updateTask=async (req,res,next)=>{
    try {
        const taskId=req.params.id;
        const Task=await task.findById(taskId);
        if(Task && Task.UserId===req.userId){
            const updateData={...req.body}
            const resp=await task.updateOne({_id:taskId},{$set:updateData})
            if (resp.modifiedCount!==0){
                res.status(202).json({
                    "message":"Updated"
                })
            }
        }
        else{
            throw CreateError.InternalServerError()
        }
    
        
    } catch (error) {
        next(error)
    }
}

export const removeTask= async (req,res,next)=>{
    try {
        const taskId=req.params.id;
        const Task=await task.findById(taskId);
        if(Task && Task.UserId===req.userId){
            const resp=await task.deleteOne({_id:taskId})
            if(resp.deletedCount!==0){

                res.send({
                    "message":"delete"
                })
            }
            else{
                throw CreateError.InternalServerError()
            }
        }
        else{
            throw CreateError.BadRequest("not Found")
        }
        
    } catch (error) {
        next(error)
    }


    // res.send("Remove Task")
}

