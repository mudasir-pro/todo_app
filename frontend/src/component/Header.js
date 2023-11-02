import logo from "../static/Images/Logo.png"
import { useEffect, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useUser } from "./context/UserContext"

const Header=()=>{
    const {user,deleteUser}=useUser()
    const navigate=useNavigate()
    

    return(
        <header className="flex h-20 justify-around bg-gray-700 p-2">
            <Link to={'/'} className="flex items-center">
            <img src={logo} className=" h-5/6 mx-2"/>
            <h1 className=" text-sky-500 font-bold text-3xl mx-2">TodoApp</h1>
            </Link>
            <div className="p-3 d-flex items-center">
                {
                user?
                    <>  
                    <p className="px-2 py-1 text-white font-bold">{user.username}</p>
                    <button
                    className=" bg-sky-500 hover:bg-sky-600 px-4 text-white py-2"
                    onClick={(e)=>{
                        deleteUser()
                        navigate('/login')
                    }}>Logout</button>
                    </>
                    :
                    <button
                    className=" bg-sky-500 hover:bg-sky-600 px-4 text-white py-2"
                    onClick={(e)=>{
                        
                        navigate('/login')
                    }}>Login</button>
                }
                
                </div>
        </header>
    )
}
export default Header