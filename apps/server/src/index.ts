import { Hono } from "hono";
import { NODE_ENV } from "./configs/env";
import { setupAllMiddlewares } from "./middlewares";
import authRoutes from "./routes/auth-routes";

const app = new Hono();

setupAllMiddlewares(app);
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

//  setup routes
app.route("/api", authRoutes)

export default app;
