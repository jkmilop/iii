const pool = require('../config/db');
const queries = require('../config/queries'); 

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

module.exports = {
    crearProducto,
    getProductoByNegocio
}