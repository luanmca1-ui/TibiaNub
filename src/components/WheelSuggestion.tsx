import type { WheelSuggestion as WheelSuggestionType } from "@/types";

export function WheelSuggestion({ wheel }: { wheel?: WheelSuggestionType }) {
  if (!wheel) {
    return <p className="text-sm text-parchment/70">Sem sugestão de wheel para estes filtros.</p>;
  }

  return (
    <article className="rounded-lg border border-ember/25 bg-obsidian/80 p-4">
      <h3 className="text-lg font-semibold text-white">{wheel.title}</h3>
      <p className="mt-2 text-sm leading-6 text-parchment/80">{wheel.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {wheel.priorities.map((priority) => (
          <span
            className="rounded-full border border-white/10 bg-moss/20 px-3 py-1 text-xs text-green-100"
            key={priority}
          >
            {priority}
          </span>
        ))}
      </div>
    </article>
  );
}
