import { z } from "zod";
import { 
  IdSchema, 
  EmailSchema, 
  NameSchema, 
  DateTimeSchema,
  SuccessResponseSchema 
} from "./common.js";

// Base User schema
export const UserSchema = z.object({
  id: IdSchema,
  email: EmailSchema,
  name: NameSchema.nullable(),
  image: z.string().url().nullable(),
  emailVerified: z.boolean(),
  createdAt: DateTimeSchema.optional(),
  updatedAt: DateTimeSchema.optional(),
});

// Public User schema (safe for client-side)
export const PublicUserSchema = UserSchema.omit({
  emailVerified: true,
});

// User profile update request
export const UpdateUserProfileSchema = z.object({
  name: NameSchema.optional(),
  image: z.string().url().optional(),
});

// User profile response
export const UserProfileResponseSchema = SuccessResponseSchema.extend({
  data: UserSchema,
});

// Update profile response  
export const UpdateProfileResponseSchema = SuccessResponseSchema.extend({
  data: UserSchema,
  message: z.literal("Profile updated successfully"),
});

// User preferences schema (for future use)
export const UserPreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.string().default("en"),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    marketing: z.boolean().default(false),
  }).default(() => ({
    email: true,
    push: true,
    marketing: false,
  })),
});

// Type exports (with Schema suffix to avoid conflicts)
export type UserData = z.infer<typeof UserSchema>;
export type PublicUserData = z.infer<typeof PublicUserSchema>;
export type UpdateUserProfileData = z.infer<typeof UpdateUserProfileSchema>;
export type UserPreferencesData = z.infer<typeof UserPreferencesSchema>;