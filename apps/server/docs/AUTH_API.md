# Authentication API Documentation 🔐

## Overview

The BHVR server uses **[Better Auth](https://www.better-auth.com/)** - a modern, type-safe authentication library that provides a complete authentication solution with minimal configuration.

### Features

✅ **Email/Password Authentication** - Secure credential-based auth  
✅ **OAuth Providers** - Google and GitHub (optional)  
✅ **Email Verification** - Resend integration (optional)  
✅ **Password Recovery** - Secure reset flow  
✅ **Session Management** - HTTP-only cookies  
✅ **Rate Limiting** - Brute force protection  
✅ **Development Mode** - Auto sign-in for easy testing  
✅ **Type Safety** - Full TypeScript support

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

### Required Variables

```env
# Database Connection (Required)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Auth Secret (Required - minimum 32 characters)
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars-long!!"

# Base URL (Required)
BETTER_AUTH_URL="http://localhost:3000"
```

### Optional Variables

#### OAuth Providers

```env
# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

#### Email Configuration

```env
# Resend API (Optional - for email verification and password recovery)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="BHVR <noreply@yourapp.com>"
```

### Environment Setup

```bash
# Copy example environment file
cp ../../dotenv/.env.server.example .env

# Edit .env and configure your variables
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

The authentication system uses **PostgreSQL with Prisma ORM**.

### Quick Setup

```bash
# 1. Set DATABASE_URL in .env
# 2. Generate Prisma client
bun run db:generate

# 3. Push schema to database
bun run db:push

# 4. (Optional) Open Prisma Studio
bun run db:studio
```

### Database Tables

Better Auth automatically creates and manages:
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth provider links
- `verification` - Email verification tokens

See [DATABASE.md](./DATABASE.md) for detailed schema information.

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
- `EMAIL_NOT_VERIFIED` - Email verification required (production only)

## Client Integration

### Using Better Auth Client

The recommended way to integrate with the client:

```typescript
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export default authClient;
```

### React Hooks

```typescript
import { useSession } from "better-auth/react";

function Profile() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome, {session.user.name}!</div>;
}
```

### Authentication Actions

```typescript
import authClient from "@/lib/auth-client";

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Sign out
await authClient.signOut();

// OAuth sign in
await authClient.signIn.social({ provider: "google" });
await authClient.signIn.social({ provider: "github" });
```

## Security Features

### Password Security

- **Bcrypt hashing** - Industry-standard password hashing
- **Salt rounds** - Configurable salt rounds for security
- **Minimum length** - Enforced password requirements

### Session Security

- **HTTP-only cookies** - Prevents XSS attacks
- **Secure flag** - HTTPS-only in production
- **SameSite** - CSRF protection
- **Session expiry** - Automatic expiration after 7 days
- **Session refresh** - Automatic refresh every 24 hours

### Rate Limiting

- **10 requests per minute** per IP on auth endpoints
- **Prevents brute force** attacks
- **Configurable limits** per endpoint

### Email Verification

- **Required in production** when `RESEND_API_KEY` is set
- **Disabled in development** for easy testing
- **Secure tokens** with expiration
- **Beautiful email templates** via React Email

## Testing

### Development Mode

With no `RESEND_API_KEY` set:

```bash
# Start server
bun run dev

# Test signup (auto sign-in enabled)
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# User is automatically signed in, no email verification needed
```

### Production Mode

With `RESEND_API_KEY` set:

```bash
# Signup requires email verification
# Password reset sends actual emails
# OAuth requires proper credentials
```

### Using Swagger UI

Test all endpoints interactively:

1. Visit `http://localhost:3000/doc`
2. Click "Authorize" to add your session token
3. Test any auth endpoint directly

## OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env`

## Troubleshooting

### Common Issues

#### "Database connection failed"

- Check `DATABASE_URL` format
- Ensure PostgreSQL is running
- Run `bun run db:push` to create tables

#### "Invalid session"

- Session may have expired (7 days)
- Clear cookies and sign in again
- Check `BETTER_AUTH_SECRET` is set

#### "Email not sending"

- In development: Check console logs
- In production: Verify `RESEND_API_KEY`
- Check `EMAIL_FROM` is properly formatted

#### "OAuth not working"

- Verify client ID and secret
- Check redirect URIs match exactly
- Ensure OAuth app is enabled

## Best Practices

### Security

- ✅ Use strong `BETTER_AUTH_SECRET` (32+ characters)
- ✅ Enable email verification in production
- ✅ Use HTTPS in production
- ✅ Rotate secrets regularly
- ✅ Monitor failed login attempts

### User Experience

- ✅ Clear error messages
- ✅ Loading states during auth
- ✅ Redirect after successful auth
- ✅ Remember me functionality
- ✅ Password strength indicator

### Development

- ✅ Use development mode for testing
- ✅ Test all auth flows
- ✅ Handle edge cases
- ✅ Log auth events
- ✅ Monitor session activity

## Resources

- **Better Auth Docs** - [better-auth.com/docs](https://www.better-auth.com/docs)
- **Resend Docs** - [resend.com/docs](https://resend.com/docs)
- **Prisma Docs** - [prisma.io/docs](https://www.prisma.io/docs)
- **OAuth 2.0 Guide** - [oauth.net/2](https://oauth.net/2/)

## Next Steps

1. Configure environment variables
2. Set up database connection
3. Test authentication flow
4. Configure OAuth providers (optional)
5. Set up email service (optional)
6. Implement protected routes
7. Add user profile management

---

**Need Help?** Check the [Architecture Guide](./ARCHITECTURE.md) for authentication integration patterns.
