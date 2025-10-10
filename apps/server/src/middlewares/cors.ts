import type { Hono } from "hono";
import { cors } from "hono/cors";
import { API_URL, APP_URL } from "@/configs/env";

/**
 * Sets up CORS middleware for the entire app
 */

const allowHeaders = ["Content-Type", "Authorization"];
const exposeHeaders = ["Content-Length", "Set-Auth-Token"];
const allowMethods = ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"];

export function setupCorsMiddleware(app: Hono) {
  app.use(
    "/api/auth/*", // or replace with "*" to enable cors for all routes
    cors({
      origin: [APP_URL], // replace with your origin
      allowMethods: allowMethods,
      allowHeaders: allowHeaders,
      exposeHeaders: exposeHeaders,
      maxAge: 10,
      credentials: true,
    }),
  );
}
