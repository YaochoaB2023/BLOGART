import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
    getCarritoArteRequest,
    createCarritoArteRequest,
    putCarritoRequest,
} from '../api/carrito.js';

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
    const carritoRef = useRef(carrito);
    console.log('set',precioTotal)


    useEffect(() => {
        const cargarCarrito = async () => {
            try {
                const res = await getCarritoArteRequest();
                if (Array.isArray(res.data.arteCarrito)) {
                    carritoRef.current = res.data.arteCarrito;
                    setCarrito(res.data.arteCarrito);
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
        const carritoFiltrado = carritoRef.current.filter((producto) => producto.cantidad > 0);
        setCarrito(carritoFiltrado);
        calcularPrecioTotal(carritoFiltrado);
    }, []);

    const agregarAlCarrito = async (producto) => {
        try {
            const res = await createCarritoArteRequest(producto);
            console.log(res);

            const nuevoCarrito = await obtenerYActualizarCarrito();
            setCarrito(nuevoCarrito);
            calcularPrecioTotal(nuevoCarrito);
        } catch (error) {
            console.error('Error al agregar al carrito', error);
        }
    };

    const actualizarCarrito = async (arteId, query) => {
        if (carritoRef.current.some((producto) => producto._id === arteId)) {
            try {
                const body = { Cantidad: query === 'add' ? 1 : -1 };
                const res = await putCarritoRequest(arteId, query, body);

                if (res.data && res.data.msg === 'El producto fue actualizado') {
                    console.log('Error al actualizar el carrito');
                } else {
                    const nuevoCarrito = await obtenerYActualizarCarrito();
                    setCarrito(nuevoCarrito);
                    calcularPrecioTotal(nuevoCarrito);
                }
            } catch (error) {
                console.error('Error al actualizar el carrito', error);
            }
        }
    };

    const obtenerYActualizarCarrito = async () => {
        try {
            const res = await getCarritoArteRequest();
            if (Array.isArray(res.data.arteCarrito)) {
                carritoRef.current = res.data.arteCarrito;
                console.log('Datos del carrito:', res.data.arteCarrito);
                return res.data.arteCarrito;
            } else {
                console.log('arteCarrito no es un array válido en la respuesta:', res.data);
                return [];
            }
        } catch (error) {
            console.log('Error al obtener datos del carrito:', error);
            return [];
        }
    };

    const calcularPrecioTotal = (productos) => {
        const total = productos.reduce((acc, producto) => {
            return acc + producto.precio * producto.cantidad;
        }, 0);
        setPrecioTotal(total);
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                precioTotal,
                agregarAlCarrito,
                actualizarCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export default CarritoProvider;