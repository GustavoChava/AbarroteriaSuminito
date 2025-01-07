import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductosRequest, getCategoriasRequest } from "../api/producto.api";
import {Encabezado} from '../components/encabezado.jsx'
import { useAuth } from '../Seguridad/AuthContext';

function ProductosPage(){
    const location = useLocation();
    const { empleado } = useAuth(); // Obtén el usuario del contexto
    console.log(empleado)

    const [productos, setProductos] = useState([]);
    //const [categorias, setCategorias] = useState([])
    const [carrito, setCarrito] = useState([]);
    const [totalProducto, setTotalProducto] = useState(0);

    const navigate = useNavigate();//Hook para redirigir a la rutas

    useEffect(() => {
        async function loadProductos (){
            const response = await getProductosRequest()
            setProductos(response.data)
            console.log(response.data)
        }
        loadProductos()
        /*async function loadCategorias (){

            const categ = await getCategoriasRequest()
            setCategorias(categ.data)
            console.log(categ)
        }
        loadCategorias()*/
    }, [])

    const agregarProducto = (producto, cantidad) => {
        if(!cantidad || isNaN(cantidad) || cantidad <=0){
            alert("Porfavor ingrese una cantidad Valida");
            return;
        }
        //Verificar si el producto ya esta agregado
        const productoExistente = carrito.find((prod) => prod.id === producto.idProducto)

        if(productoExistente){
            const productoActual = carrito.map((item) =>
                item.id === producto.idProducto
                    ? {...item, cantidad: item.cantidad + parseInt(cantidad)}//Actualiza la cantidad
                    : item
            );
            setCarrito(productoActual);//actualiza mi estado
        }else{//agrega el producto al estado
            setCarrito([...carrito, {
                idProducto: producto.idProducto,
                nombreProducto: producto.nombreProducto,
                precio: producto.precioUnd,
                canastaBasica: producto.canastaBasica.data[0],
                cantidad : parseInt(cantidad),
            },]);
        }

        /*//---Otra alternativa para el envio de datos
        //Verificar si el producto ya esta agregado
        setCarrito((prevCarrito) =>{
            const productoExistente = prevCarrito.find((prod) => prod.id === producto.idProducto)

            if(productoExistente){
                //actualiza la cantidad del producto ya existente
                return prevCarrito.map((item) =>
                    item.idProducto === producto.idProducto
                        ? { ...item, cantidad: item.cantidad + parseInt(cantidad) }
                        : item
                );
            } else {
                // Si no existe, agrega un nuevo producto
                return [
                    ...prevCarrito,
                    {
                        idProducto: producto.idProducto,
                        nombreProducto: producto.nombreProducto,
                        precio: producto.precioUnd,
                        canastaBasica: producto.canastaBasica.data, // Booleano
                        cantidad: parseInt(cantidad),
                    },
                ];
            }
        })*/

        setTotalProducto(totalProducto + parseInt(cantidad));
        console.log(carrito);
    }
    //----NAVEGACION
    const irFactura = () => {
        /*if(!carrito.length===0){
            navigate("/suminito/factura", { state: { carrito } });
        }else{
            alert("Porfavor seleccione algun producto");
        }*/
        navigate("/suminito/factura", { state: { carrito } });
    };

    const irReporteria = () => {
        navigate("/suminito/reportes");
    };

    return (
        <>
            <div class="">
                <Encabezado navegation={`/`} img='https://cdn-icons-png.flaticon.com/512/2644/2644909.png'/>
                {/*<div class="d-flex mb-3">
                    <select class="form-select w-auto me-2">
                        <option selected>Todos las Categorías</option>
                        
                        <option value="1">Categoría 1</option>
                        <option value="2">Categoría 2</option>
                    </select>
                    <input type="text" class="form-control" placeholder="Buscar Producto"/>
                </div>*/}
                

                <div class="btn-principal">
                    <button class="btn btn-primary" onClick={irReporteria}>Reportería</button>
                    <button class="btn btn-warning" onClick={irFactura}>Carrito: {totalProducto}</button>
                </div>

                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 productos">
                    {
                        productos.map(producto =>(
                            <div class="col producto">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="mb-2"></div>
                                        <h5 class="card-title">{producto.nombreProducto}</h5>
                                        <p class="card-text text-muted">{producto.descripcion}</p>
                                        <span class="badge bg-secondary mb-2">{producto.categoria}</span>
                                        <h6 class="text-primary">{producto.precioUnd} Lps</h6>
                                        <div class="btn-producto">
                                            <input type="number" placeholder="Cantidad" id={`cantidad-${producto.idProducto}`}/>
                                            <button class="btn btn-sm" onClick={()=> agregarProducto(
                                                producto,
                                                document.getElementById(`cantidad-${producto.idProducto}`).value
                                            )}><img src="https://cdn-icons-png.flaticon.com/512/8215/8215539.png" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default ProductosPage