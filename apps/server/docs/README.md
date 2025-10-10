# BHVR Server Documentation 🦫

Welcome to the BHVR server documentation - a serene, production-ready API built with modern technologies and peaceful development practices.

## 📚 Documentation Index

- **[README.md](./README.md)** - This overview document
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Server architecture and structure
- **[AUTH_API.md](./AUTH_API.md)** - Authentication API reference
- **[DATABASE.md](./DATABASE.md)** - Database setup and management
- **[EMAIL_PLAN.md](./EMAIL_PLAN.md)** - Email system implementation
- **[OPENAPI.md](./OPENAPI.md)** - OpenAPI/Swagger documentation

## 🚀 Quick Start

### Prerequisites

- **Bun** 1.2.4 or higher
- **PostgreSQL** database (local or remote)
- **Node.js** 18+ (optional, for compatibility)

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp ../../dotenv/.env.server.example .env

# Configure your database
# Edit .env and set DATABASE_URL

# Generate Prisma client and push schema
bun run db:generate
bun run db:push
```

### Development

```bash
# Start development server with hot reload
bun run dev

# Server runs at http://localhost:3000
```

### Production Build

```bash
# Build for production
bun run build

# Run production build
bun run dist/index.js
```

## 🏗️ Tech Stack

### Core Framework

- **[Hono](https://hono.dev/)** 4.9.10 - Ultra-fast, lightweight web framework
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[TypeScript](https://www.typescriptlang.org/)** 5.9.2 - Type-safe development

### Authentication & Database

- **[Better Auth](https://www.better-auth.com/)** 1.3.27 - Modern authentication library
- **[Prisma](https://www.prisma.io/)** 6.17.0 - Type-safe ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Reliable database

### API Documentation

- **[@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)** - OpenAPI 3.0 integration
- **[@hono/swagger-ui](https://github.com/honojs/middleware/tree/main/packages/swagger-ui)** - Interactive API docs
- **[@scalar/hono-api-reference](https://github.com/scalar/scalar)** - Beautiful API reference
- **[Zod](https://zod.dev/)** 4.1.8 - Schema validation

### Email & Communication

- **[Resend](https://resend.com/)** - Modern email API
- **[React Email](https://react.email/)** - Beautiful email templates
- **[Nodemailer](https://nodemailer.com/)** - Email sending (legacy support)

## 🌟 Key Features

### ✅ Authentication System

- Email/password authentication
- OAuth providers (Google, GitHub)
- Email verification
- Password recovery
- Session management
- Rate limiting
- Development mode (auto sign-in)

### ✅ OpenAPI Integration

- Auto-generated API documentation
- Interactive Swagger UI at `/doc`
- Type-safe request/response validation
- Consistent error responses
- Schema-driven development

### ✅ Email System

- Development mode (console logging)
- Production mode (Resend integration)
- Beautiful React Email templates
- Welcome emails
- Password reset emails
- Email verification

### ✅ Database Management

- Prisma ORM with PostgreSQL
- Type-safe database queries
- Migration system
- Database studio for inspection
- Better Auth schema integration

### ✅ Developer Experience

- Hot reload in development
- TypeScript strict mode
- Shared types across monorepo
- Consistent code formatting
- Comprehensive error handling

## 📁 Project Structure

```
apps/server/
├── docs/                    # Documentation
│   ├── README.md           # This file
│   ├── ARCHITECTURE.md     # Server architecture
│   ├── AUTH_API.md         # Auth API reference
│   ├── DATABASE.md         # Database guide
│   ├── EMAIL_PLAN.md       # Email implementation
│   └── OPENAPI.md          # OpenAPI guide
├── prisma/                 # Database schema
│   └── schema.prisma       # Prisma schema
├── public/                 # Static files
├── src/                    # Source code
│   ├── configs/            # Configuration
│   ├── lib/                # Core libraries
│   ├── middlewares/        # Hono middlewares
│   ├── routes/             # API routes
│   ├── schemas/            # Zod schemas
│   ├── utils/              # Utility functions
│   ├── client.ts           # Auth client
│   └── index.ts            # Entry point
├── .env                    # Environment variables
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

