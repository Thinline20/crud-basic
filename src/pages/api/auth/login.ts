import type { APIContext } from "astro"

import { eq } from 'drizzle-orm';
import { Argon2id } from "oslo/password"

import { lucia } from "~/server/auth"
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(context: APIContext) {
  const formData = await context.request.formData();


  const id = formData.get("id");

  if (typeof id !== "string" || id.length < 3 || id.length > 31 || !/^[a-z0-9_-]+$/.test(id))
  {
    return new Response("Invalid id", { status: 400 });
  }

  const password = formData.get("password");

  if (typeof password !== "string" || password.length < 14 || password.length > 255 || !/^[!@#$%^&*()_+a-zA-Z0-9]{14,255}$/.test(password))
  {
    return new Response("Invalid password", { status: 400 });
  }

  const existingUser = await db.select().from(users).where(eq(users.id, id)).limit(1)

  if (existingUser.length === 0) {
    return new Response("Incorrect ID or Password", { status: 400 });
  }

  const validPassword = await new Argon2id().verify(existingUser[0].hashedPassword, password);

  if (!validPassword) {
    return new Response("Incorrect ID or Password", { status: 400 });
  }

  const session = await lucia.createSession(id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return context.redirect("/")
}