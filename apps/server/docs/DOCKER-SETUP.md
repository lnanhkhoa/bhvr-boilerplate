# Docker Database Setup 🐳

Quick reference guide for running PostgreSQL with Docker in the BHVR project.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

## Quick Start

### 1. Start PostgreSQL Container

```bash
# From project root
docker-compose up -d
```

This will:
- Pull PostgreSQL 15 Alpine image (if not already downloaded)
- Create a container named `bhvr-postgres`
- Start PostgreSQL on port 5432
- Create database `bhvr_dev` with user `bhvr`
- Persist data in Docker volume `postgres_data`

### 2. Verify Container is Running

```bash
docker-compose ps
```

Expected output:
```
NAME              IMAGE                COMMAND                  SERVICE    STATUS
bhvr-postgres     postgres:15-alpine   "docker-entrypoint.s…"   postgres   Up
```

### 3. Configure Environment

Copy the environment file and ensure DATABASE_URL is set:

```bash
# From project root
cp dotenv/.env.server.example apps/server/.env
```

The `.env` file should contain:
```env
DATABASE_URL="postgresql://bhvr:bhvr_dev_password@localhost:5432/bhvr_dev"
```

### 4. Initialize Database

```bash
cd apps/server

# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# (Optional) Open Prisma Studio
bun run db:studio
```

## Common Commands

### Container Management

```bash
# Start container
docker-compose up -d

# Stop container (keeps data)
docker-compose down

# Stop and remove data (⚠️ deletes all data)
docker-compose down -v

# Restart container
docker-compose restart postgres

# View logs
docker-compose logs -f postgres

# Check container status
docker-compose ps
```

### Database Access

```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U bhvr -d bhvr_dev

# Run SQL query
docker-compose exec postgres psql -U bhvr -d bhvr_dev -c "SELECT * FROM \"User\";"

# Check PostgreSQL version
docker-compose exec postgres psql -U bhvr -c "SELECT version();"

# List all databases
docker-compose exec postgres psql -U bhvr -c "\l"
```

### Database Operations

```bash
# Backup database
docker-compose exec postgres pg_dump -U bhvr bhvr_dev > backup.sql

# Restore database
docker-compose exec -T postgres psql -U bhvr -d bhvr_dev < backup.sql

# Reset database (⚠️ deletes all data)
docker-compose exec postgres psql -U bhvr -d bhvr_dev -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

## Configuration

The `docker-compose.yml` file in the project root contains:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: bhvr-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: bhvr
      POSTGRES_PASSWORD: bhvr_dev_password
      POSTGRES_DB: bhvr_dev
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Customization

**Change Port:**
```yaml
ports:
  - "5433:5432"  # Use port 5433 on host
```

Then update DATABASE_URL:
```env
DATABASE_URL="postgresql://bhvr:bhvr_dev_password@localhost:5433/bhvr_dev"
```

**Change Credentials:**
```yaml
environment:
  POSTGRES_USER: myuser
  POSTGRES_PASSWORD: mypassword
  POSTGRES_DB: mydb
```

## Troubleshooting

### Port 5432 Already in Use

**Problem:** Another PostgreSQL instance is running on port 5432

**Solutions:**
1. Stop local PostgreSQL: `brew services stop postgresql`
2. Change Docker port in `docker-compose.yml` (see Customization above)

### Container Won't Start

```bash
# Check logs for errors
docker-compose logs postgres

# Remove and recreate container
docker-compose down -v
docker-compose up -d
```

### Connection Refused

**Check:**
1. Container is running: `docker-compose ps`
2. DATABASE_URL is correct in `.env`
3. Port is accessible: `telnet localhost 5432`

### Data Persistence

Data is stored in Docker volume `postgres_data`:

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect bhvr-boilerplate_postgres_data

# Remove volume (⚠️ deletes all data)
docker volume rm bhvr-boilerplate_postgres_data
```

## Production Considerations

⚠️ **Docker is recommended for local development only.**

For production, use managed PostgreSQL services:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with additional features
- [Railway](https://railway.app) - Simple deployment platform
- [AWS RDS](https://aws.amazon.com/rds) - Enterprise-grade managed database

## Next Steps

1. ✅ Start Docker container
2. ✅ Configure environment variables
3. ✅ Initialize database with Prisma
4. 📖 Read [Database Documentation](./DATABASE.md) for advanced usage
5. 🔐 Configure [Authentication](./AUTHENTICATION.md)

---

**Need Help?** Check the main [Database Documentation](./DATABASE.md) for comprehensive guides.
