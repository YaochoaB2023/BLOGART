import axios from "./axios";

export const getTasksRequest = () => axios.get( `/tasks` )
export const getTaskRequest = ( id ) => axios.get( `/tasks)/${ id }` )
export const createTaskRequest = ( task ) => axios.post( `/task`, task )
export const updateTaskRequest = ( task ) => axios.put( `/tasks${ task._id }`, task )
export const deleteTaskRequest = ( id ) => axios.delete( `/tasks/${ id }` )
