# bhvr 🦫

![cover](https://cdn.stevedylan.dev/ipfs/bafybeievx27ar5qfqyqyud7kemnb5n2p4rzt2matogi6qttwkpxonqhra4)

A full-stack TypeScript monorepo starter with shared types, using Bun, Hono, Vite, and React.

## Why bhvr?

While there are plenty of existing app building stacks out there, many of them are either bloated, outdated, or have too much of a vendor lock-in. bhvr is built with the opinion that you should be able to deploy your client or server in any environment while also keeping type safety.

## Features

- **Full-Stack TypeScript**: End-to-end type safety between client and server
- **Shared Types**: Common type definitions shared between client and server
- **Monorepo Structure**: Organized as a workspaces-based monorepo with Turbo for build orchestration
- **Modern Stack**:
  - [Bun](https://bun.sh) (1.2.4+) as the JavaScript runtime and package manager
  - [Hono](https://hono.dev) (4.9.6) as the backend framework
  - [Vite](https://vitejs.dev) (6.3.5) for frontend bundling
  - [React](https://react.dev) (19.1.0) for the frontend UI
  - [TypeScript](https://www.typescriptlang.org/) (5.9.2) for type safety
  - [Tailwind CSS](https://tailwindcss.com) (4.1.10) for styling
  - [Turbo](https://turbo.build) (2.5.5) for monorepo build orchestration and caching
  - [shadcn/ui](https://ui.shadcn.com) components with Radix UI
  - [TanStack Query](https://tanstack.com/query) for API state management

## Project Structure

```
.
├── apps/
│   ├── client/           # React + Vite frontend with Tailwind CSS
│   └── server/           # Hono backend API
├── packages/
│   ├── shared/           # Shared TypeScript definitions and utilities
│   ├── ui/               # Reusable UI components
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── package.json          # Root package.json with workspaces
└── turbo.json            # Turbo configuration for build orchestration
```

### Server

bhvr uses Hono as a backend API for its simplicity and massive ecosystem of plugins. If you have ever used Express then it might feel familiar. Declaring routes and returning data is easy.

```
apps/server/
├── dist/                 # Built output with client exports
├── src/
│   ├── index.ts         # Main server entry point
│   └── client.ts        # Hono client for type-safe API calls
├── package.json
├── tsconfig.json
└── README.md
```

```typescript src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "@repo/shared";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/hello", async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true,
  };
  return c.json(data, { status: 200 });
});

export default app;
export type AppType = typeof app;
```

If you wanted to add a database to Hono you can do so with a multitude of Typescript libraries like [Supabase](https://supabase.com), or ORMs like [Drizzle](https://orm.drizzle.team/docs/get-started) or [Prisma](https://www.prisma.io/orm)

### Client

bhvr uses Vite + React + TypeScript with Tailwind CSS for styling and shadcn/ui components. The client includes React Router for routing and TanStack Query for API state management.

```
apps/client/
├── components.json       # shadcn/ui configuration
├── eslint.config.js
├── index.html
├── package.json
├── public/
│   └── assets/
├── src/
│   ├── components/       # React components including shadcn/ui
│   │   ├── ui/          # shadcn/ui base components
│   │   └── Home.tsx     # Main home component
│   ├── lib/             # Utility functions
│   ├── assets/          # Static assets
│   ├── App.tsx          # App router setup
│   ├── main.tsx         # App entry point
│   ├── index.css        # Tailwind CSS imports and custom styles
│   └── vite-env.d.ts
├── tsconfig.*.json      # TypeScript configurations
└── vite.config.ts       # Vite config with Tailwind plugin
```

```typescript src/components/Home.tsx
import { useState } from "react"
import beaver from "@/assets/beaver.svg"
import { Button } from "@/components/ui/button"
import { hcWithType } from "server/dist/client"
import { useMutation } from "@tanstack/react-query"

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
const client = hcWithType(SERVER_URL)

type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>

function Home() {
  const [data, setData] = useState<
    Awaited<ReturnType<ResponseType["json"]>> | undefined
  >()

  const { mutate: sendRequest } = useMutation({
    mutationFn: async () => {
      try {
        const res = await client.hello.$get()
        if (!res.ok) {
          console.log("Error fetching data")
          return
        }
        const data = await res.json()
        setData(data)
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
      <a href="https://github.com/stevedylandev/bhvr" target="_blank" rel="noopener">
        <img src={beaver} className="w-16 h-16 cursor-pointer" alt="beaver logo" />
      </a>
      <h1 className="text-5xl font-black">bhvr</h1>
      <h2 className="text-2xl font-bold">Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="flex items-center gap-4">
        <Button onClick={() => sendRequest()}>Call API</Button>
        <Button variant="secondary" asChild>
          <a target="_blank" href="https://bhvr.dev" rel="noopener">Docs</a>
        </Button>
      </div>
      {data && (
        <pre className="bg-gray-100 p-4 rounded-md">
          <code>
            Message: {data.message} <br />
            Success: {data.success.toString()}
          </code>
        </pre>
      )}
    </div>
  )
}

export default Home
```

### Shared Packages

The packages directory contains shared code used across the monorepo:

```
packages/
├── shared/               # Shared types and utilities
│   ├── src/
│   │   ├── index.ts
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
├── ui/                   # Shared UI components
├── eslint-config/        # Shared ESLint configuration
└── typescript-config/    # Shared TypeScript configuration
```

Inside the `src/index.ts` we export any of our code from the folders so it's usable in other parts of the monorepo

```typescript
export * from "./types";
```

By running `bun run dev` or `bun run build` it will compile and export the packages from `shared` so it can be used in either `client` or `server`

```typescript
import { ApiResponse } from "@repo/shared";
```

## Getting Started

### Quick Start

You can start a new bhvr project using the [CLI](https://github.com/stevedylandev/create-bhvr)

```bash
bun create bhvr
```

### Installation

Install dependencies using your preferred package manager:

**Using Bun (recommended):**

```bash
bun install
```

**Using pnpm:**

```bash
pnpm install
```

**Using Yarn:**

```bash
yarn install
```

### Development

Start all services in development mode:

```bash
# Using Bun
bun dev

# Using pnpm
pnpm dev

# Using Yarn
yarn dev
```

Run individual workspaces:

```bash
# Frontend only
bun dev:client    # or: pnpm dev:client / yarn dev:client

# Backend only
bun dev:server    # or: pnpm dev:server / yarn dev:server
```

### Building

Build all workspaces for production:

```bash
# Using Bun
bun run build

# Using pnpm
pnpm build

# Using Yarn
yarn build
```

Build individual workspaces:

```bash
# Build frontend only
bun run build:client  # or: pnpm build:client / yarn build:client

# Build backend only
bun run build:server  # or: pnpm build:server / yarn build:server
```

### Additional Commands

```bash
# Lint all workspaces
bun run lint      # or: pnpm lint / yarn lint

# Type check all workspaces
bun run type-check  # or: pnpm type-check / yarn type-check

# Run tests across all workspaces
bun run test      # or: pnpm test / yarn test
```

### Deployment

Deplying each piece is very versatile and can be done numerous ways, and exploration into automating these will happen at a later date. Here are some references in the meantime.

**Client**

- [Orbiter](https://orbiter.host)
- [GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Netlify](https://vite.dev/guide/static-deploy.html#netlify)
- [Cloudflare Pages](https://vite.dev/guide/static-deploy.html#cloudflare-pages)

**Server**

- [Cloudflare Worker](https://gist.github.com/stevedylandev/4aa1fc569bcba46b7169193c0498d0b3)
- [Bun](https://hono.dev/docs/getting-started/bun)
- [Node.js](https://hono.dev/docs/getting-started/nodejs)

## Type Sharing

Types are automatically shared between the client and server thanks to the shared package and TypeScript path aliases. You can import them in your code using:

```typescript
import { ApiResponse } from "@repo/shared";
```

## Learn More

- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/learn)
- [Hono Documentation](https://hono.dev/docs)
- [Turbo Documentation](https://turbo.build/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
