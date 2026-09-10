# CUREX Frontend

## Vercel Deployment

### Quick Deploy Steps:

1. Import repository to Vercel
2. Set **Root Directory** to: `apps/web`
3. Framework will auto-detect as **Vite**
4. Click Deploy

### Build Settings (Auto-configured):
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Environment Variables (Optional):
```
VITE_API_URL=https://your-api.vercel.app
```

### Local Development:
```bash
npm install
npm run dev
```

Visit: http://localhost:5173
