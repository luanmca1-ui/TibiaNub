"use client";

import { vocations } from "@/data/vocations";
import type { Budget, Filters, Objective, Vocation } from "@/types";
import { Badge } from "./Badge";

const objectives: Objective[] = ["XP", "Loot", "Loot/XP"];

const objectiveHelp: Record<Objective, string> = {
  XP: "para subir level mais rápido",
  Loot: "para tentar ganhar mais dinheiro",
  "Loot/XP": "equilíbrio entre experiência e lucro",
};

const budgets: Budget[] = ["Barato", "Custo-benefício", "Melhor possível"];

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const fieldClass =
  "h-10 rounded-md border border-white/10 bg-iron px-3 text-sm outline-none ring-ember/40 transition focus:ring-2";

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  return (
    <section className="grid gap-3 rounded-xl border border-amber-500/20 bg-slate-950/95 p-3 shadow-2xl backdrop-blur md:p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-white">Monte seu guia</h2>
          <p className="mt-0.5 text-xs leading-5 text-parchment/65">
            Ajuste os filtros e as recomendações mudam na hora.
          </p>
        </div>
        <div className="hidden flex-wrap gap-1.5 lg:flex">
          <Badge tone="ember">{filters.vocation}</Badge>
          <Badge tone="blue">Level {filters.level}</Badge>
          <Badge>{filters.objective}</Badge>
          <Badge tone="moss">{filters.budget}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="grid content-start gap-1.5 text-sm font-medium text-parchment">
          Qual sua vocação?
          <select
            className={fieldClass}
            value={filters.vocation}
            onChange={(event) =>
              onChange({ ...filters, vocation: event.target.value as Vocation })
            }
          >
            {vocations.map((vocation) => (
              <option key={vocation.name} value={vocation.name}>
                {vocation.name}
              </option>
            ))}
          </select>
          <span className="hidden text-xs font-normal leading-5 text-parchment/50 md:block">
            Escolha a classe que você quer jogar.
          </span>
        </label>

        <label className="grid content-start gap-1.5 text-sm font-medium text-parchment">
          Qual seu level?
          <input
            className={fieldClass}
            min={1}
            type="number"
            value={filters.level}
            onChange={(event) =>
              onChange({ ...filters, level: Number(event.target.value) || 1 })
            }
          />
          <span className="hidden text-xs font-normal leading-5 text-parchment/50 md:block">
            Use um level aproximado.
          </span>
        </label>

        <label className="grid content-start gap-1.5 text-sm font-medium text-parchment">
          O que você quer priorizar?
          <select
            className={fieldClass}
            value={filters.objective}
            onChange={(event) =>
              onChange({ ...filters, objective: event.target.value as Objective })
            }
          >
            {objectives.map((objective) => (
              <option key={objective} value={objective}>
                {objective}
              </option>
            ))}
          </select>
          <span className="hidden text-xs font-normal leading-5 text-parchment/50 md:block">
            {objectiveHelp[filters.objective]}.
          </span>
        </label>

        <label className="grid content-start gap-1.5 text-sm font-medium text-parchment">
          Quanto quer gastar?
          <select
            className={fieldClass}
            value={filters.budget}
            onChange={(event) =>
              onChange({ ...filters, budget: event.target.value as Budget })
            }
          >
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
          <span className="hidden text-xs font-normal leading-5 text-parchment/50 md:block">
            Barato sugere menos imbuements; Melhor possível mostra o pacote mais completo.
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3 lg:hidden">
        <Badge tone="ember">{filters.vocation}</Badge>
        <Badge tone="blue">Level {filters.level}</Badge>
        <Badge>{filters.objective}</Badge>
        <Badge tone="moss">{filters.budget}</Badge>
      </div>
    </section>
  );
}
