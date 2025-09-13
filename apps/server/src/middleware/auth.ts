import type { Context, Next } from "hono";
import { auth } from "../lib/auth";
import type { Session, User } from "../lib/auth";
import { createErrorResponse } from "@repo/shared";

declare module "hono" {
  interface ContextVariableMap {
    user: User;
    session: Session;
  }
}

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header("Authorization");
    const sessionToken = authHeader?.replace("Bearer ", "");

    if (!authHeader || !sessionToken) {
      return c.json(
        createErrorResponse(
          "Authentication required", 
          "Missing or invalid Authorization header"
        ), 
        401
      );
    }

    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json(
        createErrorResponse(
          "Invalid or expired session", 
          "Please sign in again"
        ), 
        401
      );
    }

    c.set("user", session.user);
    c.set("session", session as Session);

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json(
      createErrorResponse(
        "Authentication failed",
        process.env.NODE_ENV === "development" ? error : undefined
      ), 
      401
    );
  }
}

export async function optionalAuthMiddleware(c: Context, next: Next) {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (session) {
      c.set("user", session.user);
      c.set("session", session as Session);
    }

    await next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    // Continue without authentication for optional middleware
    await next();
  }
}
