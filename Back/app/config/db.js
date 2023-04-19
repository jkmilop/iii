const Pool = require('pg').Pool;

const pool = new Pool({
    user : process.env.DB_USER || "",
    host : process.env.DB_HOST || "localhost",
    database : process.env.DB_DATABASE || "",
    password : process.env.DB_PASSWORD || "",
    port : process.env.DB_PORT || 5432,
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