import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './StudentDashboard'
import Sidebar from '../../Components/StudentDash/Sidebar'
import Header from '../../Components/StudentDash/Header'
import Profile from './Profile'
import MyApplications from './MyApplications'

const StudentPages = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
      useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
      }, [darkMode]);

  return (
    <>
    {/* <div className='students-pages-container-box'>  */}
    <div className={`admin-dashboard ${darkMode ? 'admin-dashboard--dark' : ''}`}>
       <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

       <div className="admin-dashboard__main">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
    <Routes >
        <Route path='/' element={<StudentDashboard />} />
        <Route path='/dashboard' element={<StudentDashboard />} />
        <Route path='/profile' element ={<Profile />} />
        <Route path='/:id' element ={<MyApplications />} />
    </Routes>
    </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default StudentPages