import type { APIContext } from "astro";

import { db } from "~/server/db";
import { type NewUser, users } from "~/server/db/schema/user";

export async function POST({ request }: APIContext) {
  if (request.headers.get("content-type") !== "application/json") {
    return new Response("Invalid content type", {
      status: 400,
    });
  }

  const body = await request.json();
  const id = body.id as string | undefined;
  const publicId = body.publicId as string | undefined;
  const username = body.username as string | undefined;
  const hashedPassword = body.hashedPassword as string | undefined;
  const email = body.email as string | undefined;

  if (
    typeof id !== "string" ||
    typeof publicId !== "string" ||
    typeof username !== "string" ||
    typeof hashedPassword !== "string" ||
    typeof email !== "string"
  ) {
    return new Response("Required field not filled", {
      status: 400,
    });
  }

  const user: NewUser = {
    email,
    hashedPassword,
    id,
    publicId,
    username,
  };

  const insertRes = await db
    .insert(users)
    .values(user)
    .returning()
    .onConflictDoNothing();

  if (insertRes.length === 0) {
    return new Response("User already exists", {
      status: 409,
    });
  }

  return new Response("User created", {
    status: 201,
  });
}
