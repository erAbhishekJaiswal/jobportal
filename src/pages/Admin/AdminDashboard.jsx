// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import '../../CSSFiles/Admin/AdminDashboard.css';
import StatsCards from '../../Components/AdminDash/StatsCards';
import ChartsSection from '../../Components/AdminDash/ChartsSection';
import RecentActivity from '../../Components/AdminDash/RecentActivity';
// import Sidebar from '../../Components/AdminDash/Sidebar';
// import Header from '../../Components/AdminDash/Header';

const AdminDashboard = ({ dark }) => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(dark);
  console.log(dark);
  

  // useEffect(() => {
  //   document.body.className = darkMode ? 'dark-mode' : '';
  // }, [darkMode]);

  return (
    <div className={`admin-dashboard ${dark ? 'admin-dashboard--dark' : ''}`}>
      <div className="admin-dashboard__main">
        <div className="admin-dashboard__content">
        <h1 className="admin-header__title">Admin Dashboard</h1>

          <StatsCards 
          darkMode={dark} 
          />
          <ChartsSection 
          darkMode={dark} 
          />
          <RecentActivity 
          darkMode={dark} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;