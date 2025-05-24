// API configuration
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3000/api'
  : 'https://clueless-backend-a9j4.onrender.com/api';

export { API_BASE_URL }; 