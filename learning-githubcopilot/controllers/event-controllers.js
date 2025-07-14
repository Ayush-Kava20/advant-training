import {
    createEvent,
    editEvent,
    deleteEvent,
    getAllEvents,
    getEventById
} from '../models/event.js';

// Controller to create a new event
export function createEventController(req, res) {
try {
    const { title, description, address, date } = req.body;
    const image = req.file; // Assuming you're using multer for file uploads
    const event = createEvent({ title, description, address, date, image: image ? image.filename : null });
    res.status(201).json(event);
} catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ error: 'Failed to create event.' });
}
}

// Controller to edit an event by id
export function editEventController(req, res) {
try {
    const { id } = req.params;
    const { title, description, address, date } = req.body;
    const image = req.file; // Assuming you're using multer for file uploads
    const success = editEvent(Number(id), { title, description, address, date, image: req.file ? req.file.filename : null });
    if (success) {
        res.json({ message: 'Event updated successfully.' });
    } else {
        res.status(404).json({ error: 'Event not found.' });
    }
} catch (error) {
    res.status(500).json({ error: 'Failed to update event.' });
}
}

// Controller to delete an event by id
export function deleteEventController(req, res) {
try {
    const { id } = req.params;
    const success = deleteEvent(Number(id));
    if (success) {
        res.json({ message: 'Event deleted successfully.' });
    } else {
        res.status(404).json({ error: 'Event not found.' });
    }
} catch (error) {
    res.status(500).json({ error: 'Failed to delete event.' });
}
}

// Controller to get all events
export function getAllEventsController(req, res) {
try {
    const events = getAllEvents();
    res.json(events);
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch events.' });
}
}

// Controller to get a single event by id
export function getEventByIdController(req, res) {
try {
    const { id } = req.params;
    const event = getEventById(Number(id));
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ error: 'Event not found.' });
    }
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch event.' });
}
}