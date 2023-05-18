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
 * @description Función que registra un producto en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const crearProducto = async (req, res) => {  
    try {
        const { negocio_id, nombre_producto, valor } = req.body;
        
        if (!(negocio_id && nombre_producto && valor)) {
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
            const newProduct = await pool.query(queries.addProducto, [negocio_id, nombre_producto, valor])
            res.json(newProduct.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Función que consulta un producto en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getProductoByNegocio = async (req, res) => {
    const {negocio_id} = req.body;
    try {
        const negocios = await pool.query(queries.searchProductoByNegocio, [negocio_id]);
        if (negocios.rows.length === 0){
            return res.status(401).send("El negocio no existe.");
        }
        res.json(negocios.rows);
    } catch (error) {
        console.error(error.message);
    }
}

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
 * @description Función que consulta un negocio en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getNegocioId = async (req, res) => {
    const {negocio_id} = req.body;
    try {
        const negocios = await pool.query(queries.searchNegocio, [negocio_id]);
        if (negocios.rows.length === 0){
            return res.status(401).send("El negocio no existe.");
        }
        res.json(negocios.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que consulta un cliente en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getNegocios = async (req, res) => {
    try {
        const negocios = await pool.query(queries.getNegocios);
        res.json(negocios.rows);
    } catch (err) {
        console.error(err.message);
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
 * @description Función que registra un evento en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const addEvento = async (req, res) => {  
    try {
        const { negocio_id, fecha_hora, nombre_evento } = req.body;
        
        if (!(negocio_id && fecha_hora && nombre_evento)) {
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
            const newEvent = await pool.query(queries.addEvento, [negocio_id, fecha_hora, nombre_evento])
            res.json(newEvent.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error);
    }
} 

/**
 * @description Función que consulta un evento en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getEventoId = async (req, res) => {
    const {evento_id} = req.body;
    try {
        const evento = await pool.query(queries.searchEvento, [evento_id]);
        if (evento.rows.length === 0){
            return res.status(401).send("El evento no existe.");
        }
        res.json(evento.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que consulta los eventos en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getEventos = async (req, res) => {
    try {
        const eventos = await pool.query(queries.getEvento);
        res.json(eventos.rows);
    } catch (err) {
        console.error(err.message);
    }
}

/**
 * @description Función que registra un boleto en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const addBoleta = async (req, res) => {  
    try {
        const { evento_id ,silla_id ,cliente_id ,fecha_hora ,valor_boleta } = req.body;
        
        if (!(evento_id && silla_id && cliente_id && fecha_hora && valor_boleta)) {
            res.status(400).send("Se requiere ingresar todos los datos.");
        }

        try {
            const clienteVerification = await pool.query(queries.searchCliente, [cliente_id]);
            if (clienteVerification.rows.length === 0){
                return res.status(401).send("El cliente no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }

        try {
            const eventoVerification = await pool.query(queries.searchEvento, [evento_id]);
            if (eventoVerification.rows.length === 0){
                return res.status(401).send("El evento no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }

        try {
            const sillaVerification = await pool.query(queries.searchSilla, [silla_id]);
            if (sillaVerification.rows.length === 0){
                return res.status(401).send("La silla no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }

        try {
            const newBoleta = await pool.query(queries.addBoleta, [evento_id ,silla_id ,cliente_id ,fecha_hora ,valor_boleta])
            res.json(newBoleta.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Función que registra un boleto en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const addBoletaProducto = async (req, res) => {  
    try {
        const { boleta_id, producto_id ,cantidad_producto } = req.body;
        
        if (!(boleta_id && producto_id && cantidad_producto)) {
            res.status(400).send("Se requiere ingresar todos los datos.");
        }

        try {
            const productoVerification = await pool.query(queries.searchProducto, [producto_id]);
            if (productoVerification.rows.length === 0){
                return res.status(401).send("La boleta no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }

        try {
            const boletaVerification = await pool.query(queries.searchBoleta, [boleta_id]);
            if (boletaVerification.rows.length === 0){
                return res.status(401).send("La boleta no existe.");
            }
        } catch (error) {
            console.log(error.message);
        }

        try {
            const newBoletaProducto = await pool.query(queries.addBoletaProducto, [boleta_id, producto_id ,cantidad_producto])
            res.json(newBoletaProducto.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description Función que consulta una silla en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getBoletaByCliente = async (req, res) => {
    const {cliente_id} = req.body;
    if (!( cliente_id )) {
        res.status(400).send("Se requiere ingresar el id de la boleta y el id del cliente.");
    }
    try {
        const boletas = await pool.query(queries.searchBoletas, [cliente_id]);
        if (boletas.rows.length === 0){
            return res.status(401).send("El cliente no existe.");
        }
        res.json(boletas.rows);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que consulta una silla en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const searchBoletaProducto = async (req, res) => {
    const {boleta_id} = req.body;
    if (!( boleta_id )) {
        res.status(400).send("Se requiere ingresar el id de la boleta y el id del cliente.");
    }
    try {
        const boletas = await pool.query(queries.searchBoletaProducto, [boleta_id]);
        if (boletas.rows.length === 0){
            return res.status(401).send("El la boleta no existe.");
        }
        res.json(boletas.rows);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que consulta una silla en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getSillaIdByNegocio = async (req, res) => {
    const {negocio_id} = req.body;
    try {
        const sillas = await pool.query(queries.searchSillaByNegocio, [negocio_id]);
        if (sillas.rows.length === 0){
            return res.status(401).send("El negocio no existe.");
        }
        res.json(sillas.rows);
    } catch (error) {
        console.error(error.message);
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
    } catch (err) {
        console.error(err.message);
    }
}

/**
 * @description Función que consulta un cliente en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getClient = async (req, res) => {
    const { cliente_id } = req.body;
    try {
        const clientId = await pool.query(queries.searchCliente, [cliente_id]);
        if (clientId.rows.length === 0){
            return res.status(401).send("El cliente no existe.");
        }
        res.json(clientId.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

/**
 * @description Función que consulta todos los emprendedores en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getEmprendedores = async (req, res) => {
    try {
        const emprendedores = await pool.query(queries.getEmprendedors);
        res.json(emprendedores.rows);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * @description Función que consulta un emprendedor en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getEmprendedorId = async (req, res) => {
    const { emprendedor_id } = req.body;
    try {
        const emprendedorId = await pool.query(queries.searchEmprendedor, [emprendedor_id]);
        if (emprendedorId.rows.length === 0){
            return res.status(401).send("El emprendedor no existe.");
        }
        res.json(emprendedorId.rows);
    } catch (err) {
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
        console.log(clients.rows);
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
        console.log("Emprendedor")
    try {
        const clients = await pool.query(queries.createEmprendedor);
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
        const clients = await pool.query(queries.createNegocio);
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
        const clients = await pool.query(queries.createSilla);
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
        const clients = await pool.query(queries.createProductos);
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
        const clients = await pool.query(queries.createEvento);
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
        const clients = await pool.query(queries.createBoleta);
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
        const clients = await pool.query(queries.createBoletaProducto);
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
    getClient,
    getEmprendedores,
    getEmprendedorId,
    getNegocioId,
    getNegocios,
    getSillaIdByNegocio,
    crearProducto,
    getProductoByNegocio,
    addEvento,
    getEventoId,
    getEventos,
    addBoleta,
    addBoletaProducto,
    getBoletaByCliente,
    searchBoletaProducto,

}