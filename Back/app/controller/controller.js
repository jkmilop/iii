const pool = require('../config/db');
const queries = require('../config/queries');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');

/**
 * @description Función que registra un cliente en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const addCliente = async (req, res) => {
    const { nombre_cliente, password, cedula, numero_personal, correo_personal } = req.body;
    try {
        
        if (!(nombre_cliente && password && cedula && numero_personal && correo_personal)) {
            res.status(400).send("Se requiere ingresar todos los datos.");
        }
        //check if email exist  
        try {
            const clientVerification = await pool.query(queries.checkClienteEmailExists, [correo_personal]);
            if (clientVerification.rows.length > 0){
                return res.status(401).send("El usuario ya existe.");
            }
        } catch (error) {
            console.log(error.message);
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);
        
        //add client
        try {
            const newUser = await pool.query(queries.addCliente, [nombre_cliente, bcryptPassword, cedula, numero_personal, correo_personal])
            const token = jwtGenerator(newUser.rows[0].cliente_id)
            res.json(token);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error.message);    
        res.status(500).send("Error de servidor");
    }
}

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
        console.log(correo_personal);
        const user = await pool.query(queries.checkClienteEmailExists,[correo_personal]);
        console.log(user);
        if(user.rows.length === 0) {
            return res.status(401).send("Correo o contraseña incorrecta");
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
 * @description Función que registra un negocio en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const crearNegocio = async (req, res) => {  
    try {
        const { emprendedor_id, nombre_negocio, direccion, numero_contacto } = req.body;
        
        if (!(emprendedor_id && nombre_negocio && direccion && numero_contacto)) {
            res.status(400).send("Se requiere ingresar todos los datos.");
        }

        try {
            const emprendedorVerification = await pool.query(queries.searchEmprendedor, [emprendedor_id]);
            if (emprendedorVerification.rows.length === 0){
                return res.status(401).send("El emprendedor no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }
        
        try {
            const newBusiness = await pool.query(queries.addNegocio, [emprendedor_id, nombre_negocio, direccion, numero_contacto])
            res.json(newBusiness.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Función que registra una silla en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const crearSilla = async (req, res) => {  
    try {
        const { negocio_id, valor, posicion, tipo_silla } = req.body;
        
        if (!(negocio_id && valor && posicion && tipo_silla)) {
            res.status(400).send("Se requiere ingresar todos los datos.");
        }

        try {
            const negocioVerification = await pool.query(queries.searchNegocio, [negocio_id]);
            if (negocioVerification.rows.length === 0){
                return res.status(401).send("El negocio no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }

        try {
            const newBusiness = await pool.query(queries.addSilla, [negocio_id, valor, posicion, tipo_silla])
            res.json(newBusiness.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Función que registra un emprendedor en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const crearEmprendedor = async (req, res) => {  
    const { nombre_emprendedor, password, cedula, numero_personal, correo_personal } = req.body;
    try {
        
        if (!(nombre_emprendedor && password && cedula && numero_personal && correo_personal)) {
            res.status(400).send("Se requiere ingresar todos los datos"); 
        }
        
        //check if email exist
        try {
            const emprendedorVerification = await pool.query(queries.checkEmprendedorEmailExists, [correo_personal]);
            if (emprendedorVerification.rows.length > 0){
                return res.status(401).send("El usuario ya existe.");
            }
        } catch (error) {
            console.error(error.message);
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);

        //add emprendedor
        try {
            const newUser = await pool.query(queries.addEmprendedor, [nombre_emprendedor, bcryptPassword, cedula, numero_personal, correo_personal])
            res.json(newUser.rows[0]);
        } catch (error) {
            console.error(error.message);
        }    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error de servidor");
    }
}

/**
 * @description Función que consulta todos los clientes en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getClients = async (req, res) => {
    try {
        const clients = await pool.query(queries.getClientes);
        res.json(clients.rows);
    } catch (error) {
        console.error(err.message);
    }
}

/**
 * @description Función que crea la tabla de cliente en la base de datos.
 * @returns 
 */
const createClientTable = async () => {
    try {
        const clients = await pool.query(queries.createClient);
        res.json(clients.rows);
        console.log("table created")
        createEmprendedorTable;
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
        const clients = await pool.query(queries.createEmprendedor);
        res.json(clients.rows);
        console.log("table created")
        createNegociosTable;
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
        const clients = await pool.query(queries.createNegocio);
        res.json(clients.rows);
        console.log("table created")
        createSillaTable;
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
        const clients = await pool.query(queries.createSilla);
        res.json(clients.rows);
        console.log("table created")
        createProductosTable;
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
        const clients = await pool.query(queries.createProductos);
        res.json(clients.rows);
        console.log("table created")
        createEventosTable;
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
        const clients = await pool.query(queries.createEvento);
        res.json(clients.rows);
        console.log("table created")
        createBoletaTable;
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
        const clients = await pool.query(queries.createBoleta);
        res.json(clients.rows);
        console.log("table created")
        createBoletaProductoTable;
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
        const clients = await pool.query(queries.createBoletaProducto);
        res.json(clients.rows);
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
    getClients,
    addCliente,
    consultDB,
    crearEmprendedor,
    login,
    isVerify,
    crearNegocio,
    crearSilla,
}