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

module.exports = {
    getClients,
    addCliente,
    getClient,
    
}