# 📝 To-Do List Application

A modern, feature-rich to-do list application built with **FastAPI** (backend) and **Vanilla JavaScript + HTML + CSS** (frontend) with **local storage** functionality.

## ✨ Features

### Frontend Features
- ✅ **Add, edit, delete tasks** - Full CRUD operations
- 💾 **Local Storage** - Tasks persist automatically in browser
- 🔍 **Filter Options** - View All, Active, or Completed tasks
- 📊 **Statistics** - Track total, completed, and remaining tasks
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⌨️ **Keyboard Support** - Press Enter to add tasks
- 🔒 **Safe Input** - HTML escaping to prevent XSS attacks

### Backend Features
- 🚀 **FastAPI** - High-performance Python framework
- 💾 **JSON Storage** - Persistent data in todos.json
- 🔄 **REST API** - Full RESTful endpoints
- 🌐 **CORS Support** - Frontend-backend communication
- 📅 **Timestamps** - Created and updated dates for all tasks
- 🛡️ **Error Handling** - Proper HTTP error responses

## 📁 Project Structure

```
contentai-pro/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── todos.json           # Data storage (auto-created)
├── frontend/
│   ├── index.html           # HTML structure
│   ├── style.css            # Styling and animations
│   ├── app.js               # JavaScript logic
│   └── package.json         # Project metadata
└── README_TODO.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Any modern web browser

### Backend Setup

1. **Install dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Run the server:**
```bash
python main.py
```

The API will be available at `http://localhost:8000`

3. **API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Start a local server:**
```bash
# Using Python 3
python -m http.server 3000

# Or using Node.js (if installed)
npm start
```

3. **Open in browser:**
```
http://localhost:3000
```

## 📡 API Endpoints

### Get All Todos
```bash
GET /todos
```

### Create Todo
```bash
POST /todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Get Single Todo
```bash
GET /todos/{id}
```

### Update Todo
```bash
PUT /todos/{id}
Content-Type: application/json

{
  "title": "Updated task",
  "description": "Updated description",
  "completed": true
}
```

### Delete Todo
```bash
DELETE /todos/{id}
```

### Delete All Todos
```bash
DELETE /todos
```

## 💾 Local Storage

The application automatically saves all tasks to the browser's **localStorage** under the key `todos`. This means:

- ✅ Tasks persist even after closing the browser
- ✅ No backend connection required for basic functionality
- ✅ Works completely offline
- ✅ Each todo is saved with timestamps and metadata

**Storage Example:**
```javascript
localStorage.getItem('todos')
// Returns: [{"id":1234567890,"title":"Buy milk","description":"","completed":false,"created_at":"2024-03-16T10:30:00.000Z","updated_at":"2024-03-16T10:30:00.000Z"},...]
```

## 🎨 Customization

### Change Color Scheme
Edit the gradient colors in `frontend/style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Storage Location
In `backend/main.py`:
```python
DB_FILE = "todos.json"  # Change to different path
```

### Adjust Container Size
In `frontend/style.css`:
```css
.container {
    max-width: 600px;  /* Change this value */
}
```

## 🧪 Testing

### Test with cURL

```bash
# Create a todo
curl -X POST http://localhost:8000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","description":"This is a test"}'

# Get all todos
curl http://localhost:8000/todos

# Update a todo
curl -X PUT http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:8000/todos/1
```

## 📊 Usage Example

1. **Open the app** in your browser at `http://localhost:3000`
2. **Add a task** by typing in the input field and clicking "Add Task" or pressing Enter
3. **Mark as complete** by checking the checkbox
4. **Edit tasks** by clicking the "Edit" button
5. **Delete tasks** by clicking the "Delete" button
6. **Filter tasks** using the filter buttons (All, Active, Completed)
7. **Clear completed** tasks with one click
8. **View statistics** in real-time at the top

## 🔒 Security Features

- ✅ HTML escaping to prevent XSS attacks
- ✅ Input validation on both frontend and backend
- ✅ CORS configured for safe cross-origin requests
- ✅ No sensitive data in local storage

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🐛 Troubleshooting

### Port Already in Use
If port 8000 or 3000 is already in use:
```bash
# Backend (different port)
python main.py  # Modify main.py to use different port

# Frontend
python -m http.server 3001
```

### CORS Errors
Make sure the backend is running and accessible at `http://localhost:8000`

### Tasks Not Saving
Check browser console (F12) for JavaScript errors and ensure localStorage is enabled

## 📝 License

MIT License - feel free to use this project for any purpose!

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

## 📧 Contact

Created by Anfisa230383

---

**Happy task managing! 🎯**