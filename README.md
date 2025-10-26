# SyncRunCode

SyncRunCode is a modern, full-featured real-time collaborative code compiler and IDE built with React, Vite, Tailwind CSS, Node.js, and MongoDB. Features real-time collaboration, multi-language support, and seamless deployment to Render (backend) and Vercel (frontend).

## 🌐 Live Demo

🚀 **Try SyncRunCode now!**

- **Frontend**: [https://sync-run-code.vercel.app/](https://sync-run-code.vercel.app/)
- **Backend API**: [https://syncruncode.onrender.com](https://syncruncode.onrender.com)

### 🎯 **Quick Start (Live Demo)**
1. **Visit**: [https://sync-run-code.vercel.app/](https://sync-run-code.vercel.app/)
2. **Register** a new account or use existing credentials
3. **Start coding** in any supported language
4. **Create projects** and collaborate in real-time
5. **Access admin dashboard** (if you have admin privileges)

## ✨ Features

### 🚀 Core Functionality
- **Multi-Language Support**: JavaScript, Python, Java, C++, C, TypeScript with syntax highlighting
- **Real-time Code Execution**: Instant compilation and execution with timeout protection
- **Monaco Editor Integration**: Professional code editor with IntelliSense, auto-completion, and themes
- **Project Management**: Create, save, organize, and manage code projects with version control
- **Real-time Collaboration**: Live code sharing and collaborative editing via WebSocket
- **User Authentication**: Secure JWT-based registration and login system
- **Responsive Design**: Fully responsive interface that works on all devices

### 🎨 Advanced Features
- **Code Formatting**: Built-in code formatter for JavaScript, Python, and JSON
- **File Operations**: Upload, download, and manage code files
- **Execution History**: Track and review past code executions
- **Customizable Editor**: Adjustable font size, tab size, themes, and editor preferences
- **Project Sharing**: Public/private project visibility settings
- **Search & Filter**: Advanced project search with language and date filtering
- **Profile Management**: User profile settings and preferences
- **Health Monitoring**: Built-in health check endpoints for monitoring
- **Modern UI/UX**: Beautiful gradient backgrounds, smooth animations, and responsive design
- **Mobile-First Design**: Fully optimized for mobile devices with touch-friendly interactions

### 🔐 Admin Features
- **Admin Dashboard**: Comprehensive overview of platform statistics with modern UI
- **User Management**: Create, edit, delete, and manage user accounts
- **Project Management**: Monitor and manage user projects
- **Analytics & Reports**: Detailed analytics on users, projects, and executions
- **System Monitoring**: Real-time system health and performance monitoring
- **Role-Based Access Control**: Granular permissions for different admin levels
- **Super Admin**: Full system access with ability to create other admins
- **Beautiful Admin Interface**: Modern gradient designs and responsive admin panels

## 🎨 Recent UI/UX Improvements

### ✨ **Latest Updates (2024)**
- **🎨 Modern Design System**: Beautiful gradient backgrounds and glass-morphism effects
- **📱 Mobile-First Approach**: Fully responsive design optimized for all screen sizes
- **🔄 Smooth Animations**: Hover effects, transitions, and micro-interactions
- **🎯 Enhanced User Experience**: Touch-friendly elements and intuitive navigation
- **🌈 Color-Coded Elements**: Language badges, status indicators, and visual hierarchy
- **💫 Interactive Components**: Animated cards, buttons, and form elements

### 🖥️ **Desktop Experience**
- **Professional Layout**: Clean, modern interface with proper spacing
- **Enhanced Visual Hierarchy**: Better typography and component organization
- **Hover Effects**: Subtle animations and visual feedback
- **Gradient Backgrounds**: Beautiful color schemes throughout the application

### 📱 **Mobile Experience**
- **Tab-Based Navigation**: Mobile-optimized navigation for better usability
- **Touch-Friendly Elements**: Larger buttons and touch targets
- **Responsive Grids**: Adaptive layouts that work on all screen sizes
- **Optimized Typography**: Readable text sizes and proper line heights

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom components and gradients
- **React Router v6** - Client-side routing with protected routes
- **Monaco Editor** - Professional code editor (VS Code engine)
- **Socket.io Client** - Real-time WebSocket communication
- **React Hot Toast** - Beautiful notification system
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library
- **Axios** - HTTP client for API communication
- **Modern CSS** - Gradient backgrounds, backdrop blur, and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **Bcryptjs** - Password hashing and security
- **Express Validator** - Input validation middleware
- **Helmet** - Security headers middleware
- **Rate Limiting** - API request throttling
- **CORS** - Cross-origin resource sharing

### Deployment
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saurav-kumar-sah-dev/SyncRunCode.git
   cd SyncRunCode
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp server/env.example server/.env
   cp client/env.example client/.env
   
   # Edit both .env files with your settings
   ```

4. **Start MongoDB** (local development)
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Create Super Admin** (Optional)
   ```bash
   cd server
   npm run create-superadmin
   ```
   This creates a super admin user with default credentials.
   
   **⚠️ SECURITY: Change the password immediately after first login!**
   
   **💡 TIP: Use environment variables for custom admin credentials:**
   ```bash
   ADMIN_USERNAME=your-admin-username
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD=your-secure-password
   npm run create-superadmin
   ```

6. **Start the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend  
   cd client && npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:3000/admin (admin users only)

## 🚀 Deployment

### ✅ **Current Deployment Status**
- **Backend**: ✅ Successfully deployed on Render
- **Frontend**: ✅ Successfully deployed on Vercel  
- **Database**: ✅ MongoDB Atlas connected
- **Domain**: ✅ Custom domain configured
- **SSL**: ✅ HTTPS enabled
- **Status**: 🟢 **LIVE AND WORKING**

### Backend (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Deploy with the provided `render.yaml` configuration
4. Set environment variables in Render dashboard

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with the provided `vercel.json` configuration
4. Set environment variables in Vercel dashboard

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📁 Project Structure

```
syncruncode/
├── client/                    # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── Layout/        # Layout components (Navbar)
│   │   │   └── UI/            # UI components (LoadingSpinner)
│   │   ├── pages/             # Page components
│   │   │   ├── Auth/          # Login/Register pages
│   │   │   ├── Compiler.jsx   # Main code editor page
│   │   │   ├── Projects.jsx   # Project management
│   │   │   ├── Profile.jsx    # User profile settings
│   │   │   └── Home.jsx       # Landing page
│   │   ├── contexts/          # React contexts
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   ├── ThemeContext.jsx   # Theme preferences
│   │   │   └── SocketContext.jsx  # WebSocket connection
│   │   ├── config/            # API configuration
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx          # App entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── vercel.json           # Vercel deployment config
│   └── package.json          # Frontend dependencies
├── server/                    # Node.js backend
│   ├── models/               # MongoDB models
│   │   ├── User.js           # User schema
│   │   ├── Project.js        # Project schema
│   │   └── Execution.js      # Code execution schema
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication routes
│   │   ├── projects.js       # Project management routes
│   │   ├── execution.js      # Code execution routes
│   │   └── health.js         # Health check endpoint
│   ├── services/             # Business logic
│   │   └── CodeExecutor.js   # Code execution service
│   ├── middleware/           # Express middleware
│   │   └── auth.js           # JWT authentication middleware
│   ├── index.js              # Server entry point
│   ├── render.yaml           # Render deployment config
│   └── package.json          # Backend dependencies
├── DEPLOYMENT.md             # Detailed deployment guide
├── SETUP.md                  # Quick setup guide
└── README.md                 # This file
```

## 🔧 Scripts

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

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Projects
- `GET /api/projects` - Get user's projects (with pagination, search, filtering)
- `GET /api/projects/public` - Get public projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Code Execution
- `POST /api/execution/run` - Execute code
- `GET /api/execution/history` - Get execution history
- `GET /api/execution/:id` - Get specific execution details
- `DELETE /api/execution/:id` - Delete execution record

### Health & Monitoring
- `GET /api/health` - Health check endpoint

### Admin Management
- `GET /api/admin/dashboard` - Admin dashboard statistics
- `GET /api/admin/users` - Get all users (with pagination, search, filtering)
- `GET /api/admin/users/:id` - Get specific user details
- `PUT /api/admin/users/:id` - Update user (role, permissions, status)
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/projects` - Get all projects (admin view)
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/admin/analytics/users` - User analytics and reports
- `GET /api/admin/analytics/projects` - Project analytics and reports
- `GET /api/admin/analytics/executions` - Execution analytics and reports
- `GET /api/admin/system/health` - System health monitoring
- `POST /api/admin/create-superadmin` - Create super admin (superadmin only)

## 🎨 Customization

### Styling
- Modify `client/tailwind.config.js` for theme customization
- Update `client/src/index.css` for global styles
- Use Tailwind utility classes throughout components

### Backend
- Add new routes in `server/routes/`
- Create new models in `server/models/`
- Add middleware in `server/middleware/`

## 📝 Environment Variables

### Backend (server/.env)
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

### Frontend (client/.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000

# Application Configuration
VITE_APP_NAME=SyncRunCode
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_THEME=dark
VITE_ENABLE_DARK_MODE=true
VITE_EDITOR_THEME=vs-dark
VITE_EDITOR_FONT_SIZE=14
VITE_EDITOR_TAB_SIZE=2
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
VITE_ENABLE_HTTPS=false
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🔒 Security

### Security Features
- **JWT Authentication** with secure token management
- **Role-Based Access Control** (RBAC) with granular permissions
- **Password Hashing** using bcrypt with salt
- **Rate Limiting** to prevent API abuse
- **Input Validation** and sanitization
- **CORS Protection** for cross-origin security
- **Helmet Security Headers** for additional protection
- **Sandboxed Code Execution** with timeout protection

### Security Checklist
- [ ] Change default admin password after first login
- [ ] Use strong JWT secrets in production
- [ ] Configure secure MongoDB connection
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up proper CORS origins
- [ ] Monitor system logs regularly
- [ ] Keep dependencies updated

For detailed security guidelines, see [SECURITY.md](SECURITY.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary:
- ✅ **Commercial use** - Use in commercial projects
- ✅ **Modification** - Modify and adapt the code
- ✅ **Distribution** - Share and distribute copies
- ✅ **Private use** - Use in private projects
- ✅ **Patent use** - Use patented components

**Attribution required**: Include the original copyright notice and license text in any substantial portions of the software.

## 🔧 Development Features

### Code Execution Engine
- **Multi-language Support**: JavaScript (Node.js), Python, Java (JDK), C++ (GCC), C (GCC), TypeScript
- **Sandboxed Execution**: Secure code execution with timeout protection
- **Compiler Detection**: Automatic detection of required compilers
- **Error Handling**: Comprehensive error reporting and debugging
- **Memory Management**: Resource monitoring and cleanup

### Real-time Collaboration
- **WebSocket Integration**: Live code sharing between users
- **Room-based System**: Project-specific collaboration rooms
- **Conflict Resolution**: Smart handling of simultaneous edits
- **User Presence**: Real-time user activity indicators

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt-based password security
- **Rate Limiting**: API request throttling and abuse prevention
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: Security headers and protection

## 🆘 Support & Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or use MongoDB Atlas
   - Check connection string in `.env` file
   - Verify network connectivity

2. **Code Execution Failures**
   - Install required compilers (see [COMPILER_SETUP.md](COMPILER_SETUP.md) for detailed instructions)
   - Check file permissions for temporary directories
   - Verify execution timeout settings

3. **Build/Deployment Issues**
   - Ensure Node.js version compatibility (v18+)
   - Check environment variables are properly set
   - Verify all dependencies are installed

4. **Real-time Features Not Working**
   - Check WebSocket connection in browser dev tools
   - Verify Socket.io configuration
   - Ensure firewall allows WebSocket connections

### Getting Help
- Check the console for detailed error messages
- Review the [SETUP.md](SETUP.md) for detailed setup instructions
- Consult [COMPILER_SETUP.md](COMPILER_SETUP.md) for compiler installation guide
- Consult [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guidance
- Verify all environment variables are correctly configured

## 📊 Repository Statistics

- **Languages**: JavaScript (96.9%), CSS (2.4%), Other (0.7%)
- **Topics**: react, nodejs, javascript, python, java, jwt, express, admin, mongodb, compiler, cpp, websocket, collaboration, auth, socketio, tailwindcss, vite
- **License**: MIT License
- **Stars**: ⭐ Star this repository if you find it helpful!

## 🔗 Links

- **GitHub Repository**: [https://github.com/saurav-kumar-sah-dev/SyncRunCode](https://github.com/saurav-kumar-sah-dev/SyncRunCode)
- **Live Demo**: [https://sync-run-code.vercel.app](https://sync-run-code.vercel.app)
- **Backend API**: [https://syncruncode.onrender.com](https://syncruncode.onrender.com)

---

**Happy Coding! 🎉**

*SyncRunCode - Where Code Syncs and Runs*

*Built with ❤️ for developers worldwide*