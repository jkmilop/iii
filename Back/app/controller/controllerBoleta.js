const pool = require('../config/db');
const queries = require('../config/queries'); 
 
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

module.exports = {
    addBoleta,
    getBoletaByCliente 
}