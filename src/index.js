import app from './app.js';
import config from './config/config.js';
import { sequelize } from './database/connection.js';
import setupAssociations from './models/associations.js';

// Load Models
import './models/noteModel.js';
import './models/userModel.js';

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        
        console.log(`Connection to database has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const syncronizeDatabase = async () => {
    try {
        setupAssociations();
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
}

const runServer = async () => {
    try {
        await testDatabaseConnection();
        await syncronizeDatabase();
        
        app.listen(config.server.port, () => console.log(`Server running ${app.get('appName')} in port: ${config.server.port}`));
    } catch (error) {
        console.log('Error to run server:', config.server.port);
        console.log(error);
    }
};

runServer();