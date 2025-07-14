// config/db.js
import { createPool } from 'mysql2';
import { config } from 'dotenv';
config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const promisePool = pool.promise();

export const query = promisePool.query.bind(promisePool);
