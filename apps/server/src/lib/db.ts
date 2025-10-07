import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./db-schema";
import { DATABASE_URL } from '@/configs/env'

const pgClient = postgres(DATABASE_URL, {
  onnotice: () => {}, // Suppress NOTICE logs
});

export const db = drizzle(pgClient, { schema });
console.log("🗄️  Database connected successfully");
