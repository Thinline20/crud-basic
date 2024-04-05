import type { APIContext } from "astro";

import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { users } from "~/server/db/schema/user";

export async function GET({ request }: APIContext) {
  const username = request.headers.get("username");
  const returnType = request.headers.get("return-type") ?? "user";

  if (typeof username !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  if (returnType === "boolean") {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return new Response(JSON.stringify(!!res), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (!user) {
    return new Response("User not found", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user[0]), {
    headers: {
      "content-type": "application/json",
    },
  });
}
