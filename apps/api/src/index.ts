import express, { Request, Response } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './env.js';
import { connectDB } from './db.js';
import { errorHandler, notFoundHandler } from './middleware/errors.js';
import { generalRateLimiter } from './middleware/rateLimit.js';
import { getUserById } from './services/auth.js';
import { AuthRequest } from './middleware/auth.js';

// Import routes
import authRoutes from './routes/auth.js';
import listingsPublicRoutes from './routes/listings.public.js';
import listingsAgentRoutes from './routes/listings.agent.js';
import inquiriesRoutes from './routes/inquiries.js';
import customersRoutes from './routes/customers.js';
import agentsPublicRoutes from './routes/agents.public.js';

const app = express();

// Trust proxy (required for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_URI,
      touchAfter: 24 * 3600, // Lazy session update
    }),
    cookie: {
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax',
    },
  })
);

// Attach user to request if session exists
app.use(async (req: AuthRequest, _res, next) => {
  if (req.session.userId) {
    try {
      const user = await getUserById(req.session.userId);
      if (user) {
        req.user = user;
      }
    } catch (error) {
      console.error('Error fetching user from session:', error);
    }
  }
  next();
});

// Rate limiting
app.use('/api', generalRateLimiter);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsPublicRoutes);
app.use('/api/agents', agentsPublicRoutes);
app.use('/api/agent/listings', listingsAgentRoutes);
app.use('/api/agent/customers', customersRoutes);
app.use('/api/inquiries', inquiriesRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
async function start() {
  try {
    await connectDB();

    const port = Number(env.PORT);
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`📦 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

