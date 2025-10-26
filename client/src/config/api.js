// Get environment variables with explicit fallbacks
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://syncruncode.onrender.com';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://syncruncode.onrender.com';

const config = {
  API_URL: API_BASE_URL, // Don't add /api here, let axios calls handle it
  SOCKET_URL: SOCKET_URL,
};

// Debug logging for development and production
console.log('Environment Variables:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  NODE_ENV: import.meta.env.NODE_ENV,
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV
});
console.log('Resolved URLs:', {
  API_BASE_URL,
  SOCKET_URL
});
console.log('Final API Config:', config);

// Force production environment detection
if (import.meta.env.PROD) {
  console.log('Production mode - API URL:', config.API_URL);
}

export default config;