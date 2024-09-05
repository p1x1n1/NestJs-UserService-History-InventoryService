const express = require('express');
const stockController = require('./stock.controller');

const router = express.Router();

router.post('/', stockController.createStock);
router.patch('/increase', stockController.increaseStock);
router.patch('/decrease', stockController.decreaseStock);
router.get('/', stockController.getStock);

module.exports = router;
