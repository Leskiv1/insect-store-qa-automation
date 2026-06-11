import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({ path: '../.env' });

const sequelize = new Sequelize(
    process.env.DB_NAME || 'TestDB', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASSWORD || '12345',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
  }
);

export default sequelize;