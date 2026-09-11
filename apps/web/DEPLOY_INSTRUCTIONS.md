# 🚀 CUREX Frontend Deployment Instructions

## ⚠️ CRITICAL: Monorepo Root Directory Setup

**THIS IS THE MAIN REASON FOR 404 ERRORS!**

---

## For Vercel Deployment

### Step 1: Create New Vercel Project
1. Go to https://vercel.com/new
2. Import your GitHub repository

### Step 2: ⚠️ SET ROOT DIRECTORY (MOST IMPORTANT!)
**BEFORE clicking Deploy:**

1. Look for **"Root Directory"** section
2. Click **"Edit"** button
3. Type exactly: `apps/web`
4. Click **"Continue"** or **"Save"**

Vercel will automatically detect:
```
✓ Framework Preset: Vite
✓ Build Command: npm run build  
✓ Output Directory: dist
✓ Install Command: npm install
```

### Step 3: Environment Variables (Optional)
Add this if connecting to backend:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

### Step 4: Deploy
- Click **"Deploy"** button
- Build should take 30-60 seconds
- ✅ Site will be live at: `https://your-project.vercel.app`

---

## For Netlify Deployment

### Method 1: Netlify UI

1. Go to https://app.netlify.com/start
2. Import your GitHub repository

3. **⚠️ SET BASE DIRECTORY:**
   ```
   Base directory: apps/web
   Build command: npm run build
   Publish directory: apps/web/dist
   ```

4. Click **"Deploy site"**

### Method 2: Using Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Navigate to web app folder
cd apps/web

# Deploy
netlify deploy --prod --dir=dist --build-command="npm run build"
```

---

## For Other Platforms (Cloudflare Pages, Railway, etc.)

Always set:
```
Root Directory: apps/web
Build Command: npm run build
Output Directory: dist (or apps/web/dist depending on platform)
```

---

## Troubleshooting 404 Errors

### Problem: "404 Page Not Found" on all routes

**Cause**: Platform doesn't know to serve index.html for all routes (SPA routing)

**Solution**: Ensure one of these files exists:
- `vercel.json` ✓ (already in apps/web/)
- `netlify.toml` ✓ (already in apps/web/)
- `_redirects` ✓ (already in apps/web/)

### Problem: "No output directory" or "Build failed"

**Cause**: Root directory not set in monorepo

**Solution**: 
1. Go to Project Settings
2. Set Root Directory to `apps/web`
3. Redeploy

### Problem: Blank page or assets not loading

**Cause**: Base path misconfigured

**Solution**: Check `vite.config.ts` has:
```typescript
base: '/'
```

---

## Quick Verification Checklist

Before deploying, verify:

- [ ] Platform knows Root Directory = `apps/web`
- [ ] Build command = `npm run build`
- [ ] Output directory = `dist`
- [ ] SPA redirect file exists (vercel.json / netlify.toml / _redirects)
- [ ] All dependencies in package.json

---

## Testing Deployment

After deployment, test these routes:
- `/` - Home page ✓
- `/language` - Language selection ✓
- `/intake/voice` - Voice intake ✓
- `/doctor` - Doctor dashboard ✓

All should load without 404 errors.

---

## Need Help?

If still getting 404:
1. Check build logs for errors
2. Verify Root Directory is set
3. Check SPA redirect configuration
4. Ensure dist folder was created during build

**Common mistake**: Deploying from repo root instead of `apps/web` folder!
