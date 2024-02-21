import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser } from '../controllers/userControllers.js';

// Route to get all users (GET)
router.get('/users', getAllUsers);

// Route to create a new user (POST)
router.post('/users', createUser);

export default router;
