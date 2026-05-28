import { caves } from "@/data/caves";
import { equipments } from "@/data/equipments";
import { imbuements } from "@/data/imbuements";
import { runes } from "@/data/runes";
import { videos } from "@/data/videos";
import { wheelSuggestions } from "@/data/wheel";
import type {
  Budget,
  Cave,
  Difficulty,
  Equipment,
  EquipmentSlot,
  Filters,
  HuntGoal,
  Recommendation,
} from "@/types";

const REQUIRED_SLOTS: EquipmentSlot[] = [
  "Helmet",
  "Armor",
  "Legs",
  "Boots",
  "Weapon",
  "Shield/Spellbook",
  "Amulet",
  "Ring",
];

const budgetRank: Record<Budget, number> = {
  Barato: 1,
  "Custo-benefício": 2,
  "Melhor possível": 3,
};

const difficultyRank: Record<Difficulty, number> = {
  Fácil: 3,
  Média: 2,
  Difícil: 1,
};

function isCompatibleWithLevel(item: Equipment, level: number) {
  return level >= item.levelMin && (!item.levelMax || level <= item.levelMax);
}

function getItemScore(item: Equipment) {
  const statusBonus = item.dataStatus === "validated" ? 10000 : 0;
  return statusBonus + item.levelMin * 100 + (item.priority ?? 0);
}

function pickBestItem(items: Equipment[]) {
  return [...items].sort((a, b) => getItemScore(b) - getItemScore(a))[0];
}

function addScore(item: Equipment, filters: Filters, budgetFallback = false): Equipment {
  const budgetBonus =
    item.budget === filters.budget
      ? 18
      : 8 - Math.abs(budgetRank[item.budget] - budgetRank[filters.budget]) * 2;

  return {
    ...item,
    budgetFallback,
    score: Math.round(40 + item.levelMin / 5 + (item.priority ?? 0) + budgetBonus),
  };
}

export function getRecommendedEquipment(filters: Filters) {
  const level = Number(filters.level);
  const compatibleByLevelAndVocation = equipments.filter((item) => {
    const matchesVocation = item.vocations.includes(filters.vocation);
    const matchesLevel = isCompatibleWithLevel(item, level);
    return matchesVocation && matchesLevel;
  });

  const result: Equipment[] = [];

  for (const slot of REQUIRED_SLOTS) {
    const slotItems = compatibleByLevelAndVocation.filter((item) => item.slot === slot);
    const selectedBudgetItems = slotItems.filter((item) => item.budget === filters.budget);
    const orderedFallbackBudgets = [
      filters.budget,
      "Custo-benefício",
      "Barato",
      "Melhor possível",
    ].filter((budget, index, list) => list.indexOf(budget) === index) as Budget[];

    const selectedForBudget = pickBestItem(selectedBudgetItems);
    const fallbackSelected =
      orderedFallbackBudgets
        .filter((budget) => budget !== filters.budget)
        .map((budget) => pickBestItem(slotItems.filter((item) => item.budget === budget)))
        .find(Boolean) || pickBestItem(slotItems);
    const selected = selectedForBudget || fallbackSelected;

    if (selected) {
      result.push(addScore(selected, filters, selected.budget !== filters.budget));
    }
  }

  return result;
}

