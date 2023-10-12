import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PrivateComponent from './component/PrivateComponent'
import Register from "./component/auth/Register"
import Header from './component/Header'
import Login from './component/auth/Login'
import { UserProvider } from './component/context/UserContext'
import { useEffect, useState } from 'react'



const App=()=>{
    const [user,setUser]=useState(null)
    
    const addUser=(User)=>{
        console.log({"From Add User":User})
        setUser(User)
        localStorage.setItem('User',JSON.stringify(User))
    }

    const deleteUser=()=>{
        setUser(null)
        localStorage.clear()
    }
    useEffect(()=>{
        const User=JSON.parse(localStorage.getItem('User'))
        if (User){
            setUser(User)
        }
    },[])



    return(
        <UserProvider value={{user,addUser,deleteUser}}>
        <BrowserRouter>
            <Header/>
        <Routes>
            <Route element={<PrivateComponent/>}>
                <Route path='/' element={<h1>Hi, From todo App</h1>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<h1>Log Out</h1>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
        
        
        </BrowserRouter>
        </UserProvider>
    )
}
export default App