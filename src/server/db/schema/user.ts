/* eslint-disable perfectionist/sort-objects */
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 31 }).primaryKey(),
  publicId: varchar("public_id", { length: 15 }).unique().notNull(),
  hashedPassword: text("hashed_password").notNull(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
