import axios from "./axios";

export const getObrasRequest = () => axios.get( `/tasks` )
export const getAllObrasRequest = () => axios.get( '/allObras' )
export const getObraRequest = ( id ) => axios.get( `/tasks)/${ id }` )
export const createObraRequest = ( obra ) => axios.post( `/task`, obra )
export const updateObraRequest = ( obra ) => axios.put( `/tasks${ obra._id }`, obra )
export const deleteObraRequest = ( id ) => axios.delete( `/tasks/${ id }` )
