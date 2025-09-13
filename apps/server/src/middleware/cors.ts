import { cors } from "hono/cors";
import type { OpenAPIHono } from "@hono/zod-openapi";

/**
 * CORS configuration for peaceful cross-origin communication
 * Like a beaver's dam that allows safe passage while maintaining security
 */
export interface CorsConfig {
  /** Allowed origins */
  origins?: string[];
  /** Allow credentials */
  credentials?: boolean;
  /** Allowed methods */
  methods?: string[];
  /** Allowed headers */
  allowedHeaders?: string[];
  /** Exposed headers */
  exposedHeaders?: string[];
  /** Max age for preflight cache */
  maxAge?: number;
}

/**
 * Creates CORS middleware with serene default configuration
 */
export function createCorsMiddleware(config?: CorsConfig) {
  const defaultConfig: CorsConfig = {
    origins: [
      process.env.APP_URL || "http://localhost:5173",
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000", // Server itself
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    exposedHeaders: [
      "X-Total-Count",
      "X-Page-Count",
      "X-Current-Page",
      "X-Per-Page",
    ],
    maxAge: 86400, // 24 hours - peaceful caching
  };

  const finalConfig = { ...defaultConfig, ...config };

  return cors({
    origin: finalConfig.origins || ["http://localhost:5173"],
    credentials: finalConfig.credentials,
    allowMethods: finalConfig.methods,
    allowHeaders: finalConfig.allowedHeaders,
    exposeHeaders: finalConfig.exposedHeaders,
    maxAge: finalConfig.maxAge,
  });
}

/**
 * Sets up CORS middleware for the entire app
 */
export function setupCorsMiddleware(app: OpenAPIHono, config?: CorsConfig) {
  app.use("*", createCorsMiddleware(config));
  return app;
}

/**
 * Production CORS configuration with enhanced security
 */
export function createProductionCorsConfig(): CorsConfig {
  return {
    origins: [
      process.env.PRODUCTION_CLIENT_URL || "https://your-app.com",
      process.env.STAGING_CLIENT_URL || "https://staging.your-app.com",
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["X-Total-Count"],
    maxAge: 3600, // 1 hour for production
  };
}

/**
 * Development CORS configuration with relaxed settings
 */
export function createDevelopmentCorsConfig(): CorsConfig {
  return {
    origins: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["*"],
    exposedHeaders: ["*"],
    maxAge: 86400,
  };
}
