import { Scalar } from "@scalar/hono-api-reference";
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * Scalar API Reference configuration for peaceful documentation browsing
 * Embodies the beaver's aesthetic of clean, organized presentation
 */
export interface ScalarConfig {
  /** The OpenAPI spec URL */
  url?: string;
  /** Theme for the documentation */
  theme?: string;
}

/**
 * Creates Scalar API Reference middleware with serene default configuration
 */
export function createScalarMiddleware(config?: ScalarConfig) {
  return Scalar({
    spec: {
      url: config?.url || "/doc/openapi.json",
    },
  } as any);
}

/**
 * Sets up Scalar API Reference at multiple peaceful endpoints
 */
export function setupScalarDocumentation(app: OpenAPIHono, config?: ScalarConfig) {
  const scalarMiddleware = createScalarMiddleware(config);

  // Primary documentation endpoint - the beaver's main lodge
  app.get("/scalar", scalarMiddleware);
  
  // Alternative endpoints for different access patterns
  app.get("/docs", scalarMiddleware);
  app.get("/api-docs", scalarMiddleware);
  
  // Root documentation redirect for peaceful navigation
  app.get("/documentation", (c) => {
    return c.redirect("/scalar", 302);
  });

  return app;
}

/**
 * Advanced Scalar configuration for production environments
 */
export function createProductionScalarConfig(): ScalarConfig {
  return {
    url: "/doc/openapi.json",
    theme: "deepSpace",
  };
}

/**
 * Development-focused Scalar configuration with enhanced debugging
 */
export function createDevelopmentScalarConfig(): ScalarConfig {
  return {
    url: "/doc/openapi.json",
    theme: "purple",
  };
}
