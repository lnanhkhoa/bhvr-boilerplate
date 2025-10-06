import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { sendPasswordResetEmail, sendWelcomeEmail, sendEmailVerificationEmail } from "./email";
import {
  RESEND_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  BETTER_AUTH_SECRET,
  API_URL,
  APP_URL,
} from "@/configs/env";
import { RATE_LIMIT_CONFIG, SESSION_CONFIG } from "@/configs/constants";

const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  secret: BETTER_AUTH_SECRET,
  baseURL: API_URL,
  trustedOrigins: [APP_URL],
  emailAndPassword: {
    enabled: true,
    autoSignIn: Boolean(RESEND_API_KEY),
    requireEmailVerification: Boolean(RESEND_API_KEY),
    sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
      const result = await sendPasswordResetEmail(user.email, url, user.name || undefined);
      if (!result.success) throw new Error(result.error || "Failed to send password reset email");
    },
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      const result = await sendEmailVerificationEmail(user.email, url, user.name || undefined);
      if (!result.success) throw new Error(result.error || "Failed to send verification email");
    },
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      enabled: Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      enabled: Boolean(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET),
    },
  },
  session: SESSION_CONFIG,
  user: {
    additionalFields: {
      emailVerified: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  rateLimit: RATE_LIMIT_CONFIG,
  callbacks: {
    after: [
      {
        matcher: (context: any) => context.path === "/sign-up" && context.method === "POST",
        handler: async (ctx: any) => {
          if (ctx.context.returned?.user) {
            await sendWelcomeEmail(ctx.context.returned.user.email, ctx.context.returned.user.name || undefined);
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
