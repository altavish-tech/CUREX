# ✅ CUREX Deployment Checklist

## 🎯 Problem Statement
**Issue:** Getting 404 errors on Vercel/Netlify deployments

**Root Cause:** This is a **monorepo** structure. Deployment platforms need to know which folder to build!

---

## 🔥 THE FIX (Most Important!)

### For Vercel:

1. **Go to Project Settings** → General
2. **Find "Root Directory"**
3. **Click Edit**
4. **Enter exactly:** `apps/web`
5. **Save and Redeploy**

### For Netlify:

1. **Site Settings** → Build & Deploy
2. **Base directory:** `apps/web`
3. **Build command:** `npm run build`
4. **Publish directory:** `apps/web/dist`
5. **Save and Redeploy**

---

## 📋 Pre-Deployment Checklist

Before deploying, verify these files exist:

### In `apps/web/` folder:
- [ ] ✅ `vercel.json` (for Vercel deployment)
- [ ] ✅ `netlify.toml` (for Netlify deployment)
- [ ] ✅ `_redirects` (fallback SPA routing)
- [ ] ✅ `package.json` (dependencies)
- [ ] ✅ `vite.config.ts` (build config)
- [ ] ✅ `index.html` (entry point)
- [ ] ✅ `dist/` folder created after build

### Test Local Build:
```bash
cd apps/web
npm install
npm run build
```

Should see output like:
```
✓ built in 30s
dist/index.html
dist/assets/index-[hash].js
dist/assets/index-[hash].css
```

---

## 🚀 Step-by-Step Deployment

### Option A: Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "fix: add deployment configs for monorepo"
   git push
   ```

2. **Go to Vercel Dashboard**
   - https://vercel.com/new
   - Import your repository

3. **⚠️ CRITICAL: Set Root Directory**
   - Click "Edit" next to Root Directory
   - Type: `apps/web`
   - Click Continue

4. **Verify Settings:**
   ```
   Framework Preset: Vite (auto-detected)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Deploy**
   - Click "Deploy" button
   - Wait 30-60 seconds
   - ✅ Live at: `https://your-project.vercel.app`

---

### Option B: Netlify

1. **Push code to GitHub** (same as above)

2. **Go to Netlify**
   - https://app.netlify.com/start
   - Import repository

3. **⚠️ Configure Build Settings:**
   ```
   Base directory: apps/web
   Build command: npm run build
   Publish directory: apps/web/dist
   ```

4. **Deploy Site**
   - Click "Deploy site"
   - ✅ Live at: `https://your-site.netlify.app`

---

## 🧪 Post-Deployment Testing

Test these URLs after deployment:

| Route | Expected Result |
|-------|----------------|
| `/` | ✅ Home page loads |
| `/language` | ✅ Language selection page |
| `/intake/voice` | ✅ Voice intake page |
| `/doctor` | ✅ Doctor dashboard |
| `/random/path` | ✅ Redirects to home (not 404!) |

---

## 🐛 Troubleshooting

### Still Getting 404?

**Check #1:** Is Root Directory set?
- Vercel: Project Settings → General → Root Directory
- Netlify: Site Settings → Build & Deploy → Base directory

**Check #2:** Did build succeed?
- Check deployment logs
- Look for "✓ built in X seconds"
- Should NOT be "6ms" (that means nothing was built)

**Check #3:** Are SPA redirects working?
- Check if `vercel.json` or `netlify.toml` exists in `apps/web/`
- These files tell the platform to serve `index.html` for all routes

**Check #4:** Is the build output valid?
```bash
cd apps/web
npm run build
ls dist/  # Should show index.html and assets folder
```

### Build Failing?

**Error:** "Command failed: npm run build"
- Check if you set Root Directory to `apps/web`
- Try deleting `node_modules` and `package-lock.json`, then `npm install`

**Error:** "No such file or directory"
- Root Directory is not set or wrong
- Must be exactly `apps/web`

### Assets Not Loading?

**Problem:** Blank white page, but no 404
- Check browser console for errors
- May need to clear browser cache
- Verify `base: '/'` in `vite.config.ts`

---

## 📄 Files Added/Modified for Deployment

```
apps/web/
├── vercel.json           ← NEW: Vercel SPA routing
├── netlify.toml          ← NEW: Netlify config  
├── _redirects            ← NEW: Generic SPA routing
├── vite.config.ts        ← UPDATED: Build config
├── DEPLOY_INSTRUCTIONS.md ← NEW: Detailed guide
├── README.md             ← UPDATED: Project docs
└── verify-build.js       ← NEW: Build validator
```

---

## 🎓 Why This Happens

**Normal Project:**
```
my-app/
├── src/
├── package.json
└── vite.config.ts
```
✅ Platform automatically finds everything

**Monorepo (Our Case):**
```
SIH2026/
├── apps/
│   ├── web/          ← WE WANT TO BUILD THIS
│   └── api/
└── package.json      ← Root (not what we want!)
```
❌ Platform doesn't know where to look!

**Solution:** Tell platform: "Build `apps/web` folder, not root!"

---

## ✅ Final Verification

Before marking as complete:

1. [ ] Code pushed to GitHub
2. [ ] Root Directory set to `apps/web`
3. [ ] Deployment successful (not 6ms!)
4. [ ] Home page (`/`) loads
5. [ ] Other routes (`/language`, `/doctor`) load
6. [ ] No 404 errors on refresh

---

## 🆘 Still Stuck?

1. Read `apps/web/DEPLOY_INSTRUCTIONS.md` for detailed steps
2. Check deployment platform logs for specific errors
3. Verify local build works: `cd apps/web && npm run build`
4. Make sure Root Directory = `apps/web` (most common issue!)

---

## 📌 Quick Reference

| Platform | Root Directory Setting |
|----------|----------------------|
| Vercel | Project Settings → General → Root Directory → `apps/web` |
| Netlify | Site Settings → Build & Deploy → Base directory → `apps/web` |
| Railway | Settings → Root Directory → `apps/web` |
| Render | Root Directory → `apps/web` |

**Remember:** This is a MONOREPO. Always set Root Directory!

---

## 🎉 Success Criteria

Deployment is successful when:
- ✅ All routes work without 404
- ✅ Page refresh doesn't break routing
- ✅ Assets (CSS, JS) load correctly
- ✅ Build time is 30-60 seconds (not 6ms!)
- ✅ Can navigate between pages smoothly

**Deployment URL:** `https://your-project-name.vercel.app` or `.netlify.app`
