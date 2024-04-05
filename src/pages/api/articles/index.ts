import { db } from "~/server/db";
import { articles } from "~/server/db/schema";

export async function GET() {
  const articleList = await db
    .select({
      createdAt: articles.createdAt,
      id: articles.id,
      title: articles.title,
    })
    .from(articles)
    .orderBy(articles.createdAt)
    .limit(20);

  return articleList;
}

export type ArticleList = Awaited<ReturnType<typeof GET>>;
