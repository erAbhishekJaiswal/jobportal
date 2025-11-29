// components/Header.js
import React from 'react';
import { Link } from "react-router-dom";
import "../../CSSFiles/Admin/AdminDashboard.css";
import { PiStudentBold } from "react-icons/pi";
const Header = ({ onMenuClick, darkMode, onThemeToggle }) => {
  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <button 
          className="admin-header__menu-btn"
          onClick={onMenuClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* <h1 className="admin-header__title">Admin Dashboard</h1> */}
        <div className="navbar-logo-section">
          <div className="student-header__logo-wrapper">
            <div className="student-header__logo-icon"><img className="student-header__logo-image-icon" src="https://www.kumarinfotech.com/img/logo/kitlogonew.webp" alt="KIT" /></div>
            <div className="student-header__logo-content">
              <h1 className="student-header__logo-title">KIT Job Portal</h1>
              {/* <p className="student-header__logo-tagline">Learn Smarter, Achieve Faster</p> */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="admin-header__right">
        {/* <button 
          className="admin-header__theme-btn"
          onClick={onThemeToggle}
        >
          {darkMode ? '☀️' : '🌙'}
        </button> */}
        
        <div className="admin-header__search">
          {/* <input 
            type="text" 
            placeholder="Search..."
            className="admin-header__search-input"
          /> */}
        </div>
        
        <div className="admin-header__user">
          <Link to="/student/profile">
          <div className="admin-header__avatar"><PiStudentBold /></div>
          {/* <span className="admin-header__username">Student</span> */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;