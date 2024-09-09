const express = require('express');
const stockController = require('./stock.controller');
const {validate}  = require('../middleware/Validator');
const decreaseStockValidator = require('./validators/decrease-stock.validator');
const increaseStockValidator = require('./validators/increase-stock.validator');
const createStockValidator = require('./validators/create-stock.validator');


const router = express.Router();

router.post('/', createStockValidator, validate, stockController.createStock);
router.patch('/increase', increaseStockValidator, validate, stockController.increaseStock);
router.patch('/decrease', decreaseStockValidator, validate, stockController.decreaseStock);
router.get('/', stockController.getStock);

module.exports = router;
