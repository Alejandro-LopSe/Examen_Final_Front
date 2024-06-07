import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Register } from "../components/Register.tsx";
import { ApiUser, RegisterUser } from "../types.ts";
import jwt from "jsonwebtoken";
export const handler: Handlers<string, ApiUser> = {
  POST: async (req: Request, ctx: FreshContext<ApiUser, string>) => {
    const form = await req.formData();
    const loginuser: RegisterUser = {
      name: form.get("name")!.toString(),
      email: form.get("email")!.toString(),
      password: form.get("password")!.toString(),
    };
    const res = await fetch(`https://videoapp-api.deno.dev/register`, {
      method: "post",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(loginuser),
    });

    if (res.status !== 200) {
      return ctx.render("This Email is already in use.");
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
  return <Register error={props.data} />;
}
