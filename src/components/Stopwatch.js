import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = ({ onClose }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    }
  };

  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="stopwatch-overlay" onClick={handleBackdropClick}>
      <div className="stopwatch-popup">
        <div className="stopwatch-header">
          <h2>Stopwatch</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stopwatch-display">
          <div className="time-display">
            {formatTime(time)}
          </div>
        </div>

        <div className="stopwatch-controls">
          {!isRunning ? (
            <button className="control-btn start-btn" onClick={startStopwatch}>
              ▶️ Start
            </button>
          ) : (
            <button className="control-btn pause-btn" onClick={pauseStopwatch}>
              ⏸️ Pause
            </button>
          )}
          
          <button className="control-btn lap-btn" onClick={addLap} disabled={!isRunning}>
            ⏱️ Lap
          </button>
          
          <button className="control-btn reset-btn" onClick={resetStopwatch}>
            🔄 Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="laps-container">
            <h3>Laps</h3>
            <div className="laps-list">
              {laps.map((lapTime, index) => (
                <div key={index} className="lap-item">
                  <span className="lap-number">Lap {index + 1}</span>
                  <span className="lap-time">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
