const pool = require('../db');
const ApiError = require('../error/ApiError');

// Создание товара
exports.createProduct = async (req, res) => {
    const { plu, name } = req.body;
    if(plu && name) 
        return (await pool.query('INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *', [plu, name])).rows[0];
    throw ApiError.badRequest('Не указано название или артикул товара')
};

// Получение товаров по фильтрам
exports.getProducts = async (req, res) => {
        const { name, plu } = req.query;
        let query = 'SELECT * FROM products WHERE 1=1';
        let params = [];

        if (name) {
            params.push(`%${name}%`);
            query += ` AND name LIKE $${params.length}`;
        }
        if (plu) {
            params.push(plu);
            query += ` AND plu = $${params.length}`;
        }

        return (await pool.query(query, params)).rows;
};
