const {Router} = require('express');
const controller = require('../controller/controller');
const validInfo = require('../middleware/validInfo');
const authorize = require('../middleware/authorize');

const router = Router();

router.get('/', controller.consultDB); 

//Cliente 
router.post('/cliente', /* validInfo, */ controller.addCliente); //Crear cliente
router.get('/clientes', controller.getClients); //Consultar todos los clientes

//Emprendedor
router.post('/emprendedor', controller.crearEmprendedor); //Crear emprendedor

router.post('/login', /* validInfo, */ controller.login);
router.post('/is-verify', /* authorize, */ controller.isVerify);
router.post('/negocio', /* authorize, */ controller.crearNegocio);
router.post('/silla', /* authorize, */ controller.crearSilla);

module.exports = router;