/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { createObraRequest, getObrasRequest, getAllObrasRequest, updateObraRequest, deleteObraRequest } from "../api/obra";

const ObrasContext = createContext()

export const useObras = () =>
{
    const context = useContext( ObrasContext );

    if ( !context )
    {
        throw new Error( 'useObras must be used within a ObraProvider' );
    }

    return context
}

// eslint-disable-next-line react/prop-types
export function ObraProvider ( { children } )
{
    const [ obras, setObras ] = useState( [] )

    const getObras = async () => {
        try {
            const res = await getObrasRequest()
            setObras( res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllObras = async () => {
        try {
            const res = await getAllObrasRequest()
            setObras(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const createObra = async (obra) => {
        try {
            const res = await createObraRequest(obra)
            console.log('obra created')
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const updateObra = async (id, obra) => {
        try {
            const res = await updateObraRequest(id, obra)
            console.log('obra updated')
            console.log(res)
            getAllObras()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteObra = async (id) => {
        try {
            const res = await deleteObraRequest(id)
            console.log('obra deleted')
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ObrasContext.Provider value={ {
            obras,
            createObra,
            getObras,
            getAllObras,
            updateObra, 
            deleteObra

        } }>
            { children }
        </ObrasContext.Provider>
    )

}