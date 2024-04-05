/* eslint-disable perfectionist/sort-objects */
import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { articles } from "./articles";
import { users } from "./user";

export const likes = pgTable("likes", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  articleId: bigserial("article_id", { mode: "bigint" })
    .notNull()
    .references(() => articles.id),
  userId: bigserial("user_id", { mode: "bigint" })
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
