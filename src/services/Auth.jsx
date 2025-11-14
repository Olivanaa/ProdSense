import { Navigate } from "react-router-dom"

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null
}

export const getLoggedUser = () => {
    const usuario = localStorage.getItem("usuario")
    return usuario ? JSON.parse(usuario) : null
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    window.location.href = "/"
}

export default function PrivateRoute({ children, requiredRole }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    const usuario = getLoggedUser()    

    if (requiredRole && usuario.role !== requiredRole){
        if (usuario.role == "admin"){
            return <Navigate to="/admin" replace />
        }else{
            return <Navigate to="/dashboard" replace />
        }
    }

    return children
}