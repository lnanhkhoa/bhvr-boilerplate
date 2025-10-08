import { Hono } from "hono";
import { cors } from "hono/cors";
import { API_URL, APP_URL } from "@/configs/env";
import type { Bindings } from "hono/types";

const app = new Hono<{ Bindings: Bindings }>();

/**
 * Sets up CORS middleware for the entire app
 */
export function setupCorsMiddleware() {
  app.use(
    "/api",
    cors({
      origin: [APP_URL, API_URL],
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
      ],
      exposeHeaders: ["X-Total-Count", "X-Page-Count", "X-Current-Page", "X-Per-Page"],
      maxAge: 86400, // 24 hours - peaceful caching
    }),
  );
  return app;
}
