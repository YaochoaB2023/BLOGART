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
<h1 className="titulo1">Obras</h1>
<div className="flex flex-wrap mt-10">
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
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to Cart
            <svg  className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </div>
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
            More Info
            <svg  className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


    </>
  )
}

export default ObrasPublicPage
