import React from 'react';
import BlockUnblockButton from '../AdminDash/BlockUnblockButton';
import '../Styles/AdminStyle/UserListTable.css';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';
const BasseUrl = import.meta.env.VITE_BASE_URL
import { getToken } from '../../utils/localstorage';
const UserListTable = ({
  users,
  onSort,
  sortConfig,
  onStatusChange
}) => {
  const token = getToken();
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { label: 'Admin', class: 'ecom-user-table__role--admin' },
      mentor: { label: 'Mentor', class: 'ecom-user-table__role--mentor' },
      employer: { label: 'Employer', class: 'ecom-user-table__role--employer' },
      student: { label: 'Student', class: 'ecom-user-table__role--student' }
    };

    const config = roleConfig[role] || roleConfig.student;
    return (
      <span className={`ecom-user-table__role ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', class: 'ecom-user-table__status--active' },
      inactive: { label: 'Inactive', class: 'ecom-user-table__status--inactive' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`ecom-user-table__status ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <i className="fas fa-sort ecom-user-table__sort-icon"></i>;
    }

    return sortConfig.direction === 'asc'
      ? <i className="fas fa-sort-up ecom-user-table__sort-icon ecom-user-table__sort-icon--active"></i>
      : <i className="fas fa-sort-down ecom-user-table__sort-icon ecom-user-table__sort-icon--active"></i>;
  };

  const handleViewProfile = (id) =>{
    navigate(`/admin/userprofile/${id}`);
  }
  const handleDeleteUser = async (id) =>{
    // Implement delete user functionality here
    try {
      const response = await axios.delete(`${BasseUrl}/users/${id}` , {headers: { Authorization: `Bearer ${token}` }});
      if (response.status === 200) {
        toast.success('User deleted successfully');
        // Optionally, refresh the user list or update state here
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
     console.error("Error deleting user:", error); 
    }
  }

  return (
    <div className="ecom-user-table">
      <div className="ecom-user-table__container">
        <table className="ecom-user-table__table">
          <thead className="ecom-user-table__header">
            <tr>
              <th className="ecom-user-table__th ecom-user-table__th--sortable" onClick={() => onSort('name')}>
                <span className="ecom-user-table__th-content">
                  User
                  <SortIcon columnKey="name" />
                </span>
              </th>
              <th className="ecom-user-table__th">Contact</th>
              <th className="ecom-user-table__th ecom-user-table__th--sortable" onClick={() => onSort('role')}>
                <span className="ecom-user-table__th-content">
                  Role
                  <SortIcon columnKey="role" />
                </span>
              </th>
              <th className="ecom-user-table__th ecom-user-table__th--sortable" onClick={() => onSort('currentStatus')}>
                <span className="ecom-user-table__th-content">
                  Status
                  <SortIcon columnKey="currentStatus" />
                </span>
              </th>
              <th className="ecom-user-table__th ecom-user-table__th--sortable" onClick={() => onSort('createdAt')}>
                <span className="ecom-user-table__th-content">
                  Registered
                  <SortIcon columnKey="createdAt" />
                </span>
              </th>
              <th className="ecom-user-table__th">Actions</th>
            </tr>
          </thead>

          <tbody className="ecom-user-table__body">
            {users.map(user => (
              <tr key={user._id} className="ecom-user-table__row">

                <td className="ecom-user-table__td">
                  <div className="ecom-user-table__user-info">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="ecom-user-table__avatar"
                        onError={(e) => {
                          e.target.src = '/images/avatars/default-avatar.jpg';
                        }}
                      />
                    ) : (
                      <CgProfile className="ecom-user-table__avatar" />
                    )}
                    <div className="ecom-user-table__user-details">
                      <div className="ecom-user-table__name">{user.name}</div>
                      <div className="ecom-user-table__email">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="ecom-user-table__td">
                  <div className="ecom-user-table__contact">
                    <div className="ecom-user-table__phone">{user.email || '—'}</div>
                    <div className="ecom-user-table__location">
                      {user.mobile || 'No Phone Number'}
                    </div>
                  </div>
                </td>

                <td className="ecom-user-table__td">{getRoleBadge(user.role)}</td>
                <td className="ecom-user-table__td">{getStatusBadge(user.currentStatus)}</td>
                <td className="ecom-user-table__td">
                  <div className="ecom-user-table__date">
                    {formatDate(user.createdAt)}
                  </div>
                </td>

                <td className="ecom-user-table__td">
                  <div className="ecom-user-table__actions">
                    <BlockUnblockButton
                      user={user}
                      onStatusChange={onStatusChange}
                    />
                    {/* <button
                      className="ecom-user-table__action-btn ecom-user-table__action-btn--edit"
                      title="Edit User"
                    >
                      <FaEdit />
                    </button> */}
                    <button
                      className="ecom-user-table__action-btn ecom-user-table__action-btn--view"
                      title="View Profile"
                      onClick={() => handleViewProfile(user._id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="ecom-user-table__action-btn ecom-user-table__action-btn--delete"
                      title="Delete User"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="ecom-user-table__empty">
            <div className="ecom-user-table__empty-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="ecom-user-table__empty-title">No users found</h3>
            <p className="ecom-user-table__empty-text">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListTable;
