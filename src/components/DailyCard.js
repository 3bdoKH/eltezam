import React, { useState } from "react";
import "./DailyCard.css";
import { Check } from "lucide-react";
import Confetti from "react-confetti";
import { playDing } from "../utils/sound";

const DailyCard = ({ dayNumber, tasks, onComplete, isCompleted }) => {
  const [checkedTasks, setCheckedTasks] = useState(
    new Array(tasks.length).fill(false)
  );
  const [isSubmitted, setIsSubmitted] = useState(isCompleted);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCheckboxChange = (index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index];
    setCheckedTasks(newCheckedTasks);
  };

  const handleSubmit = () => {
    const completedTasks = tasks.filter((_, index) => checkedTasks[index]);
    
    playDing();
    setShowConfetti(true);
    setIsSubmitted(true);
    
    setTimeout(() => {
      onComplete(dayNumber, completedTasks);
      setShowConfetti(false);
      setIsSubmitted(false);
      setCheckedTasks(new Array(tasks.length).fill(false));
    }, 2800);
  };

  const handleSubmitEmpty = () => {
    onComplete(dayNumber, []);
    setIsSubmitted(true);
  };

  const getProgressPercentage = () => {
    const completedCount = checkedTasks.filter((checked) => checked).length;
    return (completedCount / tasks.length) * 100;
  };

  if (isSubmitted) {
    return (
      <div className="daily-card completed">
        <div className="card-header">
          <h2>Day {dayNumber - 1}</h2>
          <span className="status completed-status">{<Check />} Completed</span>
        </div>
        <div className="completion-message">
          <p>Great job! You've completed Day {dayNumber - 1}.</p>
          <p>Come back tomorrow for Day {dayNumber}!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-card">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} gravity={0.3} />}
      <div className="card-header">
        <h2>Day {dayNumber}</h2>
        <div className="progress-indicator">
          <span className="progress-text">
            {checkedTasks.filter((checked) => checked).length} / {tasks.length}{" "}
            completed
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={checkedTasks[index]}
                onChange={() => handleCheckboxChange(index)}
                className="task-checkbox"
              />
              <span className="checkmark"></span>
              <span className="task-text">{task}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="card-footer">
        <div className="submit-buttons">
          <button
            onClick={handleSubmit}
            disabled={checkedTasks.every((checked) => !checked)}
            className="submit-btn"
          >
            Complete Day {dayNumber}
          </button>
          <button onClick={handleSubmitEmpty} className="submit-empty-btn">
            Submit Empty Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyCard;
