# Server Architecture 🏗️

## Overview

The BHVR server is built with a clean, modular architecture that emphasizes type safety, maintainability, and developer experience. This document explains the server's structure and design decisions.

## Technology Stack

### Core Framework

- **Hono** - Ultra-fast web framework with excellent TypeScript support
- **Bun** - Modern JavaScript runtime with native TypeScript support
- **TypeScript** - Strict type checking throughout

### Key Libraries

- **Better Auth** - Modern authentication with built-in security
- **Prisma** - Type-safe database ORM
- **Zod** - Runtime type validation and schema definition
- **@hono/zod-openapi** - OpenAPI 3.0 integration with automatic validation

## Directory Structure

```
src/
├── configs/              # Configuration files
│   ├── constants.ts      # Application constants
│   └── env.ts           # Environment variable validation
├── lib/                 # Core business logic
│   ├── auth.ts          # Better Auth configuration
│   └── email.ts         # Email service functions
├── middlewares/         # Hono middlewares
│   ├── auth.ts          # Authentication middleware
│   ├── cors.ts          # CORS configuration
│   ├── openapi.ts       # OpenAPI middleware
│   ├── scalar.ts        # Scalar API reference
│   ├── upload.ts        # File upload handling
│   └── index.ts         # Middleware orchestration
├── routes/              # API route handlers
│   └── upload-routes.ts # File upload routes
├── schemas/             # Zod validation schemas
│   ├── common.ts        # Shared schemas
│   └── index.ts         # Schema exports
├── utils/               # Utility functions
│   └── response.ts      # Response helpers
├── client.ts            # Auth client configuration
└── index.ts             # Application entry point
```

## Architecture Layers

### 1. Entry Point (`index.ts`)

The main application file that:
- Initializes the Hono app
- Sets up all middlewares
- Defines core routes
- Configures Better Auth handler

```typescript
const app = new Hono();
app.use(prettyJSON());
setupAllMiddlewares(app);

// Core routes
app.get("/", (c) => c.text("Hono API"));
app.get("/health", (c) => { /* health check */ });

// Better Auth handler
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
```

### 2. Configuration Layer (`configs/`)

#### Environment Variables (`env.ts`)

Validates and exports environment variables with type safety:

```typescript
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
```

#### Constants (`constants.ts`)

Application-wide constants and configuration values.

### 3. Middleware Layer (`middlewares/`)

#### Authentication Middleware (`auth.ts`)

Protects routes and validates user sessions:

```typescript
export const requireAuth = async (c: Context, next: Next) => {
  const session = await getSession(c);
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
};
```

#### CORS Middleware (`cors.ts`)

Configures Cross-Origin Resource Sharing for API access.

#### OpenAPI Middleware (`openapi.ts`)

Sets up OpenAPI documentation and Swagger UI:
- Automatic schema validation
- Interactive API documentation at `/doc`
- OpenAPI spec at `/doc/openapi.json`

#### Upload Middleware (`upload.ts`)

Handles file uploads with validation and storage.

### 4. Library Layer (`lib/`)

#### Authentication (`auth.ts`)

Configures Better Auth with:
- Email/password authentication
- OAuth providers (Google, GitHub)
- Email verification
- Password recovery
- Session management
- Development vs production modes

Key features:
```typescript
export const auth = betterAuth({
  database: prisma,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: isProduction,
    autoSignIn: !isProduction,
  },
  socialProviders: {
    google: { /* config */ },
    github: { /* config */ },
  },
});
```

#### Email Service (`email.ts`)

Provides email sending functions:
- `sendEmail()` - Core email sending
- `sendWelcomeEmail()` - Welcome new users
- `sendPasswordResetEmail()` - Password reset flow
- `sendEmailVerificationEmail()` - Email verification

Supports two modes:
- **Development**: Logs emails to console
- **Production**: Sends via Resend API

### 5. Route Layer (`routes/`)

API route handlers organized by feature:
- Type-safe request/response handling
- Zod schema validation
- OpenAPI documentation
- Consistent error handling

Example route structure:
```typescript
const createRoute = createRoute({
  method: "post",
  path: "/api/resource",
  request: {
    body: {
      content: {
        "application/json": { schema: RequestSchema }
      }
    }
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: ResponseSchema }
      }
    }
  }
});
```

### 6. Schema Layer (`schemas/`)

Zod schemas for validation and type inference:
- Request validation
- Response validation
- Type generation
- OpenAPI documentation

Benefits:
- Single source of truth for types
- Runtime validation
- Compile-time type checking
- Auto-generated API docs

### 7. Utility Layer (`utils/`)

#### Response Helpers (`response.ts`)

Standardized response formats:

```typescript
export const createSuccessResponse = (data: any, message?: string) => ({
  success: true,
  data,
  message,
});

export const createErrorResponse = (error: string, details?: any) => ({
  success: false,
  error,
  details,
});
```

## Data Flow

### Request Flow

```
1. Client Request
   ↓
2. CORS Middleware
   ↓
3. Authentication Middleware (if protected)
   ↓
4. Request Validation (Zod schema)
   ↓
5. Route Handler
   ↓
6. Business Logic (lib/)
   ↓
7. Database Query (Prisma)
   ↓
8. Response Formatting (utils/)
   ↓
9. Response Validation (Zod schema)
   ↓
10. Client Response
```

