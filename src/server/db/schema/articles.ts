/* eslint-disable perfectionist/sort-objects */
import {
  bigserial,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./user";

export const articles = pgTable("articles", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  userId: varchar("user_id", { length: 31 })
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
