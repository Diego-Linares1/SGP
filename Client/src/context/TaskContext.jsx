import { createContext, useContext, useState, useEffect } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      console.log("RES: ", res.data);
      setTasks(res.data);
      console.log("TASK: ", tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("TASK: ", tasks);
  }, [tasks]);

  const deleteTask = async (idTarea) => {
    try {
      const res = await deleteTaskRequest(idTarea);
      console.log("tasks:",tasks)
      if (res.status === 204) setTasks(tasks.filter((task) => task.IDTAREA !== idTarea));
    } catch (error) {
      console.log(error);
    } 
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      console.log("ID obtenido de la URL", id)
      const res = await getTaskRequest(id);
      console.log("Tarea seleccionada: ", res)
      
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}