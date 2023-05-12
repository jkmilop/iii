/**
 * @description Función que verifica el formato del formulario de creación de cliente y emprendedor.
 * @param {*} req Data enviada desde el Front para ejecutar el servicio.
 * @param {*} res Información enviada desde el servidor para el Front.
 * @param {*} next Información enviada desde el servidor para el Front.
 * @returns 
 */
module.exports = function(req, res, next) {
    const { nombre_cliente, password, cedula, numero_personal, correo_personal } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
      console.log(!email.length);
      if (![nombre_cliente, password, cedula, numero_personal, correo_personal].every(Boolean)) {
        return res.json("Faltan credenciales");
      } else if (!validEmail(correo_personal)) {
        return res.json("Correo invalido");
      }
    } else if (req.path === "/login") {
      if (![correo_personal, password].every(Boolean)) {
        return res.json("Faltan credenciales");
      } else if (!validEmail(correo_personal)) {
        return res.json("Correo invalido");
      }
    }
  
    next();
  };