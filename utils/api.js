import axios from 'axios';
import { API_URL } from './constants';

// Create an optimized axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Optimize for performance
  maxRedirects: 5,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Default
  },
});

// Request interceptor - can be used for adding auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here (e.g., auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally if needed
    return Promise.reject(error);
  }
);

export default apiClient;

