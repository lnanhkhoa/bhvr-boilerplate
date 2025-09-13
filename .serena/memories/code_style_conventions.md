# BHVR Code Style & Conventions 🦫

## TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **Version**: TypeScript 5.9.2 across all workspaces
- **Shared Configs**: Centralized in `packages/typescript-config/`

## Code Formatting (Prettier)
```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": false,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "bracketSameLine": false
}
```

## Naming Conventions
- **Files**: kebab-case (e.g., `middleware-setup.ts`)
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions/Variables**: camelCase (e.g., `createScalarMiddleware`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `ApiResponse`, `CorsConfig`)

## File Organization
- **Barrel Exports**: Use `index.ts` files for clean imports
- **Middleware**: Organized in `/src/middleware/` with dedicated modules
- **Routes**: Separated by feature in `/src/routes/`
- **Utilities**: Centralized in `/src/lib/`
- **Types**: Shared types in `packages/shared/`

## Import Conventions
```typescript
// External libraries first
import { cors } from "hono/cors";
import { Scalar } from "@scalar/hono-api-reference";

// Internal imports
import { createOpenAPIApp } from "./middleware";
import type { CorsConfig } from "./middleware/cors";

// Shared package imports
import { ApiResponse } from "@repo/shared";
```

## Documentation Style
- **JSDoc Comments**: Use for public APIs and complex functions
- **Beaver-Themed**: Incorporate peaceful, industrious metaphors
- **Type Annotations**: Explicit return types for functions
- **Interface Documentation**: Clear property descriptions

## Error Handling
- **Peaceful Responses**: User-friendly error messages
- **Type Safety**: Proper error type definitions
- **Environment Aware**: Different error details for dev/prod
- **Consistent Format**: Standardized error response structure

## Component Patterns
- **Functional Components**: Prefer function declarations
- **Custom Hooks**: Extract reusable logic
- **Props Interfaces**: Define clear component contracts
- **Default Exports**: For main components, named for utilities