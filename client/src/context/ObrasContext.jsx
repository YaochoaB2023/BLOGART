import { createContext, useContext, useState } from "react";
import { createObraRequest, getObrasRequest, getAllObrasRequest, updateObraRequest, deleteObraRequest } from "../api/obra";
import { Toaster,  toast } from 'sonner';
import { AiFillDelete } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

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
export function ObraProvider ( { children } ) {
    const [ obras, setObras ] = useState( [] )

    const showCreate = (title, description) => {
        toast(description, {
          title: title,
          description: description,
          icon: <IoCreateOutline style={{ fontSize: "15px"}}/>
        });
      };

      const showUpdate = (title, description) => {
        toast(description, {
          title: title,
          description: description,
          icon: <GrUpdate style={{ fontSize: "15px"}}/>
        });
      };

    const showEliminar = (title, description) => {
        toast(description, {
          title: title,
          description: description,
          icon: <AiFillDelete style={{ fontSize: "15px"}}/>
        });
      };

    const getObras = async () => {
        try {
            const res = await getObrasRequest()
            setObras( res.data)
            // console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllObras = async () => {
        try {
            const res = await getAllObrasRequest()
            setObras(res.data)
            // console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const createObra = async (obra) => {
        try {
            const res = await createObraRequest(obra)
            console.log('obra created')
            console.log(res)
            showCreate("Obra creada", "", "")
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
            showUpdate("Obra actualizada", "", "")
        } catch (error) {
            console.log(error)
        }
    }

    const deleteObra = async (id) => {
        try {
            const res = await deleteObraRequest(id)
            console.log('obra deleted')
            console.log(res)
            showEliminar("Obra eliminada", "", "")
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
            <Toaster position="top-right" reverseOrder={false} />
            { children }
        </ObrasContext.Provider>
    )

}