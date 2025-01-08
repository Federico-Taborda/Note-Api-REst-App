import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 4,
            max: 10,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isAlpha: true,
            isIn: [['admin', 'user']]
        }
    }
}, {
    timestamps: true,
    tableName: 'users'
});

export default User;