# Deploy Frontend to Vercel

## 🚀 Quick Deploy (3 Minutes)

### Step 1: Import Project
1. Go to: https://vercel.com/new
2. Click "Import" next to your GitHub repository
3. Click "Import" button

### Step 2: ⚠️ CONFIGURE ROOT DIRECTORY (CRITICAL!)
**This is where most people fail!**

Look for the "Configure Project" section:

```
Root Directory: [Edit]
```

Click **[Edit]** and enter:
```
apps/web
```

Then click **Save**.

You should now see:
```
✓ Vite Detected
```

### Step 3: Verify Settings
Should auto-fill as:
```
Framework Preset: Vite
Build Command: npm run build  
Output Directory: dist
Install Command: npm install
```

### Step 4: Deploy
Click the big **Deploy** button!

---

## ✅ Success Indicators

During deployment, you should see:
- ⏱️ Build takes 30-60 seconds (NOT 6ms!)
- 📦 "Installing dependencies..."
- 🔨 "Building Vite app..."
- ✅ "Build Completed"
- 🌐 Your live URL!

---

## ❌ If You See This, Something is Wrong:

```
WARNING! Due to builds existing...
WARNING! Build output contains no functions...
Build Completed in /vercel/output [6ms]
```

**Problem**: Root Directory not set!
**Solution**: Go to Project Settings → General → Set Root Directory to `apps/web`

---

## 🆘 Troubleshooting

### 404 NOT_FOUND After Deploy?
→ Root Directory was not set to `apps/web`

### Build Completes in 6ms?
→ Root Directory was not set to `apps/web`

### "No deployable output" error?
→ Root Directory was not set to `apps/web`

**Fix**: 
1. Go to Project Settings → General
2. Set Root Directory: `apps/web`
3. Redeploy

---

## 📚 More Help

See the main deployment guide: [../../VERCEL_DEPLOYMENT.md](../../VERCEL_DEPLOYMENT.md)
