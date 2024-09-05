import { DataSource } from 'typeorm';
import { ActionHistory } from './actionHistory/actionHistory.model';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HISTORY_PG_HOST,
    port: Number(process.env.HISTORY_PG_PORT), 
    username: process.env.HISTORY_PG_USERNAME,
    password: String(process.env.HISTORY_PG_PASS),
    database: process.env.HISTORY_PG_DB,
    entities: [ActionHistory],
    synchronize: true,
    logging: true,
});
