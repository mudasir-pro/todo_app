import { useUser } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";
import {FaTrash,FaPenSquare,FaCheck} from "react-icons/fa"
import { updateTask,deleteApi } from "../../Api";




const Task = ({task}) => {
    const user=useUser()
    const {clearTasks}=useTasks()
    const [title,setTitle]=useState(task.title)
    const [body,setBody]=useState(task.body)
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [edit,setEdit]=useState(false)

    useEffect(()=>{
      const Deadline=new Date(task.deadline)
      setDate(Deadline.toDateString())
      setTime(Deadline.toLocaleTimeString('en-PK'))
    },[])

    const saveData= async()=>{
        const deadline=new Date(`${date} ${time}`)
        updateTask({user,data:{title,body,deadline,id:task._id}})
        setEdit(false)
    }

    const deleteTask=async()=>{
      deleteApi({user,taskId:task._id})
      clearTasks()
    }


  



    



  return (
    <div className="bg-gray-200 flex flex-col p-2 rounded-md">
    <div className="w-100 flex">

    <input
    className="text-2xl w-3/4 font-semibold rounded-md"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    disabled={!edit}
    />
    {edit?
    <button
    className="p-2 rounded-full bg-gray-500 text-white mx-1"
    onClick={(e)=>saveData()}
    ><FaCheck/></button>
    :
    <button
    className="p-2 rounded-full bg-gray-500 text-white mx-1"
    onClick={(e)=>setEdit(true)}
    ><FaPenSquare/></button>
    }
    <button className="p-2 rounded-full bg-gray-500 text-white mx-1"
    onClick={(e)=>deleteTask()}
    
    ><FaTrash/></button>
    </div>

    <div className="w-full pt-2">
      <label className=" font-semibold text-sky-500">Content</label>

      <textarea
      className="w-full h-48 rounded-md resize-none"
      value={body} 
      onChange={(e)=>setBody(e.target.value)}
      disabled={!edit}
      >
      </textarea>

    </div>

    <div className="w-full">
      <label className=" text-sky-500 ">Deadline</label>

      <section className="flex">
      <div className="w-1/2 ">
      <label className="p-1 font-semibold">Date:</label>

      <input
      type="text"
      className="p-2 rounded-md w-3/4"
      value={date}
      onFocus={(e)=>e.target.type='date'}
      onBlur={(e)=>e.target.type='text'}
      onChange={(e)=>setDate(e.target.value)}
      disabled={!edit}
      />

      </div>
      <div className="w-1/2">
      <label className="p-1 font-semibold">Time:</label>

      <input
      type="text"
      className="p-2 rounded-md w-3/4"
      value={time}
      onFocus={(e)=>e.target.type="time"}
      onBlur={(e)=>e.target.type="text"}
      onChange={(e)=>setTime(e.target.value)}
      disabled={!edit}
      />

      </div>
      </section>


    </div>

  </div>


  )
};
export default Task;
