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
  const [localTasksData, setLocalTasksData] = useState();

  const callData = async () => {
    console.log("Call Data");
    const { data, error } = await getTasks({ user, addTasks });
    setLocalTasksData(tasks);
  };

  useEffect(() => {
    callData();
  }, []);
  useEffect(() => {
    if (JSON.stringify(localTasksData) !== JSON.stringify(tasks)) {
      callData();
    }
  }, [tasks]);

  return (
    <div className="container mt-2">
      <div className="row bg-primary p-2">
        <div className="col-lg-9 bg-success">
          {err ? (
            <p className="text-warning">{err}</p>
          ) : tasks.length > 0 ? (
            <div className="row">
              {tasks.map((task,index) => {
                return (
                  <div className="col-4 ">
                    <Task key={index} task={task}/>
                  </div>
                );
              })}
            </div>
          ) : (
            <h3 className="text-info text-center">Please Add Tasks</h3>
          )}
        </div>
        <div className="col bg-info">
          <AddTasks />
        </div>
      </div>
    </div>
  );
};
export default Tasks;
