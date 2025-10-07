# Top Choice Realty - Real Estate Web Application

Modern full-stack web application for Top Choice Realty.

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy environment file
cp env.example apps/api/.env

# Configure your .env with MongoDB and email credentials

# Seed database
pnpm seed

# Start development
pnpm dev
```

## Environment Setup

Required environment variables in `apps/api/.env`:
- MongoDB connection string
- Session secret
- SMTP email credentials
- CORS origin

See `env.example` for template.

## Development

- Frontend: http://localhost:5173
- API: http://localhost:8080

## License

MIT

