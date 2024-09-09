const { check } = require('express-validator');

const increaseStockValidator = [
    check('stock_id').isInt().withMessage('Поле stock_id должно быть числом'),
    check('quantity_on_shelf').optional().isInt().withMessage('Поле quantity_on_shelf должно быть числом'),
    check('quantity_in_order').optional().isInt().withMessage('Поле quantity_in_order должно быть числом')
];

module.exports = increaseStockValidator;