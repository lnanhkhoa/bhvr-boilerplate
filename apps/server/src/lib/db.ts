import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { DATABASE_URL } from '@/configs/env'


const sql = postgres(DATABASE_URL, {
  onnotice: () => {}, // Suppress NOTICE logs
});
export const db = drizzle(sql, { schema });
console.log("🗄️  Database connected successfully");