export function getRecommendedImbuements(filters: Filters) {
  const budgetLimit: Record<Budget, number> = {
    Barato: 3,
    "Custo-benefício": 4,
    "Melhor possível": 6,
  };

  const priorityScore: Record<"Alta" | "Média" | "Baixa", number> = {
    Alta: 30,
    Média: 18,
    Baixa: 8,
  };

  const vocationEssentials: Record<string, string[]> = {
    "Elite Knight": ["Life Leech", "Mana Leech", "Critical", "Elemental Protection"],
    "Royal Paladin": ["Critical", "Mana Leech", "Life Leech", "Distance Skill"],
    "Master Sorcerer": ["Mana Leech", "Magic Level", "Elemental Protection", "Critical"],
    "Elder Druid": ["Mana Leech", "Magic Level", "Elemental Protection"],
    Monk: ["Life Leech", "Mana Leech", "Critical", "Elemental Protection"],
  };

  return imbuements
    .filter((imbuement) => imbuement.vocations.includes(filters.vocation))
    .map((imbuement) => {
      const goalBonus = imbuement.bestFor.includes(filters.objective) ? 20 : 0;
      const levelBonus = Number(filters.level) >= 80 ? 8 : 0;
      const essentialBonus = vocationEssentials[filters.vocation]?.includes(imbuement.effect)
        ? 18
        : 0;
      const budgetPenalty =
        filters.budget === "Barato" && imbuement.priority !== "Alta" ? 18 : 0;

      return {
        ...imbuement,
        score:
          priorityScore[imbuement.priority] +
          goalBonus +
          levelBonus +
          essentialBonus -
          budgetPenalty,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, budgetLimit[filters.budget]);
}

export function getVideosForCave(caveId: string | null, filters: Filters) {
  if (!caveId) return [];

  return videos.filter((video) => {
    const matchesCave = video.caveId === caveId;
    const matchesVocation =
      !video.vocation || video.vocation === "Todas" || video.vocation === filters.vocation;
    const matchesLevel = !video.levelMin || Number(filters.level) >= video.levelMin;

    return matchesCave && matchesVocation && matchesLevel;
  });
}

function getCaveGoalScore(cave: Cave, goal: HuntGoal) {
  if (goal === "XP") return cave.xpRating ?? 0;
  if (goal === "Loot") return cave.lootRating ?? 0;
  return cave.balanceRating ?? 0;
}

function getLevelFitScore(cave: Cave, level: number) {
  if (level < cave.levelMin) return -9999;

  const idealMin = cave.levelIdealMin ?? cave.levelMin;
  const idealMax = cave.levelIdealMax ?? idealMin + 100;

  if (level >= idealMin && level <= idealMax) return 50;

  if (level > idealMax) {
    const diff = level - idealMax;
    return Math.max(0, 40 - Math.floor(diff / 20));
  }

  const diff = idealMin - level;
  return Math.max(0, 30 - Math.floor(diff / 10));
}

function scoreCave(cave: Cave, filters: Filters) {
  const level = Number(filters.level);
  const vocationMatch = cave.vocations.includes(filters.vocation) ? 30 : 0;
  const goalMatch = cave.goals.includes(filters.objective) ? 30 : 0;
  const goalScore = getCaveGoalScore(cave, filters.objective) * 10;
  const levelFit = getLevelFitScore(cave, level);
  const difficultyBonus = difficultyRank[cave.difficulty] * 3;
  const tooLowPenalty =
    cave.levelIdealMax && level > cave.levelIdealMax
      ? Math.floor((level - cave.levelIdealMax) / 15)
      : 0;

  return Math.round(
    vocationMatch +
      goalMatch +
      goalScore +
      levelFit +
      difficultyBonus +
      (cave.priority ?? 0) -
      tooLowPenalty,
  );
}

export function getRecommendedCaves(filters: Filters) {
  return caves
    .filter(
      (cave) =>
        cave.vocations.includes(filters.vocation) &&
        Number(filters.level) >= cave.levelMin &&
        cave.goals.includes(filters.objective),
    )
    .map((cave) => ({ ...cave, score: scoreCave(cave, filters) }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export function getRecommendations(filters: Filters): Recommendation {
  const matchedCaves = getRecommendedCaves(filters);
  const runeNames = new Set(matchedCaves.flatMap((cave) => cave.recommendedRunes ?? []));

  return {
    equipments: getRecommendedEquipment(filters),
    imbuements: getRecommendedImbuements(filters),
    caves: matchedCaves,
    runes: runes.filter(
      (rune) => runeNames.has(rune.name) || rune.vocations.includes(filters.vocation),
    ),
    videos: [],
    wheel: wheelSuggestions.find(
      (wheel) =>
        wheel.vocation === filters.vocation &&
        wheel.minLevel <= filters.level &&
        (!wheel.maxLevel || wheel.maxLevel >= filters.level) &&
        wheel.objectives.includes(filters.objective),
    ),
  };
}
