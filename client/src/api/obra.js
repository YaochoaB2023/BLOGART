import axios from "./axios";

export const getObrasRequest = () => axios.get( `/tasks` )
export const getAllObrasRequest = () => axios.get( '/allObras' )
export const getObraRequest = ( id ) => axios.get( `/tasks)/${ id }` )
export const createObraRequest = ( obra ) => axios.post( `/task`, obra )
export const updateObraRequest = ( id, obra ) => axios.put( `/task/${ id }`, obra )
export const deleteObraRequest = ( id ) => axios.delete( `/task/${ id }` )
