import db from '../database.js';

// Ensure the events table exists
const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='events'").get();
if (!tableExists) {
  db.prepare(`
    CREATE TABLE events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      address TEXT,
      date TEXT
    )
  `).run();
}

// Create a new event
export function createEvent({ title, description, address, date, image }) {

    console.log('Creating event:', { title, description, address, date, image });
    // Basic validation
    if (
        !title || !title.trim() ||
        !description || !description.trim() ||
        !address || !address.trim() ||
        !date || !date.trim() ||
        !image || !image
    ) {
        throw new Error('All fields (title, description, address, date) are required and cannot be empty.');
    }

    // Optionally, validate date format (e.g., ISO 8601)
    if (isNaN(Date.parse(date))) {
        throw new Error('Invalid date format.');
    }

    const stmt = db.prepare(
        'INSERT INTO events (title, description, address, date, image) VALUES (?, ?, ?, ?, ?)'
    );
    const info = stmt.run(title.trim(), description.trim(), address.trim(), date.trim(), image ? image.filename : null);
    return { id: info.lastInsertRowid, title: title.trim(), description: description.trim(), address: address.trim(), date: date.trim(), image: image ? image.filename : null };
}

// Edit an event by id
export function editEvent(id, { title, description, address, date, image }) {
  const stmt = db.prepare(
    'UPDATE events SET title = ?, description = ?, address = ?, date = ?, image = ? WHERE id = ?'
  );
  const info = stmt.run(title, description, address, date, image, id);
  return info.changes > 0;
}

// Delete an event by id
export function deleteEvent(id) {
  const stmt = db.prepare('DELETE FROM events WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

// Get all events
export function getAllEvents() {
  const stmt = db.prepare('SELECT * FROM events');
  return stmt.all();
}

// Get a single event by id
export function getEventById(id) {
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  return stmt.get(id);
}