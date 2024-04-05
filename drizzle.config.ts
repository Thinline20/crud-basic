import type { Config } from "drizzle-kit";

export default {
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ?? "postgres://localhost:5432/crud",
  },
  driver: "pg",
  out: "./drizzle",
  schema: "./src/server/db/schema",
} satisfies Config;
