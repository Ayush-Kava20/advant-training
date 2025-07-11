import express from 'express';
const app = express();

// Import database
import db from './database.js';

// Middleware to parse JSON bodies
app.use(express.json());

// Mount users route
import usersRouter from './routes/users.js';
app.use('/users', usersRouter);

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
