export type VocationName =
  | "Elite Knight"
  | "Royal Paladin"
  | "Master Sorcerer"
  | "Elder Druid"
  | "Monk";

export type Vocation = VocationName;

export type HuntGoal = "XP" | "Loot" | "Loot/XP";
export type Objective = HuntGoal;

export type Budget = "Barato" | "Custo-benefício" | "Melhor possível";

export type EquipmentSlot =
  | "Helmet"
  | "Armor"
  | "Legs"
  | "Boots"
  | "Weapon"
  | "Shield/Spellbook"
  | "Amulet"
  | "Ring";

export type Difficulty = "Fácil" | "Média" | "Difícil";

export type RuneKind = "área" | "alvo único";

export type VideoKind =
  | "Caminho"
  | "Hunt explicada"
  | "XP"
  | "Loot"
  | "Boss"
  | "Bestiary";

export type ImbuementTier = "Basic" | "Intricate" | "Powerful";

export type ElementalType = "Fire" | "Ice" | "Earth" | "Energy" | "Death" | "Holy";

export type MaterialsStatus = "validated" | "needs_validation";

export type DataStatus = "validated" | "needs_review";

export type ImbuementMaterial = {
  itemName: string;
  quantity: number;
  wikiUrl?: string;
};

export type ElementalImbuementOption = {
  element: ElementalType;
  displayName: string;
  effect: string;
  materials: ImbuementMaterial[];
  materialsStatus?: MaterialsStatus;
  beginnerTip?: string;
  sourceUrls?: string[];
};

export interface Filters {
  vocation: Vocation;
  level: number;
  objective: Objective;
  budget: Budget;
}

export interface VocationOption {
  name: Vocation;
  slug: string;
  image: string;
  description: string;
  beginnerDifficulty: string;
  playStyle: string;
  strengths: string[];
  weaknesses: string[];
  recommendedFor: string;
}

export type Equipment = {
  id: string;
  name: string;
  slot: EquipmentSlot;
  vocations: VocationName[];
  levelMin: number;
  levelMax?: number;
  budget: Budget;
  priority?: number;
  imageUrl?: string;
  wikiUrl?: string;
  sourceUrls?: string[];
  dataStatus?: DataStatus;
  notes?: string;
  budgetFallback?: boolean;
  attributes?: string[];
  description?: string;
  score?: number;
};

export type ImbuementRecommendation = {
  id: string;
  name: string;
  tier: ImbuementTier;
  effect: string;
  description: string;
  vocations: VocationName[];
  recommendedSlots: EquipmentSlot[];
  priority: "Alta" | "Média" | "Baixa";
  bestFor: HuntGoal[];
  materials: ImbuementMaterial[];
  materialsStatus?: MaterialsStatus;
  baseCostGold?: number;
  extraCostGoldForSuccess?: number;
  beginnerTip?: string;
  videoUrl?: string;
  sourceUrls?: string[];
  elementalOptions?: ElementalImbuementOption[];
  score?: number;
};

export type Imbuement = ImbuementRecommendation;

export type Cave = {
  id: string;
  name: string;
  levelMin: number;
  levelIdealMin?: number;
  levelIdealMax?: number;
  vocations: VocationName[];
  goals: HuntGoal[];
  difficulty: Difficulty;
  mainMonsters: string[];
  mainDamage?: string[];
  recommendedProtection?: string[];
  recommendedRunes?: string[];
  xpRating?: 1 | 2 | 3 | 4 | 5;
  lootRating?: 1 | 2 | 3 | 4 | 5;
  balanceRating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  wikiUrl?: string;
  sourceUrls?: string[];
  mode?: "Solo" | "Grupo" | "Boss" | "Bestiário";
  priority?: number;
  score?: number;
};

export interface Rune {
  name: string;
  element: string;
  type: RuneKind;
  vocations: Vocation[];
  observation: string;
}

export interface VideoLink {
  id: string;
  caveId: string;
  title: string;
  channel: string;
  url: string;
  vocation?: Vocation | "Todas";
  levelMin?: number;
  type: VideoKind;
  description?: string;
}

export interface WheelSuggestion {
  vocation: Vocation;
  minLevel: number;
  maxLevel?: number;
  objectives: Objective[];
  title: string;
  priorities: string[];
  summary: string;
}

export interface Recommendation {
  equipments: Equipment[];
  imbuements: Imbuement[];
  caves: Cave[];
  runes: Rune[];
  videos: VideoLink[];
  wheel?: WheelSuggestion;
}
