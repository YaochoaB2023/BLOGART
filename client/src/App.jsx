import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ObrasPage from "./pages/ObrasPage"
import ObrasPublicPage from "./pages/ObrasPublicPage"
import ObrasFormPage from "./pages/ObrasFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"

import { AuthProvider } from "./context/AuthContext"
import { TaskProvider } from "./context/TaskContext";
import NavBar from "./components/NavBar"
import ContactPage from "./pages/ContactPage"

function App ()
{
  return (
    <>
      <AuthProvider>
        <TaskProvider >
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/register" element={ <RegisterPage /> } />
              <Route path="/ObrasPulic" element={ <ObrasPublicPage /> } />
              <Route path="/Contact" element={ <ContactPage /> } />

              <Route element={ <ProtectedRoute /> }>
                <Route path="/obras" element={ <ObrasPage /> } />
                <Route path="/add-obra" element={ <ObrasFormPage /> } />
                <Route path="/obras/:id" element={ <ObrasFormPage /> } />
                <Route path="/profile" element={ <ProfilePage /> } />
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>

    </>
  )
}

export default App