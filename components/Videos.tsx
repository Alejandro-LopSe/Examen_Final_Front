import { FunctionComponent } from "preact";
import { ApiUser, Video } from "../types.ts";
import { Fav } from "../islands/Fav.tsx";

export const Videos: FunctionComponent<
  { videos: Video[] | number; state: ApiUser }
> = (
  { videos, state },
) => {
  return (
    <div class="video-page-container">
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      <div class="video-list-container">
        {typeof videos !== "number"
          ? videos.map((video: Video) => {
            return (
              <div class="video-item" data-fresh-key={video.id}>
                <a href={`/video/${video.id}`} class="video-link">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    class="video-thumbnail"
                  />
                  <div class="video-info">
                    <h3 class="video-title">{video.title}</h3>
                    <p class="video-description">{video.description}</p>
                    <p class="video-release-date">{video.date}</p>
                  </div>
                </a>
                <Fav video={video} state={state}></Fav>
              </div>
            );
          })
          : <p class="error-message">{videos}</p>}
      </div>
    </div>
  );
};
