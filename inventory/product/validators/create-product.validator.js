const { check } = require('express-validator');

const createProductValidator = [
    check('plu').isString().notEmpty().withMessage('Поле plu не может быть пустым и должно быть строкой'),
    check('name').isString().notEmpty().withMessage('Поле name не может быть пустым и должно быть строкой')
];

module.exports = createProductValidator 