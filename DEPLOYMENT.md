# Deployment Guide

This guide covers deploying SyncRunCode to Render (backend) and Vercel (frontend).

## 🚀 Deployment Architecture

- **Backend (Render)**: Node.js/Express API with MongoDB
- **Frontend (Vercel)**: React/Vite application with Tailwind CSS
- **Database**: MongoDB Atlas or Render's managed MongoDB

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Push your code to GitHub
4. **MongoDB Atlas Account**: For production database (optional)

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend for Render

1. **Update package.json scripts** (already done):
   ```json
   {
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     }
   }
   ```

2. **Create render.yaml** (already created):
   ```yaml
   services:
     - type: web
       name: syncruncode-backend
       env: node
       plan: starter
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 10000
         - key: MONGODB_URI
           fromDatabase:
             name: syncruncode-db
             property: connectionString
         # ... other environment variables
   ```

### Step 2: Deploy to Render

1. **Connect GitHub Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Name**: `syncruncode-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   EXECUTION_TIMEOUT=5000
   MAX_FILE_SIZE=10485760
   ```

4. **Create MongoDB Database**:
   - In Render Dashboard, go to "Databases"
   - Click "New +" → "Database"
   - Choose "MongoDB"
   - Name: `syncruncode-db`
   - Plan: `Starter` (free tier)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://syncruncode-backend.onrender.com`)

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Vercel

1. **Update Vite Config** (already done):
   ```js
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: 'http://localhost:5000',
           changeOrigin: true,
         },
       },
     },
   });
   ```

2. **Create vercel.json** (already created):
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/$1"
       }
     ]
   }
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Set Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_SOCKET_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note the deployment URL (e.g., `https://syncruncode.vercel.app`)

## 🔄 Update CORS Settings

After both deployments are complete:

1. **Update Backend CORS**:
   - Go to Render Dashboard → Your Service → Environment
   - Update `CORS_ORIGIN` to your Vercel URL
   - Redeploy the service

2. **Update Frontend API URL**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_API_URL` to your Render URL
   - Redeploy the frontend

## 🗄️ Database Setup

### Option 1: Render Managed MongoDB (Recommended)

1. **Create Database**:
   - In Render Dashboard, create a new MongoDB database
   - Use the connection string in your backend environment variables

2. **Initialize Database**:
   - The database will be automatically initialized with the models
   - No additional setup required

### Option 2: MongoDB Atlas

1. **Create Cluster**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster
   - Choose a free tier (M0)

2. **Configure Access**:
   - Create a database user
   - Whitelist Render's IP addresses (0.0.0.0/0 for all)
   - Get the connection string

3. **Update Environment Variables**:
   - Set `MONGODB_URI` to your Atlas connection string

## 🔧 Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb://localhost:27017/syncruncode
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EXECUTION_TIMEOUT=5000
MAX_FILE_SIZE=10485760
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

## 🚀 Quick Deploy Commands

### Using Render CLI (Optional)
```bash
# Install Render CLI
npm install -g @render/cli

# Login to Render
render login

# Deploy backend
cd server
render deploy

# Deploy frontend
cd ../client
render deploy
```

### Using Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd client
vercel --prod
```

## 🔍 Testing Deployment

1. **Test Backend**:
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should return health status

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try creating an account and logging in
   - Test code compilation

3. **Test Integration**:
   - Create a project in the frontend
   - Verify it's saved to the database
   - Test real-time collaboration

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `CORS_ORIGIN` matches your frontend URL exactly
   - Check for trailing slashes

2. **Database Connection**:
   - Verify MongoDB URI is correct
   - Check if database is accessible from Render

3. **Build Failures**:
   - Check build logs in Render/Vercel dashboard
   - Ensure all dependencies are in package.json

4. **Environment Variables**:
   - Verify all required variables are set
   - Check for typos in variable names

### Debugging Steps

1. **Check Logs**:
   - Render: Service → Logs
   - Vercel: Project → Functions → Logs

2. **Test API Endpoints**:
   - Use Postman or curl to test backend endpoints
   - Check network tab in browser for frontend issues

3. **Verify Environment Variables**:
   - Check if variables are properly set
   - Ensure they're available at build time

## 📊 Monitoring

### Render Monitoring
- **Metrics**: CPU, Memory, Response Time
- **Logs**: Real-time application logs
- **Alerts**: Set up alerts for downtime

### Vercel Monitoring
- **Analytics**: Page views, performance metrics
- **Functions**: Serverless function logs
- **Speed Insights**: Core Web Vitals

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Connect GitHub Repository**
2. **Enable Auto-Deploy**: Deploy on every push to main branch
3. **Preview Deployments**: Automatic preview deployments for pull requests

## 💰 Cost Optimization

### Render
- **Free Tier**: 750 hours/month
- **Starter Plan**: $7/month for always-on service
- **Database**: Free tier available

### Vercel
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial use
- **Bandwidth**: 100GB included

## 🎯 Production Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Database configured and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] SSL certificates active
- [ ] Domain configured (optional)
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance monitoring active

## 📞 Support

If you encounter issues:

1. **Check Documentation**:
   - [Render Docs](https://render.com/docs)
   - [Vercel Docs](https://vercel.com/docs)

2. **Community Support**:
   - [Render Community](https://community.render.com)
   - [Vercel Community](https://github.com/vercel/vercel/discussions)

3. **Professional Support**:
   - Render: Available on paid plans
   - Vercel: Available on Pro plan and above

---

**Happy Deploying! 🚀**
