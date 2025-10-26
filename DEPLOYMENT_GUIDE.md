# 🚀 Deployment Guide - SyncRunCode

## 📋 **Deployment Overview**

- **Server**: Deploy to Render.com
- **Client**: Deploy to Vercel.com
- **Database**: MongoDB Atlas (free tier)

---

## 🖥️ **Step 1: Deploy Server on Render**

### **1.1 Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your GitHub account

### **1.2 Deploy from GitHub**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `saurav-kumar-sah-dev/SyncRunCode`
3. Configure:
   - **Name**: `syncruncode-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### **1.3 Environment Variables**
Add these environment variables in Render dashboard:

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secure-jwt-secret-here
JWT_EXPIRE=7d
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/syncruncode
CORS_ORIGIN=https://your-client-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EXECUTION_TIMEOUT=5000
MAX_FILE_SIZE=10485760
```

### **1.4 Deploy**
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note the **deployed URL** (e.g., `https://syncruncode-backend.onrender.com`)

---

## 🌐 **Step 2: Deploy Client on Vercel**

### **2.1 Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

### **2.2 Deploy from GitHub**
1. Click **"New Project"**
2. Import your repository: `saurav-kumar-sah-dev/SyncRunCode`
3. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### **2.3 Environment Variables**
Add these environment variables in Vercel dashboard:

```env
VITE_API_URL=https://syncruncode-backend.onrender.com/api
VITE_SOCKET_URL=https://syncruncode-backend.onrender.com
```

### **2.4 Deploy**
1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Note the **deployed URL** (e.g., `https://syncruncode.vercel.app`)

---

## 🗄️ **Step 3: Setup MongoDB Atlas**

### **3.1 Create MongoDB Atlas Account**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up for free
3. Create a new cluster

### **3.2 Configure Database**
1. **Database Access**: Create a user with read/write permissions
2. **Network Access**: Add `0.0.0.0/0` (allow all IPs)
3. **Get Connection String**: Copy the MongoDB URI

### **3.3 Update Render Environment**
1. Go to your Render service dashboard
2. Update `MONGODB_URI` with your Atlas connection string
3. Redeploy the service

---

## 🔧 **Step 4: Update CORS Settings**

### **4.1 Update Server CORS**
1. Go to Render dashboard
2. Update `CORS_ORIGIN` to your Vercel URL
3. Redeploy

### **4.2 Update Client API URL**
1. Go to Vercel dashboard
2. Update `VITE_API_URL` to your Render URL
3. Redeploy

---

## ✅ **Step 5: Test Deployment**

### **5.1 Test Server**
```bash
curl https://syncruncode-backend.onrender.com/api/health
```

### **5.2 Test Client**
1. Visit your Vercel URL
2. Try to register/login
3. Test code compilation

### **5.3 Create Admin User**
1. SSH into your Render service (if needed)
2. Run: `npm run create-superadmin`
3. Or use the admin creation API

---

## 🎯 **Final URLs**

After deployment, you'll have:
- **Frontend**: `https://syncruncode.vercel.app`
- **Backend**: `https://syncruncode-backend.onrender.com`
- **API**: `https://syncruncode-backend.onrender.com/api`

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors**
   - Check CORS_ORIGIN in Render
   - Ensure URLs match exactly

2. **Database Connection**
   - Verify MongoDB Atlas connection string
   - Check network access settings

3. **Build Failures**
   - Check package.json scripts
   - Verify all dependencies are listed

4. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

---

## 📞 **Support**

If you encounter issues:
1. Check Render/Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check MongoDB Atlas connection

**Happy Deploying! 🚀**
