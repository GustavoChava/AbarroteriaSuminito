import {Router} from 'express'
import {getCategorias, getProductos, getEmpleadoLogin, getEmpleado, createEmpleado, getGenero, getClienteId, createFactura, getFacturas} from '../controllers/tasks.controllers.js'

const router = Router();

//-----ENDPOING A BD-----
router.get('/productos', getProductos);
router.get('/productos/:id');

router.get('/genero', getGenero);

router.get('/categorias', getCategorias);
router.get('/empleado/:id', getEmpleado);
router.post('/empleado', getEmpleadoLogin);
router.post('/creatempleado', createEmpleado);

router.get('/clienteId/:id', getClienteId);

router.post('/nuevafactura', createFactura);
router.get('/facturas/:fecha', getFacturas)

/*router.get('/categorias/:id')

router.get('/empleado/:id')

router.get('/facturas')
router.get('/facturas/:id')

router.get('/clientes/:id')*/



export default router