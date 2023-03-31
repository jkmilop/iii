const getClients = 'select * from bd_cliente';
const checkEmailExists = 'SELECT client FROM bd_cliente client WHERE client.correo_personal = $1';
const addCliente = 'INSERT INTO bd_cliente (nombre_cliente, cedula, numero_personal, correo_personal) VALUES ($1, $2, $3, $4)';

module.exports = {
    getClients,
    checkEmailExists,
    addCliente,
}