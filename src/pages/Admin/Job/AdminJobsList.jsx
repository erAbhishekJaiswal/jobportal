import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AdminJobsList.css';
import { useNavigate } from 'react-router-dom';
const BasseUrl = import.meta.env.VITE_BASE_URL

const AdminJobsList = () => {
    const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    isActive: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalJobs: 0
  });
  const [editingJob, setEditingJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BasseUrl}/jobs/admin`);
      const jobsData = response.data;
      
      setJobs(jobsData);
      setPagination(prev => ({
        ...prev,
        totalJobs: jobsData.length,
        totalPages: Math.ceil(jobsData.length / prev.limit)
      }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const applyFilters = () => {
    let filteredJobs = jobs;

    // Search filter
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => job.jobType === filters.jobType);
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filteredJobs = filteredJobs.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    // Active status filter
    if (filters.isActive !== '') {
      filteredJobs = filteredJobs.filter(job => job.isActive === (filters.isActive === 'true'));
    }

    setPagination(prev => ({
      ...prev,
      totalJobs: filteredJobs.length,
      totalPages: Math.ceil(filteredJobs.length / prev.limit),
      page: 1
    }));
  };

  // Get paginated jobs
  const getPaginatedJobs = () => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    
    let filteredJobs = jobs;

    // Apply filters
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => job.jobType === filters.jobType);
    }

    if (filters.experienceLevel) {
      filteredJobs = filteredJobs.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.isActive !== '') {
      filteredJobs = filteredJobs.filter(job => job.isActive === (filters.isActive === 'true'));
    }

    return filteredJobs.slice(startIndex, endIndex);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({
      ...prev,
      limit: Number(newLimit),
      page: 1
    }));
  };

  // CRUD Operations
  const handleEdit = (job) => {
    setEditingJob({ ...job });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BasseUrl}/jobs/${editingJob._id}`, editingJob);
      await fetchJobs();
      setShowEditModal(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDelete = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BasseUrl}/jobs/${jobToDelete._id}`);
      await fetchJobs();
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const toggleJobStatus = async (job) => {
    try {
      await axios.put(`${BasseUrl}/jobs/${job._id}`, {
        isActive: !job.isActive
      });
      await fetchJobs();
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (isActive) => {
    return isActive ? 'adminjobs-status-active' : 'adminjobs-status-inactive';
  };

  const paginatedJobs = getPaginatedJobs();

  const handleAddJob = () => {
    navigate('/admin/postjob');
  }

  return (
    <div className="adminjobs-container">
      {/* Header */}
      <div className="adminjobs-header">
        <div className="adminjobs-header-content">
          <div className="adminjobs-header-text">
            <h1>Jobs Management</h1>
            <p>Manage and monitor all job postings</p>
          </div>
          <div className="adminjobs-header-stats">
            <div className="adminjobs-stat-card">
              <span className="adminjobs-stat-number">{pagination.totalJobs}</span>
              <span className="adminjobs-stat-label">Total Jobs</span>
            </div>
            <div className="adminjobs-stat-card">
              <span className="adminjobs-stat-number">
                {jobs.filter(job => job.isActive).length}
              </span>
              <span className="adminjobs-stat-label">Active Jobs</span>
            </div>
          </div>
          <div className="adminjobs-header-actions">
            <button className="adminjobs-add-job-btn" onClick={handleAddJob}>
              Add Job
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="adminjobs-filters-section">
        <div className="adminjobs-search-container">
          <div className="adminjobs-search-input-wrapper">
            <span className="adminjobs-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search jobs by title, location, or company..."
              value={searchTerm}
              onChange={handleSearch}
              className="adminjobs-search-input"
            />
          </div>
        </div>

        <div className="adminjobs-filter-controls">
          <select
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="adminjobs-filter-select"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <select
            value={filters.experienceLevel}
            onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            className="adminjobs-filter-select"
          >
            <option value="">All Experience Levels</option>
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Executive">Executive</option>
          </select>

          <select
            value={filters.isActive}
            onChange={(e) => handleFilterChange('isActive', e.target.value)}
            className="adminjobs-filter-select"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({
                jobType: '',
                experienceLevel: '',
                isActive: ''
              });
            }}
            className="adminjobs-clear-filters"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="adminjobs-table-section">
        <div className="adminjobs-table-header">
          <h2>Job Listings</h2>
          <div className="adminjobs-table-controls">
            <span>Show:</span>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              className="adminjobs-limit-select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="adminjobs-loading">
            <div className="adminjobs-loading-spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : (
          <>
            <div className="adminjobs-table-container">
              <table className="adminjobs-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Job Type</th>
                    <th>Experience</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th>Posted Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.map((job) => (
                    <tr key={job._id}>
                      <td>
                        <div className="adminjobs-job-title">
                          <span className="adminjobs-title-text">{job.title}</span>
                          {job.skillsRequired && job.skillsRequired.length > 0 && (
                            <div className="adminjobs-skills">
                              {job.skillsRequired.slice(0, 2).map((skill, index) => (
                                <span key={index} className="adminjobs-skill-tag">
                                  {skill}
                                </span>
                              ))}
                              {job.skillsRequired.length > 2 && (
                                <span className="adminjobs-skill-more">
                                  +{job.skillsRequired.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="adminjobs-company">
                          {job.company?.companyName || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="adminjobs-location">{job.location || 'Remote'}</span>
                      </td>
                      <td>
                        <span className="adminjobs-type">{job.jobType}</span>
                      </td>
                      <td>
                        <span className="adminjobs-experience">
                          {job.experienceLevel || 'Not specified'}
                        </span>
                      </td>
                      <td>
                        <span className="adminjobs-salary">
                          {job.salaryRange || 'Not specified'}
                        </span>
                      </td>
                      <td>
                        <span className={`adminjobs-status-badge ${getStatusBadgeClass(job.isActive)}`}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <span className="adminjobs-date">
                          {formatDate(job.postedDate || job.createdAt)}
                        </span>
                      </td>
                      <td>
                        <div className="adminjobs-actions">
                          <button
                            onClick={() => handleEdit(job)}
                            className="adminjobs-action-btn adminjobs-edit-btn"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => toggleJobStatus(job)}
                            className={`adminjobs-action-btn ${
                              job.isActive 
                                ? 'adminjobs-deactivate-btn' 
                                : 'adminjobs-activate-btn'
                            }`}
                            title={job.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {job.isActive ? '⏸️' : '▶️'}
                          </button>
                          <button
                            onClick={() => handleDelete(job)}
                            className="adminjobs-action-btn adminjobs-delete-btn"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="adminjobs-mobile-list">
              {paginatedJobs.map((job) => (
                <div key={job._id} className="adminjobs-mobile-card">
                  <div className="adminjobs-mobile-header">
                    <div className="adminjobs-mobile-title">
                      <h3>{job.title}</h3>
                      <span className={`adminjobs-status-badge ${getStatusBadgeClass(job.isActive)}`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <span className="adminjobs-mobile-company">
                      {job.company?.companyName || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="adminjobs-mobile-details">
                    <div className="adminjobs-mobile-detail">
                      <span>Location:</span>
                      <span>{job.location || 'Remote'}</span>
                    </div>
                    <div className="adminjobs-mobile-detail">
                      <span>Type:</span>
                      <span>{job.jobType}</span>
                    </div>
                    <div className="adminjobs-mobile-detail">
                      <span>Experience:</span>
                      <span>{job.experienceLevel || 'Not specified'}</span>
                    </div>
                    <div className="adminjobs-mobile-detail">
                      <span>Salary:</span>
                      <span>{job.salaryRange || 'Not specified'}</span>
                    </div>
                    <div className="adminjobs-mobile-detail">
                      <span>Posted:</span>
                      <span>{formatDate(job.postedDate || job.createdAt)}</span>
                    </div>
                  </div>

                  {job.skillsRequired && job.skillsRequired.length > 0 && (
                    <div className="adminjobs-mobile-skills">
                      {job.skillsRequired.slice(0, 3).map((skill, index) => (
                        <span key={index} className="adminjobs-skill-tag">
                          {skill}
                        </span>
                      ))}
                      {job.skillsRequired.length > 3 && (
                        <span className="adminjobs-skill-more">
                          +{job.skillsRequired.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="adminjobs-mobile-actions">
                    <button
                      onClick={() => handleEdit(job)}
                      className="adminjobs-action-btn adminjobs-edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => toggleJobStatus(job)}
                      className={`adminjobs-action-btn ${
                        job.isActive 
                          ? 'adminjobs-deactivate-btn' 
                          : 'adminjobs-activate-btn'
                      }`}
                    >
                      {job.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(job)}
                      className="adminjobs-action-btn adminjobs-delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="adminjobs-pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="adminjobs-pagination-btn"
                >
                  Previous
                </button>

                <div className="adminjobs-page-numbers">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`adminjobs-page-btn ${
                        pageNum === pagination.page ? 'adminjobs-page-active' : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="adminjobs-pagination-btn"
                >
                  Next
                </button>

                <div className="adminjobs-pagination-info">
                  Page {pagination.page} of {pagination.totalPages}
                  <span className="adminjobs-pagination-count">
                    ({pagination.totalJobs} jobs)
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingJob && (
        <div className="adminjobs-modal-overlay">
          <div className="adminjobs-modal">
            <div className="adminjobs-modal-header">
              <h3>Edit Job</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="adminjobs-modal-close"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdate} className="adminjobs-modal-form">
              <div className="adminjobs-form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                  className="adminjobs-form-input"
                />
              </div>
              <div className="adminjobs-form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={editingJob.location}
                  onChange={(e) => setEditingJob({...editingJob, location: e.target.value})}
                  className="adminjobs-form-input"
                />
              </div>
              <div className="adminjobs-form-group">
                <label>Salary Range</label>
                <input
                  type="text"
                  value={editingJob.salaryRange}
                  onChange={(e) => setEditingJob({...editingJob, salaryRange: e.target.value})}
                  className="adminjobs-form-input"
                />
              </div>
              <div className="adminjobs-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="adminjobs-modal-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="adminjobs-modal-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && jobToDelete && (
        <div className="adminjobs-modal-overlay">
          <div className="adminjobs-modal adminjobs-delete-modal">
            <div className="adminjobs-modal-header">
              <h3>Confirm Delete</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="adminjobs-modal-close"
              >
                ×
              </button>
            </div>
            <div className="adminjobs-modal-content">
              <p>Are you sure you want to delete the job "<strong>{jobToDelete.title}</strong>"?</p>
              <p className="adminjobs-delete-warning">This action cannot be undone.</p>
            </div>
            <div className="adminjobs-modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="adminjobs-modal-cancel"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="adminjobs-modal-delete"
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobsList;