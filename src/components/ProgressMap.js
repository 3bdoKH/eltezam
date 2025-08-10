import React from "react";
import "./ProgressMap.css";

const ProgressMap = ({ totalDays, completedDays, currentDay, totalTasks }) => {
  const getDayStatus = (dayNumber) => {
    const completedDay = completedDays.find((day) => day.day === dayNumber);
    if (completedDay) {
      const percentage = (completedDay.tasks.length / totalTasks) * 100;
      if (percentage === 100) {
        return "completed";
      } else if (percentage >= 50) {
        return "partial";
      } else if (percentage > 0) {
        return "low";
      } else {
        return "empty";
      }
    } else if (dayNumber === currentDay) {
      return "current";
    } else if (dayNumber < currentDay) {
      return "missed";
    } else {
      return "upcoming";
    }
  };

  const getCompletionRate = () => {
    return Math.round((completedDays.length / totalDays) * 100);
  };

  const getStreak = () => {
    let streak = 0;
    for (let i = 1; i <= totalDays; i++) {
      if (completedDays.some((day) => day.day === i)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const renderDays = () => {
    const days = [];
    const maxVisibleDays = 30;

    let startDay = Math.max(1, currentDay - Math.floor(maxVisibleDays / 2));
    let endDay = Math.min(totalDays, startDay + maxVisibleDays - 1);

    if (endDay === totalDays) {
      startDay = Math.max(1, totalDays - maxVisibleDays + 1);
    }

    for (let i = startDay; i <= endDay; i++) {
      const status = getDayStatus(i);
      days.push(
        <div
          key={i}
          className={`day-indicator ${status}`}
          title={`Day ${i} - ${status}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="progress-map">
      <h3>Progress Map</h3>

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Completion Rate</span>
          <span className="stat-value">{getCompletionRate()}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Current Streak</span>
          <span className="stat-value">{getStreak()} days</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Days Left</span>
          <span className="stat-value">
            {Math.max(0, totalDays - currentDay + 1)}
          </span>
        </div>
      </div>

      <div className="days-container">
        <div className="days-grid">{renderDays()}</div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color completed"></div>
          <span>100% Complete</span>
        </div>
        <div className="legend-item">
          <div className="legend-color partial"></div>
          <span>50%+ Complete</span>
        </div>
        <div className="legend-item">
          <div className="legend-color low"></div>
          <span>1-49% Complete</span>
        </div>
        <div className="legend-item">
          <div className="legend-color empty"></div>
          <span>0% Complete</span>
        </div>
        <div className="legend-item">
          <div className="legend-color current"></div>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <div className="legend-color missed"></div>
          <span>Missed</span>
        </div>
        <div className="legend-item">
          <div className="legend-color upcoming"></div>
          <span>Upcoming</span>
        </div>
      </div>

      {currentDay > totalDays && (
        <div className="completion-message">
          <h4>🎉 Congratulations!</h4>
          <p>You've completed your {totalDays}-day commitment!</p>
        </div>
      )}
    </div>
  );
};

export default ProgressMap;
