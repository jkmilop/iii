const pool = require("../db");

const createCliente = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newCliente = await pool.query(
      "INSERT INTO cliente (title, description) VALUES($1, $2) RETURNING *",
      [title, description]
    );

    res.json(newCliente.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllClientes = async (req, res, next) => {
  try {
    const allClientes = await pool.query("SELECT * FROM cliente");
    res.json(allClientes.rows);
  } catch (error) {
    next(error);
  }
};

const getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM cliente WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Cliente no idenfiticado" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await pool.query(
      "UPDATE cliente SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "cliente not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM cliente WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "cliente not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCliente,
  getAllClientes,
  getCliente,
  updateCliente,
  deleteCliente,
};
