// Force production URLs
const isProduction = window.location.hostname !== 'localhost';
const config = {
  API_URL: isProduction ? 'https://syncruncode.onrender.com/api' : 'http://localhost:5000/api',
  SOCKET_URL: isProduction ? 'https://syncruncode.onrender.com' : 'http://localhost:5000',
};

console.log('API Config:', config);
export default config;
