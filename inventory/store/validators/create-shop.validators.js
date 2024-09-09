const { check } = require('express-validator');

const createShopValidator = [
    check('name')
        .isString().withMessage('Поле name должно быть строкой')
        .notEmpty().withMessage('Поле name не может быть пустым')
];

module.exports = createShopValidator;
