import './css/App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ProductosPage from './pages/PrincipalPage'
import ReportesPage from './pages/ReportePage';
import DetalleFactura from './pages/FacturaPage';
import { AuthProvider } from "./Seguridad/AuthContext";
import { ProtectedRoute } from "./Seguridad/ProtectedRoute";


function App() {
  return (
    <>
     <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/suminito/" element={
              <ProtectedRoute>
                <ProductosPage />
              </ProtectedRoute>
        }/>
        <Route path="/suminito/reportes" element={
          <ProtectedRoute>
            <ReportesPage/>
          </ProtectedRoute>
        }/>
        <Route path="/suminito/factura" element={
          <ProtectedRoute>
            <DetalleFactura/>
          </ProtectedRoute> 
          }/>
      </Routes>
    </AuthProvider> 
      
    </>
  );
}

export default App