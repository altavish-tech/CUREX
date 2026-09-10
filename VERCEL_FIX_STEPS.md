# ⚠️ CRITICAL: Vercel Deployment Fix - Step by Step

## 🔴 THE MAIN PROBLEM

Vercel is NOT building because **Root Directory is not configured in Project Settings**.

In a monorepo, Vercel MUST know which folder to build. This is set in **Project Settings**, not in vercel.json!

---

## ✅ SOLUTION: Configure Root Directory

### Option A: Fix Existing Vercel Project

1. **Go to your Vercel Project Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your CUREX project

2. **Go to Settings**
   - Click "Settings" tab
   - Click "General" in left sidebar

3. **Set Root Directory**
   - Scroll to "Root Directory" section
   - Click "Edit"
   - Enter: `apps/web`
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - ✅ Should work now!

---

### Option B: Create Fresh Project (RECOMMENDED)

1. **Delete Current Project** (if deployment keeps failing)
   - Go to Settings → General
   - Scroll to bottom
   - Click "Delete Project"

2. **Create New Project**
   - Go to: https://vercel.com/new
   - Select your GitHub repository
   - **IMPORTANT**: Before clicking Deploy, expand "Build and Output Settings"

3. **Configure Build Settings**
   ```
   Root Directory: apps/web         ← TYPE THIS!
   Framework Preset: Vite (auto-detected)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Done!

---

## 📊 How to Verify It's Working

### During Build, you should see:
```
✅ Cloning completed
✅ Detected framework: Vite
✅ Running "npm install"
✅ Installing dependencies...
✅ Running "npm run build"
✅ Building Vite app...
✅ Build completed
✅ Deploying...
✅ Deployment completed
```

### You should NOT see:
```
❌ WARNING! Due to builds existing...
❌ WARNING! Build output contains no functions...
❌ Build Completed in 6ms (too fast = nothing built!)
```

---

## 🎯 Why This Happens

| What Vercel Sees | Without Root Directory | With Root Directory `apps/web` |
|------------------|------------------------|-------------------------------|
| package.json | ❌ Root package.json (workspace config) | ✅ apps/web/package.json (actual app) |
| Build command | ❌ No build script | ✅ `npm run build` → Vite build |
| Output | ❌ Nothing | ✅ dist/ folder with files |
| Result | ❌ 404 NOT_FOUND | ✅ Working website |

---

## 🚀 For Backend (API) Deployment

**Deploy API as a SEPARATE Vercel project:**

1. Create another new project on Vercel
2. Import same GitHub repository
3. Set Root Directory: `apps/api`
4. Framework: Other
5. Build Command: `npm run vercel-build`
6. Add environment variables (see apps/api/README.md)

---

## 📱 Quick Checklist

- [ ] Root Directory set to `apps/web` in Vercel Settings
- [ ] Framework detected as "Vite"
- [ ] Build logs show "npm install" and "npm run build"
- [ ] Build takes at least 30-60 seconds (not 6ms!)
- [ ] Deployment shows "Deployment completed" with files
- [ ] Website loads without 404

---

## 🆘 Still Not Working?

1. **Check Build Logs**
   - Go to Deployments tab
   - Click on failed deployment
   - Read the full build log
   - Look for actual error messages

2. **Verify Settings**
   - Settings → General → Root Directory = `apps/web`
   - Settings → Build & Development → Build Command = `npm run build`
   - Settings → Build & Development → Output Directory = `dist`

3. **Contact Support**
   - If still failing, share build logs
   - Mention: "Monorepo deployment with Root Directory"

---

## ✅ Summary

**ONE SETTING FIXES EVERYTHING: Root Directory = `apps/web`**

That's it. Set this in Vercel Project Settings and redeploy.
