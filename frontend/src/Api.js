import axios from 'axios'


const url="http://127.0.0.1:4500"



const updateTokensApi=async(parms,callFunction)=>{
    const {user}=parms
    try {   
        const token=await axios.post(`${url}/auth/refresh`,{"refresh":user.user.refresh})
        user.updateToken(token.data)
        console.log({"after":"Api Call",user})
        const UpdatedUser={...user,"user":{...user.user,"accessToken":token.data.accessToken,"refresh":token.data.refresh}}
        callFunction({...parms,'user':UpdatedUser})

        
    } catch (refreshError) {
        user.deleteUser()
    }
}

export const getTasks= async(parms)=>{
    const {user,addTasks}=parms;
    const config={
        headers:{
            Authorization:`bearer ${user.user.accessToken}`
        }
    }
    try {
        const resp=await axios.get(`${url}/task`,config)
        addTasks(resp.data)
        return resp
        
    } catch (error) {
        if(error.response.data && error.response.data.message==="TokenExpiredError"){
            updateTokensApi({user},getTasks)   
        }
        else{
            return error
        }
        
    }
}

export const deleteApi=async(parms)=>{
    const {user,taskId,}=parms;
    const config={
        headers:{
            Authorization:`bearer ${user.user.accessToken}`
        }
    }

    try {
        const resp= await axios.delete(`${url}/task/${taskId}`,config)
    }
    catch (error) {
        console.log()
        if(error.resp.data.message==="TokenExpiredError"){
            updateTokensApi({parms},deleteApi)
        }
        else{
            console.log(error)
        }
        
    }
}



export const addTask= async(parms)=>{
    const {user,data}=parms
    const config={
        headers:{
            Authorization:`bearer ${user.user.accessToken}`
        }
    }
    try {
        const resp=await axios.post(`${url}/task`,data,config)
    }
    catch(error){
        if(error.response.data && error.response.data.message==="TokenExpiredError"){
            updateTokensApi({user},addTask)   
        }
        else{
            return error
        }
    }
}



export const updateTask= async(params)=>{
    const {user,data}=params
    const config={
        headers:{
            Authorization:`bearer ${user.user.accessToken}`
        }
    }
    try{
        const resp=await axios.patch(`${url}/task/${data.id}`,data,config)
        // console.log(data)
    }
    catch(error){
        if(error.response.data && error.response.data.message==="TokenExpiredError"){
            updateTokensApi({user},updateTask)   
        }
        else{
            return error
        }
    }

}










export const LoginApi=async (email,password)=>{
        try {
            const resp=await axios.post(`${url}/auth/login`,{email,password})
            return resp 
            
        } catch (error) {
            return {error}
        }
}

export const RegisterApi= async (username,email,password)=>{
    try {
        const resp=await axios.post(`${url}/auth/register`,{username,email,password})
        return resp
    } catch (error) {
        console.log(error)
        return {error}
        
    }
}





