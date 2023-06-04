const pool = require('../config/db');
const queries = require('../config/queries');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');

/**
 * @description Función que valida las credenciales del usuario con las existentes en la base de datos
 * para autorizar el inicio de sesión.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const login = async (req, res) => {
    try {
        const {correo_personal, password} = req.body;
        const user = await pool.query(queries.checkClienteEmailExists,[correo_personal]);
        if(user.rows.length === 0) {
            const user = await pool.query(queries.checkEmprendedorEmailExists,[correo_personal]);
            if(user.rows.length === 0) {
                return res.status(401).send("Correo o contraseña incorrecta");
            }
        }
        
        const validPass = await bcrypt.compare(
            password, 
            user.rows[0].password
            );

        if(!validPass) {
            return res.status(401).send("Correo o contraseña incorrecta")
        }

        const token = jwtGenerator(user.rows[0].cliente_id);
        res.json(token);

    } catch (error) {
        console.error(error.message);    
        res.status(500).send("Error de servidor");
    }
}

/**
 * @description Función que valida el formato de los valores de entrada.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const isVerify = async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);    
        res.status(500).send("Error de servidor");
    }
}; 

/**
 * @description Función que crea la tabla de cliente en la base de datos.
 * @returns 
 */
const createClientTable = async () => {
    try {
        const clients = await pool.query(queries.createClient);
        console.log("table created");
        createEmprendedorTable();
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que crea la tabla de emprendedor en la base de datos.
 * @returns 
 */
    const createEmprendedorTable = async () => {
    try {
        const emprendedor = await pool.query(queries.createEmprendedor);
        console.log("table created")
        createNegociosTable();
    } catch (error) {
        console.error(error.message);
    } 
}

/**
 * @description Función que crea la tabla de negocio en la base de datos.
 * @returns 
 */
const createNegociosTable= async () => {
    try {
        const negocio = await pool.query(queries.createNegocio);
        console.log("table created")
        createSillaTable();
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que crea la tabla de silla en la base de datos.
 * @returns 
 */
const createSillaTable = async() => {
    try {
        const silla = await pool.query(queries.createSilla);
        console.log("table created")
        createProductosTable();
    } catch (error) {
        console.error(error.message);
    } 
}

/**
 * @description Función que crea la tabla de producto en la base de datos.
 * @returns 
 */
const createProductosTable = async () => {
    try {
        const producto = await pool.query(queries.createProductos);
        console.log("table created")
        createEventosTable();
    } catch (error) {
        console.error(error.message);
    }  
}

/**
 * @description Función que crea la tabla de evento en la base de datos.
 * @returns 
 */
const createEventosTable = async () => {
    try {
        const evento = await pool.query(queries.createEvento);
        console.log("table created")
        createBoletaTable();
    } catch (error) {
        console.error(error.message);
    } 
}

/**
 * @description Función que crea la tabla de boleta en la base de datos.
 * @returns 
 */
const createBoletaTable = async () => {
    try {
        const boleta = await pool.query(queries.createBoleta);
        console.log("table created")
        createBoletaProductoTable();
    } catch (error) {
        console.error(error.message);
    }  
}

/**
 * @description Función que crea la tabla de boleta-producto en la base de datos.
 * @returns 
 */
const createBoletaProductoTable = async() => {
    try {
        const boletaProducto = await pool.query(queries.createBoletaProducto);
        console.log("table created")
    } catch (error) {
        console.error(error.message);
    } 
}

/**
 * @description Función que consulta la existencia de tablas en la base de datos
 * y en caso de no existir tablas inicia la creación de las tablas.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const consultDB = (req, res) => {
    pool.query(queries.consultDB, (error, result) => { 
        if (!error) {
            if (result.rowCount === 0) {
                /* Creación de las tablas*/
                createClientTable();
                /*  */
            }
        } else {
            console.error(error.message);
        }
    });
}


module.exports = {   
    consultDB,
    login,
    isVerify,
}