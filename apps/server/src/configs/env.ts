const isEnabledText = (condition: any) => (!!condition && condition !== "" ? "enabled" : "disabled (dev mode)");

// basic
export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_DEV = NODE_ENV === "development" || NODE_ENV === "test";
export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "development-secret-key-min-32-chars-long!!";

export const API_URL = process.env.API_URL || "http://localhost:5000";
export const STAGING_API_URL = process.env.STAGING_API_URL || "http://localhost:5000";
export const PRODUCTION_API_URL = process.env.PRODUCTION_API_URL || "http://localhost:5000";

export const APP_URL = process.env.APP_URL || "http://localhost:5101";
export const STAGING_CLIENT_URL = process.env.STAGING_CLIENT_URL || "http://localhost:5101";
export const PRODUCTION_CLIENT_URL = process.env.PRODUCTION_CLIENT_URL || "http://localhost:5101";

// database
export const DATABASE_URL = process.env.DATABASE_URL || "";
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  console.log("💡 Please set DATABASE_URL in your .env file:");
  console.log("   DATABASE_URL=postgresql://username:password@localhost:5432/database_name");
  throw new Error("DATABASE_URL environment variable is required");
}

// resend
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const EMAIL_FROM = process.env.EMAIL_FROM || "BHVR <noreply@bhvr.com>";
console.log("  📧 Email verification:", isEnabledText(RESEND_API_KEY));
console.log("  🔑 Auto sign-in:", isEnabledText(!RESEND_API_KEY));

// google
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
console.log("  🌐 Google OAuth:", isEnabledText(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET));

// github
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
console.log("  🐙 GitHub OAuth:", isEnabledText(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET));
