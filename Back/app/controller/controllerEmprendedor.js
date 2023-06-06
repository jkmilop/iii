const pool = require('../config/db');
const queries = require('../config/queries'); 
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');


/**
 * @description Función que registra un emprendedor en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const crearEmprendedor = async (req, res) => {  
    if(Array.isArray(req.body) && req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
    const { nombre_emprendedor, password, cedula, numero_personal, correo_personal } = req.body;
    try {
        
        if (!(nombre_emprendedor && password && cedula && numero_personal && correo_personal)) {
            res.status(400).send("Se requiere ingresar todos los datos"); 
        }
        //check if email exist
        const emprendedorVerification = await pool.query(queries.checkEmprendedorEmailExists, [correo_personal]);
        if (emprendedorVerification.rows.length > 0){
            return res.status(401).json({error: "El usuario ya existe."});
        } 

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //add emprendedor
        const newUser = await pool.query(queries.addEmprendedor, [nombre_emprendedor, bcryptPassword, cedula, numero_personal, correo_personal])
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error de servidor");
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
    if(Array.isArray(req.body) && req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
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
 * @description Función que actualiza un emprendedor en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const updateEmprendedor = async (req, res) => {
    if(Array.isArray(req.body) && req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
    const body = req.body;
    const {emprendedor_id} = req.body;
    console.log(body)
    var query = "UPDATE emprendedor SET";
    var campos = Object.keys(body);
    var length = campos.length;
    var count = 1;
    for(const key in body){
        if(key !== 'emprendedor_id' || body[key] !== "" || body[key] !== null){
            console.log(typeof body[key]);
            query += ` ${key} = `+ `'${body[key]}'`;
            if(count < length){
                query += ",";
                count++;
            }
        }
    }
    query += ` WHERE emprendedor_id = ${emprendedor_id}`
    console.log(query);
    try {
        const emprendedor = await pool.query(query); 
        res.json(emprendedor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    crearEmprendedor,
    getEmprendedores,
    updateEmprendedor,
    getEmprendedorId
}