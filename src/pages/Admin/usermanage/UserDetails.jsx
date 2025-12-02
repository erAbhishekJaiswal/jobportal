// AdminUserDetail.js
import React, { useState, useEffect } from "react";
import "../../../CSSFiles/Admin/UserDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const BasseUrl = import.meta.env.VITE_BASE_URL
import { getToken } from "../../../utils/localstorage";

const AdminUserDetail = ({ onBack }) => {
  const token = getToken();
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
        const response = await axios.get(`${BasseUrl}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
