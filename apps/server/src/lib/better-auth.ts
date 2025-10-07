import { betterAuth as BetterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, bearer } from "better-auth/plugins";

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
import type auth from "@/routes/auth";

export const betterAuth = BetterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  secret: BETTER_AUTH_SECRET,
  baseURL: API_URL,
  trustedOrigins: [APP_URL],
  plugins: [openAPI(), bearer()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: Boolean(RESEND_API_KEY),
    requireEmailVerification: Boolean(RESEND_API_KEY),
    sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
      const subject = "Reset Your BHVR Password";
      const result = await sendPasswordResetEmail(subject, user.email, {
        userName: user.name || undefined,
        resetUrl: url,
      });
      if (!result.success) throw new Error(result.error || "Failed to send password reset email");
    },
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      const subject = "Verify Your BHVR Email Address";
      const result = await sendEmailVerificationEmail(subject, user.email, {
        userName: user.name || undefined,
        verificationUrl: url,
      });
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
          const user = ctx.context.returned.user;
          if (user) {
            const email = user.email;
            const userName = user.name;
            const loginUrl = `${APP_URL}/login`;
            const subject = "Welcome to BHVR!";
            await sendWelcomeEmail(subject, email, { userName, loginUrl });
          }
        },
      },
    ],
  },
});

export type Auth = typeof betterAuth;
export type Session = typeof betterAuth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
