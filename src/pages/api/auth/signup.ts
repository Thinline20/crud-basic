import type { APIContext } from "astro";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import { lucia } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(context: APIContext) {
  const formData = await context.request.formData();

  const id = formData.get("id");
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");

  if (
    typeof id !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string"
  ) {
    return new Response("Required field not filled", {
      status: 400,
    });
  }

  if (id.length < 4 || id.length > 31 || !/^[a-z0-9]{4,31}$/.test(id)) {
    return new Response("Invalid id", {
      status: 400,
    });
  }

  if (
    password.length < 14 ||
    password.length > 255 ||
    !/^[!@#$%^&*()_+a-zA-Z0-9]{14,255}$/.test(password)
  ) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  if (
    username.length < 3 ||
    username.length > 255 ||
    !/^[a-zA-Z0-9]{3,255}$/.test(username)
  ) {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  const isIdDuplicate = await db.select({id: users.id}).from(users).where(eq(users.id, id)).limit(1)

  console.log(isIdDuplicate)

  if (isIdDuplicate.length !== 0) {
    return new Response("Id already exists", {
      status: 400,
    });
  }

  const isUsernameDuplicate = await db.select({username: users.username}).from(users).where(eq(users.username, username)).limit(1)

  if (isUsernameDuplicate.length !== 0) {
    return new Response("Username already exists", {
      status: 400,
    });
  }
  
  const isEmailDuplicate = await db.select({email: users.email}).from(users).where(eq(users.email, email)).limit(1)

  if (isEmailDuplicate.length !== 0) {
    return new Response("Email already exists", {
      status: 400,
    });
  }

  const publicId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  await db.insert(users).values({
    email: email,
    hashedPassword: hashedPassword,
    id: id,
    publicId: publicId,
    username: username,
  })

  console.log("after")

  const session = await lucia.createSession(id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return context.redirect("/");
}
