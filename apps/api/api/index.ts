import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: 'production',
      demoMode: true,
    },
  });
});

// Root
app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'CUREX API Server',
    version: '1.0.0',
    demoMode: true,
    endpoints: {
      health: '/api/health',
    },
  });
});

// Catch all
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'API endpoint not found',
      timestamp: new Date().toISOString(),
    },
  });
});

// Export for Vercel Serverless
export default async (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
