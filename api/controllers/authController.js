import { getConnection } from "../db/connection.js";

const con = getConnection();
export const getCurrentUser = (req, res) => {
  const q = `SELECT users.id, users.username, users.email, roles.role 
             FROM users 
             INNER JOIN roles ON users.role_id = roles.role_id 
             WHERE users.id = ?`;
  con.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.error("Error in getCurrentUser:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json("User not found");

    console.log("getCurrentUser payload:", data[0]);
    res.status(200).json(data[0]);
  });
};
