import React from "react";
import "../../CSSFiles/shared/ComingSoon.css";
import { FaArrowLeft } from "react-icons/fa";
const ComingSoon = () => {
  return (
    <div className="cs-wrapper">
      <div className="back-to-home">
              <a href="https://elearning.kumarinfotech.net/" className="back-to-home-btn"> <FaArrowLeft /> Back to Home</a>
              </div>
      <div className="cs-content-box">
        <h1 className="cs-title">Coming Soon</h1>
        <p className="cs-subtitle">
          We are crafting something amazing. Stay tuned!
        </p>

        {/* <div className="cs-timer-box">
          <div className="cs-timer-item">
            <span className="cs-timer-number">10</span>
            <span className="cs-timer-label">Days</span>
          </div>
          <div className="cs-timer-item">
            <span className="cs-timer-number">14</span>
            <span className="cs-timer-label">Hours</span>
          </div>
          <div className="cs-timer-item">
            <span className="cs-timer-number">45</span>
            <span className="cs-timer-label">Minutes</span>
          </div>
          <div className="cs-timer-item">
            <span className="cs-timer-number">22</span>
            <span className="cs-timer-label">Seconds</span>
          </div>
        </div>

        <input 
          type="email" 
          className="cs-email-input" 
          placeholder="Enter your email for updates"
        />

        <button className="cs-notify-btn">Notify Me</button> */}

        <p className="cs-footer-text">© 2025 KumarInfoTech — All Rights Reserved</p>
      </div>
    </div>
  );
};

export default ComingSoon;
