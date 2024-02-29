import axios from "./axios";

// obtener todas las respuestas
export const getTasksRequest = async () => axios.get("/tasks/listar");

export const createTaskRequest = async (task) => axios.post("/tasks/agregar", task);

export const updateTaskRequest = async (idTarea, task) => {
  try {
    const res = await axios.put(`/tasks/actualizar/${idTarea}`, task);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; // Puedes manejar el error según tus necesidades
  }

}

export const deleteTaskRequest = async (idTarea) => axios.delete("/tasks/eliminar", {
  data: { idTarea } // Envolviendo el ID en un objeto
});

export const getTaskRequest = async (idTarea) => {
  try {
    const res = await axios.get(`/tasks/tasks/${idTarea}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
