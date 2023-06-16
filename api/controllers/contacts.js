import AppError from "../errors/appError.js";
import { getConnection } from "../db/connection.js";

const con = getConnection();

export const submitContactMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  try {
    const result = await con.query(
      "INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );

    res
      .status(201)
      .json({ message: "Contact message submitted successfully." });
  } catch (error) {
    console.error("Failed to submit contact message:", error);
    next(new AppError("Failed to submit contact message.", 500));
  }
};
