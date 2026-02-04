import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  MONGODB_URI: z.string().url('Invalid MongoDB URI'),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters for security'),
  PORT: z.string().default('8080'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_ORIGIN: z.string().url('Invalid CLIENT_ORIGIN URL'),
  EMAIL_DISABLED: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  // Optional security settings
  TRUST_PROXY: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().optional(),
  RATE_LIMIT_MAX_REQUESTS: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

const env = parsed.data;

if (env.EMAIL_DISABLED !== 'true') {
  const emailSchema = z.object({
    SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
    SMTP_PORT: z.string().regex(/^\d+$/, 'SMTP_PORT must be a number'),
    SMTP_USER: z.string().min(1, 'SMTP_USER is required'),
    SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),
    SMTP_FROM: z.string().email('Invalid SMTP_FROM email'),
  });
  const emailParsed = emailSchema.safeParse(env);
  if (!emailParsed.success) {
    console.error('❌ Invalid email environment variables:', emailParsed.error.flatten().fieldErrors);
    throw new Error('Invalid email environment variables');
  }
}

export { env };
