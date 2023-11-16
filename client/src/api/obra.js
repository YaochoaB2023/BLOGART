import axios from "./axios";

export const getObrasRequest = () => axios.get( `/userObras` )
export const getAllObrasRequest = () => axios.get( '/allObras' )
export const getObraRequest = ( id ) => axios.get( `/tasks)/${ id }` )
export const createObraRequest = ( obra ) => axios.post( `/createObra`, obra )
export const updateObraRequest = ( id, obra ) => axios.put( `/updateObra/${ id }`, obra )
export const deleteObraRequest = ( id ) => axios.delete( `/deleteObra/${ id }` )
