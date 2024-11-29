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
    },
    userName: {  // Новое поле для хранения имени пользователя Telegram
        type: DataTypes.STRING,
        allowNull: true  // Установите в false, если это поле обязательно
    }
});

module.exports = User;
// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//       await queryInterface.addColumn('Users', 'userName', {
//         type: Sequelize.STRING,
//         allowNull: false,
//       });
//     },
  
//     down: async (queryInterface, Sequelize) => {
//       await queryInterface.removeColumn('Users', 'username');
//     },
//   };