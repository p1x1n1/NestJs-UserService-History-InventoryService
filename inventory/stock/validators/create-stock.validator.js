const { check } = require('express-validator');

const createStockValidator = [
    check('plu').isInt().notEmpty().withMessage('Поле plu не может быть пустым и должно быть числом'),
    check('shop_id').isInt().notEmpty().withMessage('Поле shop_id не может быть пустым и должно быть числом'),
    check('quantity_on_shelf').isInt().withMessage('Поле quantity_on_shelf должно быть числом'),
    check('quantity_in_order').isInt().withMessage('Поле quantity_in_order должно быть числом')
];

module.exports = createStockValidator 