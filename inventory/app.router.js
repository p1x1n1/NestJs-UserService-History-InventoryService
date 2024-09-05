const Router = require('express')
const router = new Router

const productRouter = require('./product/product.router');
const stockRouter = require('./stock/stock.router');
const shopRouter = require('./store/shop.router');

router.use('/product', productRouter);
router.use('/stock', stockRouter);
router.use('/shop', shopRouter);

module.exports = router