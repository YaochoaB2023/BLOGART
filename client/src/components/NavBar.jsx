import { NavLink } from "react-router-dom"
import { LuLogIn } from 'react-icons/Lu'
import {BsCart4} from 'react-icons/bs'
import '../css/navbar.css'

const NavBar = () => {
  return (
    <>
    <div className="principal">
        <div className="container">
            <h1 className="titulo1"><a href="/">BLog Art</a></h1>
            <nav className="navegador" >
                <ul>
                    <li><NavLink to='/' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Inicio</NavLink></li>
                    <li><NavLink to='/ObrasPublic' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Obras</NavLink></li>
                    <li><NavLink to='/Contact' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Contactanos</NavLink></li>
                    <li><NavLink to='/obras' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Mis Obras</NavLink></li>
                    <li><NavLink to='/add-obra' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>Subir Obra</NavLink></li>
                    <li><NavLink to='/logout' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "" }>logout</NavLink></li>
                    <li className="login"><NavLink to='/Login' className={({isActive})=> isActive ? "flex items-center border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700" : "flex items-center"  }><div className="logo"><LuLogIn/></div>Login</NavLink></li>
                    <li><NavLink to='/carrito' className={({isActive})=> isActive ? "border-b-2 border-blue-700 hover:border-b-2 hover:border-blue-700 transition duration-700 block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "" }><BsCart4  style={{height:"25px"}} /></NavLink></li>
                </ul>
            </nav>
        </div>
    </div>
    </>
  )
}

export default NavBar
