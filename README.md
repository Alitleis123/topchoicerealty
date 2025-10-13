# Top Choice Realty - Real Estate Web Application

Modern full-stack web application for Top Choice Realty, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Public Listings**: Browse available properties with advanced filtering
- **Agent Dashboard**: Manage listings, customers, and inquiries
- **Lead Management**: Capture and track customer inquiries
- **Email Notifications**: Automated inquiry emails to agents
- **Responsive Design**: Mobile-first, modern UI
- **Secure Authentication**: Session-based auth with rate limiting
- **Real-time Updates**: Live data synchronization

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Query** for state management
- **React Hook Form** with Zod validation
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Express Session** for authentication
- **Nodemailer** for email services
- **Helmet** for security headers
- **Rate limiting** for API protection

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+
- MongoDB Atlas account (or local MongoDB)
- Email service (SendGrid or Resend)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd topchoicerealty
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example apps/api/.env

# Edit the .env file with your credentials
nano apps/api/.env
```

### 3. Required Environment Variables

```bash
# MongoDB (required)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/topchoicerealty

# Session Security (required - min 32 characters)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production-min-32-chars

# Server Configuration
PORT=8080
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

# Email Service (choose one)
# SendGrid
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@topchoicerealty.com

# OR Resend
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=587
# SMTP_USER=resend
# SMTP_PASS=your-resend-api-key
# SMTP_FROM=noreply@topchoicerealty.com
```

### 4. Database Setup

```bash
# Seed the database with sample data
pnpm seed
```

### 5. Start Development

```bash
# Start both API and web servers
pnpm dev

# Or start individually
pnpm dev:api    # API server on :8080
pnpm dev:web    # Web app on :5173
```

## 📁 Project Structure

```
topchoicerealty/
├── apps/
│   ├── api/                 # Backend API
│   │   ├── src/
│   │   │   ├── middleware/  # Auth, rate limiting, error handling
│   │   │   ├── models/      # MongoDB schemas
│   │   │   ├── routes/      # API endpoints
│   │   │   ├── services/    # Business logic
│   │   │   └── utils/       # Validation, sanitization
│   │   └── package.json
│   └── web/                 # Frontend React app
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── lib/         # API client, auth, utilities
│       │   ├── routes/      # Page components
│       │   └── assets/      # Images and static files
│       └── package.json
├── infra/                   # Deployment configs
├── env.example             # Environment template
└── package.json           # Root package.json
```

## 🔐 Security Features

- **Input Sanitization**: XSS protection on all user inputs
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Secure Sessions**: HTTP-only cookies with proper CORS
- **Validation**: Comprehensive input validation with Zod
- **Security Headers**: Helmet.js for security headers
- **Environment Validation**: Strict env var validation

## 🚀 Deployment

### Render.com (Backend)

1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy automatically on push

### Netlify (Frontend)

1. Connect repository
2. Build command: `pnpm build:web`
3. Publish directory: `apps/web/dist`

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start both servers
pnpm dev:api          # API server only
pnpm dev:web          # Web app only

# Building
pnpm build            # Build both apps
pnpm build:api        # Build API only
pnpm build:web        # Build web app only

# Database
pnpm seed             # Seed database with sample data

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm typecheck        # TypeScript type checking
```

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Test with coverage
pnpm test:coverage
```

## 🔧 Configuration

### API Configuration
- **Rate Limiting**: 100 requests/15min general, 5 login attempts/15min
- **Session**: 7-day expiration with MongoDB store
- **CORS**: Configured for frontend origin
- **Security**: Helmet.js security headers

### Frontend Configuration
- **API Base URL**: Configurable via `VITE_API_BASE_URL`
- **Request Timeout**: 10 seconds
- **Error Handling**: Comprehensive error boundaries

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Verify MONGODB_URI is correct
   - Check network access in MongoDB Atlas

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check email service limits

3. **CORS Errors**
   - Ensure CLIENT_ORIGIN matches frontend URL
   - Check for trailing slashes

4. **Session Issues**
   - Verify SESSION_SECRET is at least 32 characters
   - Clear browser cookies

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, email support@topchoicerealty.com or create an issue in the repository.

