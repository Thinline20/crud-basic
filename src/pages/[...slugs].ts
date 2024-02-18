import { elysia } from "~/server";

const handle = ({ request }: { request: Request }) => elysia.handle(request);

export const GET = handle;
export const POST = handle;
