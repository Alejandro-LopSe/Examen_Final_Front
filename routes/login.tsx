import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Login } from "../components/Login.tsx";
import { ApiUser, LoginUser } from "../types.ts";
import jwt from "jsonwebtoken";
export const handler: Handlers<string, ApiUser> = {
  POST: async (req: Request, ctx: FreshContext<ApiUser, string>) => {
    const form = await req.formData();
    const loginuser: LoginUser = {
      email: form.get("email")!.toString(),
      password: form.get("password")!.toString(),
    };
    const res = await fetch(`https://videoapp-api.deno.dev/checkuser`, {
      method: "post",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(loginuser),
    });

    if (res.status !== 200) {
      return ctx.render("Incorrect credentials or user does not exist");
    }
    const apiuser: ApiUser = await res.json();
    const headers = new Headers();
    const token = jwt.sign(apiuser, Deno.env.get("JWT"));
    headers.append("Set-Cookie", `auth=${token}`);
    headers.append("location", "/videos");
    return new Response("", {
      headers,
      status: 302,
    });
  },
};
export default function Page(props: PageProps<string, ApiUser>) {
  return <Login error={props.data} />;
}
