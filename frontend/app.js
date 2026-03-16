class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.apiUrl = 'http://localhost:8000';
        
        this.initElements();
        this.initEventListeners();
        this.loadFromLocalStorage();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.descriptionInput = document.getElementById('descriptionInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.deleteAllBtn = document.getElementById('deleteAllBtn');
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.remainingCount = document.getElementById('remainingCount');
    }

    initEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.descriptionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.deleteAllBtn.addEventListener('click', () => this.deleteAll());
    }

    addTodo() {
        const title = this.todoInput.value.trim();
        const description = this.descriptionInput.value.trim();

        if (!title) {
            alert('Please enter a task title!');
            return;
        }

        const newTodo = {
            id: Date.now(),
            title,
            description,
            completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.todos.push(newTodo);
        this.saveToLocalStorage();
        this.render();

        this.todoInput.value = '';
        this.descriptionInput.value = '';
        this.todoInput.focus();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updated_at = new Date().toISOString();
            this.saveToLocalStorage();
            this.render();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            const newTitle = prompt('Edit task title:', todo.title);
            if (newTitle !== null && newTitle.trim()) {
                todo.title = newTitle.trim();
                todo.updated_at = new Date().toISOString();
                this.saveToLocalStorage();
                this.render();
            }
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToLocalStorage();
            this.render();
        }
    }

    deleteAll() {
        if (this.todos.length === 0) {
            alert('No tasks to delete!');
            return;
        }

        if (confirm(`Delete all ${this.todos.length} task(s)? This cannot be undone!`)) {
            this.todos = [];
            this.saveToLocalStorage();
            this.render();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;

        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;
        this.remainingCount.textContent = remaining;
    }

    render() {
        this.updateStats();
        this.todoList.innerHTML = '';

        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<li class="empty-message">No tasks to show. Add one to get started! 🚀</li>';
            return;
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            const date = new Date(todo.created_at);
            const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleTodo(${todo.id})"
                >
                <div class="todo-content">
                    <div class="todo-title">${this.escapeHtml(todo.title)}</div>
                    ${todo.description ? `<div class="todo-description">${this.escapeHtml(todo.description)}</div>` : ''}
                    <div class="todo-meta">Created: ${dateStr}</div>
                </div>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="app.editTodo(${todo.id})">Edit</button>
                    <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
                </div>
            `;

            this.todoList.appendChild(li);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('todos');
        if (stored) {
            try {
                this.todos = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading todos from localStorage:', e);
                this.todos = [];
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
};