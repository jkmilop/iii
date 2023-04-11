const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "",
    password : "",
    port : 5432,
})

/* pool.connect();

pool.query(`select * from bd_cliente`, (err, res) => {
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    pool.end;
});
 */
module.exports = pool;