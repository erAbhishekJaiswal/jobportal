// Dashboard.js
import React from 'react';
import '../../CSSFiles/Students/StudentDashboard.css';
import ProgressCards from '../../Components/StudentDash/ProgressCards';
import PerformanceCharts from '../../Components/StudentDash/PerformanceCharts';
import RecentActivities from '../../Components/StudentDash/RecentActivities';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-page">
    <div className="student-dashboard">
      <div className="student-dashboard-header">
        <h1 className="student-dashboard-title">My Dashboard</h1>
        <p className="student-dashboard-subtitle">Welcome back! Here's your learning progress</p>
      </div>
      
      <div className="student-dashboard-content">
        <div className="student-dashboard-grid">
          <div className="student-dashboard-grid-column-left">
            <ProgressCards />
            <RecentActivities />
          </div>
          <div className="student-dashboard-grid-column-right">
            <PerformanceCharts />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;