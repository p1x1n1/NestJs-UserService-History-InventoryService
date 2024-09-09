const express = require('express');
const productController = require('./product.controller');
const createProductValidator = require('./validators/create-product.validator');
const { validate } = require('../middleware/Validator');

const router = express.Router();

router.post('/', createProductValidator, validate, productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;
