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
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    userData: {  
        type: DataTypes.JSON, 
        allowNull: true
    },
    userImageURL: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    friends: { 
        type: DataTypes.JSON, 
        allowNull: true
    },
    userName: {  
        type: DataTypes.STRING,
        allowNull: true  
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