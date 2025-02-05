import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskSuggestions, setTaskSuggestions] = useState([
    'Review Notes for 30 minutes',
    'Complete 1 chapter of a book',
    'Practice coding for 1 hour',
    'Take a 15-minute walk',
    'Write a blog post',
  ]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add a new task
  const addTask = () => {
    if (task && priority && dueDate) {
      const newTask = { task, priority, dueDate };
      setTasks([...tasks, newTask]);
      setTask(''); // Reset task input
      setPriority(''); // Reset priority input
      setDueDate(''); // Reset due date input
    } else {
      alert("Please fill out all fields");
    }
  };

  // Handle suggestion selection
  const selectSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setTask(suggestion);
  };

  // Handle Get Task Suggestion click
  const getTaskSuggestions = () => {
    if (taskSuggestions.length > 0) {
      return taskSuggestions.map((suggestion, index) => (
        <li key={index} onClick={() => selectSuggestion(suggestion)}>
          {suggestion}
        </li>
      ));
    }
  };

  // Remove a task
  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Sort tasks by priority
  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setTasks(sortedTasks);
  };

  // Sort tasks by due date
  const sortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setTasks(sortedTasks);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>AI Study Planner</h1>

      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="toggle-btn">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Get Task Suggestion Dropdown */}
      <div>
        <button onClick={getTaskSuggestions}>Get Task Suggestions</button>
        {taskSuggestions.length > 0 && (
          <ul>
            {taskSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Task Input Form */}
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        <ul>
          {tasks.map((taskItem, index) => (
            <li key={index}>
              <div>{taskItem.task}</div>
              <div>Priority: {taskItem.priority}</div>
              <div>Due Date: {taskItem.dueDate}</div>
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sort by Priority */}
      <div>
        <button onClick={sortByPriority}>Sort by Priority</button>
      </div>

      {/* Sort by Due Date */}
      <div>
        <button onClick={sortByDate}>Sort by Date</button>
      </div>
    </div>
  );
}

export default App;
