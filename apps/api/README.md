# CUREX Backend API

## Vercel Deployment

### Quick Deploy Steps:

1. Import repository to Vercel (as separate project from frontend)
2. Set **Root Directory** to: `apps/api`
3. Framework: **Other**
4. Build Command: `npm run vercel-build`
5. Add all environment variables (see below)
6. Click Deploy

### Required Environment Variables:
```
NODE_ENV=production
DATABASE_URL=file:./prod.db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this-also
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend.vercel.app
DEMO_MODE=true
AI_PROVIDER=mock
OCR_PROVIDER=mock
SPEECH_PROVIDER=browser
ABDM_PROVIDER=mock
LOG_LEVEL=info
```

### Local Development:
```bash
npm install
npm run dev
```

Visit: http://localhost:3000/api/health
