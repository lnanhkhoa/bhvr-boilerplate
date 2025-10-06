import { createRoute } from "@hono/zod-openapi";
import { HealthCheckResponseSchema, ApiTags, SuccessResponseSchema, z } from "@repo/shared";
import { createOpenAPIApp } from "../middlewares";
import type { Context } from "hono";
import { NODE_ENV } from "@/configs/env";

const app = createOpenAPIApp();

// Health check route
const healthRoute = createRoute({
  method: "get",
  path: "/health",
  tags: [ApiTags.HEALTH],
  summary: "Health check",
  description: "Check if the API is running",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthCheckResponseSchema,
        },
      },
      description: "API is healthy",
    },
  },
});

app.openapi(healthRoute, (c: Context) => {
  return c.json({
    success: true as const,
    message: "BHVR API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
  });
});

export default app;
