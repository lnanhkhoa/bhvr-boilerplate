import { createRoute } from "@hono/zod-openapi";
import { HealthCheckResponseSchema, ApiTags, SuccessResponseSchema, z } from "@repo/shared";
import { createOpenAPIApp } from "../middleware";
import type { Context } from "hono";

const app = createOpenAPIApp();

// Health check route
const healthRoute = createRoute({
  method: "get",
  path: "/",
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
    environment: process.env.NODE_ENV || "development",
  });
});

// Hello route schema
const HelloResponseSchema = SuccessResponseSchema.extend({
  data: z.null(),
  message: z.literal("Hello BHVR!"),
});

// Hello route
const helloRoute = createRoute({
  method: "get",
  path: "/hello",
  tags: [ApiTags.HEALTH],
  summary: "Hello endpoint",
  description: "Simple hello world endpoint",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HelloResponseSchema,
        },
      },
      description: "Success response",
    },
  },
});

app.openapi(helloRoute, async (c: Context) => {
  return c.json({ success: true as const, data: null, message: "Hello BHVR!" as const });
});

export default app;
