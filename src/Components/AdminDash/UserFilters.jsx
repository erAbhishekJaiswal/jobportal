import React from 'react';
import '../../Components/Styles/AdminStyle/UserFilters.css';

const UserFilters = ({ filters, onFiltersChange, userCount }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'customer', label: 'Customer' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      role: 'all',
      search: '',
      registrationDate: ''
    });
  };

  return (
    <div className="ecom-user-filters">
      <div className="ecom-user-filters__search">
        <div className="ecom-user-filters__search-container">
          <i className="fas fa-search ecom-user-filters__search-icon"></i>
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="ecom-user-filters__search-input"
          />
          {filters.search && (
            <button
              className="ecom-user-filters__search-clear"
              onClick={() => handleFilterChange('search', '')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      <div className="ecom-user-filters__controls">
        <div className="ecom-user-filters__select-group">
          <label className="ecom-user-filters__label">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="ecom-user-filters__select"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ecom-user-filters__select-group">
          <label className="ecom-user-filters__label">Role</label>
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="ecom-user-filters__select"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ecom-user-filters__date-group">
          <label className="ecom-user-filters__label">Registration Date</label>
          <input
            type="date"
            value={filters.registrationDate}
            onChange={(e) => handleFilterChange('registrationDate', e.target.value)}
            className="ecom-user-filters__date-input"
          />
        </div>

        <div className="ecom-user-filters__results">
          <span className="ecom-user-filters__count">{userCount} users found</span>
          {(filters.status !== 'all' || filters.role !== 'all' || filters.search || filters.registrationDate) && (
            <button
              className="ecom-user-filters__clear-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFilters;