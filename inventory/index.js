const { resolve } = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: resolve(__dirname, `.${process.env.NODE_ENV}.env`) });

console.log(`Running in ${process.env.NODE_ENV} mode`);
const express = require('express');
const createTables = require('./db.setup');
const router = require('./app.router');
const errorHandler = require('./middleware/ErrorHandingMiddleWare');

const PORT = process.env.INVENTORY_PORT 
const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, async () => {
    try{
        await createTables();
        console.log(`Inventory service is running on port ${PORT}`);
    } catch (error) {
        console.error('Error connecting to the database', error);
  }
});
