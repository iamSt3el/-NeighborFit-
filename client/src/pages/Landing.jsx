import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalPGs: 500,
    areas: 15,
    avgPrice: 12000,
    happyUsers: 10000
  });

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

  const handleGetStarted = () => {
    navigate('/search');
  };

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
      <div className="landing-page">
        {/* Header */}
        <nav className="landing-navbar">
          <div className="landing-nav-container">
            <div className="nav-brand">
              <h1 className="logo">
                <i className="fas fa-building"></i> NeighborFit
              </h1>
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

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Perfect PG in
              <span className="highlight"> Bangalore</span>
            </h1>
            <p className="hero-subtitle">
              Smart matching algorithm that finds PG accommodations tailored to your lifestyle, budget, and preferences. Join thousands of young professionals who found their ideal home.
            </p>
            <div className="hero-actions">
              <button className="cta-button primary" onClick={handleGetStarted}>
                <i className="fas fa-search"></i>
                Find Your PG
              </button>
              <Link to="/search" className="cta-button secondary">
                <i className="fas fa-play"></i>
                Watch Demo
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{stats.totalPGs}+</span>
                <span className="stat-label">PG Listings</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.areas}+</span>
                <span className="stat-label">Areas Covered</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.happyUsers}+</span>
                <span className="stat-label">Happy Users</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <i className="fas fa-building"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose NeighborFit?</h2>
            <p>Our intelligent platform makes finding the perfect PG simple, fast, and reliable</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Smart Matching Algorithm</h3>
              <p>Our AI-powered system analyzes your preferences to find PGs that perfectly match your lifestyle and budget requirements.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Verified Properties</h3>
              <p>All PG listings are verified with real photos, authentic reviews, and contact information to ensure transparency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Real-time Results</h3>
              <p>Get instant search results with live availability updates and immediate booking options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Community Focused</h3>
              <p>Connect with like-minded professionals and find PGs that match your social and professional preferences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile Friendly</h3>
              <p>Search and book PGs on the go with our responsive design that works perfectly on all devices.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is available round the clock to help you with any queries or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Find your perfect PG in just three simple steps</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Set Your Preferences</h3>
                <p>Tell us about your budget, room type, lifestyle preferences, and desired amenities.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get Smart Matches</h3>
                <p>Our algorithm analyzes your preferences and shows you PGs with match scores.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Book Your PG</h3>
                <p>Contact owners directly, schedule visits, and secure your ideal accommodation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect PG?</h2>
            <p>Join thousands of young professionals who found their ideal home with NeighborFit</p>
            <div className="cta-actions">
              <button className="cta-button primary large" onClick={handleGetStarted}>
                <i className="fas fa-search"></i>
                Start Your Search
              </button>
              {!user && (
                <Link to="/signup" className="cta-button secondary large">
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>
                <i className="fas fa-building"></i>
                NeighborFit
              </h3>
              <p>Smart PG matching for young professionals in Bangalore. Find your perfect home today.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/search">Search PGs</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="mailto:support@neighborfit.com">Help Center</a></li>
                <li><a href="tel:+918000000000">Contact Us</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#facebook"><i className="fab fa-facebook"></i></a>
                <a href="#twitter"><i className="fab fa-twitter"></i></a>
                <a href="#instagram"><i className="fab fa-instagram"></i></a>
                <a href="#linkedin"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NeighborFit. All rights reserved. Built with ❤️ for young professionals in Bangalore.</p>
          </div>
        </div>
      </footer>
      </div>

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

export default Landing;