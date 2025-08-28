import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Use environment variable or default to empty string (for dev)
  const API_ROOT = import.meta.env.VITE_API_ROOT || '';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_ROOT}/api/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (task.trim()) {
      try {
        const response = await fetch(`${API_ROOT}/api/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task }),
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setTask('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      await fetch(`${API_ROOT}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_ROOT}/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)'
    }}>
      <div style={{
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        width: '600px',
        background: '#ffffffdd', // semi-transparent white
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(6px)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px'
        }}>
          22UG2-0179 To-Do App
        </h1>

        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter new task"
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <button
            onClick={addTodo}
            style={{
              marginLeft: '10px',
              padding: '10px 18px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#4CAF50',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id}
                style={{
                  marginBottom: '12px',
                  padding: '10px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
                />
                <span
                  style={{
                    marginLeft: '10px',
                    fontSize: '16px',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#333'
                  }}
                >
                  {todo.task}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  marginLeft: '10px',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

