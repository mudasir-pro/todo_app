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
        <div className="w-100 d-flex justify-content-center m-2">
            <div className="TodoForm d-flex flex-column align-items-center container">
                <h2>User Login</h2>
                <form>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    className="btn btn-primary mt-2"
                    onClick={(e)=>{
                        e.preventDefault()
                        submitLogin()
                    }}
                    >Login In</button>
                   {err&&<p>{err}</p>}
                    </form>
                    <p>Register User <Link to={'/register'}>Sign In</Link></p>
            </div>

        </div>
    )
}
export default Login