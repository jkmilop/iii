const pool = require('../config/db');
const queries = require('../config/queries'); 

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

module.exports = {
    addEvento,
    getEventos,
    getEventoId 
}