### Authentication Flow

```
1. User submits credentials
   ↓
2. Better Auth validates
   ↓
3. Prisma queries database
   ↓
4. Session created (if valid)
   ↓
5. HTTP-only cookie set
   ↓
6. User authenticated
```

### Email Flow

```
1. Trigger event (signup, password reset, etc.)
   ↓
2. Email service function called
   ↓
3. React Email template rendered
   ↓
4. Development: Log to console
   Production: Send via Resend
   ↓
5. Email delivered
```

## Design Patterns

### 1. Dependency Injection

Configuration and dependencies are injected rather than imported directly:

```typescript
export const setupAllMiddlewares = (app: Hono) => {
  app.use(cors());
  app.use(requireAuth);
  // ... other middlewares
};
```

### 2. Factory Pattern

Creating configured instances:

```typescript
export const auth = betterAuth({
  database: prisma,
  // ... configuration
});
```

### 3. Middleware Pattern

Composable request processing:

```typescript
app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
```

### 4. Schema-Driven Development

Schemas define the contract:

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type User = z.infer<typeof schema>;
```

## Security Architecture

### Authentication Security

- **Password Hashing**: Bcrypt with salt
- **Session Management**: HTTP-only cookies
- **CSRF Protection**: Built into Better Auth
- **Rate Limiting**: On authentication endpoints
- **Email Verification**: Required in production

### API Security

- **Input Validation**: Zod schemas validate all inputs
- **Type Safety**: TypeScript prevents type errors
- **Error Handling**: Consistent, non-revealing errors
- **CORS**: Configured for specific origins

### Database Security

- **Prepared Statements**: Prisma prevents SQL injection
- **Connection Pooling**: Efficient database connections
- **Environment Variables**: Secrets never in code

## Performance Considerations

### Bun Runtime

- Native TypeScript execution
- Fast startup times
- Efficient memory usage
- Built-in bundler

### Hono Framework

- Minimal overhead
- Fast routing
- Efficient middleware chain
- Small bundle size

### Database Optimization

- Connection pooling
- Efficient queries with Prisma
- Indexes on frequently queried fields
- Query optimization

### Caching Strategy

- Session caching
- Static asset caching
- API response caching (future)

## Error Handling

### Error Hierarchy

```
1. Validation Errors (400)
   - Zod schema validation failures
   - Invalid request format

2. Authentication Errors (401)
   - Missing credentials
   - Invalid session

3. Authorization Errors (403)
   - Insufficient permissions

4. Not Found Errors (404)
   - Resource doesn't exist

5. Server Errors (500)
   - Unexpected errors
   - Database errors
```

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": "Additional context"
  }
}
```

## Testing Strategy

### Unit Testing

- Test individual functions
- Mock external dependencies
- Focus on business logic

### Integration Testing

- Test API endpoints
- Use test database
- Verify request/response flow

### End-to-End Testing

- Test complete user flows
- Use Swagger UI for manual testing
- Automated E2E tests (future)

## Deployment Architecture

### Development

```
Developer → Bun Dev Server → PostgreSQL (local)
```

### Production

```
Client → CDN/Load Balancer → Server Instances → PostgreSQL (managed)
                                ↓
                            Resend API (email)
```

### Supported Platforms

- **Cloudflare Workers** - Serverless
- **Bun Runtime** - Native deployment
- **Node.js** - Traditional servers
- **Docker** - Containerized

## Scalability Considerations

### Horizontal Scaling

- Stateless server design
- Session storage in database
- Load balancer ready

### Vertical Scaling

- Efficient resource usage
- Connection pooling
- Optimized queries

### Database Scaling

- Read replicas (future)
- Connection pooling
- Query optimization
- Caching layer (future)

## Monitoring & Observability

### Logging

- Request/response logging
- Error logging
- Performance metrics

### Health Checks

- `/health` endpoint
- Database connectivity
- External service status

### Metrics (Future)

- Request rate
- Response time
- Error rate
- Active sessions

## Future Enhancements

### Planned Features

- [ ] Rate limiting middleware
- [ ] Request caching
- [ ] WebSocket support
- [ ] GraphQL endpoint
- [ ] Admin dashboard
- [ ] Audit logging
- [ ] Advanced monitoring

### Scalability Improvements

- [ ] Redis for session storage
- [ ] Message queue integration
- [ ] Microservices architecture
- [ ] Event-driven architecture

## Best Practices

### Code Organization

- One responsibility per file
- Clear naming conventions
- Consistent file structure
- Shared types in monorepo

### Type Safety

- Strict TypeScript mode
- Zod for runtime validation
- No `any` types
- Proper error types

### Security

- Environment variables for secrets
- Input validation on all endpoints
- Rate limiting on sensitive routes
- Regular dependency updates

### Performance

- Efficient database queries
- Minimal middleware overhead
- Lazy loading where appropriate
- Connection pooling

## Conclusion

The BHVR server architecture prioritizes:

- **Type Safety** - Catch errors at compile time
- **Developer Experience** - Clear structure, great tooling
- **Security** - Multiple layers of protection
- **Performance** - Fast runtime, efficient code
- **Maintainability** - Clean code, clear patterns
- **Scalability** - Ready to grow with your needs

This architecture provides a solid foundation for building production-ready APIs while maintaining the flexibility to adapt to your specific requirements.
