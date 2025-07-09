import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication functions
export const authService = {
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to get user data' };
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await api.put('/auth/preferences', { preferences });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to update preferences' };
    }
  },

  // Add to favorites
  addToFavorites: async (pgId) => {
    try {
      const response = await api.post('/auth/favorites', { pgId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to add to favorites' };
    }
  },

  // Remove from favorites
  removeFromFavorites: async (pgId) => {
    try {
      const response = await api.delete(`/auth/favorites/${pgId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to remove from favorites' };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Get stored user data
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;