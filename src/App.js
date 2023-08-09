import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(localStorage.getItem(user.id)) || [];
      setTasks(savedTasks);
    }
  }, [user]);

  const addTask = () => {
    if (taskText.trim() !== '') {
      const newTask = { text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText('');

      if (user) {
        localStorage.setItem(user.id, JSON.stringify([...tasks, newTask]));
      }
    }
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    if (user) {
      localStorage.setItem(user.id, JSON.stringify(updatedTasks));
    }
  };

  const handleSignIn = () => {
    // Implement Google Sign-In logic here
    // setUser(userDetails);
  };

  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
        {user ? (
          <div className="user-info">
            <img src={user.imageUrl} alt="User" />
            <p>Welcome, {user.name}</p>
          </div>
        ) : (
          <div className="sign-in-button" onClick={handleSignIn}>
            <span>Sign In with Google</span>
          </div>
        )}
      </header>
      <div className="task-container">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(index)}
              />
              {task.text}
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
