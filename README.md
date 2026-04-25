# Todo Tracker

A simple and elegant Todo Tracker web application built with Node.js and Express.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ View statistics (total todos, completed todos)
- ✅ Clean and responsive UI
- ✅ RESTful API
- ✅ Environment variable management with dotenv

## Project Structure

```
todo-tracker/
├── app.js                 # Main Express application
├── package.json           # Project dependencies
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore configuration
├── public/
│   ├── index.html        # Main HTML file
│   ├── style.css         # Styling
│   └── script.js         # Frontend JavaScript
└── README.md             # This file
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd todo-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (optional)
   Edit `.env` to set the PORT (default: 3000)
   ```
   PORT=3000
   ```

## Running the Application

### Production Mode

```bash
npm start
```

### Development Mode (with auto-reload)

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## API Endpoints

### Get all todos
- **Method:** GET
- **Endpoint:** `/api/todos`
- **Response:** Array of todo objects

### Add a new todo
- **Method:** POST
- **Endpoint:** `/api/todos`
- **Body:** `{ "text": "todo description" }`
- **Response:** Created todo object

### Toggle todo completion
- **Method:** PUT
- **Endpoint:** `/api/todos/:id`
- **Response:** Updated todo object

### Delete a todo
- **Method:** DELETE
- **Endpoint:** `/api/todos/:id`
- **Response:** Deleted todo object

## Example Todo Object

```json
{
  "id": 1,
  "text": "Learn Node.js",
  "completed": false
}
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Environment Management:** dotenv
- **Development Tool:** nodemon (for development mode)

## File Descriptions

- **app.js**: Main application file with Express server setup and API routes
- **package.json**: Project metadata and dependencies
- **.env**: Environment variables (not tracked in git)
- **.env.example**: Template for environment variables
- **.gitignore**: Specifies files to exclude from version control
- **public/index.html**: Main HTML structure
- **public/style.css**: Responsive styling
- **public/script.js**: Frontend logic and API communication

## Notes for Beginners

1. **In-Memory Storage**: This app stores todos in memory, so data resets when the server restarts. To persist data, consider using a database like MongoDB or PostgreSQL.

2. **Environment Variables**: The `dotenv` package loads variables from `.env` file, keeping sensitive information out of your code.

3. **Static Files**: The `express.static()` middleware serves HTML, CSS, and JavaScript files from the `public` folder.

4. **RESTful API**: The endpoints follow REST principles using appropriate HTTP methods (GET, POST, PUT, DELETE).

5. **Error Handling**: The app includes basic error handling for common scenarios.

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL)
- User authentication
- Persistent storage
- Edit existing todos
- Todo categories/labels
- Due dates
- Priority levels

## License

ISC

## Author

Your Name

---

Happy coding! 🚀
