// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium'); // Change to string
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    setCurrentDate(getFormattedDate());
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: taskPriority
      };
      setTasks([...tasks, newTask]);
      setTaskText('');
      setTaskPriority('medium');
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'taskText') {
      setTaskText(value);
    } else if (name === 'taskPriority') {
      setTaskPriority(value);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(updatedTasks);
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority) => {
    if (priority === 'low') return 'low-priority';
    if (priority === 'medium') return 'medium-priority';
    if (priority === 'high') return 'high-priority';
    return '';
  };

  return (
    <div className="App">
      <header>
        <h1>A Simple To-Do List React App</h1>
        <a href="https://twitter.com/Jordan_Thirkle" target="_blank" rel="noopener noreferrer">
          Made by Jordan Thirkle
        </a>
      </header>
      <div className="task-container">
        <input
          className="task-input"
          type="text"
          name="taskText"
          value={taskText}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Enter a new task..."
        />
        <select
          name="taskPriority"
          value={taskPriority}
          onChange={handleInputChange}
          className="priority-input"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
        <p className="current-date">{currentDate}</p>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList" type="TASK">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="task-list"
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                      >
                        <div>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskCompletion(index)}
                          />
                          <span className={getPriorityColor(task.priority)}>{task.text}</span>
                        </div>
                        <div className="task-options">
                          <button className="delete-button" onClick={() => handleDeleteTask(index)}>
                            Delete
                          </button>
                          <span className={`priority ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <footer>
        <p>© 2023 Jordan Thirkle</p>
      </footer>
    </div>
  );
}

export default App;
