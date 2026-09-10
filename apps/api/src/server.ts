import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { config } from './config/app';
import { connectDatabase } from './config/database';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for Vite in dev
}));
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      demoMode: config.DEMO_MODE,
    },
  });
});

// In-memory store fallback for demo mode encounters
const demoEncounters: any[] = [
  {
    id: 'ENC-10428',
    patientName: 'Ramesh Kumar Sharma',
    patientId: 'CUREX-10428',
    language: 'Hindi',
    mode: 'voice',
    chiefComplaint: 'कल शाम से सीने में भारीपन और हल्का दर्द महसूस हो रहा है।',
    painSeverity: 6,
    status: 'IN_QUEUE',
    tokenNumber: '#04',
    createdAt: new Date().toISOString(),
  },
];

// Encounters API
app.get('/api/encounters', (_req, res) => {
  res.json({
    success: true,
    data: demoEncounters,
  });
});

app.post('/api/encounters', (req, res) => {
  const newEncounter = {
    id: req.body.encounterId || 'ENC-' + Date.now(),
    patientName: req.body.patientName || 'Ramesh Kumar Sharma',
    patientId: req.body.patientId || 'CUREX-10428',
    language: req.body.language || 'Hindi',
    mode: req.body.mode || 'voice',
    chiefComplaint: req.body.chiefComplaint || '',
    painSeverity: req.body.painSeverity || 5,
    documents: req.body.documents || [],
    status: 'IN_QUEUE',
    tokenNumber: '#04',
    createdAt: new Date().toISOString(),
  };
  demoEncounters.unshift(newEncounter);
  res.status(201).json({
    success: true,
    data: newEncounter,
  });
});

// API Root
app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'CUREX API Server',
    version: '1.0.0',
    demoMode: config.DEMO_MODE,
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      patients: '/api/patients',
      encounters: '/api/encounters',
      documents: '/api/documents',
    },
  });
});

// Serve static files from the React app
if (config.NODE_ENV === 'production') {
  // In production, serve the built React app
  const frontendPath = path.join(__dirname, '../../web/dist');
  logger.info(`Serving static files from: ${frontendPath}`);
  app.use(express.static(frontendPath));
  
  // Handle React routing - send all non-API routes to index.html
  app.get('*', (req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendPath, 'index.html'));
    } else {
      next();
    }
  });
}

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await connectDatabase();
    
    const port = parseInt(config.PORT);
    app.listen(port, () => {
      logger.info('='.repeat(60));
      logger.info('🏥 CUREX Clinical Intake Platform');
      logger.info('='.repeat(60));
      logger.info(`🚀 Application URL: http://localhost:${port}`);
      logger.info(`📋 Environment: ${config.NODE_ENV}`);
      logger.info(`🎭 Demo Mode: ${config.DEMO_MODE ? 'ON' : 'OFF'}`);
      logger.info(`📖 API Docs: http://localhost:${port}/api`);
      logger.info(`✅ Health Check: http://localhost:${port}/api/health`);
      if (config.NODE_ENV === 'production') {
        logger.info(`🎨 Frontend: http://localhost:${port}`);
        logger.info('   (Serving built React app)');
      } else {
        logger.info(`⚠️  Development: Run frontend separately on port 5173`);
        logger.info('   Or build frontend: npm run build --workspace=apps/web');
      }
      logger.info('='.repeat(60));
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

startServer();
