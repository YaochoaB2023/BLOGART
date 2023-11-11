import '../css/obrasPublic.css'
import Monalisa from '../images/la-monalisa.jpeg'
import { useEffect } from "react";
import { useObras } from "../context/ObrasContext";


const ObrasPage = () =>
{

  const { obras, getObras } = useObras()
  console.log( obras )
  useEffect( () =>
  {
    getObras()

  }, [] )

  return (
    <> 

    <div className="Obras">
            <h1 className='titulo1'>Obras</h1>
            <div className='container'>
              {obras.map(obra => (
              <div key={obra.id} className='cuadro'>
                  <div className='Mona flex flex-col'>
                  <img src={Monalisa} className='Monalisa' />
                  </div>
                  <h1 className='nombre'><div className=' font-bold'>Nombre:</div>{obra.title}</h1>
                  <h1 className='descripcion'><div className=' font-bold'>Descripcion:</div>{obra.description}</h1>
                  <h1 className='propetario'><div className=' font-bold'>Propietario:</div> Leonardo da Vinci</h1>
                  <h1 className='precio'><div className=' font-bold'>Precio:</div> 700.000.000.000</h1>
                  <div className='boton '><button>Agregar</button></div>
              </div>
              ) )}

            </div>
        </div>
    </>

  )
}

export default ObrasPage