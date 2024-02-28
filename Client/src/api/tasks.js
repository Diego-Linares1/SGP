import axios from './axios'

export const getTasksRequest = () => axios.get('/tasks');

export const getTaskRequest = (id) => axios.get(`/tasks/${tasks.id}`);

export const createTaskRequest = (tasks) => axios.post('/tasks', tasks);

export const updateTaskRequest = (tasks) => axios.put(`/tasks/${tasks.id}`, tasks);

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${tasks.id}`, tasks);