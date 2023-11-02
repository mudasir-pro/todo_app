import {useState} from 'react'
import {useUser} from '../context/UserContext'
import {addTask} from '../../Api'
import { useTasks } from '../context/TaskContext'


const AddTasks=({callData})=>{
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")

    const user=useUser()
    const {clearTasks}=useTasks()


    const handleSubmit=()=>{
        const deadline=new Date(`${date} ${time}`)
        const {data,error}=addTask({user,data:{title,body,deadline}})
        if(error){
            console.log(error)
        }
        else{
            setTitle("")
            setBody("")
            setDate("")
            setTime("")
            // clearTasks()
            callData()
        }
    }

    return(
        <div className=" bg-gray-200 lg:col-span-2 lg:order-last flex flex-col justify-center p-2 mt-2 rounded-md">
          <h3 className=" text-center text-3xl font-semibold">Add Task's</h3>
          <form className="bg-gray-300 border-solid border-2 border-gray-400 border-spacing-4 p-2 mt-2 rounded-md flex flex-col items-center">
            <div className="flex flex-col w-full mt-2">
              <label>Title:</label>

              <input className="p-2 rounded-md"
              placeholder="Enter Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              />

            </div>

            <div className="flex flex-col w-full mt-2">
              <label>Task Content:</label>
              <textarea
                className="p-2 rounded-md h-56 resize-none"
                placeholder="Enter Title"
                value={body}
                onChange={(e)=>setBody(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full mt-2">
              <label>Deadline:</label>
              <div className="flex lg:flex-col xl:flex-row ">
                <div className="w-3/4 lg:mt-2 ">

                  <label>Date:</label>
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    className="p-2 rounded-md w-3/4 ml-1"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}

                  />

                </div>
                <div className="w-3/4 lg:mt-2">

                  <label>Time:</label>
                  <input
                    type="text"
                    placeholder="MM:HH"
                    className="p-2 rounded-md w-3/4 ml-1"
                    onFocus={(e) => (e.target.type = "Time")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={time}
                    onChange={(e)=>setTime(e.target.value)}
                  />

                </div>
              </div>
            </div>
            <button
            className="px-5 py-2 bg-sky-500 rounded-md hover:bg-sky-600 mt-2 text-white"
            onClick={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}
            >
              Submit
            </button>
          </form>
        </div>
    )
}
export default AddTasks