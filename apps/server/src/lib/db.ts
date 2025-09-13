import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  console.log("💡 Please set DATABASE_URL in your .env file:");
  console.log("   DATABASE_URL=postgresql://username:password@localhost:5432/database_name");
  throw new Error("DATABASE_URL environment variable is required");
}

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  onnotice: () => {}, // Suppress NOTICE logs
});

export const db = drizzle(sql, { schema });
console.log("🗄️  Database connected successfully");