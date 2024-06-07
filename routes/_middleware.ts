import jwt from "jsonwebtoken";
import { FreshContext } from "$fresh/server.ts";
import { ApiUser } from "../types.ts";

export const handler = async (_req: Request, ctx: FreshContext<ApiUser>) => {
  console.log(ctx.destination);

  if (ctx.destination !== "route") {
    const res = await ctx.next();
    return res;
  }
  if (ctx.route === "/login" || ctx.route === "/register") {
    const res = await ctx.next();
    return res;
  }

  const cookie_raw = _req.headers.get("cookie");

  if (!cookie_raw) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }
  const cookie = await jwt.verify(cookie_raw.substring(5), Deno.env.get("JWT"));
  console.log("Cookie: ", cookie);

  if (!cookie) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }
  ctx.state = cookie;

  const res = await ctx.next();
  return res;
};
