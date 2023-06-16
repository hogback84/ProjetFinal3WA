import express from 'express';
import { getCurrentUser } from '../controllers/authController.js';
import { login, logout, register } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentUser);

export default router;
