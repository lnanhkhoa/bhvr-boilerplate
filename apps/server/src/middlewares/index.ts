import type { Hono } from "hono";
import { setupCorsMiddleware } from "./cors";

export function setupAllMiddlewares(app: Hono) {
  setupCorsMiddleware(app);
}
