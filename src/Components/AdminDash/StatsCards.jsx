// components/StatsCards.js
import React from 'react';

const StatsCards = ({ darkMode }) => {
  const statsData = [
    {
      id: 1,
      title: 'Total Users',
      value: '12,847',
      change: '+12%',
      trend: 'up',
      icon: '👥',
      color: 'stats-card--blue',
      description: 'Active users this month'
    },
    {
      id: 2,
      title: 'Total Courses',
      value: '356',
      change: '+8%',
      trend: 'up',
      icon: '📚',
      color: 'stats-card--green',
      description: 'Published courses'
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$45,289',
      change: '+23%',
      trend: 'up',
      icon: '💰',
      color: 'stats-card--purple',
      description: 'This month revenue'
    },
    {
      id: 4,
      title: 'Completion Rate',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: '🎯',
      color: 'stats-card--orange',
      description: 'Course completion rate'
    }
  ];

  return (
    <section className="stats-cards">
      <div className="stats-cards__grid">
        {statsData.map((stat) => (
          <div 
            key={stat.id} 
            className={`stats-card ${stat.color} ${darkMode ? 'stats-card--dark' : ''}`}
          >
            <div className="stats-card__content">
              <div className="stats-card__header">
                <h3 className="stats-card__title">{stat.title}</h3>
                <div className="stats-card__icon">{stat.icon}</div>
              </div>
              
              <div className="stats-card__main">
                <div className="stats-card__value">{stat.value}</div>
                <div className={`stats-card__change stats-card__change--${stat.trend}`}>
                  {stat.change}
                </div>
              </div>
              
              <p className="stats-card__description">{stat.description}</p>
              
              <div className="stats-card__progress">
                <div 
                  className="stats-card__progress-bar"
                  style={{ width: stat.trend === 'up' ? '75%' : '40%' }}
                ></div>
              </div>
            </div>
            
            <div className="stats-card__sparkle"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCards;