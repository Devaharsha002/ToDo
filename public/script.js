// ============ DOM ELEMENTS ============

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const totalTodosDisplay = document.getElementById('totalTodos');
const completedTodosDisplay = document.getElementById('completedTodos');

// ============ INITIALIZE ============

// Load todos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// ============ EVENT LISTENERS ============

// Handle form submission to add a new todo
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();

  // Validate input
  if (!text) {
    alert('Please enter a todo description');
    return;
  }

  try {
    // Send POST request to add todo
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error('Failed to add todo');
    }

    // Clear input field
    todoInput.value = '';

    // Reload todos to display the new one
    await loadTodos();
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding todo. Please try again.');
  }
});

// ============ FUNCTIONS ============

/**
 * Fetch all todos from the server and display them
 */
async function loadTodos() {
  try {
    const response = await fetch('/api/todos');

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const todos = await response.json();

    // Display todos
    displayTodos(todos);

    // Update statistics
    updateStats(todos);
  } catch (error) {
    console.error('Error loading todos:', error);
    todoList.innerHTML = '<li class="empty-state">Error loading todos. Please refresh the page.</li>';
  }
}

/**
 * Display todos in the list
 * @param {Array} todos - Array of todo objects
 */
function displayTodos(todos) {
  // Clear the list
  todoList.innerHTML = '';

  // Show empty state if no todos
  if (todos.length === 0) {
    todoList.innerHTML = '<li class="empty-state">No todos yet. Add one to get started!</li>';
    return;
  }

  // Create and append todo items
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <input
        type="checkbox"
        class="todo-checkbox"
        ${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(${todo.id})"
      >
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button class="btn btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

/**
 * Update statistics display
 * @param {Array} todos - Array of todo objects
 */
function updateStats(todos) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  totalTodosDisplay.textContent = total;
  completedTodosDisplay.textContent = completed;
}

/**
 * Toggle the completed status of a todo
 * @param {number} id - Todo ID
 */
async function toggleTodo(id) {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT'
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    // Reload todos to reflect changes
    await loadTodos();
  } catch (error) {
    console.error('Error:', error);
    alert('Error updating todo. Please try again.');
    // Reload to reset checkbox state
    await loadTodos();
  }
}

/**
 * Delete a todo
 * @param {number} id - Todo ID
 */
async function deleteTodo(id) {
  // Confirm deletion
  if (!confirm('Are you sure you want to delete this todo?')) {
    return;
  }

  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }

    // Reload todos to reflect deletion
    await loadTodos();
  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting todo. Please try again.');
  }
}

/**
 * Escape HTML special characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
