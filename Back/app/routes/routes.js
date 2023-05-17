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

module.exports = router;