const config = {
  API_URL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
};

console.log('Environment Variables:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  NODE_ENV: import.meta.env.NODE_ENV
});
console.log('API Config:', config);

export default config;
