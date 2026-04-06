import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ appData, onReset }) => {
  const { days, tasks, completedDays, longTermGoals } = appData;

  const totalTasksExpected = days * tasks.length;
  const totalTasksCompleted = completedDays.reduce((acc, currentDay) => {
    return acc + currentDay.tasks.length;
  }, 0);

  const completionPercentage = totalTasksExpected === 0 ? 0 : Math.round((totalTasksCompleted / totalTasksExpected) * 100);

  return (
    <div className="summary-card">
      <div className="summary-header">
        <h2>🎉 Journey Complete!</h2>
        <p>You have finished your {days}-day commitment.</p>
      </div>

      <div className="stats-circle">
        <div className="percentage">
          {completionPercentage}%
        </div>
        <div className="percentage-label">Success Rate</div>
      </div>

      <div className="summary-details">
        <p>Total Tasks Completed: <strong>{totalTasksCompleted}</strong> out of <strong>{totalTasksExpected}</strong></p>
      </div>

      {longTermGoals && longTermGoals.length > 0 && (
        <div className="goals-achieved">
          <h3>🏆 Goals Reached</h3>
          <ul>
            {longTermGoals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="reset-journey-btn" onClick={onReset}>
        Start a New Journey
      </button>
    </div>
  );
};

export default SummaryCard;
