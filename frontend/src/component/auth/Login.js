import {Link, Navigate,useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import { LoginApi } from "../../Api"
import { useUser } from "../context/UserContext"


const Login=()=>{
    const navigate=useNavigate()
    const [ email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState(null)
    const {user,addUser}=useUser()

    const submitLogin=async()=>{
        const {data,status,error}=await LoginApi(email,password)
        if(!error){
            addUser(data)
            navigate('/')
        }
        else{
            console.log(error)
            setErr(error.response.data.message)
        }
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])
    

    return(
        <div className="w-full mt-2">
            <div className=" mx-auto p-4 bg-gray-400">
                <h2 className="text-2xl text-center font-bold">User Login</h2>
                <form className=" flex flex-col items-center">
                    <div className="bg-gray-200 rounded-md sm:w-10/12 lg:w-1/2 p-2 flex flex-col items-center">
                    <div className="form-group w-full">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    autoComplete="username"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                    </div>
                    <div className="form-group w-full">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}

                    />
                    </div>
                    <button type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 w-3/4 align-middle mt-2 "
                    onClick={(e)=>{
                        e.preventDefault()
                        submitLogin()
                    }}
                    >Login In</button>
                   {err&&<p>{err}</p>}
                    </div>
                    </form>
                    <p className=" text-center font-bold">Register User <Link className=" underline text-sky-500" to={'/register'}>Sign In</Link></p>
            </div>

        </div>
    )
}
export default Login