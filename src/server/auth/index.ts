import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

import { db } from "~/server/db";

import { sessions } from "../db/schema/session";
import { users } from "../db/schema/user";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
});

type DatabaseUserAttributes = {
  username: string;
};

declare module "lucia" {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    DatabaseUserAttributes: DatabaseUserAttributes;
    Lucia: typeof lucia;
  }
}
