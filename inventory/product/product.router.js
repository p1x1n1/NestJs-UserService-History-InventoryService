const express = require('express');
const productController = require('./product.controller');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;
