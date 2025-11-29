// components/ChartsSection.js
import React, { useState, useEffect } from 'react';

const ChartsSection = ({ darkMode }) => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Mock data for enrollments
    const enrollments = [
      { month: 'Jan', enrollments: 1200 },
      { month: 'Feb', enrollments: 1800 },
      { month: 'Mar', enrollments: 1500 },
      { month: 'Apr', enrollments: 2200 },
      { month: 'May', enrollments: 2800 },
      { month: 'Jun', enrollments: 3200 }
    ];

    // Mock data for revenue
    const revenue = [
      { month: 'Jan', revenue: 12500 },
      { month: 'Feb', revenue: 18900 },
      { month: 'Mar', revenue: 15200 },
      { month: 'Apr', revenue: 22800 },
      { month: 'May', revenue: 28500 },
      { month: 'Jun', revenue: 32500 }
    ];

    setEnrollmentData(enrollments);
    setRevenueData(revenue);
  }, []);

  const maxEnrollment = Math.max(...enrollmentData.map(d => d.enrollments));
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <section className="charts-section">
      <div className="charts-section__grid">
        {/* Enrollments Chart */}
        <div className={`chart-container ${darkMode ? 'chart-container--dark' : ''}`}>
          <div className="chart-container__header">
            <h3 className="chart-container__title">Enrollment Trends</h3>
            <select className="chart-container__filter">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Last Quarter</option>
            </select>
          </div>
          
          <div className="chart-bars">
            {enrollmentData.map((data, index) => (
              <div key={index} className="chart-bar-group">
                <div 
                  className="chart-bar chart-bar--primary"
                  style={{ 
                    height: `${(data.enrollments / maxEnrollment) * 100}%` 
                  }}
                >
                  <div className="chart-bar__tooltip">
                    {data.enrollments.toLocaleString()} enrollments
                  </div>
                </div>
                <span className="chart-bar__label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className={`chart-container ${darkMode ? 'chart-container--dark' : ''}`}>
          <div className="chart-container__header">
            <h3 className="chart-container__title">Revenue Analytics</h3>
            <select className="chart-container__filter">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Last Quarter</option>
            </select>
          </div>
          
          <div className="chart-bars">
            {revenueData.map((data, index) => (
              <div key={index} className="chart-bar-group">
                <div 
                  className="chart-bar chart-bar--secondary"
                  style={{ 
                    height: `${(data.revenue / maxRevenue) * 100}%` 
                  }}
                >
                  <div className="chart-bar__tooltip">
                    ${data.revenue.toLocaleString()}
                  </div>
                </div>
                <span className="chart-bar__label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`quick-stats ${darkMode ? 'quick-stats--dark' : ''}`}>
          <h3 className="quick-stats__title">Performance Metrics</h3>
          
          <div className="quick-stats__grid">
            <div className="metric-card">
              <div className="metric-card__icon">📱</div>
              <div className="metric-card__content">
                <div className="metric-card__value">84%</div>
                <div className="metric-card__label">Mobile Users</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-card__icon">⏱️</div>
              <div className="metric-card__content">
                <div className="metric-card__value">12.4m</div>
                <div className="metric-card__label">Avg. Watch Time</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-card__icon">⭐</div>
              <div className="metric-card__content">
                <div className="metric-card__value">4.8</div>
                <div className="metric-card__label">Avg. Rating</div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-card__icon">🔄</div>
              <div className="metric-card__content">
                <div className="metric-card__value">92%</div>
                <div className="metric-card__label">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;