import express from 'express';
import eventsRoutes from './routes/events.js';
import usersRouter from './routes/users.js';
import db from './database.js';

// Import database

// Middleware to parse JSON bodies
const app = express();
app.use(express.json());

// Mount users route
app.use('/users', usersRouter);
app.use('/events', eventsRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Test database connection
  try {
    db.prepare('SELECT 1').get();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
  console.log(`Server running on port ${PORT}`);
});
