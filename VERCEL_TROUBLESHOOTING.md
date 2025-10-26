# Vercel Deployment Troubleshooting Guide

## Current Issue: Frontend Deployment Failing

### Solution 1: Use Root Package.json (Recommended)
1. **Keep the root `package.json`** I just created
2. **Use the current `vercel.json`** configuration
3. **In Vercel Dashboard Settings:**
   - Root Directory: Leave empty (use root)
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

### Solution 2: Client Directory Only
1. **Delete root `package.json`**
2. **In Vercel Dashboard Settings:**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Solution 3: Alternative Configuration
1. **Rename `vercel-alternative.json` to `vercel.json`**
2. **Use the alternative configuration**

## Manual Vercel Settings (Most Reliable)

### In Vercel Dashboard:
1. Go to your project settings
2. Go to "Build & Development Settings"
3. Set these values:
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Environment Variables in Vercel:
```
VITE_API_URL=https://syncruncode.onrender.com
VITE_SOCKET_URL=https://syncruncode.onrender.com
```

## Common Issues & Fixes

### Issue 1: Build Command Not Found
- **Fix**: Set Root Directory to `client` in Vercel dashboard
- **Or**: Use root `package.json` with workspace setup

### Issue 2: Output Directory Not Found
- **Fix**: Ensure `client/dist` exists after build
- **Check**: Build works locally with `cd client && npm run build`

### Issue 3: Environment Variables Not Loading
- **Fix**: Set variables in Vercel dashboard, not just in vercel.json
- **Verify**: Variables start with `VITE_`

## Testing Steps
1. **Local Test**: `cd client && npm run build`
2. **Check Output**: Ensure `client/dist` folder is created
3. **Deploy**: Push to GitHub and check Vercel logs
4. **Debug**: Check Vercel build logs for specific errors

## Files Created:
- `package.json` (root) - Workspace configuration
- `vercel.json` - Main configuration
- `vercel-alternative.json` - Alternative configuration
- `vercel-simple.json` - Simple configuration
