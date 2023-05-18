const {Router} = require('express');
const controller = require('../controller/controller');
const controllerCliente = require('../controller/controllerCliente');
const controllerEmprendedor = require('../controller/controllerEmprendedor');
const controllerProducto = require('../controller/controllerProducto');
const controllerNegocio = require('../controller/controllerNegocio');
const controllerSilla = require('../controller/controllerSilla');
const controllerEvento = require('../controller/controllerEvento');
const controllerBoleta = require('../controller/controllerBoleta');
const controllerBoletaProducto = require('../controller/controllerBoletaProducto');
const validInfo = require('../middleware/validInfo');
const authorize = require('../middleware/authorize');

const router = Router();

router.get('/', controller.consultDB); 

//Validaciones
router.post('/login', /* validInfo, */ controller.login); //Login
router.post('/is-verify', /* authorize, */ controller.isVerify); //Verificacion de Token

//Cliente 
router.post('/cliente', controllerCliente.addCliente); //Crear cliente
router.get('/clientes', controllerCliente.getClients); //Consultar todos los clientes
router.get('/clienteid', controllerCliente.getClient); //Consultar un cliente

//Emprendedor
router.post('/emprendedor', controllerEmprendedor.crearEmprendedor); //Crear emprendedor
router.get('/emprendedors', controllerEmprendedor.getEmprendedores); //Consultar todos los emprendedores
router.get('/emprendedorid', controllerEmprendedor.getEmprendedorId); //Consultar un emprendedor por id

//Negocio
router.post('/negocio',  controllerNegocio.crearNegocio);
router.get('/negocioid', controllerNegocio.getNegocioId); //Consultar todos los emprendedores
router.get('/negocios', controllerNegocio.getNegocios); //Consultar un emprendedor por id

//Silla
router.post('/silla', controllerSilla.crearSilla);
router.get('/sillaid', controllerSilla.getSillaIdByNegocio); //Consultar todos los emprendedores

//Producto
router.post('/producto', controllerProducto.crearProducto); //Crear producto
router.get('/productos', controllerProducto.getProductoByNegocio); //Consultar todos los productos de un negocio

//Evento
router.post('/evento', controllerEvento.addEvento); //Crear evento
router.get('/eventoid', controllerEvento.getEventoId); //Consultar evento por id
router.get('/eventos', controllerEvento.getEventos); //Consultar todos los eventos

//Boleta
router.post('/boleta', controllerBoleta.addBoleta); //Crear boleta
router.get('/boletacliente', controllerBoleta.getBoletaByCliente); //Consultar boleta por cliente

//BoletaProducto
router.post('/boletaproducto', controllerBoletaProducto.addBoletaProducto); //Crear boletaProducto
router.get('/boletadetalle', controllerBoletaProducto.searchBoletaProducto); //Consultar los detalles de una boleta


module.exports = router;