# Deploy API to Vercel

## ⚠️ IMPORTANT: Deploy API and Frontend Separately!

The API and Frontend are **two separate Vercel projects**.

---

## 🚀 Deploy API (This Folder)

### Step 1: Create Separate Vercel Project
1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Give it a different name: `curex-api` or similar

### Step 2: Set Root Directory
**CRITICAL**: Set Root Directory to `apps/api`

```
Root Directory: apps/api
```

### Step 3: Configure Build Settings
```
Framework Preset: Other
Build Command: npm run vercel-build
Output Directory: (leave empty)
Install Command: npm install
```

### Step 4: Add Environment Variables
```
NODE_ENV=production
DATABASE_URL=file:./prod.db
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-min-32-chars  
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend.vercel.app
DEMO_MODE=true
AI_PROVIDER=mock
OCR_PROVIDER=mock
SPEECH_PROVIDER=browser
ABDM_PROVIDER=mock
LOG_LEVEL=info
```

### Step 5: Deploy
Click **Deploy** button!

---

## ✅ Test Your Deployment

After deployment completes, test:

```
https://your-api-project.vercel.app/api/health
```

Should return:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "...",
    "environment": "production",
    "demoMode": true
  }
}
```

---

## 🔗 Connect to Frontend

1. Copy your API URL: `https://your-api-project.vercel.app`
2. Go to Frontend Vercel project settings
3. Add environment variable:
   ```
   VITE_API_URL=https://your-api-project.vercel.app
   ```
4. Redeploy frontend

---

## 📝 Note

This API uses serverless functions (`api/index.ts`) for Vercel compatibility.
The main `src/server.ts` is for local development only.
