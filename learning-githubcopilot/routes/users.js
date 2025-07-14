import express from 'express';
const router = express.Router();
import usersController from '../controllers/users.js';

// Signup route with validation middleware
router.post('/signup', usersController.validateRegistrationInput, usersController.register);

// Login route
router.post('/login', usersController.login);

export default router;