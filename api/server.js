import express from 'express';
import morgan from 'morgan';
import userRoutes from "./routes/userRoutes.js"
import wishlistRoutes from "./routes/wishlist.js"
import BooksRoutes from "./routes/books.js"
import shoppingCartRoutes from "./routes/shoppingCart.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import { requestLogger } from './routes/books.js';
import errorHandler from "./errors/errorHandler.js"
import contactsRoutes from "./routes/contacts.js"
const app = express()


import cors from "cors"

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.get('/admin', (req, res) => {
    res.sendFile('/AdminPage');
});

app.use(morgan('dev'));

app.use(cookieParser());
app.use(requestLogger);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/shoppingCart", shoppingCartRoutes)
app.use("/api/books", BooksRoutes);
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/contact", contactsRoutes)
app.use((req, res, next) => {
    res.cookie('role_id', req.user.role_id, {
        sameSite: 'none',
        secure: true
    });
    next();
});
app.use(errorHandler);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`serve connesso ${PORT}`);
})