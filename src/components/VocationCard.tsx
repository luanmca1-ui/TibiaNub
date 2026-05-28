"use client";

import type { Vocation, VocationOption } from "@/types";
import { Badge } from "./Badge";

const displayName: Record<Vocation, string> = {
  "Elite Knight": "Knight",
  "Royal Paladin": "Paladin",
  "Master Sorcerer": "Sorcerer",
  "Elder Druid": "Druid",
  Monk: "Monk",
};

const shortDescription: Record<Vocation, string> = {
  "Elite Knight": "Resistente e bom para caçar de perto.",
  "Royal Paladin": "Ataca de longe e joga bem solo.",
  "Master Sorcerer": "Muito dano mágico, mas exige cuidado.",
  "Elder Druid": "Cura, ajuda o time e causa dano.",
  Monk: "Equilibrado, luta de perto e apoia o grupo.",
};

const initials: Record<Vocation, string> = {
  "Elite Knight": "EK",
  "Royal Paladin": "RP",
  "Master Sorcerer": "MS",
  "Elder Druid": "ED",
  Monk: "MO",
};

export function VocationCard({
  isSelected,
  onChoose,
  vocation,
}: {
  isSelected: boolean;
  onChoose: (vocation: Vocation) => void;
  vocation: VocationOption;
}) {
  return (
    <article
      className={`grid gap-3 rounded-lg border p-3.5 shadow-sm transition ${
        isSelected
          ? "border-ember/70 bg-ember/10 shadow-glow"
          : "border-white/10 bg-obsidian/75 hover:border-ember/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ember/25 bg-slate-950/70 text-sm font-bold text-orange-100">
          {initials[vocation.name]}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white">{displayName[vocation.name]}</h3>
          <p className="text-xs text-parchment/60">{vocation.name}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge tone="blue">{vocation.playStyle}</Badge>
        <Badge tone={isSelected ? "ember" : "default"}>{vocation.beginnerDifficulty}</Badge>
      </div>

      <p className="text-sm leading-5 text-parchment/78">{shortDescription[vocation.name]}</p>

      <button
        className="h-9 rounded-md border border-ember/40 bg-ember/20 px-3 text-sm font-semibold text-orange-50 transition hover:bg-ember/30 focus:outline-none focus:ring-2 focus:ring-ember/50"
        onClick={() => onChoose(vocation.name)}
        type="button"
      >
        Escolher
      </button>
    </article>
  );
}
