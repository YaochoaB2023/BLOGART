import '../css/obrasPublic.css'
import { ImPlus } from "react-icons/im";
import { FaCartPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react'
import { useObras } from '../context/ObrasContext'

const ObrasPublicPage = () => {

  const {obras, getAllObras} = useObras();
  const [isModalOpen, setModalOpen] = useState(null);
  const [selectedObra, setSelectedObra] = useState(null);

  const openModal = (obra) => {
    setSelectedObra(obra);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedObra(null);
    setModalOpen(false);
  };
  // console.log(obras)
  useEffect(() => {
      getAllObras()
  },[])



  return (
    <>
<h1 className="titulo1 mt-5">Obras</h1>
<div className="flex flex-wrap mt-5">
  {obras.map((obra, index) => (
    <div key={obra.id || index} className="max-w-sm mx-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: '300px', height: '400px' }}>
      <div>
        <img className="rounded-t-lg" src={`http://localhost:5000/${obra.Urlimagen}`} alt={`Imagen de ${obra.nombre}`}/>
      </div>
      <div className="p-5 flex flex-col justify-between" style={{ height: '55%' }}>
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {obra.nombre}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {obra.descripcion}
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to Cart
            <FaCartPlus className='ml-2'/>
          </button>
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
        <div className="modal flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={`http://localhost:5000/${selectedObra.Urlimagen}`}
            alt=""
          />
          <div className="modal-content flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {selectedObra.nombre}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {selectedObra.descripcion}
            </p>
            <button onClick={closeModal} className=" close-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Close
            <IoClose className='ml-2'/>
          </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ObrasPublicPage
