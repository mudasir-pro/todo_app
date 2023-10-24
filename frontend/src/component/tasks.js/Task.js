import { deleteApi } from "../../Api";
import { useUser } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";



const Task = ({ task }) => {
    const user=useUser()
    const date=new Date(task.WantToCompleteAT)
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    const {clearTasks}=useTasks()
    const [title,setTitle]=useState(task.title)
    const [body,setBody]=useState(task.body)
    const [WantToCompleteAT,setWantToCompleteAT]=useState(date.toLocaleDateString('en-US',dateOptions))
    const [editConditon,setEditCondition]=useState(false)

    const deleteTask=async()=>{
        await deleteApi({user,"taskId":task._id})
        clearTasks()
    }



    console.log(task)
    



  return (
    <div className="card mb-2 ">
      <div className="card-body">
        <input type="text" className={`card-title ${!editConditon?"border-0 bg-transparent ":" "} fs-3 fw-bold w-100 mt-2`}  disabled={!editConditon} value={title}
        onChange={(e)=>setTitle(e.target.value)}
        onClick={()=>setEditCondition(true)}
        />
        <input type="text" className={`card-text ${!editConditon?"border-0 bg-transparent ":" "} fs-5 w-100 mt-2`} disabled={!editConditon} value={body}
        onChange={(e)=>setBody(e.target.value)}
        onClick={()=>setEditCondition(true)}
        />
        <input type="datetime-local" className={`card-text ${!editConditon?"border-0 bg-transparent ":" "} fs-6 fst-italic text-muted w-100 mt-2`} disabled={editConditon} value={WantToCompleteAT}
        onChange={(e)=>setWantToCompleteAT(e.target.value)}
        onClick={()=>setEditCondition(true)}
        />
      </div>
      <div className="d-flex">
        
      <button 
        className="w-50 btn btn-danger btn-sm m-2"
        onClick={deleteTask}
        >Delete</button>
        {
        editConditon&&
        <button 
        className="w-50 btn btn-success btn-sm m-2"
        onClick={()=>{setEditCondition(false)}}
        >Ok</button>
        }
      </div>
    </div>
  )
};
export default Task;
