import React from 'react';
import './Analytics.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Analytics = ({ appData }) => {
  const { completedDays, tasks } = appData;

  const totalTasksPerDay = tasks.length;
  
  const chartData = completedDays.map(day => {
    const percentage = totalTasksPerDay === 0 ? 0 : Math.round((day.tasks.length / totalTasksPerDay) * 100);
    return {
      name: `Day ${day.day}`,
      percentage
    };
  });

  const averageCompletion = chartData.length > 0 
    ? Math.round(chartData.reduce((acc, d) => acc + d.percentage, 0) / chartData.length)
    : 0;

  const perfectDays = chartData.filter(d => d.percentage === 100).length;

  let maxStreak = 0;
  let currentLocalStreak = 0;
  completedDays.forEach(day => {
    if (day.tasks.length > 0) {
      currentLocalStreak++;
      if (currentLocalStreak > maxStreak) {
        maxStreak = currentLocalStreak;
      }
    } else {
      currentLocalStreak = 0;
    }
  });

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Your Journey Analytics</h2>
        <p>Insights into your long-term success</p>
      </div>

      <div className="analytics-stats-grid">
        <div className="analytic-stat-card">
          <span className="analytic-value">{averageCompletion}%</span>
          <span className="analytic-label">Avg Completion</span>
        </div>
        <div className="analytic-stat-card">
          <span className="analytic-value">{perfectDays}</span>
          <span className="analytic-label">Perfect 100% Days</span>
        </div>
        <div className="analytic-stat-card">
          <span className="analytic-value">{maxStreak}</span>
          <span className="analytic-label">Longest Active Streak</span>
        </div>
      </div>

      <div className="chart-container">
        <h3>Completion Trend</h3>
        {chartData.length > 0 ? (
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 11, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#2dd4bf', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#8b5cf6" 
                  strokeWidth={4}
                  activeDot={{ r: 8, fill: '#2dd4bf', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="no-data-message">
            Complete your first day to see your progress chart!
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
