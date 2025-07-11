// db.js
import Database from 'better-sqlite3';
const db = new Database('./users.db');

// Check if the users table exists
const usersTableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();

if (!usersTableExists) {
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

// Check if the events table exists
const eventsTableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='events'").get();

if (!eventsTableExists) {
  db.prepare(`
    CREATE TABLE events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      address TEXT,
      date TEXT,
      image TEXT
    )
  `).run();
  console.log('Events table created.');
} else {
  console.log('Events table already exists.');
}

console.log('Database initialized.');

export default db;