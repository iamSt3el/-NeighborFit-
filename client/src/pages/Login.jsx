import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await authService.login({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        // Navigate to home page
        navigate('/');
      } else {
        setErrors({ submit: result.message || 'Login failed. Please try again.' });
      }
    } catch (error) {
      if (error.errors) {
        // Handle validation errors
        const validationErrors = {};
        error.errors.forEach(err => {
          validationErrors[err.path] = err.msg;
        });
        setErrors(validationErrors);
      } else {
        // Check if user not found - redirect to signup
        if (error.message && (
          error.message.includes('User not found') || 
          error.message.includes('Invalid email') ||
          error.message.includes('not found')
        )) {
          setErrors({ 
            submit: (
              <span>
                Account not found. <Link to="/signup" className="signup-redirect">Create an account</Link> to continue.
              </span>
            )
          });
        } else {
          setErrors({ submit: error.message || 'Login failed. Please try again.' });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <i className="fas fa-building"></i>
            <span>NeighborFit</span>
          </Link>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-illustration">
        <div className="illustration-content">
          <i className="fas fa-home"></i>
          <h3>Find Your Perfect PG</h3>
          <p>Discover amazing PG accommodations tailored to your lifestyle and budget</p>
          <div className="feature-list">
            <div className="feature-item">
              <i className="fas fa-brain"></i>
              <span>Smart Matching</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <span>Verified Properties</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-clock"></i>
              <span>Real-time Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;