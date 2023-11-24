import { useCarrito } from "../context/CarritoContext";
import '../css/carrito.css';

const Carrito = () => {
    const { carrito, actualizarCarrito, precioTotal } = useCarrito();
    console.log('carrito en pagina', carrito);

    return (
        <div>
            {carrito.length <= 0 ? (    
            
                <h1 className="mb-10 mt-10 text-center text-2xl font-bold">Carrito Vacio</h1>

            ) : (
                <div className="Carrito">
                    <div className="h-full pt-10">
                        <h1 className="mb-10 text-center text-2xl font-bold">Articulos del Carrito</h1>
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3">
                            {carrito.map((carritos) => (
                                <div key={carritos._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <img src={`http://localhost:5000/${carritos.Urlimagen}`} alt={`Imagen de ${carritos.nombre}`} className="w-full rounded-lg sm:w-40" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-2xl font-bold text-gray-900">{carritos.nombre}</h2>
                                            <p className="mt-1 text-xs text-gray-700">$  {carritos.precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100">
                                                <span onClick={() => { actualizarCarrito(carritos._id, 'del');}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" value={carritos.cantidad}/>
                                                <span onClick={() => {actualizarCarrito(carritos._id, 'add');}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-sm">259.000 ₭</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>                 
                            ))} 
                        </div>
                        {/* <!-- Sub total --> */}
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            {/* <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">$129.99</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$4.99</p>
                            </div> */}
                            <p className="text-2xl font-bold text-center">Pagos</p>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${precioTotal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                <p className="text-sm text-gray-700">incluye IVA</p>
                            </div>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                        </div>
                        </div>
                    </div>
                </div>
                
            )}

        </div>
    );
};

export default Carrito;
