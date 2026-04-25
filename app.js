// Load environment variables from .env file
require('dotenv').config();

// Import Express framework
const express = require('express');

// Create an Express application instance
const app = express();

// Get port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// In-memory array to store todos (for demo purposes)
// In a real application, you would use a database
let todos = [
  { id: 1, text: 'Learn Node.js', completed: false },
  { id: 2, text: 'Build a Todo app', completed: false }
];

// Middleware
// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse incoming request bodies as JSON
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ============ ROUTES ============

/**
 * GET /api/todos
 * Returns all todos in JSON format
 */
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

/**
 * POST /api/todos
 * Adds a new todo to the list
 * Expects JSON body: { text: "todo description" }
 */
app.post('/api/todos', (req, res) => {
  const { text } = req.body;

  // Validate that text is provided
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }

  // Create new todo object with unique ID
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    text: text.trim(),
    completed: false
  };

  // Add to todos array
  todos.push(newTodo);

  // Return the newly created todo
  res.status(201).json(newTodo);
});

/**
 * DELETE /api/todos/:id
 * Deletes a todo by ID
 */
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

/**
 * PUT /api/todos/:id
 * Toggles the completed status of a todo
 */
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// ============ ERROR HANDLING ============

/**
 * 404 - Not Found handler
 * Handles requests to routes that don't exist
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============ START SERVER ============

// Start the Express server
app.listen(PORT, () => {
  console.log(`✓ Todo Tracker server is running on http://localhost:${PORT}`);
  console.log(`✓ Press Ctrl+C to stop the server`);
});
