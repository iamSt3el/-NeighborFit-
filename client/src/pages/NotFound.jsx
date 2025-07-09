import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-illustration">
            <div className="error-number">404</div>
            <div className="error-icons">
              <i className="fas fa-home"></i>
              <i className="fas fa-question"></i>
              <i className="fas fa-search"></i>
            </div>
          </div>
          
          <div className="error-text">
            <h1>Page Not Found</h1>
            <p>
              Oops! The page you're looking for doesn't exist. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="error-actions">
            <button className="error-button primary" onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to Home
            </button>
            <button className="error-button secondary" onClick={handleGoBack}>
              <i className="fas fa-arrow-left"></i>
              Go Back
            </button>
          </div>

          <div className="helpful-links">
            <h3>Maybe you were looking for:</h3>
            <div className="link-grid">
              <Link to="/" className="helpful-link">
                <i className="fas fa-home"></i>
                <span>Home Page</span>
              </Link>
              <Link to="/search" className="helpful-link">
                <i className="fas fa-search"></i>
                <span>Search PGs</span>
              </Link>
              <Link to="/login" className="helpful-link">
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link to="/signup" className="helpful-link">
                <i className="fas fa-user-plus"></i>
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="not-found-illustration">
          <div className="floating-elements">
            <div className="floating-element element-1">
              <i className="fas fa-building"></i>
            </div>
            <div className="floating-element element-2">
              <i className="fas fa-home"></i>
            </div>
            <div className="floating-element element-3">
              <i className="fas fa-map-marker-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;