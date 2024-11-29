const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
    },
    chatId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    field: {
        type: DataTypes.STRING
        }
});

module.exports = User;