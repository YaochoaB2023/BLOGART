import '../css/obrasPublic.css'
import { ImPlus } from "react-icons/im";
import { FaCartPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react'
import { useObras } from '../context/ObrasContext'
import {useCarrito} from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext';


const ObrasPublicPage = () => {

  const {agregarAlCarrito, setCarrito} = useCarrito()
  const {obras, getAllObras} = useObras();
  const [isModalOpen, setModalOpen] = useState(null);
  const [selectedObra, setSelectedObra] = useState(null);
  const [mostrarParrafo, setMostrarParrafo] = useState(true);
  const {isAuthenticathed} = useAuth();
  const [busqueda, setBusqueda] = useState("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);

  const openModal = (obra) => {
    setSelectedObra(obra);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedObra(null);
    setModalOpen(false);
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
    console.log("Busqueda: "+event.target.value);
  }

  useEffect(() => {
    const filtrarObras = obras.filter((obra) => {
      const obraValor = Object.values(obra).join('').toLowerCase();
      return obraValor.includes(busqueda.toLowerCase());
    });
    setResultadoBusqueda(filtrarObras);
  }, [obras, busqueda])

  const handleAddCarrito = (obra) => {
    // Actualizar el estado local antes de llamar a la función del contexto
    setCarrito((prevCarrito) => [...prevCarrito, obra]);
    // Llamar a la función del contexto
    agregarAlCarrito(obra);
  };
  
  useEffect(() => {
      getAllObras()
  },[])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMostrarParrafo(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <>
      <h1 className="mb-10 text-center text-3xl font-bold mt-24">Obras</h1>
        <div className='buscar flex'>
              <input type="text" className="busqueda bg-white" value={busqueda} placeholder="Buscar" onChange={handleBusquedaChange}/>
              <button className='icono3 text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300'>Buscar</button>
        </div>
          {!isAuthenticathed && mostrarParrafo && (
            <> 
              <p className='text-center font-bold text-red-500'>Para Agregar Obras a tu Carrito De Compras Por Favor Inicia Sesion o Registrate si aun no tienes una cuenta</p>
            </>
          )}
          <div className="flex flex-wrap mt-5">
            {resultadoBusqueda.map((obra, index) => (
              <div key={obra.id || index} className="max-w-sm mx-auto mb-4 rounded-lg shadow bg-gray-300 p-1" style={{ width: '300px', height: '400px' }}>
                <div>
                  <img className="rounded-t-lg" src={`http://localhost:5000/${obra.Urlimagen}`} alt={`Imagen de ${obra.nombre}`}/>
                </div>
                <div className="p-5 flex flex-col justify-between" style={{ height: '55%' }}>
                  <div>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-black">
                      {obra.nombre}
                    </h5>
                    <p className="mb-2 font-normal text-gray-700">
                      {obra.descripcion}
                    </p>
                    <p className='text-black font-bold'>Precio</p>
                    <p className="mb-3 font-normal text-gray-700">
                      ${obra.precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    {isAuthenticathed && (
                      <>
                      <button onClick={() => handleAddCarrito(obra)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to Cart
                        <FaCartPlus className='ml-2'/>
                      </button>
                      </>
                    )}
                    <button onClick={() => openModal(obra)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                      More Info
                      <ImPlus className='ml-2'/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        {isModalOpen && selectedObra && (
          <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="modal-container bg-gray-300 overflow-hidden p-2">
              <div className="modal-content flex flex-col lg:flex-row">
                <div className="modal-image lg:w-2/3">
                  <img
                    className="object-cover w-full h-full rounded-t-lg"
                    src={`http://localhost:5000/${selectedObra.Urlimagen}`}
                    alt={`Imagen de ${selectedObra.nombre}`}
                  />
                </div>
                <div className="modal-info p-4 lg:w-1/3">
                  <h5 className="text-3xl font-bold tracking-tight textblack">
                    {selectedObra.nombre}
                  </h5>
                  <p className="mb-3 font-normal text-gray-800 ">
                    {selectedObra.descripcion}
                  </p>
                  <p className="mb-3 font-normal text-gray-800">
                    Precio: ${selectedObra.precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </p>
                  <p className="mb-3 font-normal text-gray-800">
                    Vendedor: {selectedObra.user.username}
                  </p>
                  <p className="mb-3 font-normal text-gray-800">
                    Correo del vendedor: {selectedObra.user.email}
                  </p>
                  <button
                    onClick={() => closeModal()}
                    type="button"
                    className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Cerrar            
                    <IoClose className='ml-2'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default ObrasPublicPage