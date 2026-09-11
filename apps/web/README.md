# 🏥 CUREX Frontend - Clinical Intake Platform

React + Vite + TypeScript frontend for the CUREX clinical intake system.

---

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

App runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── pages/           # React pages/routes
│   ├── context/         # React context providers
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles (Tailwind)
├── public/              # Static assets
├── dist/                # Build output (generated)
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
├── vercel.json          # Vercel deployment config
├── netlify.toml         # Netlify deployment config
└── _redirects           # SPA routing fallback
```

---

## 🌐 Deployment

### ⚠️ CRITICAL: This is a Monorepo!

**Root Directory MUST be set to `apps/web` on all platforms!**

Without this, you'll get 404 errors because the platform won't know which folder to build.

---

### Option 1: Deploy to Vercel (Recommended)

1. **Import Repository**
   - Go to https://vercel.com/new
   - Connect your GitHub repo

2. **⚠️ Set Root Directory**
   - Click "Edit" next to Root Directory
   - Enter: `apps/web`
   - Vercel will auto-detect Vite ✓

3. **Deploy**
   - Click Deploy
   - Done! ✅

**See:** [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md) for detailed steps.

---

### Option 2: Deploy to Netlify

**Method 1: Netlify UI**
```
Base directory: apps/web
Build command: npm run build
Publish directory: apps/web/dist
```

**Method 2: Netlify CLI**
```bash
cd apps/web
netlify deploy --prod --dir=dist
```

---

### Option 3: Other Platforms

Always configure:
```
Root Directory: apps/web
Build Command: npm run build
Output Directory: dist
```

---

## 🧩 Features

- **Multilingual Support** - Hindi, English, Tamil, Bengali, Telugu
- **Voice-Guided Intake** - Voice commands and audio feedback
- **Document Upload** - Medical reports with OCR
- **Real-time Timeline** - Step-by-step progress tracking
- **Doctor Dashboard** - Review patient intake data
- **Mock API Integration** - Full demo mode support

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Material Design 3
- **Language:** TypeScript
- **Icons:** Material Symbols

---

## 📱 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with platform overview |
| `/language` | LanguageSelection | Choose patient's language |
| `/intake/voice` | VoiceIntake | Voice-guided clinical history |
| `/intake/documents` | MedicalDocuments | Upload medical reports |
| `/intake/summary` | IntakeSummary | Review and confirm data |
| `/intake/success` | IntakeSuccess | Completion confirmation |
| `/doctor` | DoctorDashboard | Doctor's patient queue |

---

## 🔧 Configuration Files

### vercel.json
SPA routing configuration for Vercel deployment.

### netlify.toml  
Build and redirect settings for Netlify.

### _redirects
Fallback for platforms that support this format.

### vite.config.ts
- Build configuration
- Dev server proxy to API
- Output directory settings

---

## 🐛 Troubleshooting

### 404 Error on Routes

**Problem:** Routes like `/language` or `/doctor` show 404

**Solution:** Platform needs SPA redirect configuration. We have:
- ✅ `vercel.json` for Vercel
- ✅ `netlify.toml` for Netlify  
- ✅ `_redirects` for others

### "No Output Directory" Error

**Problem:** Build fails or shows no deployable output

**Solution:** Set Root Directory to `apps/web` in platform settings!

### Build Fails

**Problem:** Build command fails during deployment

**Solution:** 
1. Check build runs locally: `npm run build`
2. Verify all dependencies in package.json
3. Check platform build logs for specific error

### Assets Not Loading

**Problem:** CSS/JS files 404 after deployment

**Solution:** Verify `base: '/'` in vite.config.ts (already set ✓)

---

## 📦 Dependencies

### Production
- `react` - UI framework
- `react-dom` - React renderer
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

### Development
- `vite` - Build tool
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `@vitejs/plugin-react` - React support

---

## 🔗 API Integration

In production, set environment variable:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

In development, API proxy is configured in `vite.config.ts`:
```typescript
proxy: {
  '/api': 'http://localhost:3000'
}
```

---

## 📄 License

Part of SIH 2026 project - CUREX Clinical Platform

---

## 🆘 Need Help?

1. Check [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md) for detailed deployment steps
2. Verify Root Directory is set to `apps/web`
3. Test local build: `npm run build`
4. Check platform build logs for errors

**Most common issue:** Not setting Root Directory in monorepo! ⚠️
