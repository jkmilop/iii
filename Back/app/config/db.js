const Pool = require('pg').Pool;

const pool = new Pool({
    user : process.env.DB_USER || "postgres",
    host : process.env.DB_HOST || "localhost",
    database : process.env.DB_DATABASE || "",
    password : process.env.DB_PASSWORD || "",
    port : process.env.DB_PORT || 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      } 
})

module.exports = pool;

