
import { getConnection } from "../db/connection.js";


const con = getConnection();
export async function getUsers(req, res) {
    try {
        const result = await new Promise((resolve, reject) => {
            con.query(
                "SELECT users.id, users.username, users.email, roles.role as role_name, users.created_at, users.updated_at FROM users JOIN roles ON users.role_id = roles.role_id LIMIT 0, 25",
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        console.log("Result:", result);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}