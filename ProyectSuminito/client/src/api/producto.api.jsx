import axios from 'axios'

export const getEmpleadoLoginRequest = async (usuario) => 
    await axios.post(`http://localhost:4000/empleado`, usuario)//<--Obtener empleado login

export const getEmpleadoRequest = async (usuario) => 
    await axios.get(`http://localhost:4000/empleado/${usuario}`)//<--Obtener empleado login

export const getProductosRequest = async () =>
    await axios.get("http://localhost:4000/productos");

export const getCategoriasRequest = async() =>
    await axios.get("http;//localhost:4000/categorias");

export const getGeneroRequest = async() =>
    await axios.get("http://localhost:4000/genero");

export const getClienteIdRequest = async(id) =>
    await axios.get(`http://localhost:4000/clienteId/${id}`);

export const postDetalleFactura = async(factura) =>
    await axios.post('http://localhost:4000/nuevafactura', factura);

export const getFacturas = async(fecha) =>
    await axios.get(`http://localhost:4000/facturas/${fecha}`);