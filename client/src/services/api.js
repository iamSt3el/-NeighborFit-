import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response?.status === 404) {
      console.error('API endpoint not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const searchPGs = async (searchParams) => {
  try {
    const response = await api.post('/search', searchParams);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};

export const getPGById = async (id) => {
  try {
    const response = await api.get(`/pgs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get PG details');
  }
};

export const getSearchStats = async () => {
  try {
    const response = await api.get('/search/stats');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get stats');
  }
};

export const getAreas = async () => {
  try {
    const response = await api.get('/pgs/areas');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get areas');
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Server health check failed');
  }
};

export default api;