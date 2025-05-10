'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todo')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);
  
  const handleAdd = async () => {
    if (!newTodo.trim()) return;
  
    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
  
    const data: Todo = await res.json();
    setTodos([data, ...todos]);
    setNewTodo('');
  };
  
  const handleDelete = async (id: string) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const toggleComplete = async (id: string, completed: boolean) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
  
    const updated: Todo = await res.json();
    setTodos(todos.map(t => (t.id === id ? updated : t)));
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Dashboard</h1>

      <div className="mb-4">
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="New todo"
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1">
          Add
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span
              onClick={() => toggleComplete(todo.id, !todo.completed)}
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
