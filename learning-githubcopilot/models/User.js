// models/User.js
import db from '../database.js';
import bcrypt from 'bcryptjs';

export async function createUser({ username, password }) {
  try {
    // Hash the password before storing (async)
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = stmt.run(username, hashedPassword);
    
    return { id: info.lastInsertRowid, username };
  } catch (err) {
    // Handle duplicate username or other errors
    throw err;
  }
}
export async function verifyUserCredentials(username, password) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);
  if (!user) {
    return false;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return false;
  }
  // Return user object without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}


export function findUserByUsername(username) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username);
}

