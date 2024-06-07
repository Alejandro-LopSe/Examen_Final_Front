import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { ApiUser, Video } from "../types.ts";

export const Fav: FunctionComponent<{ video: Video; state: ApiUser }> = (
  { video, state },
) => {
  const [fav, setfav] = useState<boolean>(video.fav);
  const toggle = async (videoid: string, userid: string) => {
    const res = await fetch(
      `https://videoapp-api.deno.dev/fav/${userid}/${videoid}`,
      {
        method: "post",
      },
    );
    if (res.status !== 200) {
      console.log("Error toggling fav");
    }
    setfav(!fav);
    console.log("Fav toggled");
    return;
  };
  return (
    <button
      class="fav-button"
      onClick={() => {
        toggle(video.id, state.id);
      }}
    >
      {fav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
};
