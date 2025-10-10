# Database Setup & Management 🗄️

## Overview

The BHVR server uses **PostgreSQL** with **Prisma ORM** for type-safe database operations. The database schema is managed by Better Auth for authentication and can be extended for your application needs.

## Quick Start

### 1. Database Setup

Choose one of these PostgreSQL options:

#### Docker (Recommended) 🐳

The easiest way to get started with a local PostgreSQL database:

```bash
# Start PostgreSQL container
docker-compose up -d

# Check container status
docker-compose ps

# View logs
docker-compose logs -f postgres

# Stop container
docker-compose down

# Stop and remove data (⚠️ deletes all data)
docker-compose down -v
```

**Default Configuration:**
- **Host:** localhost
- **Port:** 5432
- **Database:** bhvr_dev
- **User:** bhvr
- **Password:** bhvr_dev_password

**Connection String:**
```env
DATABASE_URL="postgresql://bhvr:bhvr_dev_password@localhost:5432/bhvr_dev"
```

> 📖 **Detailed Guide:** See [Docker Setup Guide](./DOCKER-SETUP.md) for comprehensive Docker instructions

#### Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb bhvr_dev
```

#### Neon (Serverless PostgreSQL)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

#### Other Options

- **Supabase** - [supabase.com](https://supabase.com)
- **Railway** - [railway.app](https://railway.app)
- **Render** - [render.com](https://render.com)
- **AWS RDS** - [aws.amazon.com/rds](https://aws.amazon.com/rds)

### 2. Configure Environment

Add to your `.env` file in `apps/server/`:

**For Docker setup:**
```env
DATABASE_URL="postgresql://bhvr:bhvr_dev_password@localhost:5432/bhvr_dev"
```

**For custom setup:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/bhvr_dev"
```

**Connection String Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
```

> 💡 **Tip:** Copy from `dotenv/.env.server.example` and update with your database credentials

### 3. Initialize Database

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database (development)
bun run db:push

# Or create migration (production)
bun run db:migrate
```

## Available Commands

### Development Commands

```bash
# Generate Prisma client from schema
bun run db:generate

# Push schema changes directly (no migration files)
bun run db:push

# Open Prisma Studio (database GUI)
bun run db:studio
```

### Production Commands

```bash
# Create a new migration
bun run db:migrate

# Deploy migrations to production
bun run db:deploy

# Reset database (⚠️ deletes all data)
bun run db:reset
```

## Database Schema

### Better Auth Tables

The authentication system creates these tables automatically:

#### `user` Table

Stores user account information:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]
}
```

#### `session` Table

Manages user sessions:

```prisma
model Session {
  id        String   @id @default(cuid())
  userId    String
  expiresAt DateTime
  token     String   @unique
  ipAddress String?
  userAgent String?
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### `account` Table

Links OAuth provider accounts:

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  accountId         String
  providerId        String
  accessToken       String?
  refreshToken      String?
  expiresAt         DateTime?
  user              User    @relation(fields: [userId], references: [id])
  
  @@unique([providerId, accountId])
}
```

#### `verification` Table

Stores email verification tokens:

```prisma
model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  
  @@unique([identifier, value])
}
```

## Extending the Schema

### Adding Custom Models

Edit `prisma/schema.prisma`:

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Add relation to User model
model User {
  // ... existing fields
  posts     Post[]
}
```

After editing schema:

```bash
# Generate new Prisma client
bun run db:generate

# Push changes to database
bun run db:push
```

## Prisma Studio

Visual database browser at `http://localhost:5555`:

```bash
bun run db:studio
```

Features:
- Browse all tables
- View and edit records
- Run queries
- Inspect relationships

## Database Queries

### Using Prisma Client

```typescript
import { prisma } from "@/lib/prisma";

// Find user
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { sessions: true },
});

// Create user
const newUser = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  },
});

// Update user
const updated = await prisma.user.update({
  where: { id: userId },
  data: { name: "Jane Doe" },
});

// Delete user
await prisma.user.delete({
  where: { id: userId },
});
```

### Type Safety

Prisma provides full type safety:

```typescript
// ✅ Type-safe
const user: User = await prisma.user.findUnique({ ... });

// ❌ TypeScript error - invalid field
const user = await prisma.user.findUnique({
  where: { invalidField: "value" }
});
```

## Migrations

### Development Workflow

```bash
# 1. Edit schema.prisma
# 2. Generate migration
bun run db:migrate

# 3. Migration file created in prisma/migrations/
# 4. Applied to database automatically
```

