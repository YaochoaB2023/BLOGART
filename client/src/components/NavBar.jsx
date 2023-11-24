import { NavLink } from "react-router-dom"
import logo from '../assets/Blog-art__1_-removebg-preview.png'
import logo2 from '../assets/logoBlogArt.jpeg'
import { BsCart4 } from "react-icons/bs";
import '../css/navbar.css'
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticathed, logOut } = useAuth();
  // console.log('isAuthenticated:', isAuthenticathed);

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("logout exitoso")
    } catch (error) {
      console.error("error during logout", error)
    }
  }

  return (
    <>
      <nav className=" dark:bg-white shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="w-12 h-12 rounded" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-900">Blog Art</span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" >
              <span className="sr-only">Open user menu</span>
              <img className="w-12 h-12 rounded-full" src={logo2} alt="user photo" />
            </button>
            <div className="z-50 hidden my-4 text-base list-none bg-gray-300 divide-y divide-gray-400 rounded-lg" id="user-dropdown">
              {isAuthenticathed && (
                <>
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 ">Bonnie Green</span>
                    <span className="block text-sm  text-gray-500 truncate ">name@flowbite.com</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a href="/obras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ">Mis Obras</a>
                    </li>
                    <li>
                      <a href="/add-obra" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ">Subir Obra</a>
                    </li>

                    <li>
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ">Perfil</a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <li onClick={handleLogOut}>
                      <a className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ">Cerrar Sesion</a>
                    </li>
                  </div>
                </>
              )}
            </div>



            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-800 dark:hover:bg-gray-200 dark:focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">

              <li><NavLink to='/' className={({ isActive }) => isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : ""}>Inicio</NavLink></li>

              <li><NavLink to='/ObrasPublic' className={({ isActive }) => isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : ""}>Catalogo</NavLink></li>

              <li><NavLink to='/Contact' className={({ isActive }) => isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : ""}>Contacto</NavLink></li>
              {!isAuthenticathed && (
                <>

                  <li><NavLink to='/login' className={({ isActive }) => isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : ""}>Iniciar Sesion</NavLink></li>

                </>
              )}

              {isAuthenticathed && (
                <>
                  <li><NavLink to='/carrito' className={({ isActive }) => isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : ""}><BsCart4 style={{ height: "25px" }} /></NavLink></li>

                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
