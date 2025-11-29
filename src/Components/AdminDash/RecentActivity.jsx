// components/RecentActivity.js
import React from 'react';

const RecentActivity = ({ darkMode }) => {
  const activities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'enrolled in',
      target: 'Advanced React Course',
      time: '2 minutes ago',
      icon: '🎓',
      type: 'enrollment'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'completed',
      target: 'JavaScript Fundamentals',
      time: '1 hour ago',
      icon: '✅',
      type: 'completion'
    },
    {
      id: 3,
      user: 'Emma Davis',
      action: 'purchased',
      target: 'UX Design Masterclass',
      time: '3 hours ago',
      icon: '💰',
      type: 'purchase'
    },
    {
      id: 4,
      user: 'Alex Rodriguez',
      action: 'submitted assignment for',
      target: 'Data Science Bootcamp',
      time: '5 hours ago',
      icon: '📝',
      type: 'submission'
    },
    {
      id: 5,
      user: 'Lisa Wang',
      action: 'rated',
      target: 'Web Development Course',
      time: '1 day ago',
      icon: '⭐',
      type: 'rating'
    },
    {
      id: 6,
      user: 'David Kim',
      action: 'started new course',
      target: 'Mobile App Development',
      time: '2 days ago',
      icon: '📱',
      type: 'enrollment'
    }
  ];

  const getActivityColor = (type) => {
    const colors = {
      enrollment: 'activity-item--blue',
      completion: 'activity-item--green',
      purchase: 'activity-item--purple',
      submission: 'activity-item--orange',
      rating: 'activity-item--yellow'
    };
    return colors[type] || 'activity-item--blue';
  };

  return (
    <section className="recent-activity">
      <div className={`activity-container ${darkMode ? 'activity-container--dark' : ''}`}>
        <div className="activity-container__header">
          <h3 className="activity-container__title">Recent Activity</h3>
          <button className="activity-container__view-all">View All</button>
        </div>
        
        <div className="activity-list">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`activity-item ${getActivityColor(activity.type)} ${darkMode ? 'activity-item--dark' : ''}`}
            >
              <div className="activity-item__icon">{activity.icon}</div>
              
              <div className="activity-item__content">
                <p className="activity-item__text">
                  <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                </p>
                <span className="activity-item__time">{activity.time}</span>
              </div>
              
              <div className="activity-item__indicator"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;