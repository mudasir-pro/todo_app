import AddTasks from "./AddTasks"

const Tasks=()=>{
    return(
        <div className="container">
            <div className="row bg-primary">
                <div className="col-lg-9 bg-success"></div>
                <div className="col bg-info">
                    <AddTasks/>
                </div>
            </div>
        </div>
    )
}
export default Tasks
