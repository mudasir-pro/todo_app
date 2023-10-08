import express  from "express";
import "./helper/DataBase_Connect.js";
import CreateError from 'http-errors'
import authRoute from "./routes/authRoutes.js";
import taskRoute from "./routes/taskRoutes.js";
import morgan from "morgan";
import dotenv from 'dotenv';
// import taskRouter from "./routes/taskRoutes.js";


dotenv.config()


const app=express();
app.use(express.json());
app.use(morgan('dev'))



app.use('/auth',authRoute)



app.use('/task',taskRoute)


app.use((req,res,next)=>{
    console.log('from error Handler 404')
    next(CreateError.NotFound('Not Found'))
})

app.use((error,req,res,next)=>{
    console.log(error)
    res.status(error.status||500)
    res.send(error)
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is runing at ${process.env.PORT}`)
})


