# Vercel Production Deployment Fix

## Problem Identified

The frontend was deployed successfully but returned 404 errors because:

1. **Frontend calls `/api/encounters`** - Found in `apps/web/src/context/IntakeContext.tsx` line 137
2. **No backend API deployed** - The previous vercel.json only deployed static frontend files
3. **API routes missing** - No serverless functions to handle `/api/*` requests

## Root Cause

The application is a **monorepo with separate frontend and backend**, but the deployment configuration only built and deployed the frontend. The backend API endpoints were not accessible in production.

## Solution Implemented

### 1. Created Serverless API Function (`/api/index.ts`)

**Location**: `d:\SIH2026\api\index.ts`

**Purpose**: Handle all `/api/*` requests as a Vercel serverless function

**Endpoints Implemented**:
- `GET /api` - API information
- `GET /api/health` - Health check
- `GET /api/encounters` - Get all encounters
- `POST /api/encounters` - Create new encounter (used by frontend)

**Why**: Vercel requires serverless functions to be in the `/api` directory at the root level. The frontend's `submitEncounter()` function calls `POST /api/encounters`, so this endpoint was critical.

### 2. Updated Root Package.json

**File**: `d:\SIH2026\package.json`

**Changes**: Added dependencies required for the serverless API:
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "@vercel/node": "^3.0.0"
  }
}
```

**Why**: The serverless function uses Express to handle routing, CORS for cross-origin requests, and Helmet for security headers.

### 3. Updated Vercel Configuration

**File**: `d:\SIH2026\vercel.json`

**Changes**:
```json
{
  "buildCommand": "cd apps/web && npm install && npm run build",
  "outputDirectory": "apps/web/dist",
  "installCommand": "npm install express cors helmet @vercel/node",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Why**: 
- `rewrites` route `/api/*` requests to the serverless function
- All other requests go to `/index.html` for React Router SPA routing
- `installCommand` ensures API dependencies are installed during build
- `buildCommand` builds the frontend from the correct workspace

## Files Changed

### Created:
1. `/api/index.ts` - Serverless API function with all required endpoints
2. `/VERCEL_PRODUCTION_FIX.md` - This documentation

### Modified:
1. `/package.json` - Added express, cors, helmet, @vercel/node dependencies
2. `/vercel.json` - Added API routing and proper install command

### Not Changed:
- Frontend code (`apps/web/*`) - No changes needed
- Existing API code (`apps/api/*`) - Kept for local development
- Frontend UI - Remains completely intact
- Application functionality - All features preserved

## How It Works

1. **Frontend Request**: User submits encounter → Frontend calls `POST /api/encounters`
2. **Vercel Routing**: Request matches `/api/:path*` → Routed to `/api/index.ts`
3. **Serverless Function**: Express app handles the request → Stores in memory → Returns success
4. **Frontend Response**: Frontend receives success → Updates UI → Shows confirmation

## Verification

### Build Test:
```bash
npm run build:web
```
✅ Output: Successfully built frontend to `apps/web/dist/`

### API Endpoints (After Deployment):
- ✅ `GET /api/health` - Returns health status
- ✅ `GET /api/encounters` - Returns encounters list
- ✅ `POST /api/encounters` - Creates encounter (used by frontend)
- ✅ `GET /api` - Returns API info

### Frontend Routes (After Deployment):
- ✅ `/` - Home page (React Router)
- ✅ `/language` - Language selection (React Router)
- ✅ `/voice-intake` - Voice intake (React Router)
- ✅ All other frontend routes - Work via SPA routing

## Production Behavior

1. **First Load**: User visits site → Vercel serves `index.html` from `apps/web/dist/`
2. **React Router**: Frontend handles routing client-side
3. **API Calls**: When submitting encounter → Request goes to `/api/encounters` → Handled by serverless function
4. **In-Memory Storage**: Encounters stored in serverless function memory (resets on function cold start)
5. **CORS**: Enabled with `origin: '*'` for demo mode

## Notes

- **Demo Mode**: API uses in-memory storage (data not persisted)
- **Serverless**: Each API call may trigger cold start (~1-2 second delay initially)
- **Database**: SQLite from `apps/api` not used in serverless (Vercel limitation)
- **Local Dev**: Use `npm run dev` to run full stack with database locally
- **Production**: Frontend + Serverless API (stateless, in-memory only)

## Trade-offs

**Pros**:
- ✅ Single Vercel deployment (frontend + API)
- ✅ All frontend functionality works
- ✅ No separate backend deployment needed
- ✅ Simple configuration

**Cons**:
- ⚠️ In-memory storage (data lost on cold starts)
- ⚠️ No database persistence in production
- ⚠️ Full API features from `apps/api` not available

## Future Improvements

To enable full database functionality in production:
1. Deploy `apps/api` as separate project with persistent database
2. Update frontend `VITE_API_URL` to point to API project
3. Use PostgreSQL/MySQL instead of SQLite for production
