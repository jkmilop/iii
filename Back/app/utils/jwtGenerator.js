const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @description Función que genera un token.
 * @param {*} user_id Identificador del usuario.
 * @returns  
 */
function jwtGenerator(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    };

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;