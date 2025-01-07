import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [empleado, setEmpleado] = useState(null); // Información del empleado
  const navigate = useNavigate();

  const login = (empleadoData) => {
    setEmpleado(empleadoData);
    navigate("/suminito"); // Redirige a la página principal
  };

  const logout = () => {
    setEmpleado(null);
    navigate("/"); // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ empleado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}