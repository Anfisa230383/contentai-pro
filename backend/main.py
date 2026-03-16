from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os

app = FastAPI(title="To-Do List API", version="1.0.0")

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database file path
DB_FILE = "todos.json"

# Models
class TodoItem(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

# Helper functions
def load_todos() -> List[dict]:
    """Load todos from JSON file"""
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    return []

def save_todos(todos: List[dict]):
    """Save todos to JSON file"""
    with open(DB_FILE, 'w') as f:
        json.dump(todos, f, indent=2)


def get_next_id(todos: List[dict]) -> int:
    """Get next available ID"""
    if not todos:
        return 1
    return max(todo['id'] for todo in todos) + 1

# Routes
@app.get("/")
def read_root():
    """Welcome endpoint"""
    return {
        "message": "Welcome to To-Do List API",
        "version": "1.0.0",
        "endpoints": {
            "todos": "GET /todos",
            "create": "POST /todos",
            "get_one": "GET /todos/{id}",
            "update": "PUT /todos/{id}",
            "delete": "DELETE /todos/{id}"
        }
    }

@app.get("/todos", response_model=List[TodoItem])
def get_todos():
    """Get all todos"""
    todos = load_todos()
    return todos

@app.post("/todos", response_model=TodoItem)
def create_todo(todo: TodoItem):
    """Create a new todo"""
    todos = load_todos()
    
    new_todo = {
        "id": get_next_id(todos),
        "title": todo.title,
        "description": todo.description or "",
        "completed": False,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    
    todos.append(new_todo)
    save_todos(todos)
    
    return new_todo

@app.get("/todos/{todo_id}", response_model=TodoItem)
def get_todo(todo_id: int):
    """Get a specific todo by ID"""
    todos = load_todos()
    
    for todo in todos:
        if todo['id'] == todo_id:
            return todo
    
    raise HTTPException(status_code=404, detail="Todo not found")

@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, todo_update: TodoUpdate):
    """Update a todo"""
    todos = load_todos()
    
    for todo in todos:
        if todo['id'] == todo_id:
            if todo_update.title is not None:
                todo['title'] = todo_update.title
            if todo_update.description is not None:
                todo['description'] = todo_update.description
            if todo_update.completed is not None:
                todo['completed'] = todo_update.completed
            
            todo['updated_at'] = datetime.now().isoformat()
            save_todos(todos)
            return todo
    
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    """Delete a todo"""
    todos = load_todos()
    
    for i, todo in enumerate(todos):
        if todo['id'] == todo_id:
            deleted_todo = todos.pop(i)
            save_todos(todos)
            return {"message": "Todo deleted", "deleted_todo": deleted_todo}
    
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos")
def delete_all_todos():
    """Delete all todos"""
    save_todos([])
    return {"message": "All todos deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)