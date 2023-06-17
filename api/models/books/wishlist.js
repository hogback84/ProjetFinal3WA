import { getConnection } from "../../db/connection.js";

const con = getConnection();
// Aggiunge un libro alla lista dei desideri dell'utente
export const addToWishlist = async (req, res, next) => {
  const { bookId } = req.body;
  if (!bookId) {
    return res.status(400).json({ message: "Missing bookId in request body" });
  }
  console.log("bookId:", bookId);
  const userId = req.user.id;

  try {
    const queryResult = await con.query(
      "SELECT * FROM wishlist WHERE user_id = ? AND book_id = ?",
      [userId, bookId]
    );
    const existingWishlistItems = queryResult[0] || [];

    if (existingWishlistItems.length > 0) {
      return res.status(400).json({ message: "Book already in wishlist" });
    }

    await con.query("INSERT INTO wishlist SET ?", {
      user_id: userId,
      book_id: bookId,
    });
    res.status(200).json({ message: "Book added to wishlist" });
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    next(new AppError("Internal server error", 500)); // utilizza AppError per gestire l'errore
  }
};

export const deleteWishlistItem = (req, res) => {
  const user_id = req.user.id;
  const book_id = req.params.bookId;

  con.query(
    "DELETE FROM wishlist WHERE user_id = ? AND book_id = ?",
    [user_id, book_id],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Wishlist item deleted successfully" });
    }
  );
};

export const getWishlist = (req, res) => {
  const user_id = req.user.id;

  con.query(
    "SELECT wishlist.book_id, books.title, books.author, books.image_url FROM wishlist JOIN books ON wishlist.book_id = books.id WHERE wishlist.user_id = ?",
    [user_id],
    (error, wishlist) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(wishlist);
    }
  );
};
