import React, { useState, useEffect } from "react";
import "./App.css";
import Setup from "./components/Setup";
import DailyCard from "./components/DailyCard";
import ProgressMap from "./components/ProgressMap";
import Stopwatch from "./components/Stopwatch";

function App() {
  const [isSetup, setIsSetup] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);
  const [appData, setAppData] = useState({
    days: 0,
    tasks: [],
    longTermGoals: [],
    completedDays: [],
    currentDay: 1,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("eltezamData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (!parsedData.longTermGoals) {
        parsedData.longTermGoals = [];
      }
      setAppData(parsedData);
      setIsSetup(true);
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("eltezamData", JSON.stringify(data));
  };

  const handleSetupComplete = (days, tasks, goals) => {
    const newData = {
      days: days,
      tasks: tasks,
      longTermGoals: goals,
      completedDays: [],
      currentDay: 1,
    };
    setAppData(newData);
    saveToLocalStorage(newData);
    setIsSetup(true);
  };

  const handleDayComplete = (dayNumber, completedTasks) => {
    const updatedData = {
      ...appData,
      completedDays: [
        ...appData.completedDays,
        { day: dayNumber, tasks: completedTasks },
      ],
      currentDay: Math.min(dayNumber + 1, appData.days),
    };
    setAppData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const resetApp = () => {
    localStorage.removeItem("eltezamData");
    setAppData({
      days: 0,
      tasks: [],
      longTermGoals: [],
      completedDays: [],
      currentDay: 1,
    });
    setIsSetup(false);
  };

  if (!isSetup) {
    return <Setup onSetupComplete={handleSetupComplete} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Eltezam - Long Term Goals</h1>
        <div className="header-controls">
          <button
            className="stopwatch-btn"
            onClick={() => setShowStopwatch(true)}
          >
            ⏱️ Stopwatch
          </button>
          <button className="reset-btn" onClick={resetApp}>
            🔄 Reset
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="content-area">
          <DailyCard
            dayNumber={appData.currentDay}
            tasks={appData.tasks}
            onComplete={handleDayComplete}
            isCompleted={appData.completedDays.some(
              (day) => day.day === appData.currentDay
            )}
          />
        </div>

        <aside className="sidebar">
          <ProgressMap
            totalDays={appData.days}
            completedDays={appData.completedDays}
            currentDay={appData.currentDay}
            totalTasks={appData.tasks.length}
            longTermGoals={appData.longTermGoals}
          />
        </aside>
      </main>

      {showStopwatch && <Stopwatch onClose={() => setShowStopwatch(false)} />}
    </div>
  );
}

export default App;