## 🔧 Available Scripts

### Development

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run type-check` - Run TypeScript type checking

### Database

- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema to database
- `bun run db:migrate` - Run migrations
- `bun run db:reset` - Reset database
- `bun run db:studio` - Open Prisma Studio

### Authentication

- `bun run auth:generate` - Generate Better Auth types

## 🌍 Environment Variables

### Required

```env
# Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Auth secret (minimum 32 characters)
BETTER_AUTH_SECRET="your-secret-key-min-32-chars-long"

# Base URL
BETTER_AUTH_URL="http://localhost:3000"
```

### Optional (OAuth)

```env
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Optional (Email)

```env
# Resend API (for production email sending)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="BHVR <noreply@yourapp.com>"
```

### Optional (Configuration)

```env
# Environment
NODE_ENV="development"

# Server port
PORT="3000"
```

## 🎯 API Endpoints

### Health & Status

- `GET /` - Simple health check
- `GET /health` - Detailed health status

### Authentication

All auth endpoints are under `/api/auth/*`:

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/sign-in/google` - Google OAuth
- `GET /api/auth/sign-in/github` - GitHub OAuth

### Documentation

- `GET /doc` - Interactive Swagger UI
- `GET /doc/openapi.json` - OpenAPI specification

## 🔐 Security Features

### Authentication Security

- Secure password hashing with bcrypt
- HTTP-only cookies for sessions
- CSRF protection
- Rate limiting on auth endpoints
- Email verification in production
- OAuth integration with major providers

### API Security

- CORS configuration
- Request validation with Zod
- Type-safe request/response handling
- Consistent error responses
- Development vs production modes

## 🧪 Testing

### Manual Testing

Visit `http://localhost:3000/doc` to access the interactive API documentation where you can test all endpoints.

### Programmatic Testing

```bash
# Health check
curl http://localhost:3000/health

# Sign up
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Sign in
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Supported Platforms

- **Cloudflare Workers** - Serverless deployment
- **Bun runtime** - Native Bun deployment
- **Node.js** - Traditional server deployment
- **Docker** - Containerized deployment

### Environment Setup

1. Set all required environment variables
2. Configure production database
3. Set up Resend for email (optional)
4. Configure OAuth providers (optional)
5. Run database migrations
6. Build and deploy

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production `DATABASE_URL`
- [ ] Set secure `BETTER_AUTH_SECRET`
- [ ] Set production `BETTER_AUTH_URL`
- [ ] Configure `RESEND_API_KEY` for emails
- [ ] Set up OAuth credentials
- [ ] Run database migrations
- [ ] Test authentication flow
- [ ] Enable CORS for your domain
- [ ] Set up monitoring and logging

## 🎨 Development Philosophy

The BHVR server embodies the peaceful industriousness of beavers:

- **Type Safety** - Strict TypeScript throughout
- **Developer Experience** - Hot reload, clear errors, great DX
- **Production Ready** - Battle-tested libraries and patterns
- **Flexibility** - Deploy anywhere, no vendor lock-in
- **Simplicity** - Clean code, clear structure, easy to understand
- **Reliability** - Comprehensive error handling and validation

## 📖 Further Reading

- [Architecture Guide](./ARCHITECTURE.md) - Detailed server architecture
- [Authentication API](./AUTH_API.md) - Complete auth API reference
- [Database Guide](./DATABASE.md) - Database setup and management
- [Email System](./EMAIL_PLAN.md) - Email implementation details
- [OpenAPI Guide](./OPENAPI.md) - API documentation system

## 🤝 Contributing

This is a boilerplate project designed to be forked and customized. Feel free to:

- Add new routes and endpoints
- Customize authentication flow
- Add new database models
- Integrate additional services
- Improve documentation

## 📝 License

See the LICENSE file in the root of the repository.

---

Built with 🦫 by the BHVR community
