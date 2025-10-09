# Client App Architecture

## Overview
The client app (`apps/client`) is a modern React SPA built with Vite, featuring full authentication flows, protected routes, and seamless integration with the server via Better Auth.

## Tech Stack
- **React 19.1.0** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **React Router 7.8.2** - Client-side routing
- **Better Auth 1.3.27** - Authentication client
- **TanStack Query 5.87.1** - Server state management
- **React Hook Form** - Form handling
- **Zod 4.1.12** - Schema validation
- **Tailwind CSS 4.1.14** - Styling
- **TypeScript 5.9.2** - Type safety

## Directory Structure

```
src/
├── assets/           # Static assets (beaver.svg)
├── components/       # Shared components
│   ├── protected-route.tsx
│   └── user-menu.tsx
├── configs/          # Configuration files
│   ├── constanst.ts  # Route constants
│   └── env.ts        # Environment variables
├── lib/              # Utilities and libraries
│   ├── auth-client.ts
│   └── validations/
│       └── auth.ts
├── pages/            # Page components
│   ├── auth/         # Authentication pages
│   │   ├── components/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── forgot-password.tsx
│   │   ├── reset-password.tsx
│   │   └── otp.tsx
│   ├── dashboard.tsx
│   └── home.tsx
├── routes/           # Route configuration
│   └── app-routes.tsx
├── styles/           # Global styles
│   ├── global.css
│   └── main.css
└── main.tsx          # App entry point
```

## Key Patterns

### Authentication Flow
1. **Auth Client Setup** (`lib/auth-client.ts`):
   - Uses Better Auth React client
   - Configured with `API_BASE_URL` from env
   - Exports typed `Session` type

2. **Protected Routes** (`components/protected-route.tsx`):
   - Uses `authClient.useSession()` hook
   - Shows spinner during session check
   - Redirects to login if unauthenticated

3. **Auth Forms** (`pages/auth/components/`):
   - React Hook Form + Zod validation
   - Consistent error handling with toast notifications
   - Loading states during submission
   - Uses shadcn/ui Field components

### Form Validation (`lib/validations/auth.ts`)
- **Password validation**: Min 8 chars, uppercase, lowercase, number
- **Schemas**: login, signup, forgotPassword, resetPassword
- **Type exports**: Inferred types from Zod schemas

### Routing (`routes/app-routes.tsx`)
- Lazy-loaded pages with `React.lazy()`
- Suspense with Spinner fallback
- Protected routes wrapped with `<ProtectedRoute>`
- Centralized route constants in `configs/constanst.ts`

### Configuration
- **Environment** (`configs/env.ts`):
  - `API_BASE_URL`: Defaults to `http://localhost:3000`
  - Uses Vite env vars (`import.meta.env.VITE_*`)

- **Routes** (`configs/constanst.ts`):
  ```typescript
  export const ROUTES = {
    home: "/",
    dashboard: "/dashboard",
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    otp: "/otp",
  }
  ```

### App Entry (`main.tsx`)
Provider hierarchy:
1. `StrictMode`
2. `QueryClientProvider` (TanStack Query)
3. `ThemeProvider` (@repo/ui)
4. `BrowserRouter` (React Router)
5. `<App />` (routes)
6. `<Toaster />` (sonner notifications)

## UI Components
Uses `@repo/ui` package with shadcn/ui components:
- `Button`, `Input`, `Spinner`
- `Field`, `FieldLabel`, `FieldDescription`, `FieldGroup`, `FieldSeparator`
- `Toaster` (sonner)
- `ThemeProvider`

## Best Practices
1. **Form handling**: React Hook Form + Zod resolver
2. **Error handling**: Toast notifications for user feedback
3. **Loading states**: Disabled inputs/buttons during submission
4. **Type safety**: Zod schema inference for form types
5. **Code splitting**: Lazy-loaded routes
6. **Session management**: Better Auth hooks (`useSession`)
7. **Protected routes**: Wrapper component pattern
8. **Centralized constants**: Route paths in single config file

## Authentication Features
- Email/password login
- GitHub OAuth (social login)
- User signup
- Forgot password flow
- Password reset with token
- OTP verification
- Session-based protection
- Auto-redirect on authentication state change
