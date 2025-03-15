import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'locahost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
});
