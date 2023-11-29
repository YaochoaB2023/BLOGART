import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ObrasPage from "./pages/ObrasPage"
import ObrasPublicPage from "./pages/ObrasPublicPage"
import ObrasFormPage from "./pages/ObrasFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import Carrito from "./pages/CarritoPage.jsx"
import ProtectedRoute from "./ProtectedRoute"
import { CarritoProvider } from "./context/CarritoContext"
import { AuthProvider } from "./context/AuthContext"
import { ObraProvider } from "./context/ObrasContext";
import { PaymentProvider } from "./context/PaymentContext.jsx"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer.jsx"
import ContactPage from "./pages/ContactPage"
import LogoutPage from "./pages/logoutPage"

function App ()
{
  return (
    <>
      <AuthProvider>
        <ObraProvider >
          <CarritoProvider>
            <PaymentProvider>
              <BrowserRouter>
              <NavBar/>
                <Routes>
                  <Route path="/" element={ <HomePage /> } />
                  <Route path="/login" element={ <LoginPage /> } />
                  <Route path="/register" element={ <RegisterPage /> } />
                  <Route path="/ObrasPublic" element={ <ObrasPublicPage /> } />
                  <Route path="/Contact" element={ <ContactPage /> } />

                  <Route element={ <ProtectedRoute /> }>
                    <Route path="/obras" element={ <ObrasPage /> } />
                    <Route path="/logout" element={ <LogoutPage /> } />
                    <Route path="/add-obra" element={ <ObrasFormPage /> } />
                    <Route path="/obras/:id" element={ <ObrasFormPage /> } />
                    <Route path="/profile" element={ <ProfilePage /> } />
                    <Route path="/carrito" element={<Carrito/>}/>
                  </Route>
                </Routes>
                <Footer/>
              </BrowserRouter>
            </PaymentProvider>
          </CarritoProvider>
        </ObraProvider>
      </AuthProvider>

    </>
  )
}

export default App