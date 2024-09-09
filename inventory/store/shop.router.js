const express = require('express');
const shopController = require('./shop.controller');
const createShopValidator = require('./validators/create-shop.validators');
const { validate } = require('../middleware/Validator');

const router = express.Router();

router.post('/', createShopValidator, validate, shopController.createShop);
router.get('/', shopController.getAllShops);

module.exports = router;
