# 🚨 GitHub Repush & Redeployment Troubleshooting Guide

## 🔍 **Common Issues & Solutions**

### 1. **GitHub Actions Not Triggering**
**Problem**: Pushes to main branch don't trigger deployments

**Solutions**:
- ✅ Check if `.github/workflows/deploy.yml` exists (now created)
- ✅ Verify branch protection rules
- ✅ Ensure GitHub Actions are enabled in repository settings
- ✅ Check if workflow file has correct syntax

**Commands to fix**:
```bash
# Check if workflow file exists
ls -la .github/workflows/

# Test workflow syntax
# Go to GitHub → Actions tab → Check for any syntax errors
```

### 2. **Render Deployment Failures**
**Problem**: Backend fails to deploy on Render

**Common Causes & Fixes**:

#### A. **Build Command Issues**
- ❌ **Old**: `npm run build` (doesn't exist)
- ✅ **Fixed**: `npm install` (now corrected in render.yaml)

#### B. **Port Configuration**
- ❌ **Old**: PORT=5000 (inconsistent)
- ✅ **Fixed**: PORT=10000 (now consistent)

#### C. **Environment Variables**
```bash
# Required variables in Render dashboard:
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/syncruncode
CORS_ORIGIN=https://your-frontend-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EXECUTION_TIMEOUT=5000
MAX_FILE_SIZE=10485760
```

### 3. **Vercel Deployment Issues**
**Problem**: Frontend fails to deploy on Vercel

**Common Causes & Fixes**:

#### A. **API URL Mismatch**
- ❌ **Old**: `https://syncruncode.onrender.com`
- ✅ **Fixed**: `https://syncruncode-backend.onrender.com`

#### B. **Build Configuration**
```json
// vercel.json (now fixed)
{
  "version": 2,
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install"
}
```

### 4. **CORS Errors**
**Problem**: Frontend can't connect to backend

**Solutions**:
```bash
# Update CORS_ORIGIN in Render dashboard
CORS_ORIGIN=https://your-actual-vercel-url.vercel.app

# Update API URLs in Vercel dashboard
VITE_API_URL=https://your-actual-render-url.onrender.com
VITE_SOCKET_URL=https://your-actual-render-url.onrender.com
```

## 🛠️ **Step-by-Step Fix Process**

### **Step 1: Update GitHub Repository**
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Fix deployment configuration and add GitHub Actions workflow"

# Push to main branch
git push origin main
```

### **Step 2: Configure GitHub Secrets**
Go to GitHub → Settings → Secrets and variables → Actions:

**Required Secrets**:
```
RENDER_SERVICE_ID=your-render-service-id
RENDER_API_KEY=your-render-api-key
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id
```

### **Step 3: Update Render Configuration**
1. Go to Render Dashboard
2. Select your service
3. Update environment variables:
   - `PORT=10000`
   - `CORS_ORIGIN=https://your-vercel-url.vercel.app`
4. Redeploy service

### **Step 4: Update Vercel Configuration**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update:
   - `VITE_API_URL=https://your-render-url.onrender.com`
   - `VITE_SOCKET_URL=https://your-render-url.onrender.com`
5. Redeploy project

## 🔄 **Manual Redeployment Commands**

### **For Render (Backend)**:
```bash
# Option 1: Via Render Dashboard
# Go to service → Manual Deploy

# Option 2: Via Render CLI
npm install -g @render/cli
render login
render deploy --service syncruncode-backend
```

### **For Vercel (Frontend)**:
```bash
# Option 1: Via Vercel Dashboard
# Go to project → Deployments → Redeploy

# Option 2: Via Vercel CLI
npm install -g vercel
vercel login
cd client
vercel --prod
```

## 🧪 **Testing Deployment**

### **1. Test Backend Health**:
```bash
curl https://syncruncode-backend.onrender.com/api/health
```

### **2. Test Frontend**:
- Visit your Vercel URL
- Check browser console for errors
- Test API connectivity

### **3. Test Integration**:
```bash
# Test API endpoints
curl -X POST https://syncruncode-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

## 📊 **Monitoring & Debugging**

### **Render Logs**:
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. Check for errors

### **Vercel Logs**:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Functions → Logs
4. Check for build/runtime errors

### **GitHub Actions Logs**:
1. Go to GitHub → Actions tab
2. Click on latest workflow run
3. Check for failures

## 🚀 **Quick Fix Checklist**

- [ ] ✅ GitHub Actions workflow created
- [ ] ✅ Server package.json build script fixed
- [ ] ✅ Render.yaml configuration corrected
- [ ] ✅ Vercel.json API URLs updated
- [ ] ✅ GitHub secrets configured
- [ ] ✅ Environment variables updated
- [ ] ✅ CORS settings configured
- [ ] ✅ Manual redeployment triggered

## 🆘 **Emergency Manual Deployment**

If automated deployment fails:

### **Backend (Render)**:
1. Go to Render Dashboard
2. Select service → Manual Deploy
3. Wait for completion
4. Check logs for errors

### **Frontend (Vercel)**:
1. Go to Vercel Dashboard
2. Select project → Deployments
3. Click "Redeploy" on latest deployment
4. Wait for completion

## 📞 **Still Having Issues?**

1. **Check Logs**: Always check deployment logs first
2. **Verify URLs**: Ensure all URLs are correct and accessible
3. **Test Individually**: Test backend and frontend separately
4. **Environment Variables**: Double-check all environment variables
5. **Network Issues**: Check if services can reach each other

**Common Debug Commands**:
```bash
# Check if backend is running
curl -I https://syncruncode-backend.onrender.com

# Check if frontend is accessible
curl -I https://your-vercel-url.vercel.app

# Test API connectivity
curl https://syncruncode-backend.onrender.com/api/health
```

---

**After implementing these fixes, your GitHub repush and redeployment should work smoothly! 🚀**
