import axios from 'axios'

const url="http://127.0.0.1:4500"



export const getTodoApi=async()=>{
    const {accessToken,refresh}=JSON.parse(localStorage.getItem('TodoAuth'))
        const config={
            Headers:{
                Authorization:`bearer ${accessToken}`
            }
        }
        const resp =await axios.get(`${url}/task`,config)
        if (resp.status!==200){
            console.log(resp)
        }
        else{
            return resp.data
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
        // console.log(resp)
        return resp
    } catch (error) {
        console.log(error)
        return {error}
        
    }
}

