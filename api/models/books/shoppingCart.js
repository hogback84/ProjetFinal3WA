import { getConnection } from '../../db/connection.js';
import AppError from '../../errors/appError.js';


const con = getConnection();
export const addToCart = async (req, res, next) => {
    const { bookId, quantity, price, totalPrice } = req.body;
    if (!bookId || !quantity || !price || !totalPrice) {
        console.log("Missing required fields in request body");
        return res.status(400).json({ message: "Missing required fields in request body" });
    }

    const userId = req.user.id;
    console.log("User ID:", userId);

    try {
        const queryResult = await con.query(
            "SELECT * FROM shopping_cart WHERE user_id = ? AND book_id = ?",
            [userId, bookId]
        );
        console.log("Query result:", queryResult);
        const existingCartItems = queryResult[0] || [];

        if (existingCartItems.length > 0) {
            console.log("Book already in cart");
            return res.status(400).json({ message: "Book already in cart" });
        }

        await con.query("INSERT INTO shopping_cart SET ?", {
            user_id: userId,
            book_id: bookId,
            quantity: quantity,
            price: price,
            image_url: req.body.image_url,
            total_price: totalPrice,
        });
        console.log("Book added to cart");
        res.status(200).json({ message: "Book added to cart" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        next(new AppError("Internal server error", 500));
    }

};

export const getCart = (req, res) => {
    const userId = req.user.id;

    con.query(
        "SELECT shopping_cart.book_id, shopping_cart.quantity, shopping_cart.image_url, shopping_cart.price, shopping_cart.total_price, books.title, books.author FROM shopping_cart JOIN books ON shopping_cart.book_id = books.id WHERE shopping_cart.user_id = ?",
        [userId],
        (error, cart) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json(cart);
        }
    );
};
export const deleteCartItem = (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    con.query(
        "DELETE FROM shopping_cart WHERE user_id = ? AND book_id = ?",
        [userId, bookId],
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "Cart item deleted successfully" });
        }
    );
};
// Update the quantity of a book in the user's cart
export const updateCartQuantity = (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;
    const { quantity, price } = req.body;

    if (!quantity || !price) {
        return res.status(400).json({ message: "Missing required data in request body" });
    }

    const totalPrice = quantity * price;

    con.query(
        "UPDATE shopping_cart SET quantity = ?, total_price = ? WHERE user_id = ? AND book_id = ?",
        [quantity, totalPrice, userId, bookId],
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "Cart item quantity updated successfully" });
        }
    );
};

