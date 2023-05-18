const consultDB = "select column_name, data_type, is_nullable from information_schema.columns where table_name = 'cliente'";

//Clients
const createClient = "CREATE TABLE Cliente (cliente_id SERIAL,nombre_cliente varchar(255) NOT NULL, password varchar(255) NOT NULL, cedula bigint NOT NULL,numero_personal bigint,correo_personal varchar(255), PRIMARY KEY (cliente_id)) ";
const checkClienteEmailExists = 'SELECT * FROM cliente client WHERE client.correo_personal = $1';
const addCliente = 'INSERT INTO cliente (nombre_cliente, password, cedula, numero_personal, correo_personal) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
const getClientes = 'SELECT * FROM cliente';
const searchCliente = 'SELECT cliente_id, nombre_cliente, cedula, numero_personal, correo_personal FROM cliente WHERE cliente.cliente_id = $1 ';

//Emprendedor
const createEmprendedor = "CREATE TABLE Emprendedor (emprendedor_id SERIAL,nombre_emprendedor varchar(255) NOT NULL, password varchar(255) NOT NULL,cedula bigint NOT NULL,numero_personal bigint NOT NULL,correo_personal varchar(255) NOT NULL, PRIMARY KEY (emprendedor_id))";
const checkEmprendedorEmailExists = 'SELECT emprendedor FROM emprendedor WHERE emprendedor.correo_personal = $1';
const addEmprendedor = 'INSERT INTO emprendedor (nombre_emprendedor, password, cedula, numero_personal, correo_personal) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const searchEmprendedor = 'SELECT emprendedor_id, nombre_emprendedor, cedula, numero_personal, correo_personal FROM emprendedor WHERE emprendedor.emprendedor_id = $1';
const getEmprendedors = 'SELECT * FROM emprendedor';

//Negocio
const createNegocio = "CREATE TABLE Negocio (negocio_id SERIAL,emprendedor_id int NOT NULL,nombre_negocio varchar(255) NOT NULL,direccion varchar(255) NOT NULL,numero_contacto bigint NOT NULL,PRIMARY KEY (negocio_id),FOREIGN KEY (emprendedor_id) REFERENCES Emprendedor(emprendedor_id))";
const addNegocio = 'INSERT INTO negocio (emprendedor_id, nombre_negocio, direccion, numero_contacto) VALUES ($1, $2, $3, $4) RETURNING *';
const searchNegocio = 'SELECT negocio_id, nombre_negocio, direccion, numero_contacto FROM negocio WHERE negocio.negocio_id = $1 ';
const getNegocios = 'SELECT * FROM negocio';

//Silla
const createSilla = "CREATE TABLE Silla (silla_id SERIAL,negocio_id int NOT NULL,valor int NOT NULL,posicion varchar(255) NOT NULL,tipo_silla varchar(255) NOT NULL,PRIMARY KEY (silla_id),FOREIGN KEY (negocio_id) REFERENCES Negocio(negocio_id))";
const addSilla = 'INSERT INTO silla (negocio_id, valor, posicion, tipo_silla) VALUES ($1, $2, $3, $4) RETURNING *';
const searchSillaByNegocio = 'SELECT silla.silla_id, silla.valor, silla.negocio_id, silla.posicion, silla.tipo_silla FROM silla, negocio WHERE negocio.negocio_id = $1 AND silla.negocio_id = $1';
const searchSilla = 'SELECT * FROM silla WHERE silla.silla_id = $1 ';

//Productos
const createProductos = "CREATE TABLE Producto (producto_id SERIAL,negocio_id int NOT NULL,nombre_producto varchar(255) NOT NULL,valor int NOT NULL,PRIMARY KEY (producto_id),FOREIGN KEY (negocio_id) REFERENCES Negocio(negocio_id))";
const addProducto = 'INSERT INTO producto (negocio_id, nombre_producto, valor) VALUES ($1, $2, $3) RETURNING *';
const searchProductoByNegocio = 'SELECT producto.producto_id, producto.negocio_id, producto.nombre_producto, producto.valor FROM producto, negocio WHERE negocio.negocio_id = $1 AND producto.negocio_id = $1';
const searchProducto = 'SELECT * FROM producto WHERE producto.producto_id = $1 ';

//Eventos
const createEvento = "CREATE TABLE Evento (evento_id SERIAL,negocio_id int NOT NULL,fecha_hora TIMESTAMP NOT NULL,nombre_evento varchar(255) NOT NULL,PRIMARY KEY (evento_id),FOREIGN KEY (negocio_id) REFERENCES Negocio(negocio_id))";
const addEvento = 'INSERT INTO evento (negocio_id, fecha_hora, nombre_evento) VALUES ($1, $2, $3) RETURNING *';
const searchEvento = 'SELECT evento_id,  fecha_hora, nombre_evento FROM evento WHERE evento.evento_id = $1 ';
const getEvento = 'SELECT * FROM evento';

//Boleta
const createBoleta = "CREATE TABLE Boleta (boleta_id SERIAL,evento_id int NOT NULL,silla_id int NOT NULL,cliente_id int NOT NULL,fecha_hora TIMESTAMP NOT NULL,valor_boleta int NOT NULL,PRIMARY KEY (boleta_id),FOREIGN KEY (evento_id) REFERENCES Evento(evento_id),FOREIGN KEY (silla_id) REFERENCES Silla(silla_id),FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id))";
const addBoleta = 'INSERT INTO boleta (evento_id ,silla_id ,cliente_id ,fecha_hora ,valor_boleta ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const searchBoleta = 'SELECT * FROM boleta WHERE boleta.boleta_id = $1 ';
const searchBoletas = 'SELECT boleta.boleta_id, cliente.nombre_cliente, boleta.fecha_hora, boleta.valor_boleta FROM boleta, cliente, evento WHERE boleta.cliente_id = $1 AND cliente.cliente_id = $1';

//Boleta-Producto
const createBoletaProducto = "CREATE TABLE Boleta_Producto (boletaProducto_id SERIAL,boleta_id int NOT NULL,producto_id int NOT NULL,cantidad_producto int NOT NULL,PRIMARY KEY (boletaProducto_id),FOREIGN KEY (boleta_id) REFERENCES Boleta(boleta_id),FOREIGN KEY (producto_id) REFERENCES Producto(producto_id))";
const addBoletaProducto = 'INSERT INTO boleta_producto (boleta_id ,producto_id ,cantidad_producto ) VALUES ($1, $2, $3 ) RETURNING *';
const searchBoletaProducto = 'SELECT boleta.boleta_id, boleta.fecha_hora, boleta.valor_boleta, producto.nombre_producto, producto.valor, boleta_producto.cantidad_producto FROM boleta, producto, boleta_producto WHERE boleta_producto.boleta_id = $1 AND boleta_producto.producto_id = producto.producto_id';

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
    getEmprendedors,
    searchCliente,
    getNegocios,
    searchSillaByNegocio,
    addProducto,
    searchProductoByNegocio,
    addEvento,
    searchEvento,
    getEvento,
    addBoleta,
    searchSilla,
    searchBoleta,
    addBoletaProducto,
    searchBoletas,
    searchBoletaProducto,
}






/* SELECT * FROM boleta, producto, boleta_producto WHERE boleta_producto.boleta_id = 1 AND boleta_producto.producto_id = producto.producto_id LIMIT 100 OFFSET 0 */