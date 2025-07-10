// db.js
import Database from 'better-sqlite3';
const db = new Database('./users.db');

// Check if the users table exists
const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();

if (!tableExists) {
  db.prepare(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `).run();
  console.log('Users table created.');
} else {
  console.log('Users table already exists.');
}

console.log('Database initialized.');

export default db;