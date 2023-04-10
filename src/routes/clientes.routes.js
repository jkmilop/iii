const { Router } = require("express");
const {
  createCliente,
  getAllClientes,
  getCliente,
  updateCliente,
  deleteCliente,
} = require("../controllers/clientes.controller");

const router = Router();

// create a task
router.post("/clientes", createCliente);

router.get("/clientes", getAllClientes);

router.get("/clientes/:id", getCliente);

router.put("/clientes/:id", updateCliente);

router.delete("/clientes/:id", deleteCliente);

module.exports = router;
