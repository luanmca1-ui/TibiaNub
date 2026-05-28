"use client";

import { useState } from "react";
import type { Equipment, EquipmentSlot } from "@/types";
import { Badge } from "./Badge";

function getLevelLabel(equipment: Equipment) {
  return equipment.levelMax ? `${equipment.levelMin}-${equipment.levelMax}` : `${equipment.levelMin}+`;
}

function getSlotShortName(slot: EquipmentSlot) {
  switch (slot) {
    case "Shield/Spellbook":
      return "Shield";
    default:
      return slot;
  }
}

async function copyWithFallback(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const visibleAttributes = equipment.attributes?.slice(0, 2) ?? [];

  async function handleCopy() {
    try {
      await copyWithFallback(equipment.name);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Erro ao copiar nome do item:", error);
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  return (
    <article className="grid gap-3 rounded-lg border border-white/10 bg-iron/70 p-3.5 shadow-sm transition hover:border-ember/35">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ember">
            {getSlotShortName(equipment.slot)}
          </p>
          <h3 className="mt-0.5 truncate text-base font-semibold text-white">{equipment.name}</h3>
        </div>
        <Badge tone="blue">Lvl {getLevelLabel(equipment)}</Badge>
      </div>

      <p className="line-clamp-2 text-sm leading-5 text-parchment/78">
        {equipment.description ?? "Item recomendado para esta faixa de level."}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <Badge tone="moss">{equipment.budget}</Badge>
        {visibleAttributes.map((attribute) => (
          <Badge key={attribute}>{attribute}</Badge>
        ))}
      </div>

      <button
        className="h-9 w-fit rounded-md border border-sky-400/30 bg-sky-500/15 px-3 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/25 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
        onClick={handleCopy}
        type="button"
      >
        {copyState === "copied"
          ? "Copiado!"
          : copyState === "error"
            ? "Erro ao copiar"
            : "Copiar nome"}
      </button>
    </article>
  );
}
