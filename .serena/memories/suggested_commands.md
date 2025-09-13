# BHVR Development Commands 🦫

## Essential Development Commands

### Package Management
```bash
# Install dependencies (recommended)
bun install

# Alternative package managers
pnpm install
yarn install
```

### Development Workflow
```bash
# Start all services in development mode
bun dev

# Start individual services
bun dev:client    # Frontend only (React + Vite)
bun dev:server    # Backend only (Hono API)
```

### Building for Production
```bash
# Build all workspaces
bun run build

# Build individual workspaces
bun run build:client
bun run build:server
```

### Code Quality & Type Safety
```bash
# Lint all workspaces
bun run lint

# Type check all workspaces
bun run type-check

# Format code with Prettier
bun run format

# Check formatting without changes
bun run format:check

# Run tests across all workspaces
bun run test
```

### Database Operations (Drizzle)
```bash
# Generate database migrations
bun run db:generate

# Push schema changes to database
bun run db:push

# Run migrations
bun run db:migrate

# Open Drizzle Studio
bun run db:studio
```

### System Utilities (macOS/Darwin)
```bash
# File operations
ls -la                    # List files with details
find . -name "*.ts"       # Find TypeScript files
grep -r "pattern" src/    # Search in source files
cat filename.ts           # View file contents

# Git operations
git status
git add .
git commit -m "message"
git push origin main

# Process management
ps aux | grep node        # Find running Node processes
kill -9 PID              # Kill process by PID
```

### API Documentation Access
- **Swagger UI**: http://localhost:3000/doc
- **Scalar API Reference**: http://localhost:3000/scalar
- **Alternative Scalar**: http://localhost:3000/docs or http://localhost:3000/api-docs

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```