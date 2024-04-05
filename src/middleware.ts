import { defineMiddleware } from "astro:middleware";
import { verifyRequestOrigin } from "lucia";

import { lucia } from "~/server/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method !== "GET") {
    const originHeader = context.request.headers.get("Origin");
    const hostHeader = context.request.headers.get("Host");

    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return new Response("Invalid origin", { status: 403 });
    }
  }

  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? "";

  if (sessionId === "") {
    context.locals.user = null;
    context.locals.session = null;

    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } else if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  context.locals.user = user;
  context.locals.session = session;

  return next();
});
