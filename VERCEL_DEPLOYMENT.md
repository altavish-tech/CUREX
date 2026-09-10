# Vercel Deployment Guide for CUREX

## Option 1: Deploy Frontend and Backend Separately (RECOMMENDED)

### 🎨 Frontend Deployment (apps/web)

1. **Create New Vercel Project**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - **IMPORTANT**: Configure Root Directory BEFORE importing:
     - Click "Configure Project"
     - Set **Root Directory**: `apps/web`
     - Vercel will auto-detect it as a Vite project

2. **Verify Build Settings** (Auto-detected by Vercel)
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Root Directory: apps/web (MOST IMPORTANT!)
   ```
   
   **CRITICAL**: If you don't set Root Directory to `apps/web`, the build will fail!

3. **Environment Variables** (Optional for now)
   ```
   VITE_API_URL=https://your-api-project.vercel.app
   ```
   You can add this later after deploying the backend.

4. **Deploy** ✅
   - Click "Deploy" button
   - Wait 2-3 minutes for build to complete
   - Your frontend will be live!

---

### 🚀 Backend Deployment (apps/api)

1. **Create Another Vercel Project**
   - Import the same GitHub repository
   - Select **Root Directory**: `apps/api`

2. **Configure Build Settings**
   ```
   Framework Preset: Other
   Root Directory: apps/api
   Build Command: npm run vercel-build
   Output Directory: (leave empty)
   Install Command: npm install
   ```
   
   **IMPORTANT**: 
   - Set Root Directory to `apps/api` before importing
   - Leave Output Directory empty for Node.js projects

3. **Environment Variables**
   ```
   NODE_ENV=production
   DATABASE_URL=file:./prod.db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
   JWT_EXPIRES_IN=15m
   REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this-also
   REFRESH_TOKEN_EXPIRES_IN=7d
   FRONTEND_URL=https://your-frontend-project.vercel.app
   DEMO_MODE=true
   AI_PROVIDER=mock
   OCR_PROVIDER=mock
   SPEECH_PROVIDER=browser
   ABDM_PROVIDER=mock
   LOG_LEVEL=info
   ```

4. **Deploy** ✅

---

## Option 2: Single Deployment with Monorepo (Advanced)

Not recommended for this project structure as API and Frontend should be deployed separately for better scalability.

---

## Post-Deployment Steps

1. **Update Frontend Environment Variable**
   - Go to Frontend project settings
   - Update `VITE_API_URL` with actual API URL
   - Redeploy frontend

2. **Test Deployment**
   - Frontend: `https://your-frontend.vercel.app`
   - API Health Check: `https://your-api.vercel.app/api/health`

---

## Important Notes

- ✅ Both projects deploy independently
- ✅ Frontend is static (SPA)
- ✅ Backend is serverless Node.js
- ✅ Database is SQLite (file-based) - consider upgrading to PostgreSQL for production
- ✅ CORS is configured to allow frontend URL

---

## Troubleshooting

### "No deployable output" or "404 Not Found"
**Solution**: 
1. Go to Project Settings → General
2. Check **Root Directory** is set to `apps/web` (for frontend) or `apps/api` (for backend)
3. If not set, add it and redeploy
4. Vercel MUST know which folder to build from in a monorepo

### Build Fails with "builds configuration"
**Solution**: 
- Remove any custom `builds` field from vercel.json
- Let Vercel auto-detect the framework
- Only use `rewrites` for SPA routing

### Build Fails
- Check that Root Directory is set correctly
- Verify all environment variables are set
- Check build logs for specific errors

### API Not Connecting
- Verify VITE_API_URL in frontend environment variables
- Check CORS settings in backend
- Ensure FRONTEND_URL is set in backend environment variables
