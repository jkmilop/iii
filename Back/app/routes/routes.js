const {Router} = require('express');
const controller = require('../controller/controller');


const router = Router();

/* router.get('/', controller.getClients);
router.post('/', controller.addCliente); */
router.get('/', controller.consultDB);

module.exports = router;