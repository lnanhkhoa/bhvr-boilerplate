# Authentication API Documentation

## Overview

This server uses Better Auth for authentication with support for:

- Email/Password authentication
- Google OAuth (optional)
- GitHub OAuth (optional)
- Email verification via Resend (optional)
- Password recovery via email (optional)
- Session management
- Development mode (auto sign-in without email verification)

## API Endpoints

All auth endpoints are available under `/api/auth/*`

### Core Authentication

#### Sign Up

```
POST /api/auth/sign-up
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe" // optional
}
```

#### Sign In

```
POST /api/auth/sign-in
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Sign Out

```
POST /api/auth/sign-out
Authorization: Bearer <session-token>
```

#### Get Session

```
GET /api/auth/session
Authorization: Bearer <session-token>
```

### Password Recovery

#### Forgot Password

```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password

```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "newsecurepassword"
}
```

### OAuth Authentication

#### Google OAuth

```
GET /api/auth/sign-in/google
```

Redirects to Google OAuth consent screen

#### GitHub OAuth

```
GET /api/auth/sign-in/github
```

Redirects to GitHub OAuth authorization

### OAuth Callbacks

```
GET /api/auth/callback/google
GET /api/auth/callback/github
```

These are handled automatically by Better Auth

## Protected Routes

Example protected route:

```
GET /api/user/profile
Authorization: Bearer <session-token>
```

## Frontend Integration

Use the Better Auth client for easy integration:

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  password: "password",
  name: "John Doe",
});

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password",
});

// Sign in with Google
await authClient.signIn.social({
  provider: "google",
});

// Sign in with GitHub
await authClient.signIn.social({
  provider: "github",
});

// Get session
const session = await authClient.session();

// Sign out
await authClient.signOut();

// Forgot password
await authClient.forgetPassword({
  email: "user@example.com",
});

// Reset password
await authClient.resetPassword({
  token: "reset-token",
  newPassword: "newpassword",
});
```

## Environment Variables

Required environment variables:

```env
# Database (Required)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Auth Secret (Required - minimum 32 characters)
BETTER_AUTH_SECRET=your-secret-key-here-min-32-chars-long!!

# OAuth Providers (Optional - leave empty to disable)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email Configuration (Optional - for email verification and password recovery)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM="Your App <noreply@yourapp.com>"

# Legacy SMTP Configuration (not used with Resend)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-specific-password
```

## Development vs Production Mode

### Development Mode (Default)
When `RESEND_API_KEY` is **not set**:
- ✅ **Auto sign-in enabled** - Users signed in immediately after registration
- ✅ **Email verification disabled** - No email verification required
- ✅ **Email logging** - Email content logged to console instead of sending
- ✅ **OAuth optional** - Works without OAuth credentials

### Production Mode  
When `RESEND_API_KEY` **is set**:
- 🔐 **Email verification required** - Users must verify email before access
- 📧 **Real emails sent** - Uses Resend to send actual emails
- 🚫 **No auto sign-in** - Standard authentication flow
- ⚙️ **OAuth configured** - Requires proper OAuth credentials

## Database

The authentication system uses **PostgreSQL with Drizzle ORM**.

### Setup
1. Set your `DATABASE_URL` to a valid PostgreSQL connection string
2. Run database migrations: `bun run db:push`
3. Tables are automatically created based on the schema

### Database Commands
```bash
# Push schema changes to database
bun run db:push

# Generate migration files
bun run db:generate

# Run migrations
bun run db:migrate

# Open database studio
bun run db:studio
```

## Session Management

- Sessions expire after 7 days by default
- Sessions are refreshed every 24 hours when used
- Sessions are stored as HTTP-only cookies

## Rate Limiting

- Authentication endpoints are rate-limited to 10 requests per minute per IP
- This helps prevent brute force attacks

## Error Handling

All errors return a JSON response with:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

Common error codes:

- `INVALID_CREDENTIALS` - Wrong email or password
- `USER_NOT_FOUND` - User doesn't exist
- `EMAIL_ALREADY_EXISTS` - Email is already registered
- `INVALID_TOKEN` - Invalid or expired token
- `RATE_LIMIT_EXCEEDED` - Too many requests
