# BHVR Monorepo Conventions 🦫

## Package Naming Convention

All internal packages use the `@repo/*` scope for consistency and clarity.

### Package Names

```
@repo/ui                    - UI component library
@repo/shared                - Shared types and utilities  
@repo/eslint-config         - ESLint configuration
@repo/typescript-config     - TypeScript configuration
```

### Why `@repo/*`?

1. **Standard Practice**: Follows Turborepo and monorepo best practices
2. **Clear Distinction**: Easy to identify internal vs external dependencies
3. **No Conflicts**: Prevents naming conflicts with npm packages
4. **Workspace Protocol**: Works seamlessly with `workspace:*` dependencies
5. **Easy Migration**: Simple to replace `@repo` with your org name when publishing

## Project Structure

```
bhvr-boilerplate/
├── apps/
│   ├── client/          - React + Vite frontend
│   ├── server/          - Hono backend
│   └── showcase/        - Component showcase app
├── packages/
│   ├── ui/              - @repo/ui - UI components
│   ├── shared/          - @repo/shared - Shared types
│   ├── eslint-config/   - @repo/eslint-config
│   └── typescript-config/ - @repo/typescript-config
└── package.json
```

## Import Conventions

### Using Internal Packages

```typescript
// UI components
import { Button, Card } from "@repo/ui";
import { cn } from "@repo/ui";

// Shared types
import type { ApiResponse } from "@repo/shared";
```

### Using in package.json

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/shared": "workspace:*"
  }
}
```

## Build Commands

```bash
# Build all packages
bun run build:packages

# Build specific apps
bun run build:client
bun run build:server
bun run build:showcase

# Development
bun dev                    # All services
bun dev:client            # Client only
bun dev:server            # Server only
bun dev:showcase          # Showcase only
```

## Code Style Conventions

### File Naming
- **Components**: PascalCase (`Button.tsx`, `ThemeProvider.tsx`)
- **Utilities**: kebab-case (`use-mobile.ts`, `utils.ts`)
- **Config files**: kebab-case (`eslint.config.mjs`, `vite.config.ts`)

### Import Order
1. External dependencies
2. Internal packages (`@repo/*`)
3. Relative imports
4. Styles

```typescript
import { useState } from "react";
import { Button } from "@repo/ui";
import { ApiResponse } from "@repo/shared";
import { MyComponent } from "./MyComponent";
```

### TypeScript
- Strict mode enabled
- 2-space indentation
- Double quotes
- No semicolons (except when necessary)

## Styling Conventions

### Tailwind CSS
- Import base styles from `@repo/ui/styles`
- Use CSS variables for theming
- Follow utility-first approach

```css
@import "tailwindcss";
@import "@repo/ui/styles";

@theme inline {
  /* Your customizations */
}
```

### Component Styling
- Use `cn()` utility for conditional classes
- Prefer Tailwind utilities over custom CSS
- Use CSS variables for dynamic values

```typescript
import { cn } from "@repo/ui";

<div className={cn("base-class", condition && "conditional-class", className)} />
```

## Publishing (Future)

To publish packages publicly, replace `@repo` with your organization:

```json
{
  "name": "@your-org/ui",
  "name": "@your-org/shared"
}
```

Update imports across the codebase:
```typescript
// Before
import { Button } from "@repo/ui";

// After
import { Button } from "@your-org/ui";
```

## Best Practices

1. **Keep packages focused**: Each package should have a single responsibility
2. **Use barrel exports**: Export from `index.ts` files for cleaner imports
3. **Type everything**: Leverage TypeScript for type safety
4. **Document exports**: Keep EXPORTS.md updated when adding new exports
5. **Test before committing**: Run `bun run build:packages` to ensure everything compiles
6. **Follow conventions**: Maintain consistency across the monorepo

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Workspace Protocol](https://pnpm.io/workspaces#workspace-protocol-workspace)
- [Package Naming Best Practices](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name)
