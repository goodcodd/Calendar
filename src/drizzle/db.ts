// Import necessary modules for database management 
import { neon } from "@neondatabase/serverless"; // Import Neon serverless database client
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema});
