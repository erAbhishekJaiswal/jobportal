import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSSFiles/shared/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="nf-wrapper">
      <div className="nf-content-box">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Oops! Page Not Found</h2>
        <p className="nf-description">
          The page you're looking for might have been removed,<br />
          had its name changed, or is temporarily unavailable.
        </p>
        <button className="nf-button" onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
