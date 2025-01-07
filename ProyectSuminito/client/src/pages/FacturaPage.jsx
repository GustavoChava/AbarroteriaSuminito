import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getGeneroRequest, getClienteIdRequest, postDetalleFactura } from "../api/producto.api";
import { Encabezado } from '../components/encabezado'
import { useAuth } from '../Seguridad/AuthContext';

function DetalleFactura() {
    const location = useLocation();
    const navigate = useNavigate();

    const fechaActual = new Date().toISOString().split('T')[0];
    const { empleado } = useAuth(); // Obtén el usuario del contexto
    const { carrito } = location.state || { carrito: [] };
    const [genero, setGenero] = useState([]);
    const [cliente, setCliente] = useState({
        identidadCliente: '',
        nombreCliente: '',
        apellidoCliente: '',
        genero: ''
    });

    //console.log(carrito)
    let subTotal = 0;
    let impuesto = 0;
    let total = 0;
    const isr = 0.15;

    //Calculo
    carrito.forEach(producto => {
        const precioProducto = producto.precio * producto.cantidad;
        subTotal += precioProducto;

        if (producto.canastaBasica === 0) {
            impuesto += (precioProducto * isr);
        }
    });
    total = subTotal + impuesto

    useEffect(() => {
        async function loadGeneros() {
            const response = await getGeneroRequest()
            setGenero(response.data)
            console.log(response.data)
        }
        loadGeneros()
    }, [])

    // Función que se ejecuta al ingresar el ID de identidad del cliente
    const clienteIdentidadChange = async (e) => {
        const identidad = e.target.value;
        setCliente((prevState) => ({ ...prevState, identidadCliente: identidad }));

        if (identidad.length > 0) {
            try {
                const response = await getClienteIdRequest(identidad);
                if (response.data) {
                    // Si el cliente existe, actualiza el estado
                    console.log('Cliente encontrado:', response.data);
                    const { nombreCliente, apellidoCliente, genero } = response.data;
                    setCliente((prevState) => ({
                        ...prevState,
                        nombreCliente,
                        apellidoCliente,
                        genero
                    }));
                } else {
                    // Si no existe el cliente, resetea los campos
                    setCliente((prevState) => ({
                        ...prevState,
                        nombreCliente: '',
                        apellidoCliente: '',
                        genero: ''
                    }));
                }
            } catch (error) {
                console.error("Error al buscar cliente:", error);
                setCliente((prevState) => ({
                    ...prevState,
                    nombreCliente: '',
                    apellidoCliente: '',
                    genero: ''
                }));
            }
        } else {
            // Si el campo está vacío, limpia los datos
            setCliente((prevState) => ({
                ...prevState,
                nombreCliente: '',
                apellidoCliente: '',
                genero: ''
            }));
        }
    };

    //Seccion de pago
    const [showSeccionPago, setShowSeccionPago] = useState(false);
    const [metodoPago, setMetodoPago] = useState('');

    const handleShowPaymentSection = () => {
        setShowSeccionPago(true); // Muestra la sección de métodos de pago
    };

    const handlemetodoPagoChange = (e) => {
        setMetodoPago(e.target.value); // Actualiza el método de pago seleccionado
    };

    const [efectivo, setEfectivo] = useState(''); // Estado para cantidad de efectivo
    const [correo, setCorreo] = useState(''); // Estado para el correo del cliente
    const efectivoChange = (e) => {
        setEfectivo(e.target.value);
    }

    const correoChange = (e) => {
        setCorreo(e.target.value);
    }

    const pagoRealizado = async() => {
        // Aquí puedes manejar el pago, por ejemplo, enviando la información a un servidor o almacenándola
        
        console.log(facturaData)
        if(facturaData.cliente.identidadCliente == ''){
            alert('Favor ingrese la informacion del cliente')
        }if (facturaData.factura.efectivoPagado === "" && facturaData.factura.metodoPago === 1) {
            alert('Ingrese el monto con que realizo el pago el cliente')
        } else {
            try {
                const response = await postDetalleFactura(facturaData);
                if (response.status === 201) {
                    alert('Factura registrada con éxito');
                } else {
                    alert('Error al registrar la factura');
                }
            } catch (error) {
                console.error('Error en createFactura:', {
                    message: error.message,
                    stack: error.stack,
                    dataReceived: req.body,
                });
                console.error('Error al enviar datos de la factura:', error);
            }
        }

    };

    //DETALLE FACTURA
    const facturaData = {
        cliente: {
            identidadCliente: cliente.identidadCliente,
            nombreCliente: cliente.nombreCliente,
            apellidoCliente: cliente.apellidoCliente,
            genero: cliente.genero,
            correo: correo,
        },
        factura: {
            idEmpleado: empleado.idEmpleado,
            fechaEmision: fechaActual,
            subTotal: subTotal,
            isr: impuesto,
            total: total,
            efectivoPagado: metodoPago === 'efectivo' ? efectivo : total,
            metodoPago: metodoPago === 'efectivo' ? 1 : 2, // 1 para efectivo, 2 para tarjeta
        },
        productos: carrito.map((producto) => ({
            idProducto: producto.idProducto,
            cantidad: producto.cantidad,
        })),
    };

    return (
        <>
            <div>
                <Encabezado navegation={`/`} img='https://cdn-icons-png.flaticon.com/512/2644/2644909.png' />

                <div class="detalleCliente m-1">
                    <div>
                        <label>No. Factura:</label>
                        <input type="text" placeholder="Número de factura" />

                        <label>Fecha:</label>
                        <input type="date" value={fechaActual} readOnly />

                        <label>Empleado:</label>
                        <input type="text" value={empleado.idEmpleado}
                            placeholder={`${empleado.nombres} ${empleado.apellidos}`} readOnly />
                    </div>
                    <div>
                        <label>Identidad Cliente:</label>
                        <input
                            type="text"
                            value={cliente.identidadCliente}
                            onChange={clienteIdentidadChange}
                            placeholder="ID del cliente"
                        />

                        <label>Nombres Cliente:</label>
                        <input
                            type="text"
                            value={cliente.nombreCliente || ""}
                            placeholder="Nombre del cliente"
                            onChange={(e) => setCliente((prevState) => ({
                                ...prevState,
                                nombreCliente: e.target.value,
                            }))}
                        />

                        <label>Apellidos Cliente:</label>
                        <input
                            type="text"
                            value={cliente.apellidoCliente || ""}
                            placeholder="Apellido del cliente"
                            onChange={(e) => setCliente((prevState) => ({
                                ...prevState,
                                apellidoCliente: e.target.value,
                            }))}
                        />

                        <label>Género:</label>
                        <select
                            className="form-select w-auto me-2"
                            value={cliente.genero || ""}
                            onChange={(e) => setCliente((prevState) => ({
                                ...prevState,
                                genero: e.target.value,
                            }))}
                        >
                            <option value="">Selecciona un género</option>
                            {genero.map((gen) => (
                                <option key={gen.idGenero} value={gen.idGenero}>
                                    {gen.nombGenero}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button class="btn btn-success" type="submit" onClick={handleShowPaymentSection}>Metodo de Pago</button>
                        <button type="button" class="btn btn-info">Agregar Producto</button>
                        <button type="button" class="btn btn-danger" onClick={() => navigate(`/suminito`)}>Cancelar</button>
                    </div>
                </div>

                <div className="detalle">
                    <label>Detalle:</label>
                    <table class="table table-bordered table-responsive">
                        <thead class="table-primary">
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Precio Und</th>
                                <th>Unid.</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            {carrito.map(producto => (
                                <tr>
                                    <td>{producto.idProducto}</td>
                                    <td>{producto.nombreProducto}</td>
                                    <td>{producto.precio} Lps</td>
                                    <td>{producto.cantidad}</td>
                                    <td>{producto.precio * producto.cantidad} Lps</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>

                <div class="detalle">
                    <div className="totales">
                        <div>
                            <p>Sub Total</p>
                            <p>{subTotal} lps</p>
                        </div>
                        <div>
                            <p>ISR</p>
                            <p>{impuesto} Lps</p>
                        </div>
                        <div class="fs-6 border-top">
                            <p>Total:</p>
                            <p>{total} Lps</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mostrar sección de pago si showSeccionPago es true */}
            {showSeccionPago && (
                <div className="payment-section" class="scc-pago border border-2">
                    <p>Selecciona el Método de Pago</p>
                    <div className="payment-methods">
                        <div>
                            <input
                                type="radio"
                                id="tarjeta"
                                name="paymentMethod"
                                value="tarjeta"
                                checked={metodoPago === 'tarjeta'}
                                onChange={handlemetodoPagoChange}
                            />
                            <label htmlFor="tarjeta">Tarjeta de Crédito/Débito</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="efectivo"
                                name="paymentMethod"
                                value="efectivo"
                                checked={metodoPago === 'efectivo'}
                                onChange={handlemetodoPagoChange}
                            />
                            <label htmlFor="efectivo">Efectivo</label>
                        </div>
                    </div>

                    {/* Si es tarjeta, solo muestra el correo del cliente */}
                    {metodoPago === 'tarjeta' && (
                        <div class="metodopago">
                            <label>Correo del Cliente:</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={correoChange}
                                placeholder="Correo del cliente"
                                required
                            />
                            <button className="btn btn-success" onClick={pagoRealizado}>Pagar con Tarjeta</button>
                        </div>
                    )}
                    {/* Si es efectivo, muestra el monto de efectivo ingresado y el correo */}
                    {metodoPago === 'efectivo' && (
                        <div class="metodopago">
                            <label>¿Cuánto efectivo ingresó?</label>
                            <input
                                type="number"
                                value={efectivo}
                                onChange={efectivoChange}
                                placeholder="Monto en efectivo"
                                required
                            />
                            <label>Correo del Cliente:</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={correoChange}
                                placeholder="Correo del cliente"
                                required
                            />
                            <button className="btn btn-success" onClick={pagoRealizado}>Pagar con Efectivo</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default DetalleFactura