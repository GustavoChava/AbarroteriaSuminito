import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children }) {
  const { empleado } = useAuth();

  if (!empleado) {
    return <Navigate to="/" />; // Redirige al login si no hay sesión activa
  }

  return children; // Renderiza la página protegida
}