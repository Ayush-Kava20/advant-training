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
