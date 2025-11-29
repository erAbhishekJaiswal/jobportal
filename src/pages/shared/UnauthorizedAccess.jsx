import React from "react";
import "../../CSSFiles/shared/UnauthorizedAccess.css";

const UnauthorizedAccess = () => {
  return (
    <div className="unauth-access-container">
      <div className="unauth-access-box">
        <h1 className="unauth-access-title">401 - Unauthorized</h1>
        <p className="unauth-access-message">
          Oops! You don’t have permission to access this page.
        </p>
        <a href="/" className="unauth-access-button">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
