import {useState} from 'react'
import {useUser} from '../context/UserContext'
import {addTask} from '../../Api'
import { useTasks } from '../context/TaskContext'


const AddTasks=()=>{
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [WantToCompleteAT,setWantToCompleteAT]=useState("")
    const user=useUser()
    const {clearTasks}=useTasks()

    const handleSubmit=(e)=>{
        
        const {data,error}=addTask({user,data:{title,body,WantToCompleteAT}})
        if(error){
            console.log(error)
        }
        else{
            setTitle("")
            setBody("")
            setWantToCompleteAT("")
            clearTasks()
        }
        
    }

    return(
        <div>
            <h2 className="text-center">Add Task</h2>
            <form className="d-flex flex-column align-items-center">
                
                <input type="text" className="m-2 w-75" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <textarea  className="m-2 w-75" value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                <input type="datetime-local" className="m-2 w-75" value={WantToCompleteAT} onChange={(e)=>setWantToCompleteAT(e.target.value)}></input>
                <button type="submit" className="m-2 btn btn-primary" 
                onClick={(e)=>{
                e.preventDefault()
                handleSubmit()}}>
                Add task</button>
            </form>
        </div>
    )
}
export default AddTasks