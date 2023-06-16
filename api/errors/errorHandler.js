// errors/errorHandler.js
import AppError from './appError.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Gestisci gli errori specifici come preferisci qui

    if (!error.isOperational) {
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }

    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'Something went wrong',
    });
};

export default errorHandler;
