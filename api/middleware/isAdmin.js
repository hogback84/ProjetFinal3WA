import AppError from "../errors/appError.js";
import { getConnection } from "../db/connection.js";
const con = getConnection();
export const isAdmin = (req, res, next) => {
  const role_id = req.user.role_id;
  const q = "SELECT role FROM roles WHERE role_id = ?";
  con.query(q, [role_id], (err, data) => {
    if (err) {
      console.error("Error in isAdmin:", err);
      return next(new AppError(err.message, 500));
    }
    if (data.length === 0) return next(new AppError("Role not found", 404));

    const role = data[0].role;
    if (role !== "admin") {
      return next(new AppError("Access denied", 403));
    }
    next();
  });
};
