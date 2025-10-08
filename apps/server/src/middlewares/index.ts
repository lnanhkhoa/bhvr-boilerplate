import type { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { setupCorsMiddleware } from "./cors";

export function setupAllMiddlewares(app: Hono) {
  app.use(prettyJSON());
  setupCorsMiddleware();
}
