// import { useEffect } from "react";
// import { useCarrito } from "../context/CarritoContext";
// import { useAuth } from "../context/AuthContext";

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
//     const {user, profile, isAuthenticathed} = useAuth()

//     const handleCompra = async () => {
//         try {
//             if(user) {
//                 const userId = user.id;
//                 await res(userId)
//             }else{
//                 console.log('Usuario no autenticado')
//             }
//         } catch (error) {
//             console.error('')
//         }
//     }
// }