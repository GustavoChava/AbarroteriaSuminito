import bcrypt from 'bcrypt'
import crypto from 'crypto';
import { pool } from '../db.js'

export const getGenero = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM Genero");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getProductos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT p.idProducto, p.nombreProducto, p.descripcion, p.precioUnd, p.precioMay, p.estado, p.canastaBasica, p.fechaVencimiento, c.idCategoria, c.categoria FROM Producto as p INNER JOIN Categoria as c On c.idCategoria = p.categoria ORDER BY p.nombreProducto ASC");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getCategorias = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM Categoria");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getEmpleado = async (req, res) => {

    try {
        const [result] = await pool.query("SELECT * FROM Empleado WHERE usuarioApp = ?", [req.params.id,]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getEmpleadoLogin = async (req, res) => {
    const { usuarioApp, clave } = req.body;

    try {
        const [result] = await pool.query("SELECT * FROM Empleado WHERE usuarioApp = ?", [usuarioApp]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const empleado = result[0];
        console.log(empleado)
        const hashAlmacenado = empleado.contrasena.trim();

        // Generar el hash SHA-256 de la clave ingresada
        /*const hashIngresado = crypto.createHash('sha256').update(clave).digest('hex');
        const hash = crypto.
        console.log(hashAlmacenado)

        if (hashIngresado !== hashAlmacenado) {
            return res.status(401).json({ message: "Credenciales Incorrectas" });
        }*/
        //const hashAlmacenado = empleado.contrasena;

        const esValida = await bcrypt.compare(clave, hashAlmacenado);
        console.log(esValida);
        if (!esValida) {
            return res.status(401).json({ message: "Credenciales Incorrectas" })
        }

        /*res.json({
            message:"Inicio de seccion Exitoso",
            empleado: {
                idEmmpleado: empleado.idEmmpleado,
                nombres: empleado.nombres,
                apellidos: empleado.apellidos
            }
        })*/

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

// Constructor para insertar empleados
export const createEmpleado = async (req, res) => {
    const {
        nombres,
        apellidos,
        usuarioApp,
        clave, // Contraseña sin encriptar
        identidad,
        fechaNacimiento,
        genero,
        rol,
    } = req.body;

    try {
        // Generar el hash para la contraseña
        const saltRounds = 10;
        const contrasenaEncriptada = await bcrypt.hash(clave, saltRounds);

        // Realizar la inserción en la base de datos
        const [result] = await pool.query(
            `INSERT INTO Empleado (nombres, apellidos, usuarioApp, contrasena, identidad, fechaNacimiento, genero, rol)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombres,
                apellidos,
                usuarioApp,
                contrasenaEncriptada,
                identidad,
                fechaNacimiento,
                genero,
                rol,
            ]
        );

        res.status(201).json({
            message: "Empleado creado exitosamente",
            empleado: {
                idEmpleado: result.insertId,
                nombres,
                apellidos,
                usuarioApp,
                identidad,
                fechaNacimiento,
                genero,
                rol,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getClienteId = async (req, res) => {

    try {
        const [result] = await pool.query("SELECT * FROM Cliente WHERE identidadCliente = ?", [req.params.id,]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


export const createFactura = async (req, res) => {
    const { cliente, factura, productos } = req.body
    console.log(req.body)
    try {
        // cliente
        const [clienteBD] = await pool.query("SELECT * FROM Cliente WHERE identidadCliente = ?", [cliente.identidadCliente,]);

        let idCliente;
        if (clienteBD.length > 0) {
            idCliente = clienteBD[0].idCliente;
            console.log("cliente existe", idCliente)
        } else {
            const [resultCliente] = await pool.query('INSERT INTO Cliente (nombreCliente, apellidoCliente, identidadCliente, genero, correo) VALUES (?, ?, ?, ?, ?)',
                [cliente.nombreCliente, cliente.apellidoCliente, cliente.identidadCliente, cliente.genero, cliente.correo]
            );
            idCliente = resultCliente.insertId;
            console.log(idCliente)
        }

        //FACTURS
        const [resulFactura] = await pool.query('INSERT INTO Factura (idEmpleado, idCliente, fechaEmision, subTotal, isr, total, efectivoPagado, metodoPago) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                factura.idEmpleado,
                idCliente,
                factura.fechaEmision,
                factura.subTotal,
                factura.isr,
                factura.total,
                factura.efectivoPagado,
                factura.metodoPago,
            ]
        );

        const idFactura = resulFactura.insertId;
        console.log(idFactura)

        //REGISTRAR PRODUCTO EN FACTURA
        for (const producto of productos) {
            await pool.query('INSERT INTO Fact_Producto (idFactura, idProducto, cantidad) VALUES (?, ?, ?)',
                [idFactura, producto.idProducto, producto.cantidad]
            );
        }

        res.status(201).json({
            message: "Factura creada exitosamente",
            fact: {
                idFactura,
                idCliente,
            },
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getFacturas = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT 
                                            f.idFactura,
                                            f.fechaEmision,
                                            f.subTotal,
                                            f.isr,
                                            f.total,
                                            f.efectivoPagado,
                                            f.metodoPago,
                                            c.identidadCliente,
                                            CONCAT(c.nombreCliente, ' ', c.apellidoCliente) AS nombreCliente,
                                            e.idEmpleado,
                                            CONCAT(e.nombres, ' ', e.apellidos) AS nombreEmpleado,
                                            SUM(fp.cantidad) AS totalProductos
                                        FROM 
                                            Factura f
                                        JOIN 
                                            Cliente c ON f.idCliente = c.idCliente
                                        JOIN 
                                            Empleado e ON f.idEmpleado = e.idEmpleado
                                        JOIN 
                                            Fact_Producto fp ON f.idFactura = fp.idFactura
                                            
                                        WHERE f.fechaEmision = ?
                                        GROUP BY 
                                            f.idFactura, c.identidadCliente, c.nombreCliente, c.apellidoCliente, e.idEmpleado, e.nombres, e.apellidos`, [req.params.fecha,]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No hay facturas en esa fecha" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}