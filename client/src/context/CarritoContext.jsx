import { createContext, useContext, useState, useEffect } from 'react';
import {getCarritoArteRequest, createCarritoArteRequest, deleteArteRequest} from '../api/carrito.js';
import { Toaster,  toast } from 'sonner';
import {BsCart4} from 'react-icons/bs';
import { AiFillDelete } from "react-icons/ai";


const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito must be used within a CarritoProvider');
    }
    return context;
};

export function CarritoProvider({ children })  {
    const [carrito, setCarrito] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);

    const showToast = (title, description) => {
        toast.success(description, {
          title: title,
          description: description
        });
      };

      const showCarrito = (title, description) => {
        toast(description, {
          title: title,
          description: description,
          icon: <BsCart4 style={{fontSize: "15px"}}/>
        });
      };

      const showEliminar = (title, description) => {
        toast(description, {
          title: title,
          description: description,
          icon: <AiFillDelete style={{ fontSize: "15px"}}/>
        });
      };

    useEffect(() => {
        const cargarCarrito = async () => {
            try {
                const res = await getCarritoArteRequest();
                if (Array.isArray(res.data.arteCarrito)) {
                    const carritoFiltrado = res.data.arteCarrito.filter((producto) => producto.cantidad > 0);
                    setCarrito(carritoFiltrado);
                    calcularPrecioTotal(carritoFiltrado);
                    console.log('Datos del carrito:', res.data.arteCarrito);
                } else {
                    console.log('arteCarrito no es un array válido en la respuesta:', res.data);
                }
            } catch (error) {
                console.log('Error al obtener datos del carrito:', error);
            }
        };
    
        cargarCarrito();
    }, []);
    

    useEffect(() => {
        setCarrito((prevCarrito) => {
            const nuevoCarrito = prevCarrito.filter((producto) => producto.cantidad > 0);
            calcularPrecioTotal(nuevoCarrito);
            return nuevoCarrito;
        });
    }, []);

    const agregarAlCarrito = async (producto) => {
        try {
            const res = await createCarritoArteRequest(producto);
            console.log(res);
            setCarrito((prevCarrito) => [...prevCarrito, res.data]);
            calcularPrecioTotal([...carrito, res.data]);
            showCarrito("Agregado al carrito","","");
        } catch (error) {
            console.error('Error al agregar al carrito', error);
        }
    };

    const deleteArteCarrito = async (arteId) => {
        try {
            const res = await deleteArteRequest(arteId);
            console.log('obra eliminada del carrito', res)
            setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto._id !== arteId));
            calcularPrecioTotal(carrito.filter((producto) => producto._id !== arteId));
            showEliminar("Eliminado del carrito", "", "")
        } catch (error) {
            console.error('Error al eliminar obra del carrito:', error);
        }
    }
    

    const calcularPrecioTotal = (productos) => {
        const total = productos.reduce((i, producto) => {
            return i + producto.precio * producto.cantidad;
        }, 0);
        setPrecioTotal(total);
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                setCarrito,
                precioTotal,
                agregarAlCarrito,
                deleteArteCarrito
            }}
        >
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </CarritoContext.Provider>
    );
}

export default CarritoProvider;