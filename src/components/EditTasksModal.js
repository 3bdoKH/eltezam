import React, { useState } from 'react';
import './EditTasksModal.css';
import { X, Plus, Save } from 'lucide-react';

const EditTasksModal = ({ currentTasks, onClose, onSave }) => {
  const [tasks, setTasks] = useState([...currentTasks]);
  const [error, setError] = useState('');

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
    setError('');
  };

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleRemoveTask = (index) => {
    if (tasks.length > 1) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } else {
      setError('You must have at least one valid task.');
    }
  };

  const handleSave = () => {
    const validTasks = tasks.filter(t => t.trim() !== '');
    if (validTasks.length === 0) {
      setError('You must have at least one valid task.');
      return;
    }
    onSave(validTasks);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="edit-tasks-modal">
        <div className="modal-header">
          <h2>Edit Routine</h2>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>
        
        <p className="modal-description">Modify your daily tasks. Changes here will not affect your streak from past days!</p>

        <div className="tasks-edit-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-edit-item">
              <input 
                type="text" 
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                placeholder={`Task ${index + 1}`}
                className="edit-input"
              />
              {tasks.length > 1 && (
                <button className="remove-btn" onClick={() => handleRemoveTask(index)}>
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {error && <span className="modal-error">{error}</span>}

        <button className="add-task-btn" onClick={handleAddTask}>
          <Plus size={18} /> Add Another Task
        </button>

        <button className="save-btn" onClick={handleSave}>
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditTasksModal;
