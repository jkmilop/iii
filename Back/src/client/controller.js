const pool = require('../../db');
const queries = require('./queries');

const getClients = (req, res) => {
    pool.connect();
    pool.query(queries.getClients, (error, result) => {
        if(!error){
            res.status(200).json(result.rows);
        }else{
            console.log(error.message);
        }
        pool.end;
    });
}

const addCliente = (req, res) => {
    const {nombre_cliente, cedula, numero_personal, correo_personal} = req.body;
    pool.connect();
    //check if email exist
    pool.query(queries.checkEmailExists, [correo_personal], (error, result) => {
        if(result.rows.length){
            res.send('Email already exist')
        }

        //add client
        pool.query(queries.addCliente, [nombre_cliente, cedula, numero_personal, correo_personal], (errors, results) => {
            if(errors) throw errors;
            res.status(201).send("Client created successfully");
            console.log('Client created');
        })

        pool.end;
    })
}

module.exports = {
    getClients,
    addCliente,
}