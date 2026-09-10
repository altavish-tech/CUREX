# CUREX - Clinical Intake Platform

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com)
[![Phase](https://img.shields.io/badge/phase-analysis%20complete-blue)](./IMPLEMENTATION_PLAN.md)

**"Smarter Clinical Intake. Better Prepared Care."**

CUREX is an AI-assisted clinical intake and medical-document digitization platform designed for high-volume Indian and AYUSH hospitals. The platform enables patients to complete their clinical history before meeting the doctor through multilingual voice/touch interfaces, document scanning with OCR, and intelligent red-flag detection.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- No Docker required (uses SQLite for demo)

### Quick Start (Single URL - Recommended)

1. **Clone and Install**

```bash
git clone <repository-url>
cd curex_clinical_intake_platform
npm install
```

2. **Initialize Database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed demo data
npm run db:seed
```

3. **Build Frontend**

```bash
npm run build:web
```

4. **Start Application (Single URL)**

```bash
./start.sh
```

Or manually:
```bash
cd apps/api && NODE_ENV=production npm run dev
```

The application will be available at:
- **Single URL**: http://localhost:3000
- Frontend: http://localhost:3000
- API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

### Alternative: Development Mode (Two URLs)

For active frontend development with hot reload:

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173 (Vite dev server with hot reload)
- **Backend API**: http://localhost:3000

### Demo Credentials

- **Admin**: admin@curex.demo / admin123
- **Doctor**: doctor@curex.demo / doctor123  
- **Patient**: patient@curex.demo / patient123

### Current Demo Features

✅ **Working Now:**
- Welcome/Home page
- Language selection (8 Indian languages)
- Intake mode selection (Voice/Touch/Assisted)
- Responsive Stitch-designed UI preserved
- Backend API with health check
- SQLite database with full schema
- Demo user accounts
- **Single URL deployment** (Frontend + Backend on port 3000)

🚧 **In Progress:**
- Patient registration flow
- Clinical history intake
- Adaptive question engine
- Red-flag detection
- Document upload & OCR
- AI clinical summary
- Doctor dashboard
- Doctor review & verification

---

## 📋 Development Commands

```bash
# Start both frontend and backend
npm run dev

# Start only backend
npm run dev:api

# Start only frontend
npm run dev:web

# Database commands
npm run db:migrate     # Run migrations
npm run db:seed        # Seed demo data
npm run db:studio      # Open Prisma Studio

# Build for production
npm run build
```

---

## 🎯 Overview

### The Problem

Hospital intake processes in India are often:
- Time-consuming for both patients and doctors
- Language barriers prevent effective communication
- Paper-based records are difficult to maintain
- Medical history scattered across multiple documents
- Critical symptoms may be missed during triage

### The Solution

CUREX transforms clinical intake through:
- **Multilingual Voice & Touch Interfaces** - Support for 8+ Indian languages
- **AI-Powered Clinical History Capture** - Intelligent, adaptive questioning
- **Document Digitization** - OCR extraction from prescriptions and lab reports
- **Red-Flag Detection** - Real-time identification of emergency symptoms
- **Structured Clinical Summaries** - AI-generated, doctor-verified summaries
- **ABDM Integration** - Seamless connection to Ayushman Bharat Digital Mission

---

## ✨ Key Features

### For Patients
- 🗣️ **Voice Input** in native language (Hindi, Tamil, Telugu, Bengali, etc.)
- 📱 **Touch-Friendly Kiosk Interface** for easy navigation
- 📄 **Document Scanning** using smartphone/tablet camera
- 🔒 **Privacy & Consent Management** with clear explanations
- ⏱️ **Reduced Wait Times** through efficient pre-consultation data capture

### For Doctors
- 📊 **Comprehensive Patient Dashboard** with queue management
- 📋 **AI-Generated Clinical Summaries** (with full editing capability)
- 🚨 **Priority Alerts** for high-risk patients
- 📚 **Complete Medical Timeline** with all historical data
- ✅ **Document Verification** with side-by-side OCR results

### For Hospitals
- 🏥 **Multi-Specialty Support** including AYUSH medicine
- 📈 **Analytics Dashboard** for operational insights
- 👥 **Staff Management** with role-based access control
- 🔍 **Audit Logging** for compliance and security
- 🌐 **ABDM/FHIR Integration** for health information exchange

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript 5
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 (with custom design system)
- **State Management**: TanStack Query + Zustand
- **Routing**: React Router 6
- **Forms**: React Hook Form + Zod
- **Real-time**: Socket.IO Client

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express 4 + TypeScript 5
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Cache**: Redis 7
- **File Storage**: S3-compatible (MinIO for dev)
- **Real-time**: Socket.IO
- **Background Jobs**: Bull Queue

### AI/ML Services
- **AI Providers**: OpenAI / Anthropic / Mock
- **OCR**: Tesseract.js / Google Cloud Vision / Mock
- **Speech**: Web Speech API / Bhashini / Mock

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Winston (logs) + Sentry (errors)

---

## 📊 Project Status

### Current Phase: **Analysis Complete** ✅

The project has completed comprehensive analysis including:
- ✅ Stitch UI component inventory and analysis
- ✅ Full specification document
- ✅ System architecture design
- ✅ Phased implementation plan

### Next Phase: **Phase 1 - Project Foundation** 🚀

Expected start: Upon approval  
Estimated duration: 1-2 weeks

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed roadmap.

---

## 📚 Documentation

### Core Documents

1. **[SPECIFICATION.md](./SPECIFICATION.md)** - Complete product specification
   - Product vision and purpose
   - User workflows
   - Functional requirements
   - Non-functional requirements
   - Success metrics

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
   - High-level architecture diagram
   - Technology stack details
   - Database schema (Prisma)
   - API design
   - Security architecture
   - Integration architecture
   - Deployment architecture

3. **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - 12-phase development plan
   - Phase-by-phase breakdown
   - Tasks and deliverables
   - Testing strategies
   - Risk management
   - Resource requirements

4. **[DESIGN.md](./clinical_calm_vital_intelligence/DESIGN.md)** - UI/UX design system
   - Color palette
   - Typography
   - Component library
   - Accessibility guidelines

### Existing UI Components

The project includes Stitch-generated UI screens for:
- Welcome & Language Selection
- Voice Clinical History Intake
- Medical Reports OCR Extraction
- Timeline & Patient Confirmation

These screens will be preserved and enhanced with full functionality.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ LTS
- Docker & Docker Compose
- Git
- PostgreSQL 16 (or use Docker)
- Redis (or use Docker)

### Quick Start (Future - After Phase 1)

```bash
# Clone the repository
git clone https://github.com/your-org/curex.git
cd curex

# Copy environment variables
cp .env.example .env

# Start development environment with Docker
docker-compose up -d

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Seed database with demo data
npm run db:seed

# Start development servers
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **MinIO Console**: http://localhost:9001

---

## 📁 Project Structure

```
curex/
├── apps/
│   ├── web/                     # React frontend
│   │   ├── src/
│   │   │   ├── components/      # Reusable components
│   │   │   ├── pages/           # Route pages
│   │   │   ├── layouts/         # Page layouts
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── services/        # API clients
│   │   │   ├── stores/          # State management
│   │   │   ├── types/           # TypeScript types
│   │   │   └── i18n/            # Translations
│   │   └── package.json
│   │
│   └── api/                     # Node.js backend
│       ├── src/
│       │   ├── modules/         # Feature modules
│       │   ├── services/        # Business logic
│       │   ├── providers/       # External service providers
│       │   ├── middleware/      # Express middleware
│       │   ├── utils/           # Helper functions
│       │   └── config/          # Configuration
│       └── package.json
│
├── packages/                    # Shared packages
│   ├── shared-types/           # Shared TypeScript types
│   ├── clinical-engine/        # Clinical logic
│   └── validation/             # Zod schemas
│
├── prisma/                     # Database
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docker/                     # Docker configs
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── nginx.conf
│
├── docs/                       # Additional documentation
├── docker-compose.yml
├── .env.example
├── SPECIFICATION.md
├── ARCHITECTURE.md
├── IMPLEMENTATION_PLAN.md
└── README.md
```

---

## 💻 Development

### Available Scripts (Future)

```bash
# Development
npm run dev              # Start all development servers
npm run dev:web          # Start frontend only
npm run dev:api          # Start backend only

# Database
npm run db:migrate       # Run Prisma migrations
npm run db:seed          # Seed database with demo data
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database (caution!)

# Testing
npm run test             # Run all tests
npm run test:unit        # Run unit tests
npm run test:integration # Run integration tests
npm run test:e2e         # Run end-to-end tests
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Lint code
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Build
npm run build            # Build for production
npm run build:web        # Build frontend only
npm run build:api        # Build backend only

# Production
npm start                # Start production server
```

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   npm run test
   npm run lint
   ```

3. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add patient registration form"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Code review and merge**

### Coding Standards

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with recommended rules
- **Formatting**: Prettier with 2-space indentation
- **Commits**: Conventional Commits format
- **Testing**: Minimum 70% coverage for new code
- **Documentation**: JSDoc for complex functions

---

## 🔐 Security

### Security Principles

1. **HTTPS/TLS Required**: All production traffic encrypted
2. **JWT Authentication**: Secure token-based auth
3. **Role-Based Access Control**: Granular permissions
4. **Input Validation**: All inputs validated (Zod)
5. **SQL Injection Prevention**: Prisma ORM parameterized queries
6. **XSS Prevention**: Content Security Policy headers
7. **File Upload Validation**: Type and size restrictions
8. **Audit Logging**: All sensitive operations logged
9. **Data Encryption**: Sensitive fields encrypted at rest
10. **Regular Security Audits**: Automated vulnerability scanning

### Reporting Security Issues

If you discover a security vulnerability, please email:
**security@curex.health** (replace with actual email)

Do NOT create public GitHub issues for security vulnerabilities.

---

## 🏥 Medical Safety

### Critical Principle

**CUREX IS NOT AN AI DOCTOR**

- ❌ Does NOT make autonomous diagnoses
- ❌ Does NOT provide medical advice
- ❌ Does NOT replace healthcare professionals

- ✅ Assists with history collection
- ✅ Structures clinical information
- ✅ Detects potential red flags
- ✅ Generates draft summaries for doctor review

### Every AI-Generated Summary Displays:

```
⚠️ AI-GENERATED DRAFT — REQUIRES CLINICIAN REVIEW
```

Doctors MUST review, edit, and confirm all summaries before use in clinical decision-making.

---

## 🌍 Internationalization

### Supported Languages

- ✅ English
- ✅ हिन्दी (Hindi)
- ✅ বাংলা (Bengali)
- ✅ मराठी (Marathi)
- ✅ தமிழ் (Tamil)
- ✅ తెలుగు (Telugu)
- ✅ ગુજરાતી (Gujarati)
- ✅ ಕನ್ನಡ (Kannada)

More languages can be added based on hospital requirements.

### Adding a New Language

1. Create translation file: `apps/web/src/i18n/locales/{lang}.json`
2. Add language option to UI language selector
3. Test all screens in new language
4. Update clinical question bank with translations

---

## 🧪 Testing

### Testing Strategy

1. **Unit Tests**: Business logic, utilities, services
2. **Integration Tests**: API endpoints, database operations
3. **End-to-End Tests**: Complete user workflows
4. **Performance Tests**: Load testing, stress testing
5. **Security Tests**: Vulnerability scanning, penetration testing

### Critical Test Scenarios

- ✅ Complete patient intake flow (start to finish)
- ✅ Red-flag detection (chest pain + SOB → HIGH priority)
- ✅ Document upload and OCR processing
- ✅ Doctor summary editing and verification
- ✅ Multi-language functionality
- ✅ Authentication and authorization
- ✅ Real-time queue updates

---

## 📈 Roadmap

### Phase 1-3: Foundation (Weeks 1-6)
- Project setup and infrastructure
- Authentication and authorization
- Patient intake workflow

### Phase 4-6: Clinical Intelligence (Weeks 7-12)
- Clinical question engine
- Red-flag detection
- Document upload and OCR

### Phase 7-9: AI & Dashboard (Weeks 13-18)
- Medical timeline
- AI clinical summaries
- Doctor dashboard

### Phase 10-12: Integration & Launch (Weeks 19-24)
- AYUSH module
- FHIR/ABDM integration
- Security, testing, deployment

### Post-Launch
- Mobile app
- Patient portal
- Telemedicine integration
- Multi-hospital deployment

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed roadmap.

---

## 🤝 Contributing

We welcome contributions from the community!

### How to Contribute

1. Read [SPECIFICATION.md](./SPECIFICATION.md) and [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Check open issues or create a new one
3. Fork the repository
4. Create a feature branch
5. Make your changes with tests
6. Submit a pull request

### Contribution Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure all tests pass before submitting PR

---

## 👥 Team

### Core Team (To Be Assembled)
- Product Manager
- Lead Full-Stack Developer
- Frontend Developers (2)
- Backend Developers (2)
- DevOps Engineer
- QA Engineer
- Clinical Consultant
- UX Designer

### Contact

- **Project Lead**: [Your Name] - lead@curex.health
- **Technical Lead**: [Tech Lead] - tech@curex.health
- **General Inquiries**: info@curex.health

---

## 📄 License

This project is proprietary software. All rights reserved.

Copyright (c) 2026 CUREX Health Technologies

Unauthorized copying, distribution, or use of this software is strictly prohibited.

For licensing inquiries, contact: licensing@curex.health

---

## 🙏 Acknowledgments

- **Google Stitch** for the initial UI design generation
- **ABDM (Ayushman Bharat Digital Mission)** for health information exchange standards
- **Open-source community** for the excellent tools and libraries used in this project
- **Healthcare professionals** who provided domain expertise

---

## 📞 Support

### For Users
- **User Documentation**: docs.curex.health
- **Video Tutorials**: youtube.com/curexhealth
- **Support Email**: support@curex.health
- **Support Hours**: Mon-Fri, 9 AM - 6 PM IST

### For Developers
- **API Documentation**: api.curex.health/docs
- **Developer Portal**: developers.curex.health
- **Discord Server**: discord.gg/curex
- **Technical Support**: devs@curex.health

---

## 🔗 Links

- **Website**: https://curex.health (coming soon)
- **Documentation**: https://docs.curex.health (coming soon)
- **API Reference**: https://api.curex.health/docs (coming soon)
- **Status Page**: https://status.curex.health (coming soon)

---

## 📊 Project Metrics

### Current Status
- **Lines of Code**: TBD (after Phase 1)
- **Test Coverage**: TBD
- **API Endpoints**: TBD
- **Languages Supported**: 8 planned
- **Hospitals Deployed**: 0 (pre-launch)

### Goals (6 Months)
- **Test Coverage**: >70%
- **System Uptime**: >99.5%
- **Patient Satisfaction**: >4.0/5.0
- **Hospitals Deployed**: 5+
- **Patients Served**: 10,000+

---

## ✅ Getting Started Checklist

Before beginning development, ensure:

- [ ] Read SPECIFICATION.md completely
- [ ] Read ARCHITECTURE.md completely
- [ ] Read IMPLEMENTATION_PLAN.md completely
- [ ] Understand medical safety principles
- [ ] Review existing Stitch UI components
- [ ] Set up development environment
- [ ] Have access to all required tools
- [ ] Understand git workflow
- [ ] Know who to ask for help

---

**Ready to revolutionize clinical intake in Indian hospitals!** 🚀

Let's build something amazing together. 💙

---

*Last Updated: September 5, 2026*  
*Version: 1.0.0 (Analysis Phase)*


## 🌐 Deployment

### Vercel Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Summary:**
- Deploy Frontend (apps/web) and Backend (apps/api) as separate Vercel projects
- Set Root Directory for each project
- Configure environment variables
- Both projects auto-deploy from GitHub

**Deployment Links:**
- 📖 Detailed Guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- 🔧 Configuration: `apps/web/vercel.json` and `apps/api/vercel.json`
