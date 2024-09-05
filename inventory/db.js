const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.INVENTORY_PG_USER,
	password: process.env.INVENTORY_PG_PASS,
	host: process.env.INVENTORY_PG_HOST,
	port: process.env.INVENTORY_PG_PORT,
	database: process.env.INVENTORY_PG_DB
});

module.exports = pool