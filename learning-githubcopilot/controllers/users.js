import { createUser, findUserByUsername, verifyUserCredentials } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utill/auth.js';
  
// Helper functions for validation  
function isValidEmail(email) {
  // Simple email regex for validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

export async function validateRegistrationInput(req, res, next) {
  const { username, password } = req.body;

  // Check for non-empty, non-blank fields
  if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
    return res.status(400).json({ error: 'Email and password are required and cannot be blank.' });
  }

  // Email format validation
  if (!isValidEmail(username)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }


  // Check if email is already taken
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: 'Email is already registered.' });
  }
  next();
}




export function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  try {
    const user = createUser({ username, password });
    const token = generateJWT(user);  
    res.status(201).json({ message: 'Registration successful', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  try {
    const user = await verifyUserCredentials(username, password);
    if (user) {
      const token = generateJWT(user);
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {
  validateRegistrationInput,
  register,
  login
};
