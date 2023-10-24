import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PrivateComponent from './component/PrivateComponent'
import Register from "./component/auth/Register"
import Header from './component/Header'
import Login from './component/auth/Login'
import { UserProvider } from './component/context/UserContext'
import { useEffect, useState } from 'react'
import Tasks from './component/tasks.js/Tasks'
import { TasksProvider } from './component/context/TaskContext'



const App=()=>{
    const [user,setUser]=useState(null)
    const [tasks,setTask]=useState([])
    
    const addUser=(User)=>{
        setUser(User)
        localStorage.setItem('User',JSON.stringify(User))
    }

    const updateToken=(tokens)=>{
        setUser((previous)=>{
            return {...previous,accessToken:tokens.accessToken,refresh:tokens.refreshToken}
        })
        localStorage.removeItem('User')
        localStorage.setItem('User',JSON.stringify({...user,accessToken:tokens.accessToken,refresh:tokens.refreshToken}))
    }

    const deleteUser=()=>{
        setUser(null)
        localStorage.clear()
        clearTasks()
    }

    const addTasks=(Tasks)=>{
        setTask(Tasks)
    }

    const clearTasks=()=>{
        setTask([])
    }



    useEffect(()=>{
        const User=JSON.parse(localStorage.getItem('User'))
        if (User){
            setUser(User)
        }
    },[])



    return(
        <UserProvider value={{user,addUser,deleteUser,updateToken}}>
        <TasksProvider value={{tasks,addTasks,clearTasks}}>
        <BrowserRouter>
            <Header/>
        <Routes>
            <Route element={<PrivateComponent/>}>
                <Route path='/' element={<Tasks/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<h1>Log Out</h1>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
        
        
        </BrowserRouter>
        </TasksProvider>
        </UserProvider>
    )
}
export default App