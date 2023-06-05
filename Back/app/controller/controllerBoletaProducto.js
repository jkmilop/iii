const pool = require('../config/db');
const queries = require('../config/queries'); 
 
/**
 * @description Función que registra un boleto en la base de datos.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @returns 
 */
const addBoletaProducto = async (req, res) => {  
    if(Array.isArray(req.body) && req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
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
const searchBoletaProducto = async (req, res) => {
    if(Array.isArray(req.body) && req.body !== 'object'){
        return res.status(400).send("Se requiere ingresar un JSON"); 
    } 
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

module.exports = {
    addBoletaProducto,
    searchBoletaProducto 
}