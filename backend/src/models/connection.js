const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  port: process.env.MYSQL_PORT || 3306,
  password: process.env.MYSQL_PASSWORD || 'password',
  database: 'StoreManager',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = connection;