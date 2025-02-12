const pool = require('../db');
const ApiError = require('../error/ApiError');

// Создание остатка 
exports.createStock = async (req, res) => {
    const client = await pool.connect(); 
    try {
        const { plu, shop_id, quantity_on_shelf, quantity_in_order } = req.body;

        if (!plu || !shop_id || !quantity_on_shelf || !quantity_in_order) {
            throw ApiError.badRequest('Не указан артикул товара, id магазина или количество товара');
        }

        await client.query('BEGIN'); 

        const result = await client.query(
            'INSERT INTO stock (plu, shop_id, quantity_on_shelf, quantity_in_order) VALUES ($1, $2, $3, $4) RETURNING *',
            [plu, shop_id, quantity_on_shelf, quantity_in_order]
        );

        await client.query('COMMIT'); 

        res.json(result.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK'); 
        throw err;
    } finally {
        client.release(); 
    }
};

// Увеличение остатка 
exports.increaseStock = async (req, res) => {
    const client = await pool.connect();
    try {
        const { stock_id, quantity_on_shelf, quantity_in_order } = req.body;

        if (!stock_id) {
            throw ApiError.badRequest('Не указан id остатка');
        }

        await client.query('BEGIN'); 

        const currentStock = await client.query('SELECT * FROM stock WHERE id = $1 FOR UPDATE', [stock_id]);

        if (!currentStock.rows.length) {
            throw ApiError.badRequest('Остаток не найден');
        }

        let query = 'UPDATE stock SET';
        let params = [];
        let setClauses = [];

        if (quantity_on_shelf !== undefined) {
            params.push(quantity_on_shelf);
            setClauses.push(` quantity_on_shelf = quantity_on_shelf + $${params.length}`);
        }

        if (quantity_in_order !== undefined) {
            params.push(quantity_in_order);
            setClauses.push(` quantity_in_order = quantity_in_order + $${params.length}`);
        }

        if (setClauses.length > 0) {
            query += setClauses.join(',');
            params.push(stock_id);
            query += ` WHERE id = $${params.length} RETURNING *`;

            const result = await client.query(query, params);
            await client.query('COMMIT'); 
            res.json(result.rows[0]);
        } else {
            throw ApiError.badRequest('Нет данных для обновления');
        }
    } catch (err) {
        await client.query('ROLLBACK'); 
        throw err;
    } finally {
        client.release();
    }
};

// Уменьшение остатка 
exports.decreaseStock = async (req, res) => {
    const client = await pool.connect();
    try {
        const { stock_id, quantity_on_shelf, quantity_in_order } = req.body;

        if (!stock_id) {
            throw ApiError.badRequest('Не указан id остатка');
        }

        await client.query('BEGIN'); 
        const currentStock = await client.query('SELECT * FROM stock WHERE id = $1 FOR UPDATE', [stock_id]);

        if (!currentStock.rows.length) {
            throw ApiError.badRequest('Остаток не найден');
        }

        let query = 'UPDATE stock SET';
        let params = [];
        let setClauses = [];

        if (quantity_on_shelf !== undefined) {
            params.push(quantity_on_shelf);
            setClauses.push(` quantity_on_shelf = quantity_on_shelf - $${params.length}`);
        }

        if (quantity_in_order !== undefined) {
            params.push(quantity_in_order);
            setClauses.push(` quantity_in_order = quantity_in_order - $${params.length}`);
        }

        if (setClauses.length > 0) {
            query += setClauses.join(',');
            params.push(stock_id);
            query += ` WHERE id = $${params.length} RETURNING *`;

            const result = await client.query(query, params);
            await client.query('COMMIT'); 
            res.json(result.rows[0]);
        } else {
            throw ApiError.badRequest('Нет данных для обновления');
        }
    } catch (err) {
        await client.query('ROLLBACK'); 
        throw err;
    } finally {
        client.release();
    }
};

// Получение остатков по фильтрам
exports.getStock = async (req, res) => {
    const { plu, shop_id, quantity_on_shelf_min, quantity_on_shelf_max, quantity_in_order_min, quantity_in_order_max } = req.query;
    let query = 'SELECT * FROM stock JOIN products ON stock.plu = products.plu WHERE 1=1';
    let params = [];
    
    if (plu) {
        params.push(plu);
        query += ` AND products.plu = $${params.length}`;
    }
    if (shop_id) {
        params.push(shop_id);
        query += ` AND stock.shop_id = $${params.length}`;
    }
    if (quantity_on_shelf_min) {
        params.push(quantity_on_shelf_min);
        query += ` AND stock.quantity_on_shelf >= $${params.length}`;
    }
    if (quantity_on_shelf_max) {
        params.push(quantity_on_shelf_max);
        query += ` AND stock.quantity_on_shelf <= $${params.length}`;
    }
    if (quantity_in_order_min) {
        params.push(quantity_in_order_min);
        query += ` AND stock.quantity_in_order >= $${params.length}`;
    }
    if (quantity_in_order_max) {
        params.push(quantity_in_order_max);
        query += ` AND stock.quantity_in_order <= $${params.length}`;
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
};
