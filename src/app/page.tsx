"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterPanel } from "@/components/FilterPanel";
import { RecommendationResult } from "@/components/RecommendationResult";
import { VocationCard } from "@/components/VocationCard";
import { vocations } from "@/data/vocations";
import type { Filters, Vocation } from "@/types";
import { getRecommendations, getVideosForCave } from "@/utils/recommendationEngine";

const initialFilters: Filters = {
  vocation: "Elite Knight",
  level: 80,
  objective: "XP",
  budget: "Custo-benefício",
};

const guideSteps = [
  "Escolha sua vocação",
  "Informe seu level",
  "Escolha XP, Loot ou Loot/XP",
  "Veja o guia recomendado",
];

export default function Home() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedCaveId, setSelectedCaveId] = useState<string | null>(null);
  const recommendation = useMemo(
    () => getRecommendations(filters),
    [filters.vocation, filters.level, filters.objective, filters.budget],
  );
  const recommendedCaves = recommendation.caves;
  const selectedCave = recommendedCaves.find((cave) => cave.id === selectedCaveId) ?? null;
  const relatedVideos = useMemo(
    () => getVideosForCave(selectedCaveId, filters),
    [selectedCaveId, filters.vocation, filters.level, filters.objective, filters.budget],
  );

  useEffect(() => {
    if (!recommendedCaves.length) {
      setSelectedCaveId(null);
      return;
    }

    const selectedStillExists = recommendedCaves.some((cave) => cave.id === selectedCaveId);

    if (!selectedStillExists) {
      setSelectedCaveId(recommendedCaves[0].id);
    }
  }, [recommendedCaves, selectedCaveId]);

  function chooseVocation(vocation: Vocation) {
    setFilters((current) => ({ ...current, vocation }));
    document.getElementById("montar-guia")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <header className="grid gap-6 py-8 md:py-10">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-ember">
                Guia de Tibia para iniciantes
              </p>
              <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Tibia Nub</h1>
              <p className="mt-3 max-w-3xl text-xl font-semibold text-blue-100">
                Comece no Tibia sem ficar perdido.
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-parchment/82 sm:text-lg">
                Escolha sua vocação, informe seu level e veja equipamentos, hunts, runas,
                imbuements e vídeos para aprender o caminho.
              </p>
            </div>
            <a
              className="inline-flex h-12 w-fit items-center rounded-md border border-ember/40 bg-ember/25 px-5 text-sm font-semibold text-orange-50 transition hover:bg-ember/35"
              href="#montar-guia"
            >
              Montar meu guia
            </a>
          </div>
        </header>

        <section className="grid gap-4 rounded-lg border border-white/10 bg-obsidian/50 p-4 md:p-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Como usar</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-parchment/70">
              Em poucos passos você monta um guia inicial para saber o que comprar e onde caçar.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guideSteps.map((step, index) => (
              <div className="rounded-lg border border-white/10 bg-iron/65 p-3.5" key={step}>
                <p className="text-xs font-semibold uppercase tracking-wide text-ember">
                  Passo {index + 1}
                </p>
                <p className="mt-2 text-sm leading-6 text-parchment/82">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Escolha sua vocação</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/72">
              Cada vocação tem um jeito diferente de jogar. Escolha uma para começar; depois dá
              para testar outras com calma.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {vocations.map((vocation) => (
              <VocationCard
                isSelected={filters.vocation === vocation.name}
                key={vocation.name}
                onChoose={chooseVocation}
                vocation={vocation}
              />
            ))}
          </div>
        </section>

        <section
          id="montar-guia"
          className="relative z-50 scroll-mt-4 md:sticky md:top-4 md:scroll-mt-6 md:self-start"
        >
          <FilterPanel filters={filters} onChange={setFilters} />
        </section>

        <RecommendationResult
          filters={filters}
          onSelectCave={setSelectedCaveId}
          recommendation={recommendation}
          relatedVideos={relatedVideos}
          selectedCave={selectedCave}
          selectedCaveId={selectedCaveId}
        />

        <footer className="grid gap-4 border-t border-white/10 py-6 text-sm leading-6 text-parchment/68 md:grid-cols-[1fr_auto] md:items-center">
          <p>
            Portal não oficial. Tibia é propriedade da CipSoft GmbH. Este guia organiza informações
            para ajudar iniciantes. Tem sugestão? Envie pelo WhatsApp: 82 99189-2843.
          </p>
          <a
            className="inline-flex w-fit rounded-md border border-moss/40 bg-moss/20 px-4 py-2 font-semibold text-green-100 transition hover:bg-moss/30"
            href="https://wa.me/5582991892843"
            rel="noreferrer"
            target="_blank"
          >
            Enviar sugestão no WhatsApp
          </a>
        </footer>
      </div>
    </main>
  );
}
