import type { APIContext } from "astro";

import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { articles, users } from "~/server/db/schema";

export async function POST(context: APIContext) {
  const formData = await context.request.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const userId = formData.get("userId");
  const category = formData.get("category");

  if (typeof title !== "string" || title.length < 1 || title.length > 255) {
    return new Response("Invalid title", { status: 400 });
  }

  if (typeof content !== "string" || content.length < 1) {
    return new Response("Invalid content", { status: 400 });
  }

  if (typeof userId !== "string") {
    return new Response("Invalid User ID", { status: 400 });
  }

  if (typeof category !== "string") {
    return new Response("Invalid category", { status: 400 });
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (existingUser.length === 0) {
    return new Response("User not exists", { status: 400 });
  }

  await db.insert(articles).values({
    category: "default",
    content: content,
    title: title,
    userId: userId,
  });

  return new Response(null, { status: 200 });
}
