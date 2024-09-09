const stockService = require('./stock.service');
const { publishMessage } = require('../rabbitmq');

exports.createStock = async (req, res) => {
    try {
        const result = await stockService.createStock(req, res);
        await publishMessage('actions-to-history', JSON.stringify({
            action: 'create-stock',
            plu: result.plu,
            shop_id: result.shop_id,
            detail: {
                quantity_on_shelf: result.quantity_on_shelf,
                quantity_in_order: result.quantity_in_order,
            },
            date_: new Date().toISOString(),
        }));

        return res.json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.increaseStock = async (req, res) => {
    try {
        const result = await stockService.increaseStock(req, res);
        await publishMessage('actions-to-history', JSON.stringify({
            action: 'increase-stock',
            plu: result.plu,
            shop_id: result.shop_id,
            detail: {
                quantity_on_shelf: result.quantity_on_shelf,
                quantity_in_order: result.quantity_in_order,
            },
            date_: new Date().toISOString(),
        }));

        return res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.decreaseStock = async (req, res) => {
    try {
        const result = await stockService.decreaseStock(req, res);
        await publishMessage('actions-to-history', JSON.stringify({
            action: 'decrease-stock',
            plu: result.plu,
            shop_id: result.shop_id,
            detail: {
                quantity_on_shelf: result.quantity_on_shelf,
                quantity_in_order: result.quantity_in_order,
            },
            date_: new Date().toISOString(),
        }));

        return res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getStock = async (req, res) => {
    try{
        const result = await stockService.getStock(req, res);
        await publishMessage('actions-to-history', JSON.stringify({
            action: 'get-stocks',
            details: JSON.stringify(result),
            date_: new Date().toISOString(),
        }));
        return res.json(result);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
};
