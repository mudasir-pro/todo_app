import { Router } from "express";
import {login,logout,register,refresh} from '../controllers/authController.js'

const authRoute=Router();

authRoute.post('/register',register)

authRoute.post('/login',login)

authRoute.delete('/logout',logout)

authRoute.post('/refresh',refresh)

export default authRoute;