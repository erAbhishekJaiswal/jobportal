// components/ProgressCards.js
import React from 'react';
import "../../CSSFiles/Students/StudentDashboard.css"
import { FaBook } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
const ProgressCards = () => {
  const coursesData = [
    { id: 1, title: 'React Development', progress: 85, totalLessons: 24, completed: 20 },
    { id: 2, title: 'JavaScript Advanced', progress: 65, totalLessons: 18, completed: 12 },
    { id: 3, title: 'UI/UX Design', progress: 45, totalLessons: 15, completed: 7 },
  ];

  const certificatesData = [
    { id: 1, title: 'Web Development Fundamentals', status: 'completed', date: '2024-01-15' },
    { id: 2, title: 'Advanced React Patterns', status: 'in-progress', date: '2024-02-01' },
    { id: 3, title: 'Database Design', status: 'not-started', date: 'Coming soon' },
  ];

  return (
    <div className="student-dashboard-progress-cards-section">
      <div className="student-dashboard-section-header">
        <h2 className="student-dashboard-section-title">Progress Overview</h2>
        <div className="student-dashboard-section-decoration"></div>
      </div>
      
      <div className="student-dashboard-cards-container">
        {/* Courses Progress */}
        <div className="student-dashboard-progress-card courses-card">
          <div className="student-dashboard-card-header">
            
            <div className="student-dashboard-card-icon">
                <FaBook />
            </div>
            <h3 className="student-dashboard-card-title">Courses Progress</h3>
          </div>
          <div className="student-dashboard-card-content">
            {coursesData.map(course => (
              <div key={course.id} className="student-dashboard-course-item">
                <div className="student-dashboard-course-info">
                  <span className="student-dashboard-course-name">{course.title}</span>
                  <span className="student-dashboard-course-stats">{course.completed}/{course.totalLessons} lessons</span>
                </div>
                <div className="student-dashboard-progress-container">
                  <div className="student-dashboard-progress-bar">
                    <div 
                      className="student-dashboard-progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="student-dashboard-progress-percent">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Progress */}
        <div className="student-dashboard-progress-card certificates-card">
          <div className="student-dashboard-card-header">
            <div className="student-dashboard-card-icon">
              <i className="student-dashboard-icon-certificate"><TbCertificate /> </i>
              
            </div>
            <h3 className="student-dashboard-card-title">Certificates</h3>
          </div>
          <div className="student-dashboard-card-content">
            {certificatesData.map(cert => (
              <div key={cert.id} className="student-dashboard-certificate-item">
                <div className="student-dashboard-certificate-info">
                  <span className="student-dashboard-certificate-name">{cert.title}</span>
                  <span className={`student-dashboard-certificate-status student-dashboard-status-${cert.status}`}>
                    {cert.status.replace('-', ' ')}
                  </span>
                </div>
                <span className="student-dashboard-certificate-date">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCards;