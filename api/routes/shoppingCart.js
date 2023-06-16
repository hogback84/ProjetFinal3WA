import express from "express";
import { authenticate } from '../middleware/authenticate.js';
import { addToCart, getCart, deleteCartItem, updateCartQuantity } from "../models/books/shoppingCart.js"

const router = express.Router();

router.post("/", authenticate, addToCart);
router.get("/", authenticate, getCart);
router.delete("/:bookId", authenticate, deleteCartItem);
router.put("/:bookId", authenticate, updateCartQuantity);

export default router;
