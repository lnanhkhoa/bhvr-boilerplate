# Routes Structure Update (2025-09-13)

- Health-related OpenAPI routes were moved out of `apps/server/src/index.ts` into a dedicated module: `apps/server/src/routes/health.ts`.
- `index.ts` now focuses on app initialization and mounts routes only:
  - `app.route("/", healthRoutes)`
  - `app.route("/api/auth", authRoutes)`
  - `app.route("/api/user", userRoutes)`
- `health.ts` contains:
  - Health check route (`GET /`) with OpenAPI schema `HealthCheckResponseSchema`.
  - Hello route (`GET /hello`) with OpenAPI schema extending `SuccessResponseSchema`.
- Pattern to follow for new routes:
  - Define routes and `app.openapi(...)` handlers in `apps/server/src/routes/<feature>.ts`.
  - Export the route app and mount it in `index.ts` via `app.route("/base", <feature>Routes)`.

Rationale: Improves separation of concerns, keeps `index.ts` serene and focused on composition, and aligns with existing `auth` and `user` route modules.