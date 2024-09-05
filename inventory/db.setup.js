const pool = require('./db');

async function createTables() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS shop (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
            plu INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS stock (
            id SERIAL PRIMARY KEY,
            plu INT REFERENCES products(plu) ON DELETE CASCADE NOT NULL,
            shop_id INT REFERENCES shop(id) ON DELETE CASCADE NOT NULL,
            quantity_on_shelf INT NOT NULL,
            quantity_in_order INT NOT NULL
        );
    `);
}

module.exports = createTables;
