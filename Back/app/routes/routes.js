const {Router} = require('express');
const controller = require('../controller/controller');


const router = Router();

router.get('/clientes', controller.getClients);
router.post('/cliente', controller.addCliente);
router.post('/emprendedor', controller.crearEmprendedor);
router.get('/', controller.consultDB); 

module.exports = router;