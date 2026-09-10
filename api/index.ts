import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory store for demo mode
const encounters: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url = '', method } = req;
  
  // Parse path - Vercel routes /api/* to this function
  // So req.url will be like /health, /encounters, etc. (without /api prefix)
  
  // Health check
  if (url === '/health' && method === 'GET') {
    return res.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: 'production',
        demoMode: true,
      },
    });
  }

  // Get encounters
  if (url === '/encounters' && method === 'GET') {
    return res.status(200).json({
      success: true,
      data: encounters,
    });
  }

  // Create encounter
  if (url === '/encounters' && method === 'POST') {
    const body = req.body;
    const newEncounter = {
      id: body.encounterId || 'ENC-' + Date.now(),
      patientName: body.patientName || 'Patient',
      patientId: body.patientId || 'CUREX-' + Date.now(),
      language: body.language || 'Hindi',
      mode: body.mode || 'voice',
      chiefComplaint: body.chiefComplaint || '',
      painSeverity: body.painSeverity || 5,
      documents: body.documents || [],
      status: body.status || 'IN_QUEUE',
      tokenNumber: '#' + (encounters.length + 1).toString().padStart(2, '0'),
      createdAt: new Date().toISOString(),
    };
    
    encounters.unshift(newEncounter);
    
    return res.status(201).json({
      success: true,
      data: newEncounter,
    });
  }

  // API root
  if (url === '/' && method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'CUREX API Server',
      version: '1.0.0',
      demoMode: true,
      endpoints: {
        health: '/api/health',
        encounters: '/api/encounters',
      },
    });
  }

  // Not found
  return res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'API endpoint not found',
      timestamp: new Date().toISOString(),
    },
  });
}
