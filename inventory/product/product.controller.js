const productService = require('./product.service');
const { publishMessage } = require('../rabbitmq');

exports.createProduct = async (req, res) => {
    try {
        const result = await productService.createProduct(req,res);
        // Отправка сообщения в очередь
        await publishMessage('actions-to-history', JSON.stringify({
            action: 'create-product',
            plu: result.plu,
            date_: new Date().toISOString(),
        }));

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts(req,res);
        
        await publishMessage('actions-to-history', JSON.stringify({
            action: 'get-products',
            details: JSON.stringify(result),
            date_: new Date().toISOString(),
        }));
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
