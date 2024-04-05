/* eslint-disable perfectionist/sort-objects */
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { users } from "./user";

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("user_id", { length: 24 })
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export type Session = typeof sessions.$inferSelect;