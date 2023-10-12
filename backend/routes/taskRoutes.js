import { Router } from "express";
import { varifyAccess } from "../helper/Jwt_Helper.js";
import {getTasks,getTasksById,addTask,removeTask,updateTask} from "../controllers/taskController.js"


const taskRoute=Router();
taskRoute.use(varifyAccess)




taskRoute.get('/',getTasks)

taskRoute.get('/:id',getTasksById)

taskRoute.post("/",addTask)

taskRoute.delete("/:id",removeTask)

taskRoute.patch("/:id",updateTask)


export default taskRoute