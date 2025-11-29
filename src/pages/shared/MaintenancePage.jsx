import React from 'react';
import '../../CSSFiles/shared/MaintenancePage.css';

const MaintenancePage = () => {
  return (
    <div className="mp-wrapper">
      <div className="mp-content-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5948/5948527.png"
          alt="Under Maintenance"
          className="mp-maintenance-icon"
        />
        <h1 className="mp-heading">We'll Be Back Soon!</h1>
        <p className="mp-message">
          We're currently performing some scheduled maintenance. <br />
          We’ll be back online shortly!
        </p>
        <div className="mp-footer">Thank you for your patience 💙</div>
      </div>
    </div>
  );
};

export default MaintenancePage;
