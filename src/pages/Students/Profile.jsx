// import React, { useEffect, useState } from "react";
// import "../../CSSFiles/Students/Profile.css";
// import axios from "axios";
// import { isUserLoggedIn } from "../../utils/localstorage";
// const BasseUrl = import.meta.env.VITE_BASE_URL
// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "Loading...",
//     email: "Loading...",
//     role: "Loading...",
//     phone: "Loading...",
//     profileImage:
//       "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
//     location: "Loading...",
//     skills: ["Loading..."],
//     readbooks: ["Loading..."],
//     appliedJobs: ["Loading..."],
//     internApplications: ["Loading..."],
//     certificates: ["Loading..."],
//     totalTests: 0,
//     totalBooksRead: 0,
//     resumeLink: "https://example.com/resume.pdf",
//     createdAt: "Loading...",
//     curruntStatus: "Loading...",
//   });

//   const token = isUserLoggedIn();

//   const fetchUserData = async () => {
//     try {
//       // send api with token in header
//       const response = await axios.get(
//         `${BasseUrl}/users/profile`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = response.data;
//       console.log(response);

//       setUser(data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");

//   const handleEditClick = () => {
//     setIsEditing(true);
//     // Perform any necessary actions to enable editing
//   };

//   // get user data
//   const handleSaveClick = () => {
//     setIsEditing(false);

//   };

//   // Mock data for demonstration
//   const stats = [
//     // { label: "Books Read", value: user.totalBooksRead, color: "#4f46e5" },
//     // { label: "Tests Taken", value: user.totalTests, color: "#059669" },
//     // { label: "Jobs Applied", value: user.appliedJobs.length, color: "#dc2626" },
//     // {
//     //   label: "Certificates",
//     //   value: user.certificates.length,
//     //   color: "#7c3aed",
//     // },
//   ];

//   const recentActivities = [
//     // {
//     //   type: "book",
//     //   action: "finished reading",
//     //   title: "React Advanced Patterns",
//     //   time: "2 hours ago",
//     // },
//     // {
//     //   type: "test",
//     //   action: "completed",
//     //   title: "JavaScript Fundamentals",
//     //   time: "1 day ago",
//     // },
//     // {
//     //   type: "job",
//     //   action: "applied to",
//     //   title: "Frontend Developer at TechCorp",
//     //   time: "3 days ago",
//     // },
//     // {
//     //   type: "certificate",
//     //   action: "earned",
//     //   title: "MongoDB Certification",
//     //   time: "1 week ago",
//     // },
//   ];

//   return (
//     <div className="profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <div className="header-background"></div>
//         <div className="profile-info">
//           <div className="avatar-section">
//             <img
//               src={user.profileImage || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
//               alt={user.name}
//               className="profile-avatar"
//             />
//             <div className="status-indicator">
//               <span className={`status-dot ${user.curruntStatus}`}></span>
//               {user.curruntStatus}
//             </div>
//           </div>
//           <div className="user-details">
//             <h1 className="user-name">{user.name}</h1>
//             <p className="user-role">{user.role}</p>
//             <p className="user-location">📍 {user.location}</p>
//             <div className="user-meta">
//               <span className="meta-item">📧 {user.email}</span>
//               <span className="meta-item">📱 {user.phone}</span>
//               <span className="meta-item">
//                 📅 Joined {new Date(user.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//           <div className="action-buttons">
//             {/* <button
//               className="btn-primary"
//               onClick={() => setIsEditing(!isEditing)}
//             >
//               {isEditing ? "Save Changes" : "Edit Profile"}
//             </button>
//             <button className="btn-secondary">Download Resume</button> */}
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="profile-tabs">
//         {["overview", "skills", "achievements", "activity"].map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="profile-content">
//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="tab-content">
//             <div className="stats-grid">
//               {stats?.map((stat, index) => (
//                 <div key={index} className="stat-card">
//                   <div
//                     className="stat-icon"
//                     style={{ backgroundColor: `${stat.color}20` }}
//                   >
//                     <div
//                       className="stat-dot"
//                       style={{ backgroundColor: stat.color }}
//                     ></div>
//                   </div>
//                   <div className="stat-info">
//                     <h3 className="stat-value">{stat.value}</h3>
//                     <p className="stat-label">{stat.label}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="content-grid">
//               <div className="skills-preview">
//                 <h3>Skills</h3>
//                 <div className="skills-list">
//                   {user.skills.slice(0, 5).map((skill, index) => (
//                     <span key={index} className="skill-tag">
//                       {skill}
//                     </span>
//                   ))}
//                   {user.skills.length > 5 && (
//                     <span className="skill-tag more">
//                       +{user.skills.length - 5} more
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="recent-activity">
//                 <h3>Recent Activity</h3>
//                 <div className="activity-list">
//                   {recentActivities?.map((activity, index) => (
//                     <div key={index} className="activity-item">
//                       <div className="activity-icon">
//                         {activity.type === "book" && "📚"}
//                         {activity.type === "test" && "📝"}
//                         {activity.type === "job" && "💼"}
//                         {activity.type === "certificate" && "🏆"}
//                       </div>
//                       <div className="activity-details">
//                         <p className="activity-text">
//                           <strong>{activity.action}</strong> {activity.title}
//                         </p>
//                         <span className="activity-time">{activity.time}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Skills Tab */}
//         {activeTab === "skills" && (
//           <div className="tab-content">
//             <div className="skills-section">
//               <h2>Technical Skills</h2>
//               <div className="skills-grid">
//                 {user.skills.map((skill, index) => (
//                   <div key={index} className="skill-card">
//                     <div className="skill-header">
//                       <h4>{skill}</h4>
//                       <div className="skill-level">Advanced</div>
//                     </div>
//                     <div className="skill-progress">
//                       <div
//                         className="skill-progress-bar"
//                         style={{ width: `${Math.random() * 50 + 50}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Achievements Tab */}
//         {activeTab === "achievements" && (
//           <div className="tab-content">
//             <div className="achievements-grid">
//               {/* <div className="achievement-card">
//                 <div className="achievement-icon">📚</div>
//                 <h4>Book Worm</h4>
//                 <p>Read {user.totalBooksRead} books</p>
//               </div>
//               <div className="achievement-card">
//                 <div className="achievement-icon">📝</div>
//                 <h4>Test Master</h4>
//                 <p>Completed {user.totalTests} tests</p>
//               </div> */}
//               <div className="achievement-card">
//                 <div className="achievement-icon">💼</div>
//                 <h4>Job Hunter</h4>
//                 <p>Applied to {user.appliedJobs.length} jobs</p>
//               </div>
//               <div className="achievement-card">
//                 <div className="achievement-icon">🏆</div>
//                 <h4>Certified Pro</h4>
//                 <p>Earned {user.certificates.length} certificates</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Activity Tab */}
//         {activeTab === "activity" && (
//           <div className="tab-content">
//             <div className="activity-timeline">
//               {recentActivities.map((activity, index) => (
//                 <div key={index} className="timeline-item">
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <div className="activity-icon-large">
//                       {activity.type === "book" && "📚"}
//                       {activity.type === "test" && "📝"}
//                       {activity.type === "job" && "💼"}
//                       {activity.type === "certificate" && "🏆"}
//                     </div>
//                     <div className="timeline-details">
//                       <h4>{activity.title}</h4>
//                       <p>You {activity.action} this item</p>
//                       <span className="timeline-time">{activity.time}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import "../../CSSFiles/Students/Profile.css";
import axios from "axios";
import { isUserLoggedIn } from "../../utils/localstorage";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    role: "Loading...",
    phone: "Loading...",
    profileImage: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
    location: "Loading...",
    skills: ["Loading..."],
    achivements: ["Loading..."],
    bio: "Loading...",
    appliedJobs: ["Loading..."],
    internApplications: ["Loading..."],
    certificates: ["Loading..."],
    resumeLink: "https://example.com/resume.pdf",
    createdAt: "Loading...",
    currentStatus: "Loading...",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = isUserLoggedIn();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data;
      setUser(data);
      // Initialize edit form data with current user data
      setEditFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        skills: data.skills?.join(", ") || "",
        achivements: data.achivements?.join(", ") || "",
        resumeLink: data.resumeLink || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      showMessage("error", "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      // Format the data for backend
      const formattedData = {
        ...editFormData,
        skills: editFormData.skills.split(",").map(skill => skill.trim()).filter(skill => skill),
        achivements: editFormData.achivements.split(",").map(ach => ach.trim()).filter(ach => ach),
      };

      const response = await axios.put(
        `${BaseUrl}/users/${user._id}`,
        formattedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      setShowEditModal(false);
      showMessage("success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      showMessage("error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    // Reset form data to current user data
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
      skills: user.skills?.join(", ") || "",
      achivements: user.achivements?.join(", ") || "",
      resumeLink: user.resumeLink || "",
    });
  };

  // Mock data for demonstration
  const stats = [
    { label: "Jobs Applied", value: user.appliedJobs?.length || 0, color: "#dc2626" },
    { label: "Intern Applications", value: user.internApplications?.length || 0, color: "#059669" },
    { label: "Certificates", value: user.certificates?.length || 0, color: "#7c3aed" },
    { label: "Skills", value: user.skills?.length || 0, color: "#4f46e5" },
  ];

  const recentActivities = [
    {
      type: "job",
      action: "applied to",
      title: "Frontend Developer at TechCorp",
      time: "3 days ago",
    },
    {
      type: "certificate",
      action: "earned",
      title: "MongoDB Certification",
      time: "1 week ago",
    },
  ];

  return (
    <div className="profile-container">
      {/* Message Alert */}
      {message.text && (
        <div className={`message-alert message-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Header Section */}
      <div className="profile-header">
        <div className="header-background"></div>
        <div className="profile-info">
          <div className="avatar-section">
            <img
              src={user.profileImage || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
              alt={user.name}
              className="profile-avatar"
            />
            <div className="status-indicator">
              <span className={`status-dot ${user.currentStatus}`}></span>
              {user.currentStatus}
            </div>
          </div>
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-role">{user.role}</p>
            <p className="user-location">📍 {user.location}</p>
            <div className="user-meta">
              <span className="meta-item">📧 {user.email}</span>
              <span className="meta-item">📱 {user.phone}</span>
              <span className="meta-item">
                📅 Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            {user.bio && (
              <div className="user-bio">
                <p>{user.bio}</p>
              </div>
            )}
          </div>
          <div className="action-buttons">
            <button className="btn-primary" onClick={handleEditClick}>
              Edit Profile
            </button>
            {user.resumeLink && (
              <a href={user.resumeLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View Resume
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        {["overview", "skills", "achievements", "activity"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div
                    className="stat-icon"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <div
                      className="stat-dot"
                      style={{ backgroundColor: stat.color }}
                    ></div>
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="content-grid">
              <div className="skills-preview">
                <h3>Skills</h3>
                <div className="skills-list">
                  {user.skills?.slice(0, 5).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {user.skills?.length > 5 && (
                    <span className="skill-tag more">
                      +{user.skills.length - 5} more
                    </span>
                  )}
                  {(!user.skills || user.skills.length === 0) && (
                    <span className="no-data">No skills added yet</span>
                  )}
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === "book" && "📚"}
                        {activity.type === "test" && "📝"}
                        {activity.type === "job" && "💼"}
                        {activity.type === "certificate" && "🏆"}
                      </div>
                      <div className="activity-details">
                        <p className="activity-text">
                          <strong>{activity.action}</strong> {activity.title}
                        </p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="tab-content">
            <div className="skills-section">
              <h2>Technical Skills</h2>
              <div className="skills-grid">
                {user.skills?.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="skill-header">
                      <h4>{skill}</h4>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-progress">
                      <div
                        className="skill-progress-bar"
                        style={{ width: `${Math.random() * 50 + 50}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {(!user.skills || user.skills.length === 0) && (
                  <div className="no-data-message">
                    <p>No skills added yet. Add some skills to your profile!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="tab-content">
            <div className="achievements-grid">
              <div className="achievement-card">
                <div className="achievement-icon">💼</div>
                <h4>Job Hunter</h4>
                <p>Applied to {user.appliedJobs?.length || 0} jobs</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <h4>Certified Pro</h4>
                <p>Earned {user.certificates?.length || 0} certificates</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">🚀</div>
                <h4>Intern Seeker</h4>
                <p>{user.internApplications?.length || 0} intern applications</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">⭐</div>
                <h4>Skill Master</h4>
                <p>{user.skills?.length || 0} skills mastered</p>
              </div>
            </div>
            
            {user.achivements && user.achivements.length > 0 && (
              <div className="achievements-list">
                <h3>Achievements</h3>
                <div className="achievements-tags">
                  {user.achivements.map((achievement, index) => (
                    <span key={index} className="achievement-tag">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="tab-content">
            <div className="activity-timeline">
              {recentActivities.map((activity, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="activity-icon-large">
                      {activity.type === "book" && "📚"}
                      {activity.type === "test" && "📝"}
                      {activity.type === "job" && "💼"}
                      {activity.type === "certificate" && "🏆"}
                    </div>
                    <div className="timeline-details">
                      <h4>{activity.title}</h4>
                      <p>You {activity.action} this item</p>
                      <span className="timeline-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={editFormData.location}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editFormData.bio}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="3"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="skills">Skills (comma separated)</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={editFormData.skills}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="JavaScript, React, Node.js, MongoDB"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="achivements">Achievements (comma separated)</label>
                  <input
                    type="text"
                    id="achivements"
                    name="achivements"
                    value={editFormData.achivements}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Hackathon Winner, Best Project Award, Certification"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="resumeLink">Resume Link</label>
                  <input
                    type="url"
                    id="resumeLink"
                    name="resumeLink"
                    value={editFormData.resumeLink}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/your-resume.pdf"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={handleCloseModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleSaveClick}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;