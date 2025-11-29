import React from 'react';
import '../../CSSFiles/shared/InternalError.css';

const InternalError = () => {
  const handleRetry = () => {
    window.location.reload(); // or a custom error handler
  };

  return (
    <div className="ie-container">
      <div className="ie-card">
        <div className="ie-icon">⚠️</div>
        <h1 className="ie-title">Something went wrong</h1>
        <p className="ie-message">
          We’re sorry, but an internal error has occurred. Please try again later.
        </p>
        <button className="ie-button" onClick={handleRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default InternalError;
