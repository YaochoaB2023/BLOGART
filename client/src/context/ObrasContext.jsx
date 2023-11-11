/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { createObraRequest, getObrasRequest } from "../api/obra";

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

    const createObra = async (obra) => {
        try {
            console.log('obra created')
            const res = await createObraRequest(obra)
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

        } }>
            { children }
        </ObrasContext.Provider>
    )

}