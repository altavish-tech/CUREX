# Vercel Deployment Guide for CUREX

## ⚠️ CRITICAL FIRST STEP

**In a monorepo, you MUST set Root Directory in Vercel Project Settings!**

Without this, Vercel doesn't know which folder to build and will show:
- "No deployable output" error
- 404 NOT_FOUND
- Build completes in 6ms (nothing was built)

👉 **See [VERCEL_FIX_STEPS.md](./VERCEL_FIX_STEPS.md) for detailed troubleshooting**

---

## Option 1: Deploy Frontend and Backend Separately (RECOMMENDED)

### 🎨 Frontend Deployment (apps/web)

1. **Create New Vercel Project**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   
2. **⚠️ CRITICAL: Set Root Directory**
   - **BEFORE clicking Deploy**, look for "Root Directory"
   - Click "Edit" next to Root Directory
   - Type: `apps/web`
   - Click "Save"
   - Vercel will auto-detect: "Vite Detected ✓"

3. **Verify Auto-detected Settings**
   ```
   Framework Preset: Vite ✓
   Root Directory: apps/web ⚠️ MUST BE SET!
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy** ✅
   - Click "Deploy" button
   - Build should take 30-60 seconds (not 6ms!)
   - Wait for completion

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
