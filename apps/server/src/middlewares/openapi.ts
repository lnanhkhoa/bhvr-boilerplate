import { OpenAPIHono } from "@hono/zod-openapi";
import { API_URL, IS_DEV } from "@/configs/env";
import { swaggerUI } from "@hono/swagger-ui";

export function createOpenAPIApp() {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json({ success: false, error: "Validation failed", details: result.error.flatten() }, 400);
      }
    },
  });

  // OpenAPI documentation configuration
  app.doc("/doc/openapi.json", (c) => ({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "BHVR API",
      description: "API documentation for BHVR boilerplate application",
    },
    servers: [{ url: API_URL, description: "Development server" }],
  }));

  // Global error handler for OpenAPI validation
  app.onError((err, c) => {
    console.error("API Error:", err);

    if (err.name === "ZodError")
      return c.json({ success: false, error: "Validation failed", details: JSON.parse(err.message) }, 400);
    if (IS_DEV) return c.json({ success: false, error: err.message, stack: err.stack }, 500);
    return c.json({ success: false, error: "Internal server error" }, 500);
  });

  return app;
}

/**
 * Configures OpenAPI documentation with serene, comprehensive settings
 */
export function setupOpenAPIDocumentation(app: OpenAPIHono) {
  // OpenAPI JSON specification endpoint
  app.doc("/doc/openapi.json", (c) => ({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "BHVR API 🦫",
      description: "A peaceful, industrious API built with the beaver's wisdom - methodical, reliable, and harmonious",
      contact: {
        name: "BHVR Team",
        url: "https://github.com/your-org/bhvr-boilerplate",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Development server - The beaver's peaceful workshop",
      },
      {
        url: process.env.PRODUCTION_API_URL || "https://api.example.com",
        description: "Production server - The beaver's finished dam",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check endpoints for monitoring the beaver's wellbeing",
      },
      {
        name: "Auth",
        description: "Authentication endpoints for secure access to the beaver's domain",
      },
      {
        name: "User",
        description: "User management endpoints for the beaver community",
      },
    ],
  }));

  // Swagger UI endpoint
  app.get(
    "/doc",
    swaggerUI({
      url: "/doc/openapi.json",
      persistAuthorization: true,
      deepLinking: true,
      displayOperationId: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      docExpansion: "list",
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    }),
  );

  return app;
}

/**
 * Sets up global error handling for OpenAPI validation with peaceful error responses
 */
export function setupOpenAPIErrorHandling(app: OpenAPIHono) {
  app.onError((err, c) => {
    console.error("🦫 API Error:", err);

    // Handle Zod validation errors with serene clarity
    if (err.name === "ZodError") {
      return c.json(
        {
          success: false,
          error: "Validation failed - The beaver noticed some issues with your request",
          details: JSON.parse(err.message),
          timestamp: new Date().toISOString(),
        },
        400,
      );
    }

    // Handle OpenAPI validation errors
    if (err.message?.includes("validation")) {
      return c.json(
        {
          success: false,
          error: "Request validation failed",
          message: err.message,
          timestamp: new Date().toISOString(),
        },
        400,
      );
    }

    // Development error responses with full details
    if (IS_DEV) {
      return c.json(
        {
          success: false,
          error: err.message,
          stack: err.stack,
          timestamp: new Date().toISOString(),
          environment: "development",
        },
        500,
      );
    }

    // Production error responses - peaceful and secure
    return c.json(
      {
        success: false,
        error: "Internal server error - The beaver is working to fix this",
        timestamp: new Date().toISOString(),
      },
      500,
    );
  });

  return app;
}
