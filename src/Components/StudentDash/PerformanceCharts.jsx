// components/PerformanceCharts.js
import React from 'react';

const PerformanceCharts = () => {
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    scores: [65, 78, 82, 75, 90, 88],
    assignments: [3, 5, 4, 6, 7, 8],
    quizzes: [2, 3, 4, 3, 5, 4]
  };

  const subjectPerformance = [
    { subject: 'Mathematics', score: 85, color: '#4f46e5' },
    { subject: 'Science', score: 78, color: '#06b6d4' },
    { subject: 'Programming', score: 92, color: '#10b981' },
    { subject: 'Design', score: 70, color: '#f59e0b' },
    { subject: 'Theory', score: 65, color: '#ef4444' }
  ];

  const maxScore = Math.max(...performanceData.scores);

  return (
    <div className="student-dashboard-performance-charts-section">
      <div className="student-dashboard-section-header">
        <h2 className="student-dashboard-section-title">Performance Analytics</h2>
        <div className="student-dashboard-section-decoration"></div>
      </div>

      <div className="student-dashboard-charts-container">
        {/* Score Trend Chart */}
        <div className="student-dashboard-chart-card score-trend-card">
          <h3 className="student-dashboard-chart-title">Score Trend</h3>
          <div className="student-dashboard-chart-container">
            <div className="student-dashboard-chart-bars">
              {performanceData.scores.map((score, index) => (
                <div key={index} className="student-dashboard-bar-container">
                  <div 
                    className="student-dashboard-bar"
                    style={{ 
                      height: `${(score / maxScore) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <span className="student-dashboard-bar-value">{score}</span>
                  </div>
                  <span className="student-dashboard-bar-label">{performanceData.labels[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="student-dashboard-chart-card subject-performance-card">
          <h3 className="student-dashboard-chart-title">Subject Performance</h3>
          <div className="student-dashboard-subject-chart">
            {subjectPerformance.map((subject, index) => (
              <div key={subject.subject} className="student-dashboard-subject-item">
                <div className="student-dashboard-subject-info">
                  <span className="student-dashboard-subject-name">{subject.subject}</span>
                  <span className="student-dashboard-subject-score">{subject.score}%</span>
                </div>
                <div className="student-dashboard-subject-progress">
                  <div 
                    className="student-dashboard-subject-progress-bar"
                    style={{ 
                      width: `${subject.score}%`,
                      backgroundColor: subject.color,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Summary */}
        <div className="student-dashboard-chart-card activity-summary-card">
          <h3 className="student-dashboard-chart-title">Activity Summary</h3>
          <div className="student-dashboard-activity-stats">
            <div className="student-dashboard-stat-item">
              <div className="student-dashboard-stat-value">24</div>
              <div className="student-dashboard-stat-label">Lessons Completed</div>
            </div>
            <div className="student-dashboard-stat-item">
              <div className="student-dashboard-stat-value">18</div>
              <div className="student-dashboard-stat-label">Assignments</div>
            </div>
            <div className="student-dashboard-stat-item">
              <div className="student-dashboard-stat-value">12</div>
              <div className="student-dashboard-stat-label">Quizzes Taken</div>
            </div>
            <div className="student-dashboard-stat-item">
              <div className="student-dashboard-stat-value">95%</div>
              <div className="student-dashboard-stat-label">Attendance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;