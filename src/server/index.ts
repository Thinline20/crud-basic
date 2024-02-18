import { Elysia, t } from "elysia";

export const elysia = new Elysia()
  .get("/api", () => {
    return { data: "hi" };
  })
  .post("/api", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });
