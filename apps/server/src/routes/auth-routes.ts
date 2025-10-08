import { Hono } from "hono";
import { auth, type AuthType } from "@/lib/auth";
const app = new Hono<{ Bindings: AuthType }>({ strict: false });

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
