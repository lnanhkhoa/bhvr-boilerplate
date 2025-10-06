# UI Package 🦫

A serene, shared UI component library for the BHVR monorepo, built with React, TypeScript, Tailwind CSS v4, and shadcn/ui components. Like a beaver's carefully crafted lodge, this package provides a solid foundation for building beautiful, accessible interfaces.

## Philosophy

The UI package embodies the peaceful industriousness of the beaver, offering:
- **Harmonious Components** - 47+ shadcn/ui components built on Radix UI primitives
- **Serene Styling** - Tailwind CSS v4 with CSS variables for calm customization
- **Type-Safe Peace** - Full TypeScript support across all components
- **Accessible by Design** - WCAG-compliant components that work for everyone
- **Flexible Foundation** - Use what you need, extend what you want

## Stack

- **React 19** - Modern UI library with concurrent features
- **TypeScript 5.9** - Type safety throughout
- **Tailwind CSS 4** - Utility-first styling with CSS variables
- **shadcn/ui** - Beautifully designed components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide Icons** - Consistent, elegant iconography
- **class-variance-authority** - Type-safe component variants

## Quick Start

### Installation

This package is part of the BHVR monorepo and is automatically available to all apps:

```typescript
import { Button, Card, Input } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { useMobile } from "@repo/ui/hooks";
```

### Adding New Components

Use the shadcn CLI to add components to the shared UI package:

```bash
# From the monorepo root
bun run ui:add button
bun run ui:add card
bun run ui:add dialog

# Or from the packages/ui directory
bun ui:add <component-name>
```

### Basic Usage

```typescript
import { Button } from "@repo/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Peaceful Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Available Components

### Layout & Structure
- **Card** - Content container with header, footer, and content sections
- **Separator** - Visual divider between content
- **Aspect Ratio** - Maintain consistent aspect ratios
- **Resizable** - Resizable panel layouts
- **Scroll Area** - Custom scrollable areas
- **Sidebar** - Application sidebar layout

### Forms & Input
- **Button** - Primary interaction element with multiple variants
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Checkbox** - Boolean selection
- **Radio Group** - Single selection from multiple options
- **Select** - Dropdown selection
- **Switch** - Toggle between states
- **Slider** - Numeric value selection
- **Calendar** - Date picker
- **Input OTP** - One-time password input
- **Form** - Form wrapper with react-hook-form integration

### Navigation
- **Navigation Menu** - Primary navigation component
- **Menubar** - Application menu bar
- **Breadcrumb** - Hierarchical navigation
- **Tabs** - Tabbed interface
- **Pagination** - Page navigation

### Feedback & Overlay
- **Dialog** - Modal dialog
- **Alert Dialog** - Confirmation dialog
- **Sheet** - Slide-out panel
- **Drawer** - Bottom drawer (mobile-friendly)
- **Popover** - Floating content container
- **Tooltip** - Contextual help text
- **Hover Card** - Rich hover content
- **Alert** - Inline notification
- **Sonner** - Toast notifications
- **Progress** - Progress indicator
- **Skeleton** - Loading placeholder

### Data Display
- **Table** - Data table
- **Badge** - Status indicator
- **Avatar** - User profile image
- **Chart** - Data visualization (recharts)
- **Carousel** - Image/content carousel

### Utility
- **Accordion** - Collapsible content sections
- **Collapsible** - Show/hide content
- **Command** - Command palette (⌘K)
- **Context Menu** - Right-click menu
- **Dropdown Menu** - Action menu
- **Toggle** - Toggle button
- **Toggle Group** - Grouped toggle buttons

## Utilities & Hooks

### Utilities

```typescript
import { cn } from "@repo/ui/lib/utils";

// Merge Tailwind classes with proper precedence
const className = cn("px-4 py-2", "bg-blue-500", conditionalClass);
```

### Hooks

```typescript
import { useMobile } from "@repo/ui/hooks";

function ResponsiveComponent() {
  const isMobile = useMobile();
  return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
}
```

## Theming

The UI package uses CSS variables for theming, configured in the "new-york" style with a neutral base color:

```css
/* Customize in your app's globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}
```

### Theme Provider

```typescript
import { ThemeProvider } from "@repo/ui/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Configuration

### components.json

The package is configured with:
- **Style**: `new-york` - Clean, modern aesthetic
- **Base Color**: `neutral` - Balanced, professional palette
- **CSS Variables**: Enabled for easy theming
- **Icon Library**: `lucide` - Consistent iconography
- **TypeScript**: Full type safety

### Path Aliases

```json
{
  "components": "@repo/ui/components",
  "utils": "@repo/ui/lib/utils",
  "ui": "@repo/ui/components/shadcn",
  "lib": "@repo/ui/lib",
  "hooks": "@repo/ui/hooks"
}
```

## Development

### Project Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── shadcn/          # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   └── theme-provider.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── utils.ts         # cn() utility
│   │   └── index.ts
│   └── styles/
│       └── globals.css      # Base styles & CSS variables
├── components.json          # shadcn/ui configuration
├── package.json
└── tsconfig.json
```

### Adding Custom Components

1. Create your component in `src/components/`:
```typescript
// src/components/my-component.tsx
export function MyComponent() {
  return <div>Custom component</div>;
}
```

2. Export it from the package (if needed for external use)

3. Import and use:
```typescript
import { MyComponent } from "@repo/ui/components/my-component";
```

## Best Practices

### Component Composition
- Use the `cn()` utility for conditional classes
- Leverage component variants with `class-variance-authority`
- Keep components small and focused

### Styling
- Follow Tailwind's utility-first approach
- Use CSS variables for theme values
- Maintain consistent spacing and sizing

### Accessibility
- All components are built on Radix UI primitives
- Keyboard navigation is supported by default
- Screen reader friendly with proper ARIA attributes

### Type Safety
- Import types from components when needed
- Use TypeScript's type inference
- Leverage component prop types for better DX

## Contributing

When adding new components:
1. Use `bun ui:add <component>` to add shadcn components
2. Follow the existing code style (2 spaces, double quotes)
3. Ensure components are accessible
4. Export components from appropriate index files
5. Update this README if adding significant features

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

*Built with the peaceful industriousness of a beaver 🦫*
