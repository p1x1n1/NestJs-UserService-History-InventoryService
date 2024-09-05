import express from 'express';
import "reflect-metadata";
import { AppDataSource } from './db';
import {config} from "dotenv";
import router from './actionHistory/action.router';
import { resolve } from 'path';
import ActionHistoryContoller from "./actionHistory/action.controller";

config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });
console.log(`Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.HISTORY_PORT
const app = express();
app.use(express.json());
app.use('/api', router);

console.log(process.env.HISTORY_PG_USERNAME);

 // RabbitMQ
ActionHistoryContoller.startConsuming();

app.listen(PORT, () => {
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
    console.log(`Action history service is running on port ${PORT}`);
});



