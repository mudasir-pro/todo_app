import { Outlet,Navigate } from "react-router-dom"
import { useUser } from "./context/UserContext"


const PrivateComponent=()=>{
    const {user}=useUser()
    return(
        user?<Outlet/>:<Navigate to={'/login'}/>
    )
}
export default PrivateComponent