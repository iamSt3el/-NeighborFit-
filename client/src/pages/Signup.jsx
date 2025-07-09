import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profession: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.profession) {
      newErrors.profession = 'Profession is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        profession: formData.profession
      });
      
      if (result.success) {
        // Navigate to home page
        navigate('/');
      } else {
        setErrors({ submit: result.message || 'Registration failed. Please try again.' });
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
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });
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
          <h1>Create Account</h1>
          <p>Join thousands of young professionals finding their perfect PG</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                <i className="fas fa-phone"></i>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="profession">
                <i className="fas fa-briefcase"></i>
                Profession
              </label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className={errors.profession ? 'error' : ''}
              >
                <option value="">Select your profession</option>
                <option value="student">Student</option>
                <option value="software-engineer">Software Engineer</option>
                <option value="marketing">Marketing Professional</option>
                <option value="finance">Finance Professional</option>
                <option value="consultant">Consultant</option>
                <option value="designer">Designer</option>
                <option value="other">Other</option>
              </select>
              {errors.profession && <span className="error-message">{errors.profession}</span>}
            </div>
          </div>

          <div className="form-row">
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
                placeholder="Create a password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="fas fa-lock"></i>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              I agree to the{' '}
              <Link to="/terms" className="terms-link">Terms & Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy" className="terms-link">Privacy Policy</Link>
            </label>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-illustration">
        <div className="illustration-content">
          <i className="fas fa-users"></i>
          <h3>Join Our Community</h3>
          <p>Connect with thousands of young professionals and find your ideal living space</p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">PG Listings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Areas Covered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;