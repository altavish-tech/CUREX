# Vercel Deployment Guide for CUREX

## Option 1: Deploy Frontend and Backend Separately (RECOMMENDED)

### 🎨 Frontend Deployment (apps/web)

1. **Create New Vercel Project**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select **Root Directory**: `apps/web`

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-api-project.vercel.app
   ```

4. **Deploy** ✅

---

### 🚀 Backend Deployment (apps/api)

1. **Create Another Vercel Project**
   - Import the same GitHub repository
   - Select **Root Directory**: `apps/api`

2. **Configure Build Settings**
   ```
   Framework Preset: Other
   Build Command: npm run vercel-build
   Output Directory: (leave empty)
   Install Command: npm install
   ```

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

### Build Fails
- Check that Root Directory is set correctly
- Verify all environment variables are set
- Check build logs for specific errors

### API Not Connecting
- Verify VITE_API_URL in frontend environment variables
- Check CORS settings in backend
- Ensure FRONTEND_URL is set in backend environment variables
