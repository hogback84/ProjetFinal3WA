//models/books.jd
import { getConnection } from "../../db/connection.js";


const con = getConnection();
//inserisce un nuovo libro nel database.
export const createBook = (book, callback) => {
    const { title, author, genre, description, price, image_url, stock } = book;
    const q = `INSERT INTO books (title, author, genre, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, author, genre, description, parseFloat(price), image_url, parseInt(stock)];

    con.query(q, values, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id: data.insertId, ...book });
        }
    });
};

//recupera tutti i libri dal database.
export const readAllBooks = (callback) => {
    const q = "SELECT * FROM books";

    con.query(q, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};
//recupera un singolo libro dal database in base all'ID.
export const readBookById = (id, callback) => {
    const q = "SELECT * FROM books WHERE id = ?";

    con.query(q, [id], (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data[0]);
        }
    });
};
//aggiorna le informazioni su un libro esistente nel database.
export const updateBook = (id, book, callback) => {
    const { title, author, genre, description, price, image_url, stock } = book;
    const q = `UPDATE books SET title = ?, author = ?, genre = ?, description = ?, price = ?, image_url = ?, stock = ? WHERE id = ?`;
    const values = [title, author, genre, description, parseFloat(price), image_url, parseInt(stock), id];

    con.query(q, values, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id, ...book });
        }
    });
};
// elimina un libro dal database in base all'ID.
export const deleteBook = (id, callback) => {
    const q = `DELETE FROM books WHERE id = ? `;

    con.query(q, [id], (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data.affectedRows > 0);
        }
    });
};