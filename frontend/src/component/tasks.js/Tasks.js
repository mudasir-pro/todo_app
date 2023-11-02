import AddTasks from "./AddTasks";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getTasks } from "../../Api";
import { useTasks } from "../context/TaskContext";
import Task from "./Task";


const Tasks = () => {
  const user = useUser();
  const [err, setErr] = useState(null);
  const { tasks, addTasks, clearTasks } = useTasks();
  const [localTasksData, setLocalTasksData] = useState([]);

  const callData = async () => {
    const { data, error } = await getTasks({ user, addTasks });
    
  };

  useEffect(() => {
    callData();
  }, []);

  useEffect(() => {
    if (JSON.stringify(localTasksData) !== JSON.stringify(tasks)) {
      callData();
      setLocalTasksData(tasks);
    }

  }, [tasks]);

  return (
    <div className="container">
      <div className="grid lg:grid-cols-6">
        <AddTasks callData={callData}/>
        
        <div className="lg:col-span-4 grid grid-cols-3 mt-2 p-2 h-96 gap-2">
        {
          localTasksData.map((task,index)=>{
            return(

              <Task task={task} key={index}/>
            )
          })
        }

        </div>
      </div>
    </div>
  );
};
export default Tasks;
