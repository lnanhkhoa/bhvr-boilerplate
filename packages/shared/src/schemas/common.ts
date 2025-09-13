import { z } from "zod";

// Standard API Response schemas
export const SuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
  data: z.unknown().nullable().optional(),
});

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.unknown().optional(),
});

export const ValidationErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.literal("Validation failed"),
  details: z.object({
    fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
    formErrors: z.array(z.string()).optional(),
  }),
});

// Pagination schemas
export const PaginationParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const PaginationResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// Common field schemas
export const IdSchema = z.string().min(1);
export const EmailSchema = z.string().email();
export const PasswordSchema = z.string().min(8).max(100);
export const NameSchema = z.string().min(1).max(100);
export const UrlSchema = z.string().url();
export const DateTimeSchema = z.string().datetime();

// Health check schema
export const HealthCheckResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  timestamp: z.string(),
  uptime: z.number(),
  environment: z.string(),
});

// Standard error responses for OpenAPI
export const StandardErrorResponses = {
  400: {
    description: "Bad Request - Validation failed",
    content: {
      "application/json": {
        schema: ValidationErrorResponseSchema,
      },
    },
  },
  401: {
    description: "Unauthorized - Authentication required",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
  403: {
    description: "Forbidden - Insufficient permissions",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
  404: {
    description: "Not Found - Resource not found",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};

// Common OpenAPI tags
export const ApiTags = {
  HEALTH: "Health",
  AUTH: "Authentication", 
  USER: "User",
  ADMIN: "Admin",
} as const;

// Helper function to create standardized success responses
export function createSuccessResponse<T>(data: T, message?: string) {
  return {
    success: true as const,
    data,
    message: message || "Success",
  };
}

// Helper function to create standardized error responses  
export function createErrorResponse(error: string, details?: unknown) {
  return {
    success: false as const,
    error,
    details,
  };
}