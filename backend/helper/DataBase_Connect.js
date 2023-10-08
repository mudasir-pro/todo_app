import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Mudasir:TU6S8P6nogk3PIVi@testcluster.boexddp.mongodb.net/?retryWrites=true&w=majority",)
.then(()=>{
    console.log('DB is connected')
})
.catch((err)=>{
    console.log(err)
})
