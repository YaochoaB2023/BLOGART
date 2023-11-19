// import { useEffect } from "react";
// import { useCarrito } from "../context/CarritoContext";
// import { GrFormClose } from "react-icons/gr"
// import '../css/carrito.css'

// export const Carrito = () => {
//     useEffect(() => {
//         const menus = document.querySelector(".menu");
//         const navLinks = document.querySelector(".navbarEnlaces");

//         const abrirCarrito = document.querySelector(".abrirCarrito");
//         const carrito = document.querySelector(".carrito")
//         const salirCarrito = document.querySelector(".salirCarrito")

//         if(menus && navLinks){
//             const burgerMenu = () => {
//                 navLinks.classList.toggle('mobile-menu');
//             };
//             const cart = () => {
//                 carrito.classList.toggle("mobil-menu");
//             };

//             menus.addEventListener('click', burgerMenu);

//             abrirCarrito.addEventListener('click', cart);
//             salirCarrito.addEventListener('click', cart);

//             return () => {
//                 menus.removeEventListener('click', burgerMenu);

//                 abrirCarrito.removeEventListener('click', cart);
//                 salirCarrito.removeEventListener('click', cart);
//             }
//         }

//     }, []);

//     const {carritos, updateCarrito, precioTotal} = useCarrito();
   
//     return(
//         <div>
//             <div className="Carrito">
//                 <GrFormClose className="salirCarrito"/>
//                 <div className="carrito-h1">Tu Carrito</div>
//                 {carritos.map((carrito) => (
//                     <div className="items" key={carrito._id}>
//                         <div className="body">
//                             <div className="carrito-img">
//                                 <img className="imagen-cart" src={`http://localhost:5000/${carrito.Urlimagen}`} alt={`Imagen de ${carrito.nombre}`}/> 
//                             </div>
//                             <div className="carrito-inf">
//                                 <p className="carrito-nombre">{carrito.nombre}</p>
//                             </div>
//                             <div className="presio-cantidad" >
//                                 <div className="aumenta-disminuye">
//                                     <button className="boton-desminuye" onClick={() => {updateCarrito(carrito._id, 'del')}}>-</button>
//                                     <p className="carrito-cantidad">{carrito.cantidad}</p>
//                                     <button className="boton-aumenta" onClick={() => {updateCarrito(carrito._id, 'add')}}>+</button>
//                                 </div>
//                                 <div>
//                                     <div className="precio">
//                                         <p className="carrito-precio">{carrito.precio}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 ))}

//                 <div className="compra">
//                     <p className="presio-compra">Precio Total: <span>{precioTotal.toFixed(2)}</span></p>
//                     <button className="confirmar">Cofimar Compra</button>
//                 </div>
//             </div>

//         </div>
//     )
    
// }