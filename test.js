const { Client } = require('pg');

const client = new Client({
    host: '90.156.157.127',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'mpfdb'
});

client.connect()
    .then(() => console.log('Connected successfully'))
    .catch(err => console.error('Connection error', err.stack))
    .finally(() => client.end());