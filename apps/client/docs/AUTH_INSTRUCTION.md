# Client Authentication Guide 🔐

A concise guide to authentication in the BHVR client - peaceful, type-safe, and simple.

## Quick Start

### Import & Use

```typescript
import { authClient } from "@/lib/auth-client";

// Check session
const { data: session, isPending } = authClient.useSession();

// Sign in
await authClient.signIn.email({ email, password });

// Sign up
await authClient.signUp.email({ email, password, name });

// Sign out
await authClient.signOut();
```

## Core Concepts

### 1. Auth Client (`src/lib/auth-client.ts`)

Pre-configured Better Auth client with:
- Cookie-based sessions (automatic)
- JWT token support (optional)
- Bearer token authentication
- React hooks for session management

```typescript
export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [jwtClient()],
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => localStorage.getItem("authToken") || "",
    },
  },
});
```

### 2. Form Validation (`src/lib/validations/auth.ts`)

Zod schemas for all auth forms:
- `loginSchema` - Email + password
- `signupSchema` - Name + email + strong password
- `forgotPasswordSchema` - Email only
- `resetPasswordSchema` - Password + confirmation

**Password requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### 3. Protected Routes (`src/components/protected-route.tsx`)

Wrap any route that requires authentication:

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

Automatically:
- Shows loading spinner while checking session
- Redirects to login if not authenticated
- Renders children if authenticated

## Authentication Flows

### Sign Up

```typescript
const { data, error } = await authClient.signUp.email({
  email: data.email,
  password: data.password,
  name: data.name,
});

if (error) {
  toast.error(error.message);
  return;
}

toast.success("Account created!");
navigate("/dashboard");
```

### Sign In

```typescript
const { data, error } = await authClient.signIn.email(
  { email: data.email, password: data.password },
  {
    onSuccess(context) {
      // Optional: Store JWT token
      const token = context.response.headers.get("Set-Auth-Token");
      if (token) localStorage.setItem("authToken", token);
    },
  },
);

if (error) {
  toast.error(error.message);
  return;
}

toast.success("Login successful!");
navigate("/dashboard");
```

### OAuth (GitHub/Google)

```typescript
await authClient.signIn.social({
  provider: "github", // or "google"
  callbackURL: `${APP_BASE_URL}/dashboard`,
});
```

### Sign Out

```typescript
await authClient.signOut();
toast.success("Logged out");
navigate("/login");
```

### Forgot Password

```typescript
const { data, error } = await authClient.forgetPassword({
  email: data.email,
  redirectTo: `${APP_BASE_URL}/reset-password`,
});

if (error) {
  toast.error(error.message);
  return;
}

toast.success("Reset email sent!");
```

### Reset Password

```typescript
const { data, error } = await authClient.resetPassword({
  newPassword: data.password,
  token, // From URL query params
});

if (error) {
  toast.error(error.message);
  return;
}

toast.success("Password reset successful!");
navigate("/login");
```

## Session Management

### Access User Data

```typescript
function UserProfile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <Spinner />;
  if (!session) return <LoginPrompt />;

  return (
    <div>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>ID: {session.user.id}</p>
    </div>
  );
}
```

### Conditional Rendering

```typescript
const { data: session } = authClient.useSession();

{session ? (
  <UserMenu user={session.user} />
) : (
  <Link to="/login">Login</Link>
)}
```

## Best Practices

### ✅ Always Handle Errors

```typescript
try {
  const { data, error } = await authClient.signIn.email({ email, password });
  
  if (error) {
    toast.error(error.message || "Authentication failed");
    return;
  }
  
  // Handle success
} catch (err) {
  toast.error("An unexpected error occurred");
  console.error(err);
}
```

### ✅ Show Loading States

```typescript
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Logging in..." : "Login"}
</Button>
```

### ✅ Provide User Feedback

```typescript
toast.success("Login successful!");
toast.error("Invalid credentials");
toast.info("Check your email for reset link");
```

### ✅ Use Form Validation

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

const form = useForm({
  resolver: zodResolver(loginSchema),
});
```

## Common Issues

### Session Not Persisting
- Ensure `baseURL` matches server URL
- Check cookies are enabled
- Verify CORS credentials are allowed

### OAuth Redirects Fail
- Configure callback URLs in OAuth provider
- Set correct `callbackURL` in auth client calls
- Check `APP_BASE_URL` environment variable

### Form Validation Not Working
- Include `zodResolver` in `useForm`
- Import correct schema from validations
- Register form fields with `{...register("fieldName")}`

## Environment Setup

Required environment variables (`.env`):

```env
# Server API URL
VITE_API_BASE_URL=http://localhost:3000

# Client base URL (for OAuth callbacks)
VITE_APP_BASE_URL=http://localhost:5173
```

## Development vs Production

**Development Mode** (server without `RESEND_API_KEY`):
- Auto sign-in after registration
- No email verification
- Emails logged to console

**Production Mode** (server with `RESEND_API_KEY`):
- Email verification required
- Real emails via Resend
- Standard auth flow

## File Structure

```
src/
├── lib/
│   ├── auth-client.ts          # Auth client configuration
│   └── validations/
│       └── auth.ts              # Zod validation schemas
├── components/
│   ├── protected-route.tsx      # Route protection wrapper
│   └── user-menu.tsx            # User menu with sign out
└── pages/
    └── auth/
        ├── login.tsx            # Login page
        ├── signup.tsx           # Signup page
        ├── forgot-password.tsx  # Forgot password page
        ├── reset-password.tsx   # Reset password page
        └── components/          # Auth form components
```

## Related Documentation

- [Server Auth API](../../server/docs/AUTH_API.md) - Server authentication reference
- [Better Auth Docs](https://www.better-auth.com/) - Official documentation

---

Built with 🦫 - Peaceful authentication for serene development
