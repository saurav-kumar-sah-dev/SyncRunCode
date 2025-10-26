// Test API configuration
console.log('API Configuration Test:');
console.log('API_URL:', 'https://syncruncode.onrender.com/api');
console.log('SOCKET_URL:', 'https://syncruncode.onrender.com');

// Test API call
fetch('https://syncruncode.onrender.com/api/health')
  .then(response => response.json())
  .then(data => console.log('Health check:', data))
  .catch(error => console.error('Health check failed:', error));
