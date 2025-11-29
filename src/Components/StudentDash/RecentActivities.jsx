// components/RecentActivities.js
import React from 'react';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'assignment',
      title: 'Submitted React Project',
      description: 'Completed and submitted the final project for React Development course',
      time: '2 hours ago',
      icon: '📝',
      status: 'completed'
    },
    {
      id: 2,
      type: 'quiz',
      title: 'Completed JavaScript Quiz',
      description: 'Scored 85% on Advanced JavaScript Concepts quiz',
      time: '5 hours ago',
      icon: '📊',
      status: 'completed'
    },
    {
      id: 3,
      type: 'lesson',
      title: 'Watched UI Design Principles',
      description: 'Completed lesson on Advanced UI Design Patterns and Principles',
      time: '1 day ago',
      icon: '🎬',
      status: 'completed'
    },
    {
      id: 4,
      type: 'discussion',
      title: 'Participated in Forum',
      description: 'Active participation in the React Hooks discussion forum',
      time: '2 days ago',
      icon: '💬',
      status: 'completed'
    },
    {
      id: 5,
      type: 'assignment',
      title: 'Database Design Assignment Due',
      description: 'Database normalization assignment due in 2 days',
      time: 'Upcoming',
      icon: '⏰',
      status: 'pending'
    }
  ];

  const getActivityClass = (type) => {
    const typeClasses = {
      assignment: 'activity-type-assignment',
      quiz: 'activity-type-quiz',
      lesson: 'activity-type-lesson',
      discussion: 'activity-type-discussion'
    };
    return typeClasses[type] || 'activity-type-default';
  };

  return (
    <div className="student-dashboard-recent-activities-section">
      <div className="sstudent-dashboard-ection-header">
        <h2 className="student-dashboard-section-title">Recent Activities</h2>
        <div className="student-dashboard-section-decoration"></div>
      </div>

      <div className="student-dashboard-activities-container">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className={`student-dashboard-activity-item ${getActivityClass(activity.type)}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="student-dashboard-activity-icon">
              {activity.icon}
            </div>
            <div className="student-dashboard-activity-content">
              <div className="student-dashboard-activity-header">
                <h4 className="student-dashboard-activity-title">{activity.title}</h4>
                <span className={`student-dashboard-activity-time ${activity.status}`}>
                  {activity.time}
                </span>
              </div>
              <p className="student-dashboard-activity-description">{activity.description}</p>
            </div>
            <div className={`student-dashboard-activity-status-indicator ${activity.status}`}></div>
          </div>
        ))}
      </div>

      <div className="student-dashboard-activities-footer">
        <button className="student-dashboard-view-all-activities-btn">
          View All Activities
          <span className="student-dashboard-btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;