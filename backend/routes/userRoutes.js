import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser, logIn } from '../controllers/userControllers.js';
import { verifyToken } from '../auth/authUser.js';

// Route to get all users (GET)
router.get('/users', verifyToken, getAllUsers);

// Route to create a new user (POST)
router.post('/users', createUser);

// Route to log in a user (POST)
router.post('/users/login', logIn);

export default router;
