import logo from "../static/Images/Logo.png"
import { useEffect, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useUser } from "./context/UserContext"

const Header=()=>{
    const {user,deleteUser}=useUser()
    const navigate=useNavigate()
    

    return(
        <header className="d-flex justify-content-center w-100 header align-items-center">
            <Link to={'/'} className="d-flex justify-content-center align-items-center h-100 w-100 text-decoration-none">
            <img src={logo} className="h-50"/>
            <h1>TodoApp</h1>
            </Link>
            <div className="p-3 d-flex ">
                {
                user?
                    <>  
                    <p>{user.username}</p>
                    <button onClick={(e)=>{
                        deleteUser()
                        navigate('/login')
                    }}>Logout</button>
                    </>
                    :
                    <button onClick={(e)=>{
                        navigate('/login')
                    }}>Login</button>
                }
                
                </div>
        </header>
    )
}
export default Header