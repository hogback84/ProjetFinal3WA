import express from 'express';
import {
    createBook,
    readAllBooks,
    readBookById,
    updateBook,
    deleteBook
} from '../models/books/book.js';
import AppError from '../errors/appError.js';

const router = express.Router();
export const requestLogger = (req, res, next) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    console.log(`Request headers: ${JSON.stringify(req.headers)}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    next();
}
router.post('/', (req, res, next) => {
    createBook(req.body, (err, data) => {
        if (err) {
            return next(new AppError('Si è verificato un errore durante la creazione del libro.', 500));
        }
        res.status(201).send(data);
    });
});

// recupera tutti i libri
router.get('/', (req, res, next) => {
    readAllBooks((err, data) => {
        if (err) {
            return next(new AppError('Si è verificato un errore durante la lettura dei libri.', 500));
        }
        res.send(data);
    });
});

// recupera un singolo libro in base all'ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    readBookById(id, (err, data) => {
        if (err) {
            return next(new AppError(`Si è verificato un errore durante la lettura del libro con ID ${id}.`, 500));
        }
        if (!data) {
            return next(new AppError(`Il libro con ID ${id} non è stato trovato.`, 404));
        }
        res.send(data);
    });
});

// aggiorna un libro esistente in base all'ID
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    updateBook(id, req.body, (err, data) => {
        if (err) {
            return next(new AppError(`Si è verificato un errore durante l'aggiornamento del libro con ID ${id}.`, 500));
        }
        if (!data) {
            return next(new AppError(`Il libro con ID ${id} non è stato trovato.`, 404));
        }
        res.send(data);
    });
});

// elimina un libro esistente in base all'ID
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    deleteBook(id, (err, data) => {
        if (err) {
            return next(new AppError(`Si è verificato un errore durante l'eliminazione del libro con ID ${id}.`, 500));
        }
        if (!data) {
            return next(new AppError(`Il libro con ID ${id} non è stato trovato.`, 404));
        }
        res.send({ message: `Il libro con ID ${id} è stato eliminato.` });
    });
});

export default router;
