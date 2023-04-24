const pool = require('../config/db');
const queries = require('../config/queries');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');

const addCliente = async (req, res) => {
    const { nombre_cliente, password, cedula, numero_personal, correo_personal } = req.body;
    try {
        
        if (!(nombre_cliente && password && cedula && numero_personal && correo_personal)) {
            res.status(400).send("Se requiere ingresar todos los datos");
        }
        //check if email exist
        try {
            const clientVerification = await pool.query(queries.checkClienteEmailExists);
            res.json(clients.rows);
            if (clientVerification.rows.length > 0){
                return res.status(401).send("El usuario ya existe.");
            }
        } catch (error) {
            console.log(error.message);
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);
        
        //add client
        try {
            const newUser = await pool.query(queries.addCliente, [nombre_cliente, bcryptPassword, cedula, numero_personal, correo_personal])
            const token = jwtGenerator(newUser.rows[0].cliente_id)
            res.json(token);
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error.message);    
        res.status(500).send("Error de servidor");
    }
}

const login = async (req, res) => {
    try {
        const {correo_personal, password} = req.body;
        console.log(correo_personal);
        const user = await pool.query(queries.checkClienteEmailExists,[correo_personal]);
        console.log(user);
        if(user.rows.length === 0) {
            return res.status(401).send("Correo o contraseña incorrecta");
        }

        const validPass = await bcrypt.compare(
            password, 
            user.rows[0].password
            );

        if(!validPass) {
            return res.status(401).send("Correo o contraseña incorrecta")
        }

        const token = jwtGenerator(user.rows[0].cliente_id);
        res.json(token);

    } catch (error) {
        console.error(error.message);    
        res.status(500).send("Error de servidor");
    }
}

const isVerify = async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);    
        res.status(500).send("Error de servidor");
    }
};

const crearEmprendedor = async (req, res) => {  
    const { nombre_emprendedor, password, cedula, numero_personal, correo_personal } = req.body;
    try {
        
        if (!(nombre_cliente && password && cedula && numero_personal && correo_personal)) {
            res.status(400).send("Se requiere ingresar todos los datos");
        }
        //check if email exist
        
        try {
            const clientVerification = await pool.query(queries.checkEmprendedorEmailExists);
            res.json(clients.rows);
            if (clientVerification.rows.length > 0){
                return res.status(401).send("El usuario ya existe.");
            }
        } catch (error) {
            console.error(error.message);
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);

        //add emprendedor
        try {
            const newUser = await pool.query(queries.addEmprendedor, [nombre_emprendedor, bcryptPassword, cedula, numero_personal, correo_personal])
            res.json(newUser.rows[0]);
        } catch (error) {
            console.error(error.message);
        }    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error de servidor");
    }
}


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
    pool.query(queries.consultDB, (error, result) => {
        if (!error) {
            if (result.rowCount === 0) {
                /* Creación de las tablas*/
                createClientTable();
                /*  */
            }
        } else {
            console.error(error.message);
        }
    });
}


module.exports = {
    getClients,
    addCliente,
    consultDB,
    crearEmprendedor,
    login,
    isVerify,
}