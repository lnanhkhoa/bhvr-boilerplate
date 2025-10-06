# UI Package Architecture 🦫

The `@repo/ui` package is the serene UI component library at the heart of the BHVR monorepo, providing a comprehensive collection of accessible, type-safe components.

## Package Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── shadcn/          # 47+ shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (all shadcn components)
│   │   ├── theme-provider.tsx
│   │   └── index.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts    # Responsive breakpoint hook
│   │   └── index.ts
│   ├── lib/
│   │   ├── utils.ts         # cn() utility for class merging
│   │   └── index.ts
│   └── styles/
│       └── globals.css      # CSS variables & base styles
├── components.json          # shadcn/ui configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Technology Stack

- **React 19.1.0** - Modern UI library with concurrent features
- **TypeScript 5.9.2** - Full type safety
- **Tailwind CSS 4.1.10** - Utility-first styling with CSS variables
- **shadcn/ui** - Component collection (new-york style)
- **Radix UI** - Accessible component primitives
- **Lucide React 0.544.0** - Icon library
- **class-variance-authority** - Type-safe component variants
- **tailwind-merge** - Smart class merging
- **react-hook-form 7.62.0** - Form handling
- **recharts 2.15.4** - Data visualization

## Component Categories

### Layout & Structure (6 components)
- Card, Separator, Aspect Ratio, Resizable, Scroll Area, Sidebar

### Forms & Input (11 components)
- Button, Input, Textarea, Checkbox, Radio Group, Select, Switch, Slider, Calendar, Input OTP, Form

### Navigation (5 components)
- Navigation Menu, Menubar, Breadcrumb, Tabs, Pagination

### Feedback & Overlay (12 components)
- Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card, Alert, Sonner, Progress, Skeleton

### Data Display (5 components)
- Table, Badge, Avatar, Chart, Carousel

### Utility (8 components)
- Accordion, Collapsible, Command, Context Menu, Dropdown Menu, Toggle, Toggle Group

## Import Patterns

```typescript
// Components
import { Button } from "@repo/ui/components/shadcn/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/shadcn/card";
import { Input } from "@repo/ui/components/shadcn/input";

// Utilities
import { cn } from "@repo/ui/lib/utils";

// Hooks
import { useMobile } from "@repo/ui/hooks";

// Theme
import { ThemeProvider } from "@repo/ui/components/theme-provider";
```

## Configuration (components.json)

```json
{
  "style": "new-york",           // Clean, modern aesthetic
  "baseColor": "neutral",        // Balanced palette
  "cssVariables": true,          // Theme customization
  "iconLibrary": "lucide",       // Consistent icons
  "aliases": {
    "components": "@repo/ui/components",
    "utils": "@repo/ui/lib/utils",
    "ui": "@repo/ui/components/shadcn",
    "lib": "@repo/ui/lib",
    "hooks": "@repo/ui/hooks"
  }
}
```

## Key Features

### Type Safety
- Full TypeScript support across all components
- Inferred prop types from Radix UI
- Type-safe variants with class-variance-authority

### Accessibility
- Built on Radix UI primitives (WCAG compliant)
- Keyboard navigation by default
- Screen reader friendly with proper ARIA attributes

### Theming
- CSS variables for easy customization
- Light/dark mode support via ThemeProvider
- Consistent design tokens

### Developer Experience
- `bun ui:add <component>` - Add new shadcn components
- Hot reload in development
- Comprehensive TypeScript IntelliSense

## Common Workflows

### Adding New shadcn Components
```bash
# From monorepo root
bun run ui:add <component-name>

# From packages/ui
bun ui:add <component-name>
```

### Creating Custom Components
1. Create in `src/components/my-component.tsx`
2. Export from package if needed for external use
3. Import: `import { MyComponent } from "@repo/ui/components/my-component"`

### Using Utilities
```typescript
import { cn } from "@repo/ui/lib/utils";

// Merge classes with proper precedence
const className = cn(
  "base-classes",
  condition && "conditional-classes",
  props.className
);
```

## Best Practices

1. **Component Composition** - Use `cn()` for conditional classes, leverage variants
2. **Styling** - Follow Tailwind utility-first, use CSS variables for theme values
3. **Accessibility** - All components are accessible by default, maintain this
4. **Type Safety** - Leverage TypeScript inference, use component prop types
5. **Code Style** - 2-space indentation, double quotes, kebab-case files

## Integration with Apps

Apps automatically have access to the UI package:
- `apps/client` - Uses all UI components
- `apps/server` - Can use UI components for email templates (React Email)

The package is built and watched by Turbo, providing instant updates during development.

## Philosophy

Like a beaver's carefully crafted lodge, the UI package provides:
- **Solid Foundation** - Reliable, well-tested components
- **Peaceful Development** - Consistent patterns, clear documentation
- **Harmonious Design** - Cohesive visual language
- **Flexible Architecture** - Use what you need, extend what you want

This creates a serene development experience where building beautiful UIs feels natural and effortless.
