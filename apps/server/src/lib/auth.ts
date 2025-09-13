import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { sendPasswordResetEmail, sendWelcomeEmail, sendEmailVerificationEmail } from "./email";



// Log auth configuration on startup
console.log("🔐 Auth Configuration:");
console.log("  📧 Email verification:", process.env.RESEND_API_KEY ? "enabled" : "disabled (dev mode)");
console.log("  🔑 Auto sign-in:", !process.env.RESEND_API_KEY ? "enabled (dev mode)" : "disabled");
console.log("  🌐 Google OAuth:", Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) ? "enabled" : "disabled");
console.log("  🐙 GitHub OAuth:", Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) ? "enabled" : "disabled");

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "development-secret-key-min-32-chars-long!!",
  baseURL: process.env.API_URL || "http://localhost:3000",
  trustedOrigins: [process.env.APP_URL || "http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
    autoSignIn: !process.env.RESEND_API_KEY, // Auto sign-in when email is disabled
    requireEmailVerification: Boolean(process.env.RESEND_API_KEY),
    sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
      const result = await sendPasswordResetEmail(
        user.email,
        url,
        user.name || undefined
      );
      if (!result.success && process.env.RESEND_API_KEY) {
        throw new Error(result.error || "Failed to send password reset email");
      }
    },
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      const result = await sendEmailVerificationEmail(
        user.email,
        url,
        user.name || undefined
      );
      if (!result.success && process.env.RESEND_API_KEY) {
        throw new Error(result.error || "Failed to send verification email");
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      emailVerified: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // max 10 requests per minute
  },
  callbacks: {
    after: [
      {
        matcher(context: any) {
          return context.path === "/sign-up" && context.method === "POST";
        },
        handler: async (ctx: any) => {
          if (ctx.context.returned?.user) {
            await sendWelcomeEmail(
              ctx.context.returned.user.email,
              ctx.context.returned.user.name || undefined
            );
          }
        },
      },
    ],
  },
});

export { auth };
export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
