import jwt from 'jsonwebtoken';

// Secret key for signing JWTs (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'abctesttoken';

// Generate a JWT for a user (includes user id and email)
export function generateJWT(user) {
  const payload = {
    id: user.id,
    email: user.username // assuming username is the email
  };
  // Token expires in 7 days
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify a JWT and return the decoded payload if valid, or throw error if invalid
export function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

// Middleware to protect routes and ensure user is authenticated
export function authenticateJWT(req, res, next) {  
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  // console.log('Auth header:', req.headers['authorization']);
  // console.log('Token:', token);
  if (!token) {
    console.log('No token provided');
    // If no token, return 401 Unauthorized   
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}