/* eslint-disable perfectionist/sort-objects */
import {
  bigserial,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { articles } from "./articles";
import { users } from "./user";

export const comments = pgTable("comments", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  userId: varchar("user_id", { length: 31 })
    .notNull()
    .references(() => users.id),
  articleId: bigserial("article_id", { mode: "bigint" })
    .notNull()
    .references(() => articles.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
