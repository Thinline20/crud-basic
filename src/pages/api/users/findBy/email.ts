import type { APIContext } from "astro";

import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { users } from "~/server/db/schema/user";

export async function GET({ request }: APIContext) {
  if (request.headers.get("content-type") !== "application/json") {
    return new Response("Invalid content type", {
      status: 400,
    });
  }

  const body = await request.json();
  const email = body.email as string | undefined;
  const returnType = body["return-type"] as string | undefined;

  if (typeof email !== "string") {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  if (returnType === "boolean") {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
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
    .where(eq(users.email, email))
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
