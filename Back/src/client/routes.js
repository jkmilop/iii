const {Router} = require('express');
const controller = require('./controller');


const router = Router();

router.get('/', controller.getClients);
router.post('/', controller.addCliente);

module.exports = router;