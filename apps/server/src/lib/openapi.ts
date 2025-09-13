import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import type { Context } from "hono";

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

  // OpenAPI documentation configuration
  app.doc("/doc/openapi.json", (c) => ({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "BHVR API",
      description: "API documentation for BHVR boilerplate application",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
  }));

  // Swagger UI
  app.get(
    "/doc",
    swaggerUI({
      url: "/doc/openapi.json",
      persistAuthorization: true,
    })
  );

  // Global error handler for OpenAPI validation
  app.onError((err, c) => {
    console.error("API Error:", err);
    
    if (err.name === "ZodError") {
      return c.json(
        {
          success: false,
          error: "Validation failed",
          details: JSON.parse(err.message),
        },
        400
      );
    }

    if (process.env.NODE_ENV === "development") {
      return c.json(
        {
          success: false,
          error: err.message,
          stack: err.stack,
        },
        500
      );
    }

    return c.json(
      {
        success: false,
        error: "Internal server error",
      },
      500
    );
  });

  return app;
}