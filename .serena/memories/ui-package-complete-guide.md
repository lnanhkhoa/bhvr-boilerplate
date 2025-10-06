# UI Package Complete Guide 🦫

The `@repo/ui` package is BHVR's serene UI component library, providing 47+ accessible, type-safe components built on shadcn/ui and Radix UI.

## Quick Reference

### Installation & Import
```typescript
// Components - direct import from @repo/ui
import { Button, Card, Input, Dialog } from "@repo/ui";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@repo/ui";

// Utilities
import { cn } from "@repo/ui/lib/utils";

// Hooks
import { useMobile } from "@repo/ui/hooks";

// Theme Provider
import { ThemeProvider } from "@repo/ui/components/theme-provider";
```

### Adding New Components
```bash
# From monorepo root
bun run ui:add button
bun run ui:add card
bun run ui:add dialog

# From packages/ui directory
bun ui:add <component-name>
```

## Complete Component Reference

### Layout & Structure (6)
- **Card** - `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter`
- **Separator** - Horizontal/vertical divider
- **Aspect Ratio** - Maintain aspect ratios (16:9, 4:3, etc.)
- **Resizable** - `ResizablePanelGroup, ResizablePanel, ResizableHandle`
- **Scroll Area** - Custom scrollable container
- **Sidebar** - `Sidebar, SidebarProvider, SidebarTrigger, SidebarContent`

### Forms & Input (11)
- **Button** - Variants: default, destructive, outline, secondary, ghost, link
- **Input** - Text input with type support
- **Textarea** - Multi-line text input
- **Checkbox** - Boolean selection with indeterminate state
- **Radio Group** - `RadioGroup, RadioGroupItem`
- **Select** - `Select, SelectTrigger, SelectContent, SelectItem, SelectValue`
- **Switch** - Toggle between on/off states
- **Slider** - Numeric value selection with range support
- **Calendar** - Date picker with date-fns integration
- **Input OTP** - One-time password input with input-otp
- **Form** - `Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage` (react-hook-form)

### Navigation (5)
- **Navigation Menu** - `NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink`
- **Menubar** - `Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem`
- **Breadcrumb** - `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator`
- **Tabs** - `Tabs, TabsList, TabsTrigger, TabsContent`
- **Pagination** - `Pagination, PaginationContent, PaginationItem, PaginationLink`

### Feedback & Overlay (12)
- **Dialog** - `Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription`
- **Alert Dialog** - `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel`
- **Sheet** - `Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle` (slide-out panel)
- **Drawer** - `Drawer, DrawerTrigger, DrawerContent` (mobile-friendly, uses vaul)
- **Popover** - `Popover, PopoverTrigger, PopoverContent`
- **Tooltip** - `Tooltip, TooltipTrigger, TooltipContent, TooltipProvider`
- **Hover Card** - `HoverCard, HoverCardTrigger, HoverCardContent`
- **Alert** - `Alert, AlertTitle, AlertDescription` (inline notification)
- **Sonner** - `Toaster, toast()` (toast notifications)
- **Progress** - Progress bar with value
- **Skeleton** - Loading placeholder

### Data Display (5)
- **Table** - `Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell`
- **Badge** - Status indicator with variants
- **Avatar** - `Avatar, AvatarImage, AvatarFallback`
- **Chart** - `ChartContainer, ChartTooltip, ChartLegend` (recharts integration)
- **Carousel** - `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext` (embla-carousel)

### Utility (8)
- **Accordion** - `Accordion, AccordionItem, AccordionTrigger, AccordionContent`
- **Collapsible** - `Collapsible, CollapsibleTrigger, CollapsibleContent`
- **Command** - `Command, CommandInput, CommandList, CommandItem` (⌘K palette, uses cmdk)
- **Context Menu** - `ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem`
- **Dropdown Menu** - `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem`
- **Toggle** - Toggle button with pressed state
- **Toggle Group** - `ToggleGroup, ToggleGroupItem`

## Technology Stack

