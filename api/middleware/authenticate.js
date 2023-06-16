import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { pool } from "../db/connection.js";

dotenv.config();



export const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            } else {
                return res
                    .status(401)
                    .json({ message: "Failed to authenticate token" });
            }
        }

        const q = "SELECT role_id FROM users WHERE id = ?";
        pool.query(q, [decoded.id], (err, data) => {
            if (err) {
                console.error("Error in authenticate:", err);
                return res.status(500).json(err);
            }
            if (data.length === 0) return res.status(404).json("User not found");

            req.user = {
                id: decoded.id,
                role_id: data[0].role_id,
            };

            next();
        });
    });
};