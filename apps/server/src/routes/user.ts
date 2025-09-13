import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { 
  UserProfileResponseSchema, 
  UpdateUserProfileSchema,
  UpdateProfileResponseSchema,
  StandardErrorResponses,
  ApiTags,
  createSuccessResponse,
  createErrorResponse,
  z
} from "@repo/shared";

const userRoutes = new OpenAPIHono();

// Get user profile route
const getUserProfileRoute = createRoute({
  method: "get",
  path: "/profile",
  tags: [ApiTags.USER],
  summary: "Get user profile",
  description: "Get the authenticated user's profile information",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserProfileResponseSchema,
        },
      },
      description: "User profile retrieved successfully",
    },
  },
});

userRoutes.openapi(getUserProfileRoute, async (c) => {
  // TODO: Add proper authentication middleware
  // For now, we'll simulate a user response to fix TypeScript issues
  const user = {
    id: "user-123",
    email: "user@example.com", 
    name: "John Doe",
    image: null,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return c.json({
    success: true as const,
    data: user,
    message: "Profile retrieved successfully"
  });
});

// Update user profile route  
const updateUserProfileRoute = createRoute({
  method: "put",
  path: "/profile", 
  tags: [ApiTags.USER],
  summary: "Update user profile",
  description: "Update the authenticated user's profile information",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateUserProfileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UpdateProfileResponseSchema,
        },
      },
      description: "Profile updated successfully",
    },
  },
});

userRoutes.openapi(updateUserProfileRoute, async (c) => {
  // TODO: Add proper authentication middleware
  const updateData = c.req.valid("json");

  // Here you would typically update the user in the database
  // For now, we'll simulate the response
  const updatedUser = {
    id: "user-123",
    email: "user@example.com", 
    name: updateData.name || "John Doe",
    image: updateData.image || null,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json({
    success: true as const,
    data: updatedUser,
    message: "Profile updated successfully" as const
  });
});

export default userRoutes;