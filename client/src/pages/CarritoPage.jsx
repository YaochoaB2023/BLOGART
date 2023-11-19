import { useCarrito } from "../context/CarritoContext";
import { GrFormClose } from "react-icons/gr"
import '../css/carrito.css'

const Carrito = () => {

    const {carrito, updateCarrito, precioTotal} = useCarrito();
   
    return(
        <div>
            <div className="Carrito">
                <GrFormClose className="salirCarrito"/>
                <div className="carrito-h1">Tu Carrito</div>
                {carrito.map((carritos) => (
                    <div className="items" key={carritos._id}>
                        <div className="body">
                            <div className="carrito-img">
                                <img className="imagen-cart" src={`http://localhost:5000/${carritos.Urlimagen}`} alt={`Imagen de ${carritos.nombre}`}/> 
                            </div>
                            <div className="carrito-inf">
                                <p className="carrito-nombre">{carritos.nombre}</p>
                            </div>
                            <div className="presio-cantidad" >
                                <div className="aumenta-disminuye">
                                    <button className="boton-desminuye" onClick={() => {updateCarrito(carritos._id, 'del')}}>-</button>
                                    <p className="carrito-cantidad">{carrito.cantidad}</p>
                                    <button className="boton-aumenta" onClick={() => {updateCarrito(carritos._id, 'add')}}>+</button>
                                </div>
                                <div>
                                    <div className="precio">
                                        <p className="carrito-precio">{carrito.precio}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                <div className="compra">
                    <p className="presio-compra">Precio Total: <span>{precioTotal.toFixed(2)}</span></p>
                    <button className="confirmar">Cofimar Compra</button>
                </div>
            </div>

        </div>
    )
    
}

export default Carrito;