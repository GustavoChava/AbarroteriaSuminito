import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { getProductosRequest, getCategoriasRequest } from "../api/producto.api";
import { Encabezado } from '../components/encabezado.jsx'
import { getFacturas } from "../api/producto.api.jsx";

function ReportesPage() {
    const navigate = useNavigate();
    const fechaActual = new Date().toISOString().split('T')[0];
    const [facturas, setFacturas] = useState([]);
    console.log(fechaActual)
    useEffect(() => {
        async function loadFacturas() {
            const response = await getFacturas(fechaActual);
            setFacturas(response.data)
            console.log(response.data)
        }
        loadFacturas()
    }, [])

    return (
        <>
            <div>
                <Encabezado navegation={`/`} img='https://cdn-icons-png.flaticon.com/512/2644/2644909.png' />
                <div class="btn-principal">
                    <button class="btn btn-primary">General Reporte</button>
                    <button class="btn btn-warning" onClick={() => navigate(`/suminito`)}>Ver Productos</button>
                </div>
                <div class="container">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>N. Factura</th>
                                <th>Fecha/Hora</th>
                                <th>DNI Cliente</th>
                                <th>Nombre Cliente</th>
                                <th>Cant Porductos</th>
                                <th>Sub total</th>
                                <th>ISR</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(facturas) && facturas.map(factura=> (
                                    <tr>
                                        <td>1</td>
                                        <td>{factura.idFactura}</td>
                                        <td>{factura.fechaEmision}</td>
                                        <td>{factura.nombreEmpleado}</td>
                                        <td>{factura.identidadCliente}</td>
                                        <td>{factura.nombreCliente}</td>
                                        <td>{factura.totalProductos}</td>
                                        <td>{factura.subTotal}</td>
                                        <td>{factura.isr}</td>
                                        <td>{factura.total}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ReportesPage