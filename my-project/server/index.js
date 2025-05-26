// Import dependencies
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// In-memory storage for notes (acting as a mock database)
let notes = [];

// API Routes

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST a new note
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: Date.now(), // Generate a unique ID
    text: req.body.text,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT (update) a note by ID
app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const updatedText = req.body.text;

  const note = notes.find((n) => n.id === noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  note.text = updatedText;
  res.json(note);
});

// DELETE a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((n) => n.id !== noteId);
  res.status(204).end(); // No content
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
