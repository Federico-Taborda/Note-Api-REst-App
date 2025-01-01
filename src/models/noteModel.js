import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';
import User from './userModel.js';

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'General'
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Low'
    },
    userOwner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }},    
    {
        timestamps: true, // Enable createdAt y updatedAt
        tableName: 'notes', // Provides the table name in the database
    }
);

export default Note;

