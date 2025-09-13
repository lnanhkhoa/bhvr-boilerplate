import { z } from "zod";
import { 
  EmailSchema, 
  PasswordSchema, 
  NameSchema, 
  IdSchema,
  SuccessResponseSchema,
  DateTimeSchema 
} from "./common.js";
import { UserSchema } from "./user.js";

// Sign up request
export const SignUpRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  name: NameSchema.optional(),
});

// Sign in request
export const SignInRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

// Forgot password request
export const ForgotPasswordRequestSchema = z.object({
  email: EmailSchema,
});

// Reset password request
export const ResetPasswordRequestSchema = z.object({
  token: z.string().min(1),
  newPassword: PasswordSchema,
});

// Change password request (for authenticated users)
export const ChangePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: PasswordSchema,
});

// Session schema
export const SessionSchema = z.object({
  id: IdSchema,
  userId: IdSchema,
  expiresAt: DateTimeSchema,
  token: z.string(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

// Auth response with user and session
export const AuthResponseSchema = SuccessResponseSchema.extend({
  data: z.object({
    user: UserSchema,
    session: SessionSchema.optional(),
  }),
  message: z.string(),
});

// Sign up response
export const SignUpResponseSchema = AuthResponseSchema.extend({
  message: z.literal("Account created successfully"),
});

// Sign in response
export const SignInResponseSchema = AuthResponseSchema.extend({
  message: z.literal("Signed in successfully"),
});

// Sign out response
export const SignOutResponseSchema = SuccessResponseSchema.extend({
  message: z.literal("Signed out successfully"),
});

// Forgot password response
export const ForgotPasswordResponseSchema = SuccessResponseSchema.extend({
  message: z.literal("Password reset email sent"),
});

// Reset password response
export const ResetPasswordResponseSchema = SuccessResponseSchema.extend({
  message: z.literal("Password reset successfully"),
});

// Change password response
export const ChangePasswordResponseSchema = SuccessResponseSchema.extend({
  message: z.literal("Password changed successfully"),
});

// Get session response
export const GetSessionResponseSchema = SuccessResponseSchema.extend({
  data: z.object({
    user: UserSchema,
    session: SessionSchema,
  }),
});

// OAuth provider schema
export const OAuthProviderSchema = z.enum(["google", "github"]);

// OAuth redirect request
export const OAuthRedirectRequestSchema = z.object({
  provider: OAuthProviderSchema,
  redirectTo: z.string().url().optional(),
});

// Email verification request
export const EmailVerificationRequestSchema = z.object({
  token: z.string().min(1),
});

// Email verification response
export const EmailVerificationResponseSchema = SuccessResponseSchema.extend({
  message: z.literal("Email verified successfully"),
});

// Resend verification request
export const ResendVerificationRequestSchema = z.object({
  email: EmailSchema,
});

// Resend verification response
export const ResendVerificationResponseSchema = SuccessResponseSchema.extend({
  message: z.literal("Verification email sent"),
});

// Type exports (with Schema suffix to avoid conflicts)
export type SignUpRequestData = z.infer<typeof SignUpRequestSchema>;
export type SignInRequestData = z.infer<typeof SignInRequestSchema>;
export type ForgotPasswordRequestData = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequestData = z.infer<typeof ResetPasswordRequestSchema>;
export type ChangePasswordRequestData = z.infer<typeof ChangePasswordRequestSchema>;
export type SessionData = z.infer<typeof SessionSchema>;
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;