'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Circle, Trash2, Plus, Calendar, Clock } from 'lucide-react';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updateAt: string;
};

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todo')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: Todo, b: Todo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setTodos(sorted);
      });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-md p-6 border-b border-blue-100">
          <h1 className="text-3xl font-bold text-center text-indigo-700 flex items-center justify-center">
            <span className="bg-indigo-100 p-2 rounded-full mr-3">📋</span>
            Grocery List
          </h1>
          <p className="text-center text-gray-500 mt-2">Plan your grocery shopping with ease and never miss an item again</p>
        </div>
        
        {/* Input Area */}
        <div className="bg-white p-6 shadow-md">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-1 border-2 border-gray-200 rounded-lg focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 overflow-hidden">
              <input
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="What do you need to accomplish today?"
                className="flex-grow px-4 py-3 outline-none text-gray-700 w-full"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!newTodo.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus size={18} />
              <span>Add Item</span>
            </button>
          </div>
        </div>
        
        {/* Todo List */}
        <div className="bg-white rounded-b-2xl shadow-md divide-y divide-gray-100">
          {todos.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
              <p className="text-lg">No Items yet</p>
              <p className="text-sm mt-1">Add your first grocery item to start your list</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {todos.map(todo => (
                <li
                  key={todo.id}
                  className={`p-4 sm:p-5 transition-all duration-200 ${
                    todo.completed ? 'bg-green-50' : 'hover:bg-blue-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Checkbox and Title */}
                    <div 
                      className="flex-1 flex items-start cursor-pointer" 
                      onClick={() => toggleComplete(todo.id, !todo.completed)}
                    >
                      <div className="mt-1 text-indigo-600">
                        {todo.completed ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <Circle size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className={`text-lg transition-all ${
                          todo.completed 
                            ? 'line-through text-gray-400' 
                            : 'text-gray-800 font-medium'
                        }`}>
                          {todo.title}
                        </p>
                        
                        {/* Timestamps */}
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-y-1 sm:gap-x-4">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            <span>Created: {formatDate(todo.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            <span>Updated: {formatDate(todo.updateAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(todo.id)}
                      aria-label="Delete todo"
                      className="group p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={18} className="text-gray-400 group-hover:text-red-500" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* Todo stats */}
          {todos.length > 0 && (
            <div className="p-4 bg-gray-50 text-sm text-gray-500 rounded-b-2xl flex justify-between items-center">
              <div>
                Total: {todos.length} Items
              </div>
              <div>
                Completed: {todos.filter(t => t.completed).length}/{todos.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}