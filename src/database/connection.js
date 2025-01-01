import { Sequelize } from 'sequelize';
import { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } from '../config.js';

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
});

export { sequelize };