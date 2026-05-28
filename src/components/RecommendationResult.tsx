import { vocations } from "@/data/vocations";
import type { Cave, Filters, Recommendation, VideoLink } from "@/types";
import { getVideosForCave } from "@/utils/recommendationEngine";
import { Badge } from "./Badge";
import { CaveCard } from "./CaveCard";
import { EmptyState } from "./EmptyState";
import { EquipmentCard } from "./EquipmentCard";
import { ImbuementCard } from "./ImbuementCard";
import { VideoLinks } from "./VideoLinks";
import { WheelSuggestion } from "./WheelSuggestion";

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-4xl text-sm leading-6 text-parchment/72">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function RecommendationResult({
  filters,
  onSelectCave,
  recommendation,
  relatedVideos,
  selectedCave,
  selectedCaveId,
}: {
  filters: Filters;
  onSelectCave: (caveId: string) => void;
  recommendation: Recommendation;
  relatedVideos: VideoLink[];
  selectedCave: Cave | null;
  selectedCaveId: string | null;
}) {
  const selectedVocation = vocations.find((vocation) => vocation.name === filters.vocation);

  return (
    <div className="grid gap-10">
      <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-4">
        <p className="text-sm font-semibold text-blue-50">Guia atual</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="ember">Vocação: {filters.vocation}</Badge>
          <Badge tone="blue">Level: {filters.level}</Badge>
          <Badge>Objetivo: {filters.objective}</Badge>
          <Badge tone="moss">Orçamento: {filters.budget}</Badge>
        </div>
      </div>

      <Section
        description="Esses itens são sugestões para o seu level e orçamento. Não precisa comprar tudo de uma vez; comece pelos itens principais."
        title="Equipamentos recomendados"
      >
        {recommendation.equipments.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {recommendation.equipments.map((equipment) => (
              <EquipmentCard equipment={equipment} key={`${equipment.slot}-${equipment.name}`} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Não encontramos equipamentos para essa combinação. Tente outro level, vocação ou orçamento."
            title="Nenhum equipamento recomendado"
          />
        )}
      </Section>

      <Section
        description="Imbuements são melhorias temporárias colocadas nos equipamentos. Eles ajudam a recuperar vida, mana, causar mais dano ou se proteger melhor."
        title="Imbuements indicados"
      >
        {recommendation.imbuements.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendation.imbuements.map((imbuement) => (
              <ImbuementCard
                imbuement={imbuement}
                key={imbuement.name}
                selectedCave={selectedCave}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Ainda não existem imbuements cadastrados para essa vocação."
            title="Sem imbuements compatíveis"
          />
        )}
      </Section>

      <Section
        description="Escolha uma hunt para ver dicas, runas, proteções e vídeos relacionados."
        title="Hunts/caves para seu level"
      >
        {recommendation.caves.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {recommendation.caves.map((cave, index) => (
              <CaveCard
                cave={cave}
                isBestChoice={index === 0}
                key={cave.id}
                onSelect={onSelectCave}
                primaryVideo={getVideosForCave(cave.id, filters)[0] ?? null}
                selected={selectedCaveId === cave.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Não encontramos uma hunt segura para essa combinação. Experimente mudar o objetivo ou testar uma faixa de level próxima."
            title="Nenhuma cave indicada agora"
          />
        )}
      </Section>

      <Section
        description={
          selectedCave
            ? `Dicas rápidas para ${selectedCave.name}: dano, proteção e runas úteis.`
            : "Runas ajudam a bater em vários monstros ou finalizar alvos perigosos."
        }
        title="Runas e proteções da hunt selecionada"
      >
        {selectedCave ? (
          <article className="grid gap-3 rounded-lg border border-white/10 bg-obsidian/75 p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-ember">Dano da cave</p>
                <p className="mt-1 text-sm text-parchment/78">
                  {selectedCave.mainDamage?.join(", ") ?? "Variado"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ember">Proteção recomendada</p>
                <p className="mt-1 text-sm text-parchment/78">
                  {selectedCave.recommendedProtection?.join(", ") ?? "Leve suprimentos extras"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ember">Runas/Magias</p>
                <p className="mt-1 text-sm text-parchment/78">
                  {selectedCave.recommendedRunes?.join(", ") ?? "Conforme a vocação"}
                </p>
              </div>
            </div>
            {selectedCave.notes ? (
              <p className="text-sm leading-6 text-parchment/78">{selectedCave.notes}</p>
            ) : null}
          </article>
        ) : (
          <EmptyState
            description="Selecione uma cave para ver as proteções e runas mais úteis."
            title="Nenhuma hunt selecionada"
          />
        )}
      </Section>

      <Section
        description="Os vídeos são de criadores da comunidade e abrem diretamente no YouTube."
        title="Vídeos da hunt selecionada"
      >
        <VideoLinks cave={selectedCave} videos={relatedVideos} />
      </Section>

      <Section title="Dicas finais">
        <div className="grid gap-4 lg:grid-cols-2">
          {selectedVocation ? (
            <article className="rounded-lg border border-white/10 bg-obsidian/75 p-4">
              <h3 className="text-lg font-semibold text-white">{selectedVocation.name}</h3>
              <p className="mt-2 text-sm leading-6 text-parchment/80">
                {selectedVocation.description}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
                <div>
                  <p className="text-sm font-semibold text-ember">Estilo</p>
                  <p className="mt-1 text-sm text-parchment/75">{selectedVocation.playStyle}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ember">Pontos fortes</p>
                  <p className="mt-1 text-sm text-parchment/75">
                    {selectedVocation.strengths.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ember">Cuidados</p>
                  <p className="mt-1 text-sm text-parchment/75">
                    {selectedVocation.weaknesses.join(", ")}
                  </p>
                </div>
              </div>
            </article>
          ) : (
            <EmptyState
              description="Escolha uma vocação para ver dicas simples de como jogar com ela."
              title="Sem dicas por enquanto"
            />
          )}

          <WheelSuggestion wheel={recommendation.wheel} />
        </div>
      </Section>
    </div>
  );
}
