const shopService = require('./shop.service');



//Создание магазина
exports.createShop = async (req, res) => {
    try{
        const result =  await shopService.createShop(req,res);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Получение магазина
exports.getAllShops = async (req, res) => {
    try{
        const result = await shopService.getAllShops(req,res);
        return res.json(result);
    } catch(err){
        return res.status(500).json({message: err.message});
    }
};

