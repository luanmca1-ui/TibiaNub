import type { Cave, VideoLink } from "@/types";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";

export function VideoLinks({
  cave,
  videos,
}: {
  cave?: Cave | null;
  videos: VideoLink[];
}) {
  if (!cave) {
    return (
      <EmptyState
        description="Selecione uma cave recomendada para ver vídeos relacionados àquela hunt."
        title="Escolha uma cave"
      />
    );
  }

  if (videos.length === 0) {
    return (
      <EmptyState
        description="Ainda não cadastramos vídeos para essa cave. Você pode adicionar links depois no arquivo src/data/videos.ts."
        title={`Sem vídeos para ${cave.name}`}
      />
    );
  }

  return (
    <div className="grid gap-3">
      <div>
        <h3 className="text-base font-semibold text-white">Vídeos para aprender: {cave.name}</h3>
        <p className="mt-1 text-sm text-parchment/70">
          Os vídeos são de criadores da comunidade e abrem diretamente no YouTube.
        </p>
      </div>

      {videos.map((video) => (
        <a
          className="rounded-lg border border-white/10 bg-iron/70 p-4 transition hover:border-ember/50 hover:bg-iron"
          href={video.url}
          key={video.id}
          rel="noreferrer"
          target="_blank"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-white">{video.title}</h3>
              <p className="mt-1 text-sm text-parchment/70">{video.channel}</p>
            </div>
            <Badge tone="ember">{video.type}</Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {video.levelMin ? <Badge tone="blue">Level {video.levelMin}+</Badge> : null}
            {video.vocation ? <Badge>{video.vocation}</Badge> : null}
          </div>
          {video.description ? (
            <p className="mt-3 text-sm text-parchment/75">{video.description}</p>
          ) : null}
          <span className="mt-4 inline-flex rounded-md border border-ember/30 bg-ember/15 px-3 py-2 text-sm font-semibold text-orange-100">
            Abrir no YouTube
          </span>
        </a>
      ))}
    </div>
  );
}
