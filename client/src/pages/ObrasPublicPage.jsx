// import Monalisa from '../images/la-monalisa.jpeg'
import '../css/obrasPublic.css'
import { useEffect } from 'react'
import { useObras } from '../context/ObrasContext'

const ObrasPublicPage = () => {

  const {obras, getAllObras} = useObras();


  // console.log(obras)
  useEffect(() => {
      getAllObras()
  },[])



  return (
    <>
      <div className="Obras">
        <h1 className="titulo1">Obras</h1>
        <div className="container">
          {obras.map((obra, index) => (
            <div key={obra.id || index} className="cuadro">
              <div className="Mona flex flex-col">
                <img            
                src={`http://localhost:5000/${obra.Urlimagen}`}
                className="Monalisa"
                style={{ width: '100%', height: '100%' }} />
              </div>
              <h1 className="nombre">
                <div className=" font-bold">Nombre:</div>
                {obra.nombre}
              </h1>
              <h1 className="descripcion">
                <div className=" font-bold">Descripcion:</div>
                {obra.descripion || obra.descripcion}
              </h1>
              <h1 className="precio">
                <div className=" font-bold">Precio:</div>$:
                {obra.precio}
              </h1>
              <h1 className="precio">
                <div className=" font-bold">propietario:</div>
                {obra.user.username}
              </h1>
              <h1 className="precio">
                <div className=" font-bold">contacto del propietario:</div>
                {obra.user.email}
              </h1>
              <div className="boton ">
                <button>Agregar</button>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default ObrasPublicPage
