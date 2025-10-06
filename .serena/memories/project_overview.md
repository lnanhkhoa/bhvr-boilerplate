# BHVR Project Overview 🦫

## Project Purpose

BHVR is a full-stack TypeScript monorepo boilerplate that embodies the peaceful industriousness of beavers. It provides a modern, type-safe foundation for building web applications with the philosophy that you should be able to deploy your client or server in any environment while maintaining end-to-end type safety.

## Key Philosophy

- **Beaver-Inspired Development**: Methodical, reliable, and harmonious like a beaver's dam construction
- **No Vendor Lock-in**: Deploy anywhere while maintaining flexibility
- **End-to-End Type Safety**: Shared types between client and server
- **Modern Stack**: Uses cutting-edge tools without bloat

## Tech Stack

- **Runtime**: Bun (1.2.4+) - Fast JavaScript runtime and package manager
- **Backend**: Hono (4.9.6) - Lightweight, elegant web framework
- **Frontend**: React (19.1.0) + Vite (6.3.5) - Modern UI with fast bundling
- **Styling**: Tailwind CSS (4.1.10) + shadcn/ui components
- **Type Safety**: TypeScript (5.9.2) throughout the stack
- **Build System**: Turbo (2.5.5) - Monorepo orchestration with caching
- **State Management**: TanStack Query for API state
- **Database**: Drizzle ORM with Neon Database support
- **Email**: React Email components with Resend integration
- **Authentication**: Better Auth integration

## Project Structure

```
bhvr-boilerplate/
├── apps/
│   ├── client/           # React + Vite frontend
│   └── server/           # Hono backend with OpenAPI
├── packages/
│   ├── shared/           # Shared TypeScript types
│   ├── ui/               # Reusable UI components
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── [config files]        # Root configuration files
```

## Recent Enhancements

- **Organized Middleware Structure**: Clean separation of OpenAPI, Scalar, and CORS middleware
- **Comprehensive API Documentation**: Swagger UI and Scalar API Reference
- **Enhanced Error Handling**: Peaceful error responses with proper TypeScript types
- **Environment-Aware Configuration**: Different settings for development and production
