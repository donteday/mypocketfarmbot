require('dotenv').config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

// Путь к вашему сертификату
const rootCertPath = path.join(process.env.HOME, '.postgresql', 'root.crt');

module.exports = new Sequelize(
  process.env.DBNAME,
  process.env.USER,
  process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: 15039,
        dialect: 'postgres',

    }
)

// dialectOptions: {
//   ssl: {
//     require: true, // Обязательно требовать SSL
//     rejectUnauthorized: false, // Установите в true, если хотите проверять сертификат
//     ca: fs.readFileSync(rootCertPath), // Читаем сертификат
//   },
// },