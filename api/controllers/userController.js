import bcrypt from "bcrypt";
import { pool } from "../db/connection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  pool.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("user already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hashedPassword];

    pool.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user has been created");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  pool.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("user not found");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) return res.status(400).json("Wrong password");

    //  campo 'role_id' alla payload del token JWT
    const payload = {
      id: data[0].id,
      email: data[0].email,
      role_id: data[0].role_id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const { password, ...others } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction, // Imposta 'secure' solo in produzione
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      secure: isProduction, // Imposta 'secure' solo in produzione
      sameSite: isProduction ? "none" : "lax",
    })
    .status(200)
    .json("User has been logged out");
};
