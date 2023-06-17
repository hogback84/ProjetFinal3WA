import mysql from "mysql2";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
export const getConnection = () => {
  return {
    query: promisify(pool.query).bind(pool),
    release: pool.releaseConnection.bind(pool),
  };
};
