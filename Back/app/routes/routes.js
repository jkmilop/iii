const {Router} = require('express');
const controller = require('../controller/controller');
/* const validInfo = require('../middleware/validInfo'); */
const authorize = require('../middleware/authorize');




const router = Router();

router.get('/', controller.consultDB); 
router.post('/cliente', /* validInfo, */ controller.addCliente);
router.get('/clientes', controller.getClients);
router.post('/emprendedor', controller.crearEmprendedor);
router.post('/login', /* validInfo, */ controller.login);
router.post('/is-verify', /* authorize, */ controller.isVerify);

module.exports = router;