### Production Deployment

```bash
# Deploy pending migrations
bun run db:deploy
```

### Migration Best Practices

- **Always review** generated migrations
- **Test migrations** on staging first
- **Backup database** before production migrations
- **Use transactions** for complex migrations
- **Document breaking changes**

## Connection Pooling

Prisma automatically handles connection pooling:

```typescript
// Configure in schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  
  // Connection pool settings
  relationMode = "prisma"
}
```

## Performance Optimization

### Indexes

Add indexes for frequently queried fields:

```prisma
model User {
  email String @unique // Automatic index
  name  String @db.VarChar(255)
  
  @@index([name]) // Custom index
}
```

### Query Optimization

```typescript
// ✅ Select only needed fields
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true },
});

// ✅ Use pagination
const users = await prisma.user.findMany({
  take: 10,
  skip: 0,
  orderBy: { createdAt: "desc" },
});

// ✅ Batch operations
const users = await prisma.user.createMany({
  data: [{ email: "user1@example.com" }, { email: "user2@example.com" }],
});
```

## Troubleshooting

### Docker Issues

```bash
# Check if container is running
docker-compose ps

# View container logs
docker-compose logs postgres

# Restart container
docker-compose restart postgres

# Remove and recreate container
docker-compose down
docker-compose up -d

# Access PostgreSQL shell
docker-compose exec postgres psql -U bhvr -d bhvr_dev

# Check PostgreSQL version
docker-compose exec postgres psql -U bhvr -c "SELECT version();"
```

**Common Docker Issues:**

- **Port 5432 already in use:** Stop local PostgreSQL or change port in `docker-compose.yml`
- **Container won't start:** Check logs with `docker-compose logs postgres`
- **Permission denied:** Ensure Docker has proper permissions
- **Data persistence:** Data is stored in Docker volume `postgres_data`

### Connection Issues

```bash
# Test database connection
bun run db:studio

# Check DATABASE_URL format
echo $DATABASE_URL

# Test connection with psql (if installed)
psql $DATABASE_URL -c "SELECT 1;"
```

### Schema Sync Issues

```bash
# Reset database (⚠️ deletes all data)
bun run db:reset

# Regenerate client
bun run db:generate
```

### Migration Conflicts

```bash
# Mark migration as applied
bunx prisma migrate resolve --applied <migration_name>

# Mark migration as rolled back
bunx prisma migrate resolve --rolled-back <migration_name>
```

## Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use different databases for dev/prod
- ✅ Rotate database credentials regularly
- ✅ Use SSL in production

### Database Access

- ✅ Use connection pooling
- ✅ Limit database user permissions
- ✅ Enable SSL/TLS connections
- ✅ Regular backups

### Query Safety

- ✅ Prisma prevents SQL injection
- ✅ Use parameterized queries
- ✅ Validate input data
- ✅ Sanitize user input

## Backup & Recovery

### Manual Backup

```bash
# Backup database
pg_dump -h localhost -U username -d bhvr_dev > backup.sql

# Restore database
psql -h localhost -U username -d bhvr_dev < backup.sql
```

### Automated Backups

Most managed PostgreSQL services provide automatic backups:
- **Neon** - Automatic point-in-time recovery
- **Supabase** - Daily backups
- **Railway** - Automatic backups
- **AWS RDS** - Configurable backup retention

## Monitoring

### Query Performance

```typescript
// Enable query logging in development
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
```

### Database Metrics

Monitor:
- Connection count
- Query performance
- Database size
- Index usage
- Slow queries

## Resources

- **Docker Setup Guide** - [DOCKER-SETUP.md](./DOCKER-SETUP.md)
- **Prisma Docs** - [prisma.io/docs](https://www.prisma.io/docs)
- **PostgreSQL Docs** - [postgresql.org/docs](https://www.postgresql.org/docs)
- **Better Auth Schema** - [better-auth.com/docs](https://www.better-auth.com/docs)
- **Docker Docs** - [docs.docker.com](https://docs.docker.com)

## Next Steps

1. Set up your database connection (Docker recommended)
2. Run initial migrations
3. Explore with Prisma Studio
4. Add custom models for your app
5. Implement database queries in routes

---

**Need Help?** Check the [Docker Setup Guide](./DOCKER-SETUP.md) or [Architecture Guide](./ARCHITECTURE.md) for database integration patterns.
