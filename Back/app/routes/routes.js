const {Router} = require('express');
const controller = require('../controller/controller');
const validInfo = require('../middleware/validInfo');
const authorize = require('../middleware/authorize');

const router = Router();

router.get('/', controller.consultDB); 

//Validaciones
router.post('/login', /* validInfo, */ controller.login); //Login
router.post('/is-verify', /* authorize, */ controller.isVerify); //Verificacion de Token

//Cliente 
router.post('/cliente', /* validInfo, */ controller.addCliente); //Crear cliente
router.get('/clientes', controller.getClients); //Consultar todos los clientes
router.get('/clienteid', controller.getClient); //Consultar un cliente

//Emprendedor
router.post('/emprendedor', controller.crearEmprendedor); //Crear emprendedor
router.get('/emprendedors', controller.getEmprendedores); //Consultar todos los emprendedores
router.get('/emprendedorid', controller.getEmprendedorId); //Consultar un emprendedor por id

//Negocio
router.post('/negocio',  controller.crearNegocio);
router.get('/negocioid', controller.getNegocioId); //Consultar todos los emprendedores
router.get('/negocios', controller.getNegocios); //Consultar un emprendedor por id

//Silla
router.post('/silla', /* authorize, */ controller.crearSilla);
router.get('/sillaid', controller.getSillaIdByNegocio); //Consultar todos los emprendedores

//Producto
router.post('/producto', /* authorize, */ controller.crearProducto); //Crear producto
router.post('/productos', controller.getProductoByNegocio); //Consultar todos los productos de un negocio

//Evento
router.post('/evento', /* authorize, */ controller.addEvento); //Crear evento
router.get('/eventoid', controller.getEventoId); //Consultar evento por id
router.get('/eventos', controller.getEventos); //Consultar todos los eventos

//Boleta
router.post('/boleta', /* authorize, */ controller.addBoleta); //Crear boleta
router.get('/boletacliente', controller.getBoletaByCliente); //Consultar boleta por cliente

//BoletaProducto
router.post('/boletaproducto', /* authorize, */ controller.addBoletaProducto); //Crear boletaProducto
router.get('/boletadetalle', controller.searchBoletaProducto); //Consultar los detalles de una boleta


module.exports = router;