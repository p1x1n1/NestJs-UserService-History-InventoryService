const express = require('express');
const shopController = require('./shop.controller');

const router = express.Router();

router.post('/', shopController.createShop);
router.get('/', shopController.getAllShops);

module.exports = router;
