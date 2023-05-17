const consultDB = "select column_name, data_type, is_nullable from information_schema.columns where table_name = 'cliente'";

//Clients
const createClient = "CREATE TABLE Cliente (cliente_id SERIAL,nombre_cliente varchar(255) NOT NULL, password varchar(255) NOT NULL, cedula bigint NOT NULL,numero_personal bigint,correo_personal varchar(255), PRIMARY KEY (cliente_id)) ";
const checkClienteEmailExists = 'SELECT * FROM cliente client WHERE client.correo_personal = $1';
const addCliente = 'INSERT INTO cliente (nombre_cliente, password, cedula, numero_personal, correo_personal) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
const getClientes = 'SELECT * FROM cliente';
const searchCliente = 'SELECT emprendedor FROM emprendedor WHERE emprendedor.emprendedor_id = $1 RETURNING *';

//Emprendedor
const createEmprendedor = "CREATE TABLE Emprendedor (emprendedor_id SERIAL,nombre_emprendedor varchar(255) NOT NULL, password varchar(255) NOT NULL,cedula bigint NOT NULL,numero_personal bigint NOT NULL,correo_personal varchar(255) NOT NULL, PRIMARY KEY (emprendedor_id))";
const checkEmprendedorEmailExists = 'SELECT emprendedor FROM emprendedor WHERE emprendedor.correo_personal = $1';
const addEmprendedor = 'INSERT INTO emprendedor (nombre_emprendedor, password, cedula, numero_personal, correo_personal) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const searchEmprendedor = 'SELECT emprendedor FROM emprendedor WHERE emprendedor.emprendedor_id = $1 RETURNING *';
 
//Negocio
const createNegocio = "CREATE TABLE Negocio (negocio_id SERIAL,emprendedor_id int NOT NULL,nombre_negocio varchar(255) NOT NULL,direccion varchar(255) NOT NULL,numero_contacto bigint NOT NULL,PRIMARY KEY (negocio_id),FOREIGN KEY (emprendedor_id) REFERENCES Emprendedor(emprendedor_id))";
const addNegocio = 'INSERT INTO negocio (emprendedor_id, nombre_negocio, direccion, numero_contacto) VALUES ($1, $2, $3, $4) RETURNING *';
const searchNegocio = 'SELECT negocio FROM negocio WHERE negocio.negocio_id = $1 RETURNING *';

//Silla
const createSilla = "CREATE TABLE Silla (silla_id SERIAL,negocio_id int NOT NULL,valor int NOT NULL,posicion varchar(255) NOT NULL,tipo_silla varchar(255) NOT NULL,PRIMARY KEY (silla_id),FOREIGN KEY (negocio_id) REFERENCES Negocio(negocio_id))";
const addSilla = 'INSERT INTO silla (negocio_id, valor, posicion, tipo_silla) VALUES ($1, $2, $3, $4) RETURNING *';

const createProductos = "CREATE TABLE Producto (producto_id SERIAL,negocio_id int NOT NULL,nombre_producto varchar(255) NOT NULL,valor int NOT NULL,PRIMARY KEY (producto_id),FOREIGN KEY (negocio_id) REFERENCES Negocio(negocio_id))";
const createEvento = "CREATE TABLE Evento (evento_id SERIAL,negocio_id int NOT NULL,fecha_hora DATE NOT NULL,nombre_evento varchar(255) NOT NULL,PRIMARY KEY (evento_id),FOREIGN KEY (negocio_id) REFERENCES Negocio(negocio_id))";
const createBoleta = "CREATE TABLE Boleta (boleta_id SERIAL,evento_id int NOT NULL,silla_id int NOT NULL,cliente_id int NOT NULL,fecha_hora DATE NOT NULL,valor_boleta int NOT NULL,PRIMARY KEY (boleta_id),FOREIGN KEY (evento_id) REFERENCES Evento(evento_id),FOREIGN KEY (silla_id) REFERENCES Silla(silla_id),FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id))";
const createBoletaProducto = "CREATE TABLE Boleta_Producto (boletaProducto_id SERIAL,boleta_id int NOT NULL,producto_id int NOT NULL,cantidad_producto int NOT NULL,PRIMARY KEY (boletaProducto_id),FOREIGN KEY (boleta_id) REFERENCES Boleta(boleta_id),FOREIGN KEY (producto_id) REFERENCES Producto(producto_id))";

module.exports = {
    createClient,
    createEmprendedor,
    createNegocio,
    createSilla,
    createProductos,
    createEvento,
    createBoleta,
    createBoletaProducto,
    getClientes,
    checkClienteEmailExists,
    addCliente,
    consultDB,
    checkEmprendedorEmailExists,
    addEmprendedor,
    addNegocio,
    addSilla,
    searchEmprendedor,
    searchNegocio,
}