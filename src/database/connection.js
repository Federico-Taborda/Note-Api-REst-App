import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const { database } = config;

const sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    dialect: 'postgres',
    logging: false,
});

export { sequelize };