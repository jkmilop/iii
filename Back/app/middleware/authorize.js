const jwt = require("jsonwebtoken");
require("dotenv").config;

/**
 * @description Función que verifica el token.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @param {*} next
 * @returns 
 */
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token")

        if(!jwtToken) {
            return res.status(401).json("No estas autorizado")
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;

    } catch (error) {
        console.error(error.message);
        return res.status(401).json("No estas autorizado")
    }
};