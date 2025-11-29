// // AdminUserDetail.js
// import React, { useState, useEffect } from 'react';
// import '../../../CSSFiles/Admin/UserDetails.css';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// const BasseUrl = import.meta.env.VITE_BASE_URL
// const UserDetails = ({ onBack }) => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});

//   // Mock data - replace with your API call
//   useEffect(() => {
//     const fetchUserDetail = async () => {
//       try {
//         // Replace with your actual API call
//         // const response = await axios.get(`${BasseUrl}/users/${id}`);
//         // const data = response.data;
//         // console.log(data);

//         const mockUserData = {
//           "currentStatus": "active",
//           "_id": "68ecd9938ee926faf8cda99e",
//           "name": "Abhishek Sharma",
//           "email": "abhi@gmail.com",
//           "role": "student",
//           "profile": {
//             "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//             "phone": "+91 98765 43210",
//             "location": "Mumbai, India",
//             "education": "B.Tech Computer Science",
//             "university": "University of Mumbai",
//             "graduationYear": "2024",
//             "bio": "Passionate full-stack developer with expertise in MERN stack. Looking for opportunities to build innovative solutions.",
//             "experience": "1 year",
//             "resumeUrl": "https://example.com/resume.pdf"
//           },
//           "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Express", "Python"],
//           "readbooks": [
//             {
//               "_id": "1",
//               "title": "Clean Code",
//               "author": "Robert C. Martin",
//               "progress": 100,
//               "completedAt": "2025-09-15"
//             },
//             {
//               "_id": "2",
//               "title": "The Pragmatic Programmer",
//               "author": "Andrew Hunt",
//               "progress": 85,
//               "completedAt": "2025-10-20"
//             }
//           ],
//           "appliedJobs": [
//             {
//               "_id": "690c8257db76c81256f98b52",
//               "title": "Senior Frontend Developer",
//               "company": "TechCorp Inc.",
//               "status": "Under Review",
//               "appliedAt": "2025-11-10",
//               "location": "San Francisco, CA"
//             },
//             {
//               "_id": "690c8257db76c81256f98b53",
//               "title": "Full Stack Developer",
//               "company": "StartupXYZ",
//               "status": "Interview",
//               "appliedAt": "2025-11-08",
//               "location": "Remote"
//             }
//           ],
//           "internApplications": [
//             {
//               "_id": "69119233b36a8dabf9c14d13",
//               "position": "Software Development Intern",
//               "company": "Google",
//               "status": "Submitted",
//               "appliedAt": "2025-11-05",
//               "duration": "6 months"
//             }
//           ],
//           "certificates": [
//             {
//               "_id": "1",
//               "name": "AWS Certified Developer",
//               "issuer": "Amazon Web Services",
//               "issuedDate": "2025-08-15",
//               "validTill": "2027-08-15",
//               "credentialUrl": "https://example.com/certificate1"
//             },
//             {
//               "_id": "2",
//               "name": "React Developer Certification",
//               "issuer": "Meta",
//               "issuedDate": "2025-07-20",
//               "validTill": null,
//               "credentialUrl": "https://example.com/certificate2"
//             }
//           ],
//           "activity": [
//             {
//               "_id": "1",
//               "action": "applied_job",
//               "description": "Applied for Senior Frontend Developer at TechCorp Inc.",
//               "timestamp": "2025-11-10T14:30:00Z"
//             },
//             {
//               "_id": "2",
//               "action": "completed_book",
//               "description": "Completed reading 'Clean Code'",
//               "timestamp": "2025-09-15T10:15:00Z"
//             },
//             {
//               "_id": "3",
//               "action": "earned_certificate",
//               "description": "Earned AWS Certified Developer certificate",
//               "timestamp": "2025-08-15T16:45:00Z"
//             }
//           ],
//           "createdAt": "2025-10-13T10:50:59.290Z",
//           "updatedAt": "2025-11-10T08:20:15.123Z",
//           "__v": 0
//         };
//         setUser(mockUserData);
//         setEditForm({
//           name: mockUserData.name,
//           email: mockUserData.email,
//           role: mockUserData.role,
//           currentStatus: mockUserData.currentStatus,
//           ...mockUserData.profile
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserDetail();
//   }, [id]);

//   const handleEditToggle = () => {
//     if (isEditing) {
//       // Save changes
//       handleSaveChanges();
//     } else {
//       setIsEditing(true);
//     }
//   };

