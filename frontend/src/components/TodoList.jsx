import React, { useEffect, useState } from 'react';
import './TodoList.css'; 

const API_URL = 'http://localhost:5000/api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch all todos on mount
  useEffect(() => {
    fetch(`${API_URL}/get-all`)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add a new todo
  const handleAdd = async () => {
    if (!title) return;
    const res = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle('');
    setDescription('');
  };

  // Delete a todo
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleAdd}>Add</button>
      <ul className="list">
        {todos.map(todo => (
          <li key={todo.id} >
            <p><b>{todo.title}</b>: {todo.description}</p>            
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;