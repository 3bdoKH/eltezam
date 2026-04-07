import React, { useState, useEffect } from "react";
import "./App.css";
import Setup from "./components/Setup";
import DailyCard from "./components/DailyCard";
import SummaryCard from "./components/SummaryCard";
import ProgressMap from "./components/ProgressMap";
import Stopwatch from "./components/Stopwatch";
import Analytics from "./components/Analytics";
import EditTasksModal from "./components/EditTasksModal";
import Confetti from "react-confetti";
import { Timer, Repeat, Edit3, BarChart2, CheckSquare } from "lucide-react";

function App() {
  const [isSetup, setIsSetup] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);
  const [showEditTasks, setShowEditTasks] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
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

  const handleTasksUpdate = (newTasks) => {
    const updatedData = { ...appData, tasks: newTasks };
    setAppData(updatedData);
    saveToLocalStorage(updatedData);
    setShowEditTasks(false);
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
      {
        appData.completedDays.length === appData.days && (
          <Confetti
            numberOfPieces={300}
            recycle={false}
            style={{ width: '100%', height: '100%' }}
          />
        )
      }
      <header className="app-header">
        <h1>Eltezam</h1>
        <div className="header-controls">
          <button className="edit-btn" onClick={() => setShowEditTasks(true)}>
            {<Edit3 size={18} />} Edit
          </button>
          <button
            className="stopwatch-btn"
            onClick={() => setShowStopwatch(true)}
          >
            {<Timer size={18} />} Stopwatch
          </button>
          <button className="reset-btn" onClick={resetApp}>
            {<Repeat size={18} />} Reset
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="content-area">
          <div className="view-tabs">
            <button className={activeTab === 'daily' ? 'active' : ''} onClick={() => setActiveTab('daily')}>
              <CheckSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Daily Check
            </button>
            <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
              <BarChart2 size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Analytics
            </button>
          </div>

          {activeTab === 'analytics' ? (
            <Analytics appData={appData} />
          ) : (
            appData.completedDays.length === appData.days ? (
              <SummaryCard appData={appData} onReset={resetApp} />
            ) : (
              <DailyCard
                dayNumber={appData.currentDay}
                tasks={appData.tasks}
                onComplete={handleDayComplete}
                isCompleted={appData.completedDays.some(
                  (day) => day.day === appData.currentDay
                )}
              />
            )
          )}
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

      {showEditTasks && (
        <EditTasksModal
          currentTasks={appData.tasks}
          onClose={() => setShowEditTasks(false)}
          onSave={handleTasksUpdate}
        />
      )}
    </div>
  );
}

export default App;
