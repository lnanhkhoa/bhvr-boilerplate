# Claude Code Instructions for BHVR Boilerplate

This is a Bun-based monorepo using Turbo for build orchestration with React (Vite) client and Hono server.

## Project Structure

```
bhvr-boilerplate/
├── apps/
│   ├── client/          # React + Vite frontend
│   └── server/          # Hono backend
├── packages/
│   ├── shared/          # Shared utilities and types
│   ├── ui/              # UI components
│   ├── eslint-config/   # ESLint configuration
│   └── typescript-config/ # TypeScript configuration
├── turbo.json           # Turbo configuration
└── package.json         # Root package.json
```

## Development Commands

- **Start development servers**: `bun run dev`
- **Start client only**: `bun run dev:client`
- **Start server only**: `bun run dev:server`
- **Build all**: `bun run build`
- **Lint**: `bun run lint`
- **Type check**: `bun run type-check`
- **Test**: `bun run test`

## Key Technologies

- **Runtime**: Bun (>=1.2.4)
- **Build System**: Turbo
- **Frontend**: React + Vite
- **Backend**: Hono
- **Language**: TypeScript 5.9.2
- **Package Manager**: Bun

## Code Guidelines

1. Use TypeScript with strict type checking
2. Leverage shared packages for common utilities and types
3. Maintain consistent code style (2 spaces, double quotes, semicolons)
4. Follow kebab-case for file naming and PascalCase for components
5. Keep client and server code properly separated
6. Use Turbo's caching and parallel execution features

## When Making Changes

1. Always run type checking: `bun run type-check`
2. Run linting: `bun run lint`
3. Test the specific app you're working on using filtered commands
4. Use the shared package for cross-app type definitions

## Important Notes

- This is a fresh repository setup
- All workspaces are configured in the root package.json
- Turbo handles dependency management and caching
- Build outputs go to dist/ directories
