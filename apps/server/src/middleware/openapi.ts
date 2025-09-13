import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import type { Context } from "hono";

/**
 * Creates an OpenAPI-enabled Hono app with proper validation and error handling
 * Following the beaver's philosophy of peaceful, well-structured foundations
 */
export function createOpenAPIApp() {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            success: false,
            error: "Validation failed",
            details: result.error.flatten(),
          },
          400
        );
      }
    },
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
    })
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
        400
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
        400
      );
    }

    // Development error responses with full details
    if (process.env.NODE_ENV === "development") {
      return c.json(
        {
          success: false,
          error: err.message,
          stack: err.stack,
          timestamp: new Date().toISOString(),
          environment: "development",
        },
        500
      );
    }

    // Production error responses - peaceful and secure
    return c.json(
      {
        success: false,
        error: "Internal server error - The beaver is working to fix this",
        timestamp: new Date().toISOString(),
      },
      500
    );
  });

  return app;
}
