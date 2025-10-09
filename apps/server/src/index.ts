import { Hono } from "hono";
import { NODE_ENV } from "./configs/env";
import { setupAllMiddlewares } from "./middlewares";
import { auth } from "@/lib/auth";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use(prettyJSON());
setupAllMiddlewares(app);

// routes
app.get("/", (c) => c.text("Hono API"));
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/health", (c) => {
  return c.json({
    success: true as const,
    message: "BHVR API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
  });
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