//   const handleSaveChanges = async () => {
//     try {
//       // Replace with your actual API call
//       // await axios.patch(`/api/v1/admin/users/${userId}`, editForm);
//       setUser(prev => ({
//         ...prev,
//         ...editForm,
//         profile: {
//           ...prev.profile,
//           phone: editForm.phone,
//           location: editForm.location,
//           education: editForm.education,
//           university: editForm.university,
//           graduationYear: editForm.graduationYear,
//           bio: editForm.bio,
//           experience: editForm.experience
//         }
//       }));
//       setIsEditing(false);
//       // toast.success('User updated successfully');
//     } catch (error) {
//       console.error('Error updating user:', error);
//       // toast.error('Failed to update user');
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setEditForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       // Replace with your actual API call
//       // await axios.patch(`/api/v1/admin/users/${userId}/status`, { status: newStatus });
//       setUser(prev => ({ ...prev, currentStatus: newStatus }));
//       setEditForm(prev => ({ ...prev, currentStatus: newStatus }));
//       // toast.success(`User status updated to ${newStatus}`);
//     } catch (error) {
//       console.error('Error updating status:', error);
//       // toast.error('Failed to update status');
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'active': '#10b981',
//       'inactive': '#6b7280',
//       'suspended': '#ef4444',
//       'pending': '#f59e0b'
//     };
//     return colors[status] || '#6b7280';
//   };

//   const getRoleColor = (role) => {
//     const colors = {
//       'student': '#3b82f6',
//       'professional': '#8b5cf6',
//       'admin': '#ef4444',
//       'employer': '#f59e0b'
//     };
//     return colors[role] || '#6b7280';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="admin-user-detail-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading user details...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="admin-user-detail-error">
//         <div className="error-icon">⚠️</div>
//         <h3>User Not Found</h3>
//         <p>The requested user could not be found.</p>
//         <button className="back-button" onClick={onBack}>
//           ← Back to Users
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-user-detail-container">
//       {/* Header */}
//       <div className="user-detail-header">
//         <button className="back-button" onClick={onBack}>
//           ← Back to Users
//         </button>
//         <div className="header-actions">
//           <button 
//             className={`status-btn status-${user.currentStatus}`}
//             onClick={() => handleStatusChange(
//               user.currentStatus === 'active' ? 'inactive' : 'active'
//             )}
//           >
//             {user.currentStatus === 'active' ? 'Deactivate' : 'Activate'}
//           </button>
//           <button className="edit-btn" onClick={handleEditToggle}>
//             {isEditing ? 'Save Changes' : 'Edit Profile'}
//           </button>
//         </div>
//       </div>

//       <div className="user-detail-content">
//         {/* Sidebar */}
//         <div className="user-profile-sidebar">
//           <div className="profile-card">
//             <div className="profile-avatar-section">
//               <img 
//                 src={user.profile?.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`} 
//                 alt={user.name}
//                 className="profile-avatar"
//               />
//               <div className="profile-status">
//                 <div 
//                   className="status-indicator" 
//                   style={{ backgroundColor: getStatusColor(user.currentStatus) }}
//                 ></div>
//                 <span className="status-text">{user.currentStatus}</span>
//               </div>
//             </div>

//             <div className="profile-info">
//               <h1 className="user-name">{user.name}</h1>
//               <p className="user-email">{user.email}</p>
//               <div 
//                 className="user-role-tag"
//                 style={{ backgroundColor: getRoleColor(user.role) }}
//               >
//                 {user.role}
//               </div>
//             </div>

//             <div className="profile-stats">
//               <div className="stat-item">
//                 <span className="stat-number">{user.appliedJobs.length}</span>
//                 <span className="stat-label">Jobs Applied</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-number">{user.readbooks.length}</span>
//                 <span className="stat-label">Books Read</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-number">{user.certificates.length}</span>
//                 <span className="stat-label">Certificates</span>
//               </div>
//             </div>

