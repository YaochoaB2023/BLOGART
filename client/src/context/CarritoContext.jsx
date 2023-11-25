import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import {
    getCarritoArteRequest,
    createCarritoArteRequest,
    deleteArteRequest
} from '../api/carrito.js';

// Importa las bibliotecas necesarias

const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito must be used within a CarritoProvider');
    }
    return context;
};

// eslint-disable-next-line react/prop-types
export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const { user } = useAuth();




    useEffect(() => {
        const cargarCarrito = async () => {
            try {
                const res = await getCarritoArteRequest();
    
                if (Array.isArray(res.data.arteCarrito)) {
                    const carritoFiltrado = res.data.arteCarrito.filter(
                        (producto) => producto.cantidad > 0 
                    );
    
                    setCarrito(carritoFiltrado);
                    calcularPrecioTotal(carritoFiltrado);
                    console.log('usuario', user);
                    console.log('Datos del carrito:', res.data.arteCarrito);
                } else {
                    console.log('arteCarrito no es un array válido en la respuesta:', res.data);
                }
            } catch (error) {
                console.log('Error al obtener datos del carrito:', error);
            }
        };
    
        cargarCarrito();
    }, [user]);
    

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
    
            // Actualizar el carrito con la respuesta del servidor
            setCarrito((prevCarrito) => [...prevCarrito, res.data]);
    
            // Calcular el precio total con el carrito actualizado
            calcularPrecioTotal((prevCarrito) => [...prevCarrito, res.data]);
        } catch (error) {
            console.error('Error al agregar al carrito', error);
        }
    };

    const deleteArteCarrito = async (arteId) => {
        try {
            const res = await deleteArteRequest(arteId);
            console.log('obra eliminada del carrito', res)
            // Actualizar el carrito local excluyendo la obra eliminada
            setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto._id !== arteId));

            // Recalcular el precio total con el carrito actualizado
        calcularPrecioTotal( carrito.filter((producto) => producto._id !== arteId));
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
            {children}
        </CarritoContext.Provider>
    );
}

export default CarritoProvider;
