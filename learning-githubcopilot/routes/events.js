import { Router } from 'express';
const router = Router();

import * as events from '../controllers/event-controllers.js';
import { authenticateJWT } from '../utill/auth.js';
import upload from '../utill/upload.js';

// Get all events
router.get('/', events.getAllEventsController);

// Get a single event by ID
router.get('/:id', events.getEventByIdController);

// Create a new event
router.post('/events', authenticateJWT,upload.single('image'), events.createEventController);

// Edit an event by ID
router.put('/events/:id', authenticateJWT,upload.single('image'), events.editEventController);

// Delete an event by ID
router.delete('/events/:id', authenticateJWT, events.deleteEventController);

export default router;
