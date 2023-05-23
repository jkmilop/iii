const pool = require('../config/db');
const queries = require('../config/queries'); 

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
        console.log("nombre_emprendedor")

        res.json(negocios.rows);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    crearNegocio,
    getNegocioId,
    getNegocios
}