import { useAuth } from "../context/AuthContext"

const LogoutPage = () => {
    const {logOut} = useAuth();

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
        <button onClick={handleLogOut} className="boton2">logOut</button>   
    </>
  )
}

export default LogoutPage
