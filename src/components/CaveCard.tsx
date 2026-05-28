import type { Cave, VideoLink } from "@/types";
import { Badge } from "./Badge";

function difficultyTone(difficulty: Cave["difficulty"]) {
  if (difficulty === "Fácil") return "moss";
  if (difficulty === "Média") return "ember";
  return "danger";
}

function idealRange(cave: Cave) {
  const min = cave.levelIdealMin ?? cave.levelMin;
  const max = cave.levelIdealMax;
  return max ? `${min}-${max}` : `${min}+`;
}

export function CaveCard({
  cave,
  isBestChoice = false,
  onSelect,
  primaryVideo = null,
  selected = false,
}: {
  cave: Cave;
  isBestChoice?: boolean;
  onSelect?: (caveId: string) => void;
  primaryVideo?: VideoLink | null;
  selected?: boolean;
}) {
  return (
    <article
      className={`grid cursor-pointer gap-4 rounded-lg border p-4 text-left shadow-sm transition ${
        selected
          ? "border-amber-400 bg-amber-500/10 shadow-glow"
          : isBestChoice
            ? "border-ember/60 bg-ember/10 hover:border-amber-400/70"
            : "border-ember/20 bg-obsidian/75 hover:border-ember/50"
      } focus:outline-none focus:ring-2 focus:ring-ember/45`}
      onClick={() => onSelect?.(cave.id)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(cave.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {selected ? (
              <span className="text-xs font-semibold uppercase tracking-wide text-ember">
                Selecionada
              </span>
            ) : null}
            {isBestChoice ? (
              <span className="text-xs font-semibold uppercase tracking-wide text-ember">
                Melhor escolha
              </span>
            ) : null}
          </div>
          <h3 className="text-lg font-semibold text-white">{cave.name}</h3>
          <p className="mt-1 text-sm text-parchment/70">
            Level {cave.levelMin}+ · ideal {idealRange(cave)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="blue">Ideal {idealRange(cave)}</Badge>
        <Badge tone={difficultyTone(cave.difficulty)}>{cave.difficulty}</Badge>
        {cave.mode ? <Badge>{cave.mode}</Badge> : null}
        {cave.goals.slice(0, 3).map((goal) => (
          <Badge key={goal} tone={goal === "XP" ? "ember" : "default"}>
            {goal}
          </Badge>
        ))}
      </div>

      <div className="grid gap-2 rounded-md border border-white/10 bg-slate-950/35 p-3 text-sm sm:grid-cols-3">
        <div>
          <p className="text-parchment/50">XP</p>
          <p className="font-semibold text-white">{cave.xpRating ?? 0}/5</p>
        </div>
        <div>
          <p className="text-parchment/50">Loot</p>
          <p className="font-semibold text-white">{cave.lootRating ?? 0}/5</p>
        </div>
        <div>
          <p className="text-parchment/50">Loot/XP</p>
          <p className="font-semibold text-white">{cave.balanceRating ?? 0}/5</p>
        </div>
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-parchment/50">Monstros</dt>
          <dd className="text-parchment">{cave.mainMonsters.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-parchment/50">Dano</dt>
          <dd className="text-parchment">{cave.mainDamage?.join(", ") ?? "Variado"}</dd>
        </div>
        <div>
          <dt className="text-parchment/50">Proteção</dt>
          <dd className="text-parchment">{cave.recommendedProtection?.join(", ") ?? "Leve suprimentos extras"}</dd>
        </div>
        <div>
          <dt className="text-parchment/50">Runas/Magias</dt>
          <dd className="text-parchment">{cave.recommendedRunes?.join(", ") ?? "Conforme a vocação"}</dd>
        </div>
      </dl>

      {cave.notes ? <p className="text-sm leading-6 text-parchment/80">{cave.notes}</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        {primaryVideo ? (
          <a
            className="inline-flex w-fit rounded-md border border-ember/30 bg-ember/15 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-ember/25"
            href={primaryVideo.url}
            onClick={(event) => {
              event.stopPropagation();
              onSelect?.(cave.id);
            }}
            rel="noreferrer"
            target="_blank"
          >
            Abrir vídeo da hunt
          </a>
        ) : (
          <button
            className="inline-flex w-fit rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-parchment/75 transition hover:border-ember/30 hover:text-orange-100"
            onClick={(event) => {
              event.stopPropagation();
              onSelect?.(cave.id);
            }}
            type="button"
          >
            Sem vídeo cadastrado
          </button>
        )}
        {primaryVideo ? (
          <span className="text-xs text-parchment/55">Abre em nova aba no YouTube</span>
        ) : null}
      </div>

      {cave.sourceUrls?.length ? (
        <div className="flex flex-wrap gap-2 text-xs text-parchment/55">
          <span>Fontes/consulta:</span>
          {cave.sourceUrls.map((source) => (
            <a
              className="text-ember hover:text-orange-300"
              href={source}
              key={source}
              onClick={(event) => event.stopPropagation()}
              rel="noreferrer"
              target="_blank"
            >
              link
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