//             <div className="profile-meta">
//               <div className="meta-item">
//                 <span className="meta-label">Member Since</span>
//                 <span className="meta-value">{formatDate(user.createdAt)}</span>
//               </div>
//               <div className="meta-item">
//                 <span className="meta-label">Last Updated</span>
//                 <span className="meta-value">{formatDate(user.updatedAt)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="quick-actions-card">
//             <h3>Quick Actions</h3>
//             <div className="action-buttons">
//               <button className="action-btn message">
//                 ✉️ Send Message
//               </button>
//               <button className="action-btn resume">
//                 📄 View Resume
//               </button>
//               <button className="action-btn notes">
//                 📝 Add Notes
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="user-detail-main">
//           {/* Navigation Tabs */}
//           <div className="detail-tabs">
//             <button 
//               className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
//               onClick={() => setActiveTab('overview')}
//             >
//               Overview
//             </button>
//             <button 
//               className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
//               onClick={() => setActiveTab('applications')}
//             >
//               Applications ({user.appliedJobs.length + user.internApplications.length})
//             </button>
//             <button 
//               className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
//               onClick={() => setActiveTab('skills')}
//             >
//               Skills & Certificates
//             </button>
//             <button 
//               className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
//               onClick={() => setActiveTab('activity')}
//             >
//               Activity
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="tab-content-area">
//             {activeTab === 'overview' && (
//               <div className="tab-panel">
//                 <div className="panel-section">
//                   <h2>Profile Information</h2>
//                   <div className="info-grid">
//                     <div className="info-group">
//                       <label>Full Name</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           className="edit-input"
//                           value={editForm.name}
//                           onChange={(e) => handleInputChange('name', e.target.value)}
//                         />
//                       ) : (
//                         <span>{user.name}</span>
//                       )}
//                     </div>
//                     <div className="info-group">
//                       <label>Email Address</label>
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           className="edit-input"
//                           value={editForm.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                         />
//                       ) : (
//                         <span>{user.email}</span>
//                       )}
//                     </div>
//                     <div className="info-group">
//                       <label>Phone Number</label>
//                       {isEditing ? (
//                         <input
//                           type="tel"
//                           className="edit-input"
//                           value={editForm.phone || ''}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                         />
//                       ) : (
//                         <span>{user.profile?.phone || 'Not provided'}</span>
//                       )}
//                     </div>
//                     <div className="info-group">
//                       <label>Location</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           className="edit-input"
//                           value={editForm.location || ''}
//                           onChange={(e) => handleInputChange('location', e.target.value)}
//                         />
//                       ) : (
//                         <span>{user.profile?.location || 'Not provided'}</span>
//                       )}
//                     </div>
//                     <div className="info-group">
//                       <label>Education</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           className="edit-input"
//                           value={editForm.education || ''}
//                           onChange={(e) => handleInputChange('education', e.target.value)}
//                         />
//                       ) : (
//                         <span>{user.profile?.education || 'Not provided'}</span>
//                       )}
//                     </div>
//                     <div className="info-group">
//                       <label>University</label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           className="edit-input"
//                           value={editForm.university || ''}
//                           onChange={(e) => handleInputChange('university', e.target.value)}
//                         />
//                       ) : (
//                         <span>{user.profile?.university || 'Not provided'}</span>
//                       )}
//                     </div>
//                     <div className="info-group full-width">
//                       <label>Bio</label>
//                       {isEditing ? (
//                         <textarea
//                           className="edit-textarea"
//                           value={editForm.bio || ''}
//                           onChange={(e) => handleInputChange('bio', e.target.value)}
//                           rows="4"
//                         />
//                       ) : (
//                         <p>{user.profile?.bio || 'No bio provided'}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="panel-section">
//                   <h2>Recent Activity</h2>
//                   <div className="activity-feed">
//                     {user.activity.slice(0, 5).map(activity => (
//                       <div key={activity._id} className="activity-item">
//                         <div className="activity-icon">
//                           {activity.action === 'applied_job' && '💼'}
//                           {activity.action === 'completed_book' && '📚'}
//                           {activity.action === 'earned_certificate' && '🏆'}
//                         </div>
//                         <div className="activity-content">
//                           <p className="activity-description">{activity.description}</p>
//                           <span className="activity-time">
//                             {formatDateTime(activity.timestamp)}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'applications' && (
//               <div className="tab-panel">
//                 <div className="applications-section">
//                   <h2>Job Applications</h2>
//                   <div className="applications-grid">
//                     {user.appliedJobs.map(job => (
//                       <div key={job._id} className="application-card">
//                         <div className="application-header">
//                           <h3 className="job-title">{job.title}</h3>
//                           <span className={`status-tag status-${job.status.toLowerCase()}`}>
//                             {job.status}
//                           </span>
//                         </div>
//                         <p className="company-name">{job.company}</p>
//                         <div className="application-meta">
//                           <span className="location">{job.location}</span>
//                           <span className="applied-date">
//                             Applied {formatDate(job.appliedAt)}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="applications-section">
//                   <h2>Internship Applications</h2>
//                   <div className="applications-grid">
//                     {user.internApplications.map(intern => (
//                       <div key={intern._id} className="application-card">
//                         <div className="application-header">
//                           <h3 className="job-title">{intern.position}</h3>
//                           <span className={`status-tag status-${intern.status.toLowerCase()}`}>
//                             {intern.status}
//                           </span>
//                         </div>
//                         <p className="company-name">{intern.company}</p>
//                         <div className="application-meta">
//                           <span className="duration">{intern.duration}</span>
//                           <span className="applied-date">
//                             Applied {formatDate(intern.appliedAt)}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'skills' && (
//               <div className="tab-panel">
//                 <div className="skills-section">
//                   <h2>Skills & Technologies</h2>
//                   <div className="skills-grid">
//                     {user.skills.map((skill, index) => (
//                       <div key={index} className="skill-tag">
//                         {skill}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="certificates-section">
//                   <h2>Certificates & Achievements</h2>
//                   <div className="certificates-grid">
//                     {user.certificates.map(cert => (
//                       <div key={cert._id} className="certificate-card">
//                         <div className="certificate-header">
//                           <h3 className="certificate-name">{cert.name}</h3>
//                           <span className="issuer">{cert.issuer}</span>
//                         </div>
//                         <div className="certificate-meta">
//                           <span>Issued: {formatDate(cert.issuedDate)}</span>
//                           {cert.validTill && (
//                             <span>Valid till: {formatDate(cert.validTill)}</span>
//                           )}
//                         </div>
//                         <a 
//                           href={cert.credentialUrl} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="view-certificate-btn"
//                         >
//                           View Certificate
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="books-section">
//                   <h2>Books Read</h2>
//                   <div className="books-grid">
//                     {user.readbooks.map(book => (
//                       <div key={book._id} className="book-card">
//                         <div className="book-info">
//                           <h3 className="book-title">{book.title}</h3>
//                           <p className="book-author">by {book.author}</p>
//                         </div>
//                         <div className="book-progress">
//                           <div className="progress-bar">
//                             <div 
//                               className="progress-fill" 
//                               style={{ width: `${book.progress}%` }}
//                             ></div>
//                           </div>
//                           <span className="progress-text">{book.progress}%</span>
//                         </div>
//                         {book.completedAt && (
//                           <span className="completed-date">
//                             Completed {formatDate(book.completedAt)}
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'activity' && (
//               <div className="tab-panel">
//                 <h2>User Activity Timeline</h2>
//                 <div className="activity-timeline">
//                   {user.activity.map(activity => (
//                     <div key={activity._id} className="timeline-item">
//                       <div className="timeline-marker"></div>
//                       <div className="timeline-content">
//                         <div className="activity-icon">
//                           {activity.action === 'applied_job' && '💼'}
//                           {activity.action === 'completed_book' && '📚'}
//                           {activity.action === 'earned_certificate' && '🏆'}
//                         </div>
//                         <div className="activity-details">
//                           <p className="activity-description">{activity.description}</p>
//                           <span className="activity-time">
//                             {formatDateTime(activity.timestamp)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;















// AdminUserDetail.js
import React, { useState, useEffect } from "react";
import "../../../CSSFiles/Admin/UserDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const BasseUrl = import.meta.env.VITE_BASE_URL

const AdminUserDetail = ({ onBack }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Fetch mock data (replace with API later)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API call
        const response = await axios.get(`${BasseUrl}/users/${id}`);
        const data = response.data;
        console.log(data);

        const mockUser = {
          currentStatus: "active",
          _id: id,
          name: "Abhishek Sharma",
          email: "abhi@gmail.com",
          role: "student",
          profile: {
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            phone: "+91 98765 43210",
            location: "Mumbai, India",
            education: "B.Tech Computer Science",
            university: "University of Mumbai",
            graduationYear: "2024",
            bio: "Passionate full-stack developer with MERN stack expertise.",
          },
          skills: ["JavaScript", "React", "Node.js", "MongoDB"],
          certificates: [
            {
              _id: "1",
              name: "AWS Certified Developer",
              issuer: "Amazon Web Services",
              issuedDate: "2025-08-15",
              credentialUrl: "https://example.com/certificate1",
            },
          ],
          appliedJobs: [
            {
              _id: "j1",
              title: "Frontend Developer",
              company: "TechCorp",
              status: "Interview",
              appliedAt: "2025-11-10",
            },
          ],
          activity: [
            {
              _id: "a1",
              description:
                "Applied for Frontend Developer at TechCorp Inc.",
              timestamp: "2025-11-10T14:30:00Z",
              action: "applied_job",
            },
          ],
          createdAt: "2025-10-13T10:50:59.290Z",
          updatedAt: "2025-11-10T08:20:15.123Z",
        };
        setUser(data);
        setEditForm({
          name: mockUser.name,
          email: mockUser.email,
          phone: mockUser.profile.phone,
          location: mockUser.profile.location,
          bio: mockUser.profile.bio,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load user:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEditToggle = () => {
    if (isEditing) handleSave();
    else setIsEditing(true);
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      profile: {
        ...prev.profile,
        phone: editForm.phone,
        location: editForm.location,
        bio: editForm.bio,
      },
    }));
    setIsEditing(false);
    alert("✅ User updated successfully!");
  };

  const handleInputChange = (field, value) =>
    setEditForm((prev) => ({ ...prev, [field]: value }));

  if (loading)
    return (
      <div className="user-detail-loading">
        <p>Loading user details...</p>
      </div>
    );

  if (!user)
    return (
      <div className="user-detail-error">
        <p>User not found.</p>
        <button onClick={onBack}>← Back</button>
      </div>
    );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="admin-user-detail">
      {/* Header */}
      <div className="detail-header">
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>
        <div className="header-actions">
          {/* <button
            className="status-btn"
            onClick={() =>
              setUser((prev) => ({
                ...prev,
                currentStatus:
                  prev.currentStatus === "active" ? "inactive" : "active",
              }))
            }
          >
            {user.currentStatus === "active" ? "Deactivate" : "Activate"}
          </button> */}
          {/* <button className="edit-btn" onClick={handleEditToggle}>
            {isEditing ? "Save" : "Edit"}
          </button> */}
        </div>
      </div>

      {/* Main Layout */}
      <div className="user-detail-body">
        {/* Sidebar */}
        <aside className="user-sidebar">
          <img
            src={user?.profile?.avatar}
            alt={user?.name}
            className="user-avatar"
          />
          <h2>{user?.name}</h2>
          <p className="user-email">{user?.email}</p>
          <span className="user-role">{user?.role}</span>
          <p className="user-status">
            Status: <b>{user?.currentStatus}</b>
          </p>
          <p>Member since: {formatDate(user?.createdAt)}</p>
        </aside>

        {/* Main Info */}
        <main className="user-main">
          {/* Tabs */}
          <div className="tabs">
            {["overview", "applications", "skills", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${
                  activeTab === tab ? "active-tab" : ""
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <section className="tab-content">
              <h3>Profile</h3>
              <div className="info-grid">
                <div>
                  <label>Name</label>
                  {isEditing ? (
                    <input
                      value={editForm.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  ) : (
                    <span>{user?.name}</span>
                  )}
                </div>
                <div>
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      value={editForm?.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <span>{user?.email}</span>
                  )}
                </div>
                <div>
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      value={editForm.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  ) : (
                    <span>{user?.profile?.phone}</span>
                  )}
                </div>
                <div className="full">
                  <label>Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        handleInputChange("bio", e.target.value)
                      }
                    />
                  ) : (
                    <p>{user?.profile?.bio}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <section className="tab-content">
              <h3>Applications</h3>
              {user?.appliedJobs?.map((job) => (
                <div key={job?._id} className="job-card">
                  <h4>{job?.title}</h4>
                  <p>{job?.company}</p>
                  <span>{job?.status}</span>
                  <p>Applied on {formatDate(job?.appliedAt)}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <section className="tab-content">
              <h3>Skills</h3>
              <div className="skill-list">
                {user.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
              <h3>Certificates</h3>
              {user.certificates?.map((c) => (
                <div key={c?._id} className="certificate-card">
                  <h4>{c?.name}</h4>
                  <p>{c?.issuer}</p>
                  <a href={c?.credentialUrl} target="_blank">
                    View
                  </a>
                </div>
              ))}
            </section>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <section className="tab-content">
              <h3>Recent Activity</h3>
              {user.activity?.map((act) => (
                <div key={act?._id} className="activity-item">
                  <span>{act?.description}</span>
                  <p>{formatDate(act?.timestamp)}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUserDetail;
