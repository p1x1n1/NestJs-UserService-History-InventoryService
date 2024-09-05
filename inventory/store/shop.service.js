const pool = require('../db');
const ApiError = require('../error/ApiError');

exports.createShop = async (req,res) =>{
    const { name } = req.body;
    if (name) 
        return ( await pool.query('INSERT INTO shop (name) VALUES ($1) RETURNING *', [name])).rows;
    throw ApiError.badRequest('Не указано название магазина');
}

exports.getAllShops = async (req, res) => {
    return (await pool.query('SELECT * FROM shop')).rows;
}