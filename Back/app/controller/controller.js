const pool = require('../config/db');
const queries = require('../config/queries');

const getClients = async (req, res) => {
    try {
        const clients = await pool.query(queries.getClients);
        res.json(clients.rows);
    } catch (error) {
        console.error(err.message);
    }
}

function createClientTable() {
    pool.query(queries.createClient, (error, result) => {
        if (!error) {
            console.log("table created")
            createEmprendedorTable();
        } else {
            console.log(error.message);
        }
    });
}

function createEmprendedorTable() {
    pool.query(queries.createEmprendedor, (error, result) => {
        if (!error) {
            console.log("table created");
            createNegociosTable();
        } else {
            console.log(error.message);
        }
    });
}

function createNegociosTable() {
    pool.query(queries.createNegocio, (error, result) => {
        if (!error) {
            console.log("table created")
            createSillaTable();
        } else {
            console.log(error.message);
        }
    });
}

function createSillaTable() {
    pool.query(queries.createSilla, (error, result) => {
        if (!error) {
            console.log("table created")
            createProductosTable();
        } else {
            console.log(error.message);
        }
    });
}

function createProductosTable() {
    pool.query(queries.createProductos, (error, result) => {
        if (!error) {
            console.log("table created")
            createEventosTable()
        } else {
            console.log(error.message);
        }
    });
}

function createEventosTable() {
    pool.query(queries.createEvento, (error, result) => {
        if (!error) {
            console.log("table created")
            createBoletaTable();
        } else {
            console.log(error.message);
        }
    });
}

function createBoletaTable() {
    pool.query(queries.createBoleta, (error, result) => {
        if (!error) {
            console.log("table created")
            createBoletaProductoTable();
        } else {
            console.log(error.message);
        }
    });
}

function createBoletaProductoTable() {
    pool.query(queries.createBoletaProducto, (error, result) => {
        if (!error) {
            console.log("table created")
        } else {
            console.log(error.message);
        }
    });
}

const consultDB = (req, res) => {
    pool.connect();
    pool.query(queries.consultDB, (error, result) => {
        if (!error) {
            if (result.rowCount === 0) {
                /* Creación de las tablas*/
                createClientTable();
                /*  */
            }
        } else {
            console.log(error.message);
        }
        pool.end;
    });
}

const addCliente = async (req, res) => {
    const { nombre_cliente, password, cedula, numero_personal, correo_personal } = req.body;
    pool.connect();
    //check if email exist
    pool.query(queries.checkClienteEmailExists, [correo_personal], (error, result) => {
        console.log("Result: " + result);
        console.log("Error:" + error);
        if (result.rows.length) {
            res.send('Email already exist')
            return;
        }

        //add client
        pool.query(queries.addCliente, [nombre_cliente, password, cedula, numero_personal, correo_personal], (errors, results) => {
            if (errors) throw errors;
            res.status(201).send("Client created successfully");
            console.log('Client created');
        })
        pool.end;
    })
}

const crearEmprendedor = (req, res) => {
    const { nombre_emprendedor, password, cedula, numero_personal, correo_personal } = req.body;
    pool.connect();
    //check if email exist
    pool.query(queries.checkEmprendedorEmailExists, [correo_personal], (error, result) => {
        console.log("Result: " + result);
        console.log("Error:" + error);
        if (result.rows.length) {
            res.send('Email already exist')
            return
        }

        //add client
        pool.query(queries.addEmprendedor, [nombre_emprendedor, password, cedula, numero_personal, correo_personal], (errors, results) => {
            if (errors) throw errors;
            res.status(201).send("Emprendedor created successfully");
            console.log('Emprendedor created');
        })

        pool.end;
    })
}

module.exports = {
    getClients,
    addCliente,
    consultDB,
    crearEmprendedor,
}