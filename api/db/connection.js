import mysql from "mysql2";
import { promisify } from "util";

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const getConnection = () => {
  return {
    query: promisify(pool.query).bind(pool),
    release: pool.releaseConnection.bind(pool),
  };
};
