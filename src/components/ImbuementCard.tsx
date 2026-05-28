"use client";

import { useEffect, useMemo, useState } from "react";
import type { Cave, ElementalType, Imbuement } from "@/types";
import { Badge } from "./Badge";

function formatGold(value?: number) {
  if (!value) return null;
  return `${value.toLocaleString("pt-BR")} gold`;
}

function getSuggestedElementFromCave(cave?: Cave | null): ElementalType | null {
  const text = [
    ...(cave?.mainDamage ?? []),
    ...(cave?.recommendedProtection ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (text.includes("fire") || text.includes("fogo")) return "Fire";
  if (text.includes("ice") || text.includes("gelo")) return "Ice";
  if (text.includes("earth") || text.includes("terra") || text.includes("veneno")) return "Earth";
  if (text.includes("energy") || text.includes("energia")) return "Energy";
  if (text.includes("death") || text.includes("morte")) return "Death";
  if (text.includes("holy") || text.includes("sagrado")) return "Holy";

  return null;
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

export function ImbuementCard({
  imbuement,
  selectedCave,
}: {
  imbuement: Imbuement;
  selectedCave?: Cave | null;
}) {
  const suggestedElement = useMemo(
    () => getSuggestedElementFromCave(selectedCave),
    [selectedCave],
  );
  const firstElement = imbuement.elementalOptions?.[0]?.element ?? null;
  const [selectedElement, setSelectedElement] = useState<ElementalType | null>(
    suggestedElement ?? firstElement,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasSuggested = imbuement.elementalOptions?.some(
      (option) => option.element === suggestedElement,
    );
    setSelectedElement(hasSuggested ? suggestedElement : (imbuement.elementalOptions?.[0]?.element ?? null));
  }, [imbuement.id, imbuement.elementalOptions, suggestedElement]);

  const selectedOption =
    imbuement.elementalOptions?.find((option) => option.element === selectedElement) ?? null;
  const displayName = selectedOption?.displayName ?? imbuement.name;
  const effect = selectedOption?.effect ?? imbuement.effect;
  const materials = selectedOption?.materials ?? imbuement.materials;
  const materialsStatus = selectedOption?.materialsStatus ?? imbuement.materialsStatus ?? "validated";
  const beginnerTip = selectedOption?.beginnerTip ?? imbuement.beginnerTip;
  const sourceUrls = [...(imbuement.sourceUrls ?? []), ...(selectedOption?.sourceUrls ?? [])];
  const hasSuggestedElement = Boolean(selectedOption && selectedElement === suggestedElement);
  const hasValidatedMaterials = materials.length > 0 && materialsStatus !== "needs_validation";
  const shoppingText = [
    displayName,
    ...materials.map((material) => `${material.quantity}x ${material.itemName}`),
  ].join("\n");

  async function handleCopy() {
    if (!hasValidatedMaterials) return;
    await copyWithFallback(shoppingText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="grid gap-3 rounded-lg border border-white/10 bg-obsidian/75 p-4 transition hover:border-moss/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white">{imbuement.name}</h3>
          <p className="mt-1 text-sm font-medium text-ember">Efeito: {effect}</p>
        </div>
        <Badge tone="ember">{imbuement.tier}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone={imbuement.priority === "Alta" ? "moss" : "default"}>
          Prioridade {imbuement.priority}
        </Badge>
        {imbuement.bestFor.map((goal) => (
          <Badge key={goal} tone="blue">
            {goal}
          </Badge>
        ))}
      </div>

      <p className="text-sm leading-6 text-parchment/80">{imbuement.description}</p>
      <p className="text-xs leading-5 text-parchment/62">
        Alguns imbuements mudam conforme o tipo de proteção ou dano. Confira os materiais antes
        de comprar no market.
      </p>

      {imbuement.elementalOptions?.length ? (
        <label className="grid gap-1.5 text-sm font-semibold text-white">
          Escolha o elemento
          <select
            className="h-10 rounded-md border border-white/10 bg-iron px-3 text-sm font-medium text-parchment outline-none ring-ember/40 transition focus:ring-2"
            value={selectedElement ?? ""}
            onChange={(event) => setSelectedElement(event.target.value as ElementalType)}
          >
            {imbuement.elementalOptions.map((option) => (
              <option key={option.element} value={option.element}>
                {option.element}
              </option>
            ))}
          </select>
          {hasSuggestedElement ? (
            <span className="text-xs font-normal text-moss">
              Sugestão baseada na hunt selecionada.
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="grid gap-2 text-sm">
        <div>
          <p className="font-semibold text-white">Onde colocar</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {imbuement.recommendedSlots.map((slot) => (
              <Badge key={slot}>{slot}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Vocações recomendadas</p>
          <p className="mt-1 text-parchment/75">{imbuement.vocations.join(", ")}</p>
        </div>
      </div>

      <div className="rounded-md border border-white/10 bg-iron/60 p-3">
        <p className="text-sm font-semibold text-white">O que comprar</p>
        {hasValidatedMaterials ? (
          <ul className="mt-2 grid gap-1 text-sm text-parchment/85">
            {materials.map((material) => (
              <li key={material.itemName}>
                {material.quantity}x {material.itemName}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 rounded-md border border-amber-400/20 bg-amber-500/10 p-3">
            <p className="text-sm leading-6 text-parchment/82">
              Lista de materiais em validação.
              <br />
              Antes de comprar, confira no TibiaWiki ou em uma fonte atualizada.
            </p>
            {sourceUrls.length ? (
              <a
                className="mt-3 inline-flex rounded-md border border-ember/30 bg-ember/15 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-ember/25"
                href={sourceUrls[0]}
                rel="noreferrer"
                target="_blank"
              >
                Consultar TibiaWiki
              </a>
            ) : null}
          </div>
        )}
      </div>

      <div className="grid gap-1 text-xs text-parchment/70">
        {formatGold(imbuement.baseCostGold) ? (
          <p>Custo base: {formatGold(imbuement.baseCostGold)}</p>
        ) : null}
        {formatGold(imbuement.extraCostGoldForSuccess) ? (
          <p>Opcional para 100%: +{formatGold(imbuement.extraCostGoldForSuccess)}</p>
        ) : null}
      </div>

      {beginnerTip ? <p className="text-sm leading-6 text-parchment/72">{beginnerTip}</p> : null}

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          className="rounded-md border border-sky-400/30 bg-sky-500/15 px-3 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/25 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-parchment/45"
          disabled={!hasValidatedMaterials}
          onClick={handleCopy}
          type="button"
        >
          {!hasValidatedMaterials ? "Lista não cadastrada" : copied ? "Copiado!" : "Copiar lista"}
        </button>
        {imbuement.videoUrl ? (
          <a
            className="rounded-md border border-ember/30 bg-ember/15 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-ember/25"
            href={imbuement.videoUrl}
            rel="noreferrer"
            target="_blank"
          >
            Vídeo explicando
          </a>
        ) : (
          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-parchment/60">
            Sem vídeo cadastrado
          </span>
        )}
      </div>

      {sourceUrls.length ? (
        <div className="flex flex-wrap gap-2 text-xs text-parchment/55">
          <span>Fontes/consulta:</span>
          {sourceUrls.map((source) => (
            <a
              className="text-ember hover:text-orange-300"
              href={source}
              key={source}
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
