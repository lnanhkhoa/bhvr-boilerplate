# Database Setup

This application uses PostgreSQL with Drizzle ORM for authentication via better-auth.

## Setup

1. Set your `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

2. Generate and push initial schema:
   ```bash
   bun run db:generate
   bun run db:push
   ```

## Available Scripts

- `bun run db:generate` - Generate migration files from schema changes
- `bun run db:push` - Push schema changes directly to database 
- `bun run db:migrate` - Run pending migrations
- `bun run db:studio` - Open Drizzle Studio for database inspection

## Schema

The auth tables are automatically managed by better-auth:
- `user` - User accounts
- `session` - User sessions
- `account` - OAuth provider accounts
- `verification` - Email verification tokens