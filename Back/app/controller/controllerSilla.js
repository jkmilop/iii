const pool = require('../config/db');
const queries = require('../config/queries'); 
 
/**
 * @description Función que registra una silla en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const crearSilla = async (req, res) => { 
    if(Array.isArray(req.body) || req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
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
 * @description Función que consulta una silla en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const getSillaIdByNegocio = async (req, res) => {
    if(Array.isArray(req.body) || req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
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

module.exports = {
    crearSilla,
    getSillaIdByNegocio 
}