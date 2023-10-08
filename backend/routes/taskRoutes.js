import { Router } from "express";
import { varifyAccess } from "../helper/Jwt_Helper.js";
import {getTasks,getTasksById,addTask,removeTask,updateTask} from "../controllers/taskController.js"


const taskRoute=Router();
taskRoute.use(varifyAccess)




taskRoute.get('/',getTasks)

taskRoute.get('/:id',getTasksById)

taskRoute.post("/create",addTask)

taskRoute.delete("/remove/:id",removeTask)

taskRoute.patch("/update/:id",updateTask)


export default taskRoute