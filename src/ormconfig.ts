import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/user.modele';
import { CreateMillionUser1725525224605 } from './migration/1725525224605-CreateMillionUser';


dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
  });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.USER_POSTGRES_HOST,
  port: Number(process.env.USER_POSTGRES_PORT),
  username: process.env.USER_POSTGRES_USER,
  password: process.env.USER_POSTGRES_PASSWORD,
  database: process.env.USER_POSTGRES_DB,
  entities: [User],
  migrations: [CreateMillionUser1725525224605],  
  synchronize: false, 
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
