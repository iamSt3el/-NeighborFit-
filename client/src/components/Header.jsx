import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const Header = ({ stats }) => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const userData = authService.getStoredUser();
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="logo">
              <i className="fas fa-building"></i> NeighborFit
            </Link>
            <p className="tagline">Smart PG Matching for Young Professionals</p>
          </div>
          
          <div className="nav-center">
            <div className="nav-stats">
              <span className="stat-item">
                <i className="fas fa-home"></i>
                <span>{stats?.totalPGs || 0}</span> PGs
              </span>
              <span className="stat-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{stats?.areas || 0}</span> Areas
              </span>
              <span className="stat-item">
                <i className="fas fa-rupee-sign"></i>
                <span>₹{stats?.avgPrice || 0}</span> Avg
              </span>
            </div>
          </div>

          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <span className="welcome-text">Welcome, {user.name}</span>
                <button className="logout-button desktop-only" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="login-link">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </Link>
                <Link to="/signup" className="signup-link">
                  <i className="fas fa-user-plus"></i>
                  Sign Up
                </Link>
              </div>
            )}
            
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="mobile-sidebar-overlay" onClick={toggleMobileMenu}>
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sidebar-header">
              <h3>
                <i className="fas fa-building"></i>
                NeighborFit
              </h3>
              <button className="close-sidebar" onClick={toggleMobileMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="mobile-sidebar-content">
              <div className="mobile-nav-links">
                <Link to="/" className="mobile-nav-link">
                  <i className="fas fa-home"></i>
                  Home
                </Link>
                <Link to="/search" className="mobile-nav-link">
                  <i className="fas fa-search"></i>
                  Search PGs
                </Link>
              </div>
              
              {user ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <i className="fas fa-user-circle"></i>
                    <span>Welcome, {user.name}</span>
                  </div>
                  <button className="mobile-logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-section">
                  <Link to="/login" className="mobile-auth-link login">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                  </Link>
                  <Link to="/signup" className="mobile-auth-link signup">
                    <i className="fas fa-user-plus"></i>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;