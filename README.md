# bhvr-creative 🦫

![cover](https://cdn.stevedylan.dev/ipfs/bafybeievx27ar5qfqyqyud7kemnb5n2p4rzt2matogi6qttwkpxonqhra4)

A full-stack TypeScript monorepo starter with shared types, using Bun, Hono, Vite, and React.

## Features

- **Full-Stack TypeScript**: End-to-end type safety between client and server
- **Shared Types**: Common type definitions shared between client and server
- **Monorepo Structure**: Organized as a workspaces-based monorepo with Turbo for build orchestration
- **Authentication Ready**: Built-in authentication flows with email service integration
- **Modern Stack**:
  - [Bun](https://bun.sh) (1.2.4+) as the JavaScript runtime and package manager
  - [Hono](https://hono.dev) (4.9.6) as the backend framework
  - [Vite](https://vitejs.dev) (6.3.5) for frontend bundling
  - [React](https://react.dev) (19.1.0) for the frontend UI
  - [TypeScript](https://www.typescriptlang.org/) (5.9.2) for type safety
  - [Tailwind CSS](https://tailwindcss.com) (4.1.10) for styling
  - [Turbo](https://turbo.build) (2.5.5) for monorepo build orchestration and caching
  - [shadcn/ui](https://ui.shadcn.com) components with Radix UI
  - [TanStack Query](https://tanstack.com/query) for API state management

## Project Structure

```
.
├── dotenv/               # Environment variables
├── apps/
│   ├── client/           # React + Vite frontend with Tailwind CSS
│   └── server/           # Hono backend API
│   └── showcase/         # Showcase app
├── packages/
│   ├── shared/           # Shared TypeScript definitions and utilities
│   ├── ui/               # Reusable UI components
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
│   └── transactional/    # Transactional email service
├── scripts/              # Utility scripts
├── package.json          # Root package.json with workspaces
└── turbo.json            # Turbo configuration for build orchestration
```

### Server

### Client

bhvr uses Vite + React + TypeScript with Tailwind CSS for styling and shadcn/ui components. The client includes React Router for routing and TanStack Query for API state management.

### Shared Packages

The packages directory contains shared code used across the monorepo:

## Database

bhvr includes PostgreSQL with Prisma ORM for type-safe database operations:

- **Docker Setup**: Quick local PostgreSQL setup with docker-compose
- **Prisma ORM**: Type-safe database queries and migrations
- **Better Auth Integration**: Pre-configured authentication tables
- **Flexible Deployment**: Works with Neon, Supabase, Railway, or any PostgreSQL provider

### Quick Database Setup

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Initialize database
cd apps/server
bun run db:generate
bun run db:push

# Open Prisma Studio (database GUI)
bun run db:studio
```

See [Database Documentation](./apps/server/docs/DATABASE.md) for detailed setup and usage.

## Environment Variables

Copy the `.env.{service}.example` file to `.env.{service}` and fill in the values in `dotenv` folder. Run `bun run cp-env` to copy the `.env.{service}` file to `.env` in `apps/{service}`.

## Getting Started

Make sure you have database setup and Environment variables set up.
Install dependencies using your preferred package manager:

**Using Bun:**

```bash
# Install dependencies
bun install
```

### Development

Start all services in development mode:

```bash
# Using Bun
bun dev
```

Run individual workspaces:

```bash
# Frontend only
bun dev:client    # or: pnpm dev:client / yarn dev:client

# Backend only
bun dev:server    # or: pnpm dev:server / yarn dev:server
```

### Building

Build all workspaces for production:

```bash
# Using Bun
bun run build
```

Build individual workspaces:

```bash
# Build frontend only
bun run build:client  # or: pnpm build:client / yarn build:client

# Build backend only
bun run build:server  # or: pnpm build:server / yarn build:server
```

### Additional Commands

```bash
# Lint all workspaces
bun run lint      # or: pnpm lint / yarn lint

# Type check all workspaces
bun run type-check  # or: pnpm type-check / yarn type-check

# Run tests across all workspaces
bun run test      # or: pnpm test / yarn test
```

### Deployment

Deplying each piece is very versatile and can be done numerous ways, and exploration into automating these will happen at a later date. Here are some references in the meantime.

**Client**

- [Orbiter](https://orbiter.host)
- [GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Netlify](https://vite.dev/guide/static-deploy.html#netlify)
- [Cloudflare Pages](https://vite.dev/guide/static-deploy.html#cloudflare-pages)

**Server**

- [Cloudflare Worker](https://gist.github.com/stevedylandev/4aa1fc569bcba46b7169193c0498d0b3)
- [Bun](https://hono.dev/docs/getting-started/bun)
- [Node.js](https://hono.dev/docs/getting-started/nodejs)

## Type Sharing

Types are automatically shared between the client and server thanks to the shared package and TypeScript path aliases. You can import them in your code using:

```typescript
import { ApiResponse } from "@repo/shared";
```

## Authentication

The repo includes a complete authentication system with:

- **Email Service Integration**: Structured email service for sending authentication emails
- **OpenAPI Routes**: Auto-documented authentication endpoints
- **Type-safe Client**: Generated client with full type safety for auth operations

Authentication routes are automatically available and documented through OpenAPI integration.

## Learn More

- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Hono Documentation](https://hono.dev/docs)
- [Turbo Documentation](https://turbo.build/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Better Auth Documentation](https://better-auth.com/docs/introduction)