```json
{
  "react": "^19.1.0",
  "typescript": "5.9.2",
  "tailwindcss": "^4.1.13",
  "lucide-react": "^0.544.0",
  "class-variance-authority": "^0.7.1",
  "tailwind-merge": "^3.3.1",
  "react-hook-form": "^7.62.0",
  "recharts": "2.15.4",
  "date-fns": "^4.1.0",
  "cmdk": "^1.1.1",
  "embla-carousel-react": "^8.6.0",
  "sonner": "^2.0.7",
  "vaul": "^1.1.2"
}
```

## Configuration

### components.json
```json
{
  "style": "new-york",
  "baseColor": "neutral",
  "cssVariables": true,
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@repo/ui/components",
    "utils": "@repo/ui/lib/utils",
    "ui": "@repo/ui/components/shadcn",
    "lib": "@repo/ui/lib",
    "hooks": "@repo/ui/hooks"
  }
}
```

## Common Usage Patterns

### Basic Component Usage
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

### Form with Validation
```typescript
import { useForm } from "react-hook-form";
import { Button, Input, Form, FormField, FormItem, FormLabel, FormControl } from "@repo/ui";

function MyForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Dialog Pattern
```typescript
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@repo/ui";

function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content goes here</p>
      </DialogContent>
    </Dialog>
  );
}
```

### Responsive Hook
```typescript
import { useMobile } from "@repo/ui/hooks";

function ResponsiveComponent() {
  const isMobile = useMobile();
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Class Name Utility
```typescript
import { cn } from "@repo/ui/lib/utils";

function MyComponent({ className, isActive }) {
  return (
    <div className={cn(
      "base-classes px-4 py-2",
      isActive && "bg-blue-500",
      className
    )}>
      Content
    </div>
  );
}
```

### Theme Provider Setup
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

## File Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── shadcn/              # All 47+ shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── index.tsx
│   │   └── theme-provider.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts        # Responsive breakpoint detection
│   │   └── index.ts
│   ├── lib/
│   │   ├── utils.ts             # cn() utility for class merging
│   │   └── index.ts
│   └── styles/
│       └── globals.css          # CSS variables & base Tailwind styles
├── components.json              # shadcn/ui configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Best Practices

### Component Composition
- Use `cn()` utility for conditional classes
- Leverage component variants with class-variance-authority
- Keep components small and focused
- Compose complex UIs from simple components

### Styling
- Follow Tailwind's utility-first approach
- Use CSS variables for theme values (--primary, --background, etc.)
- Maintain consistent spacing (4, 8, 16, 24, 32px scale)
- Respect the design system (neutral base color, new-york style)

### Accessibility
- All components built on Radix UI (WCAG compliant)
- Keyboard navigation supported by default
- Screen reader friendly with proper ARIA attributes
- Focus management handled automatically

### Type Safety
- Import types from components when needed
- Use TypeScript's type inference
- Leverage component prop types for better DX
- Strict TypeScript enabled (5.9.2)

### Code Style
- 2-space indentation
- Double quotes for strings
- kebab-case for file names
- PascalCase for component names

## Integration Points

### Apps
- `apps/client` - Uses all UI components for the React frontend
- `apps/server` - Can use UI components for React Email templates

### Build System
- Vite 7.1.2 for fast builds
- Turbo orchestrates builds across monorepo
- Hot reload in development mode
- TypeScript compilation with strict mode

### Styling
- Tailwind CSS 4.1.13 with @tailwindcss/vite plugin
- CSS variables for theming
- PostCSS for processing
- Global styles in src/styles/globals.css

## Philosophy

The UI package embodies the peaceful industriousness of the beaver:
- **Solid Foundation** - Reliable, well-tested components from shadcn/ui and Radix UI
- **Peaceful Development** - Consistent patterns, clear documentation, intuitive API
- **Harmonious Design** - Cohesive visual language with neutral palette
- **Flexible Architecture** - Use what you need, extend what you want
- **Type-Safe Peace** - Full TypeScript support for confidence and productivity
- **Accessible by Design** - WCAG-compliant components that work for everyone

This creates a serene development experience where building beautiful, accessible UIs feels natural and effortless.
