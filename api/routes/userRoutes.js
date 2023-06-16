import express from 'express';
import { getUsers } from '../models/user.js';
import { deleteUser, updateUserRole } from '../models/role.js';

import { isAdmin } from "../middleware/isAdmin.js";
import { authenticate } from "../middleware/authenticate.js";

const userRoutes = express.Router();

userRoutes.get('/', authenticate, isAdmin, getUsers);
userRoutes.put('/update-role', authenticate, isAdmin, updateUserRole);
userRoutes.delete('/:id', authenticate, isAdmin, deleteUser);

export default userRoutes;
