# OpenAPI Integration Documentation

## Overview

The BHVR API now includes full OpenAPI 3.0 integration with automatic documentation generation, type-safe request/response validation, and a built-in Swagger UI.

## Features

✅ **Auto-generated OpenAPI documentation** at `/doc`  
✅ **Interactive Swagger UI** for testing endpoints  
✅ **Type-safe validation** using Zod schemas  
✅ **Consistent error responses** across all endpoints  
✅ **Standardized response formats** for all API operations  
✅ **Development-friendly error details** in development mode  

## Accessing API Documentation

### Swagger UI
Visit `http://localhost:3000/doc` to access the interactive API documentation where you can:
- Browse all available endpoints
- View request/response schemas
- Test endpoints directly in the browser
- See authentication requirements

### OpenAPI JSON
The raw OpenAPI specification is available at `http://localhost:3000/doc/openapi.json`

## API Structure

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: Set via `API_URL` environment variable

### Authentication
Most endpoints require Bearer token authentication:
```
Authorization: Bearer <your-session-token>
```

### Response Format
All responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "details": { /* additional error details */ }
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "fieldErrors": {
      "fieldName": ["error message"]
    },
    "formErrors": ["form-level error"]
  }
}
```

## Available Endpoints

### Health & Status
- `GET /` - Health check
- `GET /hello` - Simple hello endpoint

### Authentication
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login  
- `POST /api/auth/sign-out` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `GET /api/auth/session` - Get current session
- `GET /api/auth/sign-in/google` - Google OAuth
- `GET /api/auth/sign-in/github` - GitHub OAuth

### User Management
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)

## Development Guide

### Creating New Routes

1. **Define Zod schemas** in `packages/shared/src/schemas/`
2. **Create route definition** using `createRoute()`  
3. **Implement route handler** with proper validation
4. **Add route to app** using `app.openapi()`

Example:

```typescript
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

// Define request/response schemas
const CreateItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const ItemResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    createdAt: z.string(),
  }),
});

// Create route definition
const createItemRoute = createRoute({
  method: "post",
  path: "/items",
  tags: ["Items"],
  summary: "Create new item",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateItemSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: ItemResponseSchema,
        },
      },
      description: "Item created successfully",
    },
    ...StandardErrorResponses,
  },
});

// Implement route handler
app.openapi(createItemRoute, async (c) => {
  const data = c.req.valid("json");
  
  // Your business logic here
  const item = await createItem(data);
  
  return c.json(createSuccessResponse(item, "Item created successfully"), 201);
});
```

### Error Handling

The system provides automatic error handling for:
- **Validation errors**: Zod schema validation failures
- **Authentication errors**: Missing or invalid tokens  
- **Authorization errors**: Insufficient permissions
- **Server errors**: Unexpected application errors

### Schema Organization

Schemas are organized in `packages/shared/src/schemas/`:
- `common.ts` - Shared utilities and base schemas
- `auth.ts` - Authentication-related schemas  
- `user.ts` - User management schemas
- `index.ts` - Re-exports all schemas

### Type Safety

All request/response types are automatically inferred from Zod schemas:
```typescript
import type { UserData, UpdateUserProfileData } from "@repo/shared";

// Types are automatically available and type-safe
const user: UserData = await getUser();
const updates: UpdateUserProfileData = { name: "New Name" };
```

## Environment Configuration

No additional environment variables are required for OpenAPI functionality. The system automatically configures itself based on:

- `API_URL` - Base URL for the API (defaults to `http://localhost:3000`)
- `NODE_ENV` - Controls error detail level (more details in development)

## Testing

### Using Swagger UI
1. Visit `http://localhost:3000/doc`
2. Click "Authorize" to add your Bearer token
3. Test any endpoint directly in the browser

### Programmatic Testing
```bash
# Health check
curl http://localhost:3000/

# Get user profile (with auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/user/profile

# Update profile
curl -X PUT \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"New Name"}' \
     http://localhost:3000/api/user/profile
```

## Benefits

### For Developers
- **Type safety**: Catch errors at compile time
- **Auto-completion**: Full IntelliSense support
- **Documentation**: Always up-to-date API docs
- **Testing**: Built-in API testing interface

### For API Consumers  
- **Clear documentation**: Interactive API explorer
- **Predictable responses**: Consistent response format
- **Error handling**: Standardized error messages
- **Authentication**: Clear auth requirements

### For Teams
- **API-first development**: Design APIs before implementation
- **Contract testing**: Validate API contracts automatically  
- **Client generation**: Future-ready for auto-generated SDKs
- **Maintenance**: Self-documenting API changes

## Future Enhancements

The OpenAPI integration provides a foundation for:
- **Client SDK generation** for TypeScript, Python, etc.
- **Contract testing** with tools like Pact
- **API versioning** and backwards compatibility
- **Rate limiting** and API quotas
- **Request/response logging** and analytics

## Migration Notes

Existing endpoints have been converted to use OpenAPI while maintaining backward compatibility. The main changes:
- Standardized response formats  
- Enhanced error messages with details
- Automatic request validation
- Interactive documentation

All existing authentication and functionality remains unchanged.