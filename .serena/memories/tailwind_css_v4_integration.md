# Tailwind CSS v4 Integration Pattern

## Architecture Philosophy
The BHVR creative follows a peaceful pattern where Tailwind CSS v4 is imported **once** at the application level, not in shared packages.

## Key Principles

### 1. Single Tailwind Import
- Each app (client, showcase) imports `@import "tailwindcss"` in its own main CSS file
- The `@repo/ui` package **does not** import Tailwind CSS
- This prevents conflicts from multiple Tailwind instances

### 2. UI Package Structure
**`packages/ui/src/styles.css`** provides:
- `@custom-variant` definitions (e.g., dark mode)
- `@theme inline` tokens for shadcn/ui compatibility
- `@layer base` styles for components
- **Does NOT include** `@import "tailwindcss"`

### 3. Application Setup Pattern
```css
/* apps/*/src/[main].css */
@import "tailwindcss";           /* Import Tailwind once */
@import "tw-animate-css";        /* Optional animations */

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* App-specific theme tokens */
  --radius-sm: calc(var(--radius) - 4px);
  /* ... more tokens */
}

:root {
  /* CSS variables for colors */
}
```

```tsx
/* apps/*/src/main.tsx */
import "./styles/globals.css";   /* App styles with Tailwind */
```

### 4. Import Order
1. **First**: App's main CSS (contains `@import "tailwindcss"`)
2. **Second**: UI package styles (theme tokens and base styles)

This ensures Tailwind is initialized before UI package styles are applied.

## Why This Pattern?

**Problem**: Multiple `@import "tailwindcss"` statements cause conflicts where:
- Second import resets/overrides the first
- `@theme` definitions conflict
- Components lose their styles

**Solution**: Import Tailwind once at the app level, share only theme tokens and styles from packages.

## Troubleshooting

If `@repo/ui` components aren't styled:
1. Verify app's main CSS imports Tailwind first
2. Ensure import order: app CSS → UI package CSS
3. Confirm `@theme inline` tokens are defined in both files
