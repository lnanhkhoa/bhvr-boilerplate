# BHVR Middleware Architecture 🦫

## Middleware Organization Structure

### Directory Layout
```
apps/server/src/middleware/
├── index.ts          # Barrel exports and setup functions
├── openapi.ts        # OpenAPI configuration and error handling
├── scalar.ts         # Scalar API Reference setup
├── cors.ts           # CORS configuration
└── auth.ts           # Authentication middleware
```

## OpenAPI Middleware (`openapi.ts`)

### Key Functions
- `createOpenAPIApp()`: Creates OpenAPI-enabled Hono app with validation hooks
- `setupOpenAPIDocumentation()`: Configures comprehensive API documentation
- `setupOpenAPIErrorHandling()`: Implements peaceful error responses

### Features
- Automatic Zod validation with detailed error messages
- Environment-aware error handling (dev vs production)
- Comprehensive OpenAPI 3.0 specification
- Swagger UI integration at `/doc`

## Scalar API Reference (`scalar.ts`)

### Key Functions
- `createScalarMiddleware()`: Creates Scalar documentation middleware
- `setupScalarDocumentation()`: Sets up multiple documentation endpoints
- `createDevelopmentScalarConfig()`: Development-specific configuration
- `createProductionScalarConfig()`: Production-optimized settings

### Endpoints
- `/scalar` - Primary Scalar API Reference
- `/docs` - Alternative access point
- `/api-docs` - Additional documentation endpoint
- `/documentation` - Redirects to main Scalar endpoint

## CORS Middleware (`cors.ts`)

### Key Functions
- `createCorsMiddleware()`: Configurable CORS setup
- `setupCorsMiddleware()`: Applies CORS to entire app
- `createDevelopmentCorsConfig()`: Relaxed settings for development
- `createProductionCorsConfig()`: Secure settings for production

### Configuration
- Environment-aware origin handling
- Comprehensive header management
- Credential support for authenticated requests
- Preflight caching optimization

## Middleware Setup Order

The middleware is applied in a specific order for optimal functionality:

1. **CORS** - First line of defense for cross-origin requests
2. **OpenAPI Documentation** - API specification setup
3. **Scalar API Reference** - Documentation UI setup
4. **Error Handling** - Global error management

## Integration Pattern

```typescript
// Clean import from barrel export
import { 
  createOpenAPIApp, 
  setupOpenAPIDocumentation, 
  setupOpenAPIErrorHandling,
  setupCorsMiddleware,
  setupScalarDocumentation,
  createDevelopmentScalarConfig
} from "./middleware";

// Methodical setup like a beaver's construction
const app = createOpenAPIApp();
setupCorsMiddleware(app);
setupOpenAPIDocumentation(app);
setupScalarDocumentation(app, createDevelopmentScalarConfig());
setupOpenAPIErrorHandling(app);
```

## Type Safety Features
- Full TypeScript support with proper interfaces
- Configuration type definitions for all middleware
- Environment-specific type constraints
- Proper error type handling