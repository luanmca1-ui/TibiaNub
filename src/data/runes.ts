import type { Rune } from "@/types";

export const runes: Rune[] = [
  { name: "Avalanche", element: "Ice", type: "área", vocations: ["Master Sorcerer", "Elder Druid", "Royal Paladin"], observation: "Boa contra grupos vulneráveis a gelo." },
  { name: "Great Fireball", element: "Fire", type: "área", vocations: ["Master Sorcerer", "Elder Druid", "Royal Paladin"], observation: "Útil contra criaturas fracas a fogo e para bestiário." },
  { name: "Thunderstorm", element: "Energy", type: "área", vocations: ["Master Sorcerer", "Elder Druid"], observation: "Boa quando a cave tem monstros fracos a energia." },
  { name: "Stone Shower", element: "Earth", type: "área", vocations: ["Master Sorcerer", "Elder Druid"], observation: "Alternativa de área para fraquezas a terra." },
  { name: "Sudden Death", element: "Death", type: "alvo único", vocations: ["Master Sorcerer", "Elder Druid"], observation: "Boa para alvo perigoso, boss ou criatura isolada." },
  { name: "Ultimate Healing Rune", element: "Healing", type: "alvo único", vocations: ["Elite Knight", "Royal Paladin", "Monk"], observation: "Segurança extra quando a hunt fica apertada." },
];
