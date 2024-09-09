const pool = require('../db');
const ApiError = require('../error/ApiError');


exports.createShop = async (req, res) => {
    const client = await pool.connect();
    try {
        const { name } = req.body;

        if (!name) {
            throw ApiError.badRequest('Не указано название магазина');
        }

        await client.query('BEGIN');  

        const result = await client.query(
            'INSERT INTO shop (name) VALUES ($1) RETURNING *',
            [name]
        );

        await client.query('COMMIT');  
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');  
        throw error;
    } finally {
        client.release();
    }
};

exports.getAllShops = async (req, res) => {
    return (await pool.query('SELECT * FROM shop')).rows;
}