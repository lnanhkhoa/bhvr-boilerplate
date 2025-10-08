import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_URL } from "@/configs/env";

const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool });
console.log("🗄️  Database connected successfully");
