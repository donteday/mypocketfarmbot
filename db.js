const {Sequelize} = require('sequelize');
const fs = require('fs');

module.exports = new Sequelize(
    'mpfbd',
    'root',
    'root',
    {
        host: '90.156.157.127',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
              // CAUTION: there are better ways to load the certificate, see comments below
              ca: fs.readFileSync('../.postgresql/root.crt').toString()
            }
          }
    }
)