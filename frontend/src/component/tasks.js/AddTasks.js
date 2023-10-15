import {useState} from 'react'


const AddTasks=()=>{
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [wantToCompleteAT,setWantToCompleteAT]=useState("")

    const handleSubmit=(e)=>{
        console.log({title,body,wantToCompleteAT})
    }

    return(
        <div>
            <h2 className="text-center">Add Task</h2>
            <form className="d-flex flex-column align-items-center">
                <input type="text" className="m-2 w-75" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <textarea  className="m-2 w-75" value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                <input type="datetime-local" className="m-2 w-75" value={wantToCompleteAT} onChange={(e)=>setWantToCompleteAT(e.target.value)}></input>
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