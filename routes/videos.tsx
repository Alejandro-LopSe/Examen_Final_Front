import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { Videos } from "../components/Videos.tsx";
import { ApiUser, Video } from "../types.ts";

export const handler: Handlers<Video[] | number, ApiUser> = {
  GET: async (_req: Request, ctx: FreshContext<ApiUser, Video[] | number>) => {
    const res = await fetch(
      `https://videoapp-api.deno.dev/videos/${ctx.state.id}`,
    );

    if (res.status !== 200) {
      if (res.status === 500) {
        console.log("error inesperado");
      }
      if (res.status === 404) {
        console.log("Usuario con userid no econtrado");
      }
      return ctx.render(res.status);
    }
    const videos: Video[] = await res.json();

    return ctx.render(videos);
  },
};
export default function Page(props: PageProps<Video[] | number, ApiUser>) {
  return <Videos state={props.state} videos={props.data} />;
}
