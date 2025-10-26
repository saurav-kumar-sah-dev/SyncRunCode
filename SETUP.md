# Quick Setup Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (for local development)
- Git (for version control)

### Quick Start (Windows)
1. Open PowerShell as Administrator
2. Run: `npm run install-all`
3. Copy: `copy server\env.example server\.env`
4. Copy: `copy client\env.example client\.env`
5. Start MongoDB service or use Docker
6. Run: `npm run dev`
7. Open: http://localhost:3000

### Option 1: Local Development

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Set up Environment Variables**
   ```bash
   # Windows
   copy server\env.example server\.env
   copy client\env.example client\.env
   
   # Linux/Mac
   cp server/env.example server/.env
   cp client/env.example client/.env
   
   # Edit both .env files with your settings
   # Default values work for local development
   ```

3. **Start MongoDB**
   ```bash
   # Using MongoDB service (Linux/Mac)
   sudo systemctl start mongod
   
   # Windows - Download and install MongoDB Community Server
   # Or using Docker (all platforms)
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or use MongoDB Atlas (cloud) - no local installation needed
   ```

4. **Start the Application**
   ```bash
   # This starts both frontend and backend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Option 2: Production Deployment

1. **Deploy Backend to Render**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
   - Backend will be available at your Render URL

2. **Deploy Frontend to Vercel**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
   - Frontend will be available at your Vercel URL

## 🎯 Features Included

### ✅ Core Features
- **Multi-Language Support**: JavaScript, Python, Java, C++, C, TypeScript
- **Real-time Code Execution**: Instant compilation and execution
- **Monaco Editor**: Advanced code editor with syntax highlighting
- **Project Management**: Save, load, and organize code projects
- **Real-time Collaboration**: Work together on projects
- **User Authentication**: Secure registration and login

### ✅ Modern UI/UX
- **Dark Theme**: Beautiful, eye-friendly interface
- **Responsive Design**: Works on all devices
- **Tailwind CSS**: Utility-first styling
- **Fast Development**: Vite for lightning-fast builds

## 🔧 Configuration

### Server Environment Variables (server/.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/syncruncode
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EXECUTION_TIMEOUT=5000
MAX_FILE_SIZE=10485760
```

### Client Environment Variables (client/.env)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Production Environment Variables
For production deployment, update the URLs:
- **Server**: Change `CORS_ORIGIN` to your frontend domain
- **Client**: Change `VITE_API_URL` and `VITE_SOCKET_URL` to your backend domain

## 🚀 Quick Commands

```bash
# Install all dependencies
npm run install-all

# Start development (both frontend and backend)
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build

# Start production server
npm start
```

## 🔍 Testing the Application

1. **Open the application** at http://localhost:3000
2. **Create an account** or login
3. **Select a language** (e.g., JavaScript)
4. **Write some code**:
   ```javascript
   console.log("Hello, World!");
   ```
5. **Click "Run"** to execute the code
6. **Save the project** for later access

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - For Windows: Make sure MongoDB service is started

2. **JSX Syntax Errors**
   - All context files should be `.jsx` not `.js`
   - Restart the development server after file changes

3. **Code Execution Fails**
   - Check if required compilers are installed
   - Verify file permissions for temp directories

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill processes using the ports
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

5. **Build Failures**
   - Check if all dependencies are installed
   - Verify Node.js version compatibility
   - Run `npm run install-all` to reinstall everything

6. **Windows-Specific Issues**
   - Use PowerShell or Command Prompt as Administrator
   - Ensure Node.js and npm are properly installed
   - Check Windows Defender isn't blocking the application

## 📚 Next Steps

1. **Customize the UI**: Modify Tailwind configuration
2. **Add More Languages**: Extend language support
3. **Deploy to Production**: Use Render and Vercel
4. **Add Features**: Implement additional functionality
5. **Monitor Performance**: Set up analytics and monitoring

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check the README.md for detailed documentation

---

**Happy Coding! 🎉**