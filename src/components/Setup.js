import React, { useState } from 'react';
import './Setup.css';

const Setup = ({ onSetupComplete }) => {
  const [days, setDays] = useState('');
  const [tasks, setTasks] = useState(['']);
  const [goals, setGoals] = useState(['']);
  const [errors, setErrors] = useState({});

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleRemoveTask = (index) => {
    if (tasks.length > 1) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleAddGoal = () => {
    setGoals([...goals, '']);
  };

  const handleRemoveGoal = (index) => {
    if (goals.length > 1) {
      const newGoals = goals.filter((_, i) => i !== index);
      setGoals(newGoals);
    }
  };

  const handleGoalChange = (index, value) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!days || days < 1 || days > 365) {
      newErrors.days = 'Please enter a valid number of days (1-365)';
    }

    const validTasks = tasks.filter(task => task.trim() !== '');
    if (validTasks.length === 0) {
      newErrors.tasks = 'Please add at least one task';
    }

    const validGoals = goals.filter(goal => goal.trim() !== '');
    if (validGoals.length === 0) {
      newErrors.goals = 'Please add at least one long term goal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const validTasks = tasks.filter(task => task.trim() !== '');
      const validGoals = goals.filter(goal => goal.trim() !== '');
      onSetupComplete(parseInt(days), validTasks, validGoals);
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h1>Welcome to Eltezam</h1>
        <p className="setup-description">
          Set up your long-term commitment journey. Define how many days you want to commit to and what tasks you'll accomplish each day.
        </p>

        <form onSubmit={handleSubmit} className="setup-form">
          <div className="form-group">
            <label className='setup-label' htmlFor="days">Number of Days to Commit:</label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="e.g., 30"
              min="1"
              max="365"
              className={`setup-input ${errors.days ? 'error' : ''}`}
            />
            {errors.days && <span className="error-message">{errors.days}</span>}
          </div>

          <div className="form-group">
            <label className='setup-label'>Long Term Goals:</label>
            <div className="tasks-container">
              {goals.map((goal, index) => (
                <div key={index} className="task-input-group">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    placeholder={`Goal ${index + 1}`}
                    className={`setup-input ${errors.goals ? 'error' : ''}`}
                  />
                  {goals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGoal(index)}
                      className="remove-task-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.goals && <span className="error-message">{errors.goals}</span>}

            <button
              type="button"
              onClick={handleAddGoal}
              className="add-task-btn"
            >
              + Add Another Goal
            </button>
          </div>

          <div className="form-group">
            <label className='setup-label'>Daily Tasks:</label>
            <div className="tasks-container">
              {tasks.map((task, index) => (
                <div key={index} className="task-input-group">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleTaskChange(index, e.target.value)}
                    placeholder={`Task ${index + 1}`}
                    className={`setup-input ${errors.tasks ? 'error' : ''}`}
                  />
                  {tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(index)}
                      className="remove-task-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.tasks && <span className="error-message">{errors.tasks}</span>}

            <button
              type="button"
              onClick={handleAddTask}
              className="add-task-btn"
            >
              + Add Another Task
            </button>
          </div>

          <button type="submit" className="start-btn">
            Start My Journey
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setup;
