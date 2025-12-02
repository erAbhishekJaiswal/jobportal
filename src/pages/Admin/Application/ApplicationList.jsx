// AdminApplicationsTable.js
import React, { useState, useEffect } from 'react';
import './ApplicationList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const BasseUrl = import.meta.env.VITE_BASE_URL
import {getToken} from "../../../utils/localstorage";
const ApplicationList = () => {
  const token = getToken();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    jobTitle: 'all',
    dateRange: 'all'
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Mock data - replace with your API call
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${BasseUrl}/applications/` , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplications(res.data);
        setFilteredApplications(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Extract unique job titles for filter
  const jobTitles = [...new Set(applications.map(app => app?.job?.title))];

  // Filter and search applications
  useEffect(() => {
    let results = applications;

    // Search filter
    if (searchTerm) {
      results = results.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      results = results.filter(app => app.status === filters.status);
    }

    // Job title filter
    if (filters.jobTitle !== 'all') {
      results = results.filter(app => app.job.title === filters.jobTitle);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

      results = results.filter(app => {
        const appDate = new Date(app.createdAt);
        switch (filters.dateRange) {
          case '7days':
            return appDate >= sevenDaysAgo;
          case '30days':
            return appDate >= thirtyDaysAgo;
          default:
            return true;
        }
      });
    }

    setFilteredApplications(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [applications, searchTerm, filters]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortConfig.key === 'createdAt') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    
    if (sortConfig.key === 'salaryExpectation') {
      return sortConfig.direction === 'asc'
        ? parseInt(a.salaryExpectation) - parseInt(b.salaryExpectation)
        : parseInt(b.salaryExpectation) - parseInt(a.salaryExpectation);
    }

    if (sortConfig.key === 'fullName') {
      return sortConfig.direction === 'asc'
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    }

    return 0;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = sortedApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      // Replace with your actual API call
      const updatedApplications = applications.map(app =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      // Replace with your actual API call
      const updatedApplications = applications.filter(app => app._id !== id);
      const response = await axios.delete(`${BasseUrl}/applications/${id}` , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        throw new Error('Failed to delete application');
      }
      toast.success('Application deleted successfully');
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Submitted': '#3b82f6',
      'Under Review': '#f59e0b',
      'Interview': '#8b5cf6',
      'Offer': '#10b981',
      'Rejected': '#ef4444',
      'Hired': '#059669'
    };
    return colors[status] || '#6b7280';
  };

  const getSourceIcon = (source) => {
    const icons = {
      'linkedin': '💼',
      'company_website': '🌐',
      'referral': '👥',
      'job_board': '📋',
      'other': '📧'
    };
    return icons[source] || '📧';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateStats = () => {
    const total = applications.length;
    const submitted = applications.filter(app => app.status === 'Submitted').length;
    const underReview = applications.filter(app => app.status === 'Under Review').length;
    const interview = applications.filter(app => app.status === 'Interview').length;
    const offer = applications.filter(app => app.status === 'Offer').length;
    const hired = applications.filter(app => app.status === 'Hired').length;
    const rejected = applications.filter(app => app.status === 'Rejected').length;

    return { total, submitted, underReview, interview, offer, hired, rejected };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="admin-applications-loading">
        <div className="loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="admin-applications-container">
      {/* Header */}
      <div className="applications-header">
        <div className="header-content">
          <h1 className="applications-title">Job Applications</h1>
          <p className="applications-subtitle">
            Manage and review all job applications in one place
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="applications-controls">
        <div className="controls-top">
          <div className="search-section">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, job title, or location..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="items-per-page">
            <label>Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="page-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Job Title</label>
            <select
              className="filter-select"
              value={filters.jobTitle}
              onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
            >
              <option value="all">All Jobs</option>
              {jobTitles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Date</label>
            <select
              className="filter-select"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          <button 
            className="reset-filters-btn"
            onClick={() => {
              setFilters({ status: 'all', jobTitle: 'all', dateRange: 'all' });
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="applications-table-container">
        <div className="table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('fullName')}
                >
                  <div className="header-content">
                    Candidate
                    <span className="sort-indicator">
                      {sortConfig.key === 'fullName' && (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  </div>
                </th>
                <th>Position</th>
                <th>Location</th>
                <th>Contact</th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('salaryExpectation')}
                >
                  <div className="header-content">
                    Salary
                    <span className="sort-indicator">
                      {sortConfig.key === 'salaryExpectation' && (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  </div>
                </th>
                <th>Source</th>
                {/* <th>Status</th> */}
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="header-content">
                    Applied
                    <span className="sort-indicator">
                      {sortConfig.key === 'createdAt' && (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    <div className="no-applications">
                      <div className="no-applications-icon">📋</div>
                      <h3>No applications found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentApplications.map(application => (
                  <tr key={application._id} className="application-row">
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-avatar">
                          {application?.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="candidate-info">
                          <div className="candidate-name">{application?.fullName}</div>
                          <div className="candidate-email">{application?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="application-job-title">{application?.job?.title}</div>
                      <div className="application-company-name">{application?.job?.company}</div>
                    </td>
                    <td>
                      <div className="application-location">{application?.job?.location}</div>
                    </td>
                    <td>
                      <div className="application-contact-info">
                        <div className="phone">{application?.phone}</div>
                        <div className="notice-period">{application?.noticePeriod}</div>
                      </div>
                    </td>
                    <td>
                      <div className="salary">
                        ₹{parseInt(application?.salaryExpectation).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="source">
                        <span className="source-icon">
                          {getSourceIcon(application?.source)}
                        </span>
                        {application?.source}
                      </div>
                    </td>
                    {/* <td>
                      <select
                        className={`status-select status-${application?.status.toLowerCase().replace(' ', '-')}`}
                        value={application.status}
                        onChange={(e) => handleStatusUpdate(application?._id, e.target.value)}
                        style={{ borderColor: getStatusColor(application?.status) }}
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </td> */}
                    <td>
                      <div className="application-date">
                        {formatDate(application?.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-details-btn"
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowDetailsModal(true);
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(application._id)}
                          className="delete-resume-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredApplications.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredApplications.length)} of {filteredApplications.length} entries
            </div>
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setShowDetailsModal(false)}
          onStatusUpdate={handleStatusUpdate}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

// Application Details Modal Component (same as before)
const ApplicationDetailsModal = ({ application, onClose, onStatusUpdate, getStatusColor }) => {
  const token = getToken();
  const [currentStatus, setCurrentStatus] = useState(application.status);
  const navigate = useNavigate();
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onStatusUpdate(application._id, newStatus);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

 const handleViewResumePdf = async() => {
    const resumeUrl = application.publicId;
    const publicid = encodeURIComponent(resumeUrl);
    const res = await axios.get(`${BasseUrl}/applications/pdf/${publicid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(res);
    navigate(`/admin/resume/${publicid}`, { state: { resume: res.data.signedUrl } });
  }



  return (
    <div className="application-modal-overlay" onClick={handleOverlayClick}>
      <div className="application-modal-container">
        <div className="modal-header">
          <h2>Application Details</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="application-modal-content">
          <div className="modal-section">
            <h3>Candidate Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name:</label>
                <span>{application.fullName}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{application.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{application.phone}</span>
              </div>
              <div className="info-item">
                <label>Applied On:</label>
                <span>{new Date(application.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Job Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Position:</label>
                <span>{application.job.title}</span>
              </div>
              <div className="info-item">
                <label>Company:</label>
                <span>{application.job.company}</span>
              </div>
              <div className="info-item">
                <label>Location:</label>
                <span>{application.job.location}</span>
              </div>
              <div className="info-item">
                <label>Salary Expectation:</label>
                <span>${parseInt(application.salaryExpectation).toLocaleString()}</span>
              </div>
              <div className="info-item">
                <label>Notice Period:</label>
                <span>{application.noticePeriod}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Application Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Source:</label>
                <span>{application.source}</span>
              </div>
              <div className="info-item">
                <label>Portfolio:</label>
                <span>
                  <a href={application.portfolio} target="_blank" rel="noopener noreferrer">
                    {application.portfolio}
                  </a>
                </span>
              </div>
              <div className="info-item">
                <label>LinkedIn:</label>
                <span>
                  <a href={application.linkedin} target="_blank" rel="noopener noreferrer">
                    {application.linkedin}
                  </a>
                </span>
              </div>
              {/* <div className="info-item">
                <label>Status:</label>
                <select
                  className="status-select-modal"
                  value={currentStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  style={{ borderColor: getStatusColor(currentStatus) }}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div> */}
            </div>
          </div>

          <div className="modal-section">
            <h3>Cover Letter</h3>
            <div className="cover-letter-content">
              <p>{application.coverLetter}</p>
            </div>
          </div>

          <div className="modal-section">
            <h3>Documents</h3>
            <div className="document-actions">
              <button 
                onClick={handleViewResumePdf}
                className="document-btn primary"
              >
                📄 View Resume
              </button>
              <button className="document-btn secondary" onClick={() => window.open(`mailto:${application.email}`)}>
                📧 Send Email
              </button>
              {/* <button className="document-btn secondary">
                📝 Add Note
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;