import express from "express";
import { authenticate } from '../middleware/authenticate.js';
import { addToWishlist, getWishlist, deleteWishlistItem } from "../models/books/wishlist.js"


const router = express.Router();

// Aggiungi un libro alla lista dei desideri dell'utente
router.post("/", authenticate, addToWishlist);

router.delete("/:bookId", authenticate, deleteWishlistItem);




// Recupera la lista dei desideri dell'utente loggato
router.get("/", authenticate, getWishlist);

export default router;

