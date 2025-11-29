import React, { useState } from 'react';
import '../Styles/AdminStyle/BlockUnblockButton.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const BasseUrl = import.meta.env.VITE_BASE_URL
const BlockUnblockButton = ({ user, onStatusChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // console.log(user);
  
  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    console.log('new status',newStatus);
    
    // Simulate API call
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.put(`${BasseUrl}/users/${user._id}/status`, { status: newStatus });
      if (response.status === 200) {
        toast.success('User status updated successfully');
      } else {
        toast.error('Failed to update user status');
      }
      onStatusChange(user.id, newStatus);
      setShowConfirm(false);
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonConfig = () => {
    const configs = {
      active: {
        label: 'Block',
        icon: 'fa-ban',
        color: 'warning',
        confirmTitle: 'Block User',
        confirmMessage: `Are you sure you want to block ${user.name}? They will not be able to access their account.`,
        confirmButton: 'Block User',
        newStatus: 'blocked'
      },
      blocked: {
        label: 'Unblock',
        icon: 'fa-check',
        color: 'success',
        confirmTitle: 'Unblock User',
        confirmMessage: `Are you sure you want to unblock ${user.name}? They will regain access to their account.`,
        confirmButton: 'Unblock User',
        newStatus: 'active'
      },
      inactive: {
        label: 'Activate',
        icon: 'fa-play',
        color: 'info',
        confirmTitle: 'Activate User',
        confirmMessage: `Are you sure you want to activate ${user.name}?`,
        confirmButton: 'Activate User',
        newStatus: 'active'
      }
    };

    return configs[user.currentStatus] || configs.active;
  };

  const config = getButtonConfig();

  if (isLoading) {
    return (
      <button 
        className="ecom-block-unblock-btn ecom-block-unblock-btn--loading"
        disabled
      >
        <div className="ecom-block-unblock-btn__spinner"></div>
        Processing...
      </button>
    );
  }

  return (
    <>
      <button
        className={`ecom-block-unblock-btn ecom-block-unblock-btn--${config.color}`}
        onClick={() => setShowConfirm(true)}
        title={config.label}
      >
        <i className={`fas ${config.icon}`}></i>
        {config.label}
      </button>

      {showConfirm && (
        <div className="ecom-block-unblock-confirm">
          <div className="ecom-block-unblock-confirm__overlay" onClick={() => setShowConfirm(false)}></div>
          
          <div className="ecom-block-unblock-confirm__content">
            <div className="ecom-block-unblock-confirm__header">
              <h3 className="ecom-block-unblock-confirm__title">{config.confirmTitle}</h3>
              <button 
                className="ecom-block-unblock-confirm__close"
                onClick={() => setShowConfirm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="ecom-block-unblock-confirm__body">
              <div className="ecom-block-unblock-confirm__user">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="ecom-block-unblock-confirm__avatar"
                  onError={(e) => {
                    e.target.src = '/images/avatars/default-avatar.jpg';
                  }}
                />
                <div className="ecom-block-unblock-confirm__user-info">
                  <div className="ecom-block-unblock-confirm__name">{user.name}</div>
                  <div className="ecom-block-unblock-confirm__email">{user.email}</div>
                  <div className="ecom-block-unblock-confirm__role">{user.role}</div>
                </div>
              </div>
              
              <p className="ecom-block-unblock-confirm__message">{config.confirmMessage}</p>
            </div>
            
            <div className="ecom-block-unblock-confirm__actions">
              <button
                className="ecom-block-unblock-confirm__btn ecom-block-unblock-confirm__btn--cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              
              <button
                className={`ecom-block-unblock-confirm__btn ecom-block-unblock-confirm__btn--${config.color}`}
                onClick={() => handleStatusChange(config.newStatus)}
              >
                {config.confirmButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockUnblockButton;