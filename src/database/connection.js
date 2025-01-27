import { Sequelize } from 'sequelize'
import config from '../config/config.js'

const { database, enviroment } = config

let sequelize

if (enviroment === 'production') {
  sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    dialect: 'postgres',
    logging: false
  })
} else {
  sequelize = new Sequelize('note-app-test', 'postgres', 'temp123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  })
}

export { sequelize }
