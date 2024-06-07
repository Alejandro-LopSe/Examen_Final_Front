import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { Video } from "../../components/Video.tsx";
import { ApiUser, Video as Video_type } from "../../types.ts";

export const handler: Handlers<Video_type | string, ApiUser> = {
  GET: async (
    _req: Request,
    ctx: FreshContext<ApiUser, Video_type | string>,
  ) => {
    const videoid = ctx.params.id;
    const res = await fetch(
      `https://videoapp-api.deno.dev/video/${ctx.state.id}/${videoid}`,
    );

    if (res.status !== 200) {
      return ctx.render(
        res.status === 500
          ? "error inesperado, Video no encontrado"
          : res.status === 404
          ? "usuario con userid no econtrado"
          : "Error no controlado",
      );
    }
    const videos: Video_type = await res.json();

    return ctx.render(videos);
  },
};
export default function Page(props: PageProps<Video_type | string, ApiUser>) {
  return <Video state={props.state} video={props.data} />;
}
