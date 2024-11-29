const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'mpfbd',
    'root',
    'root',
    {
        host: '90.156.157.127',
        port: 5432,
        dialect: 'postgres'
    }
)