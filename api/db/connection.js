import mysql from "mysql2";
import { promisify } from "util";

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "mohamed",
  password: "Nuovocoso-1",
  database: "booktest",
});
export const getConnection = () => {
  return {
    query: promisify(pool.query).bind(pool),
    release: pool.releaseConnection.bind(pool),
  };
};
