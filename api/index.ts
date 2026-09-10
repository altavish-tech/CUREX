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

// In-memory store for demo mode
const encounters: any[] = [];

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

// Get encounters
app.get('/api/encounters', (_req, res) => {
  res.json({
    success: true,
    data: encounters,
  });
});

// Create encounter
app.post('/api/encounters', (req, res) => {
  const newEncounter = {
    id: req.body.encounterId || 'ENC-' + Date.now(),
    patientName: req.body.patientName || 'Patient',
    patientId: req.body.patientId || 'CUREX-' + Date.now(),
    language: req.body.language || 'Hindi',
    mode: req.body.mode || 'voice',
    chiefComplaint: req.body.chiefComplaint || '',
    painSeverity: req.body.painSeverity || 5,
    documents: req.body.documents || [],
    status: req.body.status || 'IN_QUEUE',
    tokenNumber: '#' + (encounters.length + 1).toString().padStart(2, '0'),
    createdAt: new Date().toISOString(),
  };
  
  encounters.unshift(newEncounter);
  
  res.status(201).json({
    success: true,
    data: newEncounter,
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
      encounters: '/api/encounters',
    },
  });
});

// Catch all for unmatched API routes
app.use('/api/*', (_req, res) => {
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
