import type { Budget, DataStatus, Equipment, EquipmentSlot, VocationName } from "@/types";

const allVocations: VocationName[] = [
  "Elite Knight",
  "Royal Paladin",
  "Master Sorcerer",
  "Elder Druid",
  "Monk",
];
const fighters: VocationName[] = ["Elite Knight", "Royal Paladin"];
const mages: VocationName[] = ["Master Sorcerer", "Elder Druid"];
const monk: VocationName[] = ["Monk"];

const tibiaWiki = "https://www.tibiawiki.com.br/wiki/";
const tibiaPal = "https://tibiapal.com/equipment";
const tibiaMonk = "https://www.tibiamonk.com/en/equipment/monk";
const tibiaBuddyMonk = "https://www.tibiabuddy.com/blog/monk-imbuement-guide";

function item(
  id: string,
  name: string,
  slot: EquipmentSlot,
  vocations: VocationName[],
  levelMin: number,
  levelMax: number | undefined,
  budget: Budget,
  priority: number,
  attributes: string[],
  description: string,
  options: {
    dataStatus?: DataStatus;
    notes?: string;
    sourceUrls?: string[];
  } = {},
): Equipment {
  const wikiUrl = `${tibiaWiki}${name.replaceAll(" ", "_").replaceAll("'", "%27")}`;

  return {
    id,
    name,
    slot,
    vocations,
    levelMin,
    levelMax,
    budget,
    priority,
    attributes,
    description,
    wikiUrl,
    sourceUrls: options.sourceUrls ?? [wikiUrl],
    dataStatus: options.dataStatus ?? "needs_review",
    notes:
      options.notes ??
      "Faixa recomendada pelo guia, não necessariamente requisito oficial do item.",
  };
}

export const equipments: Equipment[] = [
  item("leather-helmet", "Leather Helmet", "Helmet", allVocations, 8, 29, "Barato", 5, ["inicial", "baixo custo"], "Capacete simples para os primeiros levels.", { dataStatus: "validated" }),
  item("leather-armor", "Leather Armor", "Armor", allVocations, 8, 29, "Barato", 5, ["inicial", "baixo custo"], "Armadura simples para começar sem gastar.", { dataStatus: "validated" }),
  item("plate-legs-low", "Plate Legs", "Legs", allVocations, 8, 49, "Barato", 6, ["barata", "defesa simples"], "Peça comum para os primeiros levels.", { dataStatus: "validated" }),
  item("leather-boots", "Leather Boots", "Boots", allVocations, 8, 49, "Barato", 5, ["inicial"], "Bota simples para preencher o slot.", { dataStatus: "validated" }),
  item("katana", "Katana", "Weapon", ["Elite Knight"], 8, 29, "Barato", 8, ["corpo a corpo"], "Arma inicial real para Knights.", { dataStatus: "validated" }),
  item("crossbow", "Crossbow", "Weapon", ["Royal Paladin"], 8, 49, "Barato", 8, ["distância"], "Arma inicial real para Paladins.", { dataStatus: "validated" }),
  item("wand-of-vortex", "Wand of Vortex", "Weapon", ["Master Sorcerer"], 8, 29, "Barato", 8, ["dano mágico"], "Varinha inicial para Sorcerers.", { dataStatus: "validated" }),
  item("snakebite-rod", "Snakebite Rod", "Weapon", ["Elder Druid"], 8, 29, "Barato", 8, ["dano mágico"], "Rod inicial para Druids.", { dataStatus: "validated" }),
  item("wooden-shield", "Wooden Shield", "Shield/Spellbook", allVocations, 8, 29, "Barato", 4, ["defesa inicial"], "Escudo simples para tomar menos dano.", { dataStatus: "validated" }),
  item("scarf", "Scarf", "Amulet", allVocations, 8, 49, "Barato", 4, ["inicial"], "Opção simples para preencher o slot.", { dataStatus: "validated" }),
  item("dwarven-ring-low", "Dwarven Ring", "Ring", allVocations, 8, 79, "Barato", 5, ["situacional"], "Anel barato e útil em algumas hunts.", { dataStatus: "validated" }),

  item("steel-helmet", "Steel Helmet", "Helmet", fighters, 30, 79, "Barato", 12, ["defesa simples"], "Capacete básico para personagens físicos.", { dataStatus: "validated" }),
  item("crown-helmet", "Crown Helmet", "Helmet", fighters, 50, 99, "Custo-benefício", 18, ["bom custo"], "Capacete clássico para level médio.", { dataStatus: "validated" }),
  item("hat-of-the-mad", "Hat of the Mad", "Helmet", mages, 30, 79, "Barato", 12, ["mage", "baixo custo"], "Opção simples para magos em level baixo."),
  item("mage-hat", "Mage Hat", "Helmet", mages, 50, 129, "Custo-benefício", 16, ["mage"], "Capacete temático para magos em evolução."),
  item("plate-armor", "Plate Armor", "Armor", fighters, 30, 49, "Barato", 12, ["barata"], "Armadura barata para Knights e Paladins.", { dataStatus: "validated" }),
  item("knight-armor", "Knight Armor", "Armor", fighters, 50, 99, "Custo-benefício", 18, ["defesa média"], "Armadura conhecida para personagens intermediários.", { dataStatus: "validated" }),
  item("paladin-armor", "Paladin Armor", "Armor", ["Royal Paladin"], 50, 129, "Custo-benefício", 20, ["paladin"], "Armadura clássica para Paladins.", { dataStatus: "validated" }),
  item("blue-robe", "Blue Robe", "Armor", mages, 30, 79, "Barato", 14, ["mage", "baixo custo"], "Robe real e simples para magos.", { dataStatus: "validated" }),
  item("focus-cape", "Focus Cape", "Armor", mages, 50, 129, "Custo-benefício", 18, ["mage", "bom custo"], "Capa útil para magos intermediários.", { dataStatus: "validated" }),
  item("knight-legs", "Knight Legs", "Legs", fighters, 50, 99, "Custo-benefício", 17, ["defesa média"], "Calça conhecida para personagens físicos.", { dataStatus: "validated" }),
  item("blue-legs", "Blue Legs", "Legs", mages, 50, 129, "Custo-benefício", 18, ["mage"], "Boa opção intermediária para magos.", { dataStatus: "validated" }),
  item("boots-of-haste", "Boots of Haste", "Boots", allVocations, 50, 199, "Melhor possível", 22, ["velocidade"], "Bota clássica para andar melhor pela hunt.", { dataStatus: "validated" }),
  item("steel-boots", "Steel Boots", "Boots", fighters, 50, 149, "Custo-benefício", 16, ["defesa"], "Botas resistentes para personagens físicos.", { dataStatus: "validated" }),
  item("fire-sword", "Fire Sword", "Weapon", ["Elite Knight"], 30, 79, "Barato", 15, ["barata"], "Arma acessível para Knights de level baixo.", { dataStatus: "validated" }),
  item("composite-hornbow", "Composite Hornbow", "Weapon", ["Royal Paladin"], 50, 129, "Custo-benefício", 20, ["distância"], "Arco real para Paladins intermediários.", { dataStatus: "validated" }),
  item("wand-of-inferno", "Wand of Inferno", "Weapon", ["Master Sorcerer"], 33, 79, "Custo-benefício", 18, ["fogo"], "Varinha clássica para Sorcerers.", { dataStatus: "validated" }),
  item("hailstorm-rod", "Hailstorm Rod", "Weapon", ["Elder Druid"], 33, 79, "Custo-benefício", 18, ["gelo"], "Rod clássica para Druids.", { dataStatus: "validated" }),
  item("demon-shield", "Demon Shield", "Shield/Spellbook", fighters, 50, 129, "Custo-benefício", 18, ["defesa alta"], "Escudo clássico para personagens intermediários.", { dataStatus: "validated" }),
  item("spellbook-of-warding", "Spellbook of Warding", "Shield/Spellbook", mages, 50, 199, "Custo-benefício", 16, ["proteção"], "Spellbook simples para magos.", { dataStatus: "validated" }),
  item("platinum-amulet", "Platinum Amulet", "Amulet", allVocations, 30, 99, "Barato", 10, ["baixo custo"], "Amuleto barato para completar o setup.", { dataStatus: "validated" }),
  item("garlic-necklace", "Garlic Necklace", "Amulet", allVocations, 50, 129, "Custo-benefício", 14, ["situacional"], "Amuleto útil em hunts específicas.", { dataStatus: "validated" }),
  item("ring-of-healing", "Ring of Healing", "Ring", allVocations, 30, 129, "Barato", 12, ["recuperação"], "Ajuda a recuperar vida e mana enquanto aprende.", { dataStatus: "validated" }),
  item("energy-ring", "Energy Ring", "Ring", allVocations, 50, 199, "Custo-benefício", 16, ["emergência"], "Anel situacional para momentos perigosos.", { dataStatus: "validated" }),

  item("demon-helmet", "Demon Helmet", "Helmet", fighters, 80, 179, "Custo-benefício", 24, ["clássico"], "Capacete conhecido para personagens intermediários.", { dataStatus: "needs_review" }),
  item("zaoan-helmet", "Zaoan Helmet", "Helmet", fighters, 80, 199, "Barato", 23, ["bom custo"], "Capacete muito usado em sets intermediários.", { dataStatus: "validated" }),
  item("yalahari-mask", "Yalahari Mask", "Helmet", mages, 80, 199, "Custo-benefício", 23, ["magic level"], "Capacete conhecido para magos.", { dataStatus: "validated" }),
  item("prismatic-helmet", "Prismatic Helmet", "Helmet", fighters, 130, 249, "Melhor possível", 30, ["proteção"], "Capacete forte para personagens físicos.", { dataStatus: "needs_review" }),
  item("prismatic-armor", "Prismatic Armor", "Armor", fighters, 120, 249, "Custo-benefício", 28, ["proteção física"], "Armadura muito usada por EK/RP intermediários.", { dataStatus: "validated" }),
  item("royal-scale-robe", "Royal Scale Robe", "Armor", ["Master Sorcerer"], 100, 199, "Custo-benefício", 25, ["sorcerer"], "Robe real para Sorcerers intermediários.", { dataStatus: "needs_review" }),
  item("dwarven-armor", "Dwarven Armor", "Armor", ["Elder Druid"], 100, 199, "Custo-benefício", 24, ["defensiva"], "Opção defensiva real para Druids.", { dataStatus: "needs_review" }),
  item("yalahari-leg-piece", "Yalahari Leg Piece", "Legs", fighters, 80, 129, "Barato", 20, ["bom custo"], "Peça acessível para evoluir sem gastar demais.", { dataStatus: "validated" }),
  item("dwarven-legs", "Dwarven Legs", "Legs", allVocations, 130, 249, "Custo-benefício", 26, ["resistência"], "Boa peça real para reduzir dano em hunts variadas.", { dataStatus: "validated" }),
  item("prismatic-legs", "Prismatic Legs", "Legs", ["Royal Paladin"], 150, 299, "Melhor possível", 30, ["paladin"], "Peça forte para Paladins intermediários.", { dataStatus: "needs_review" }),
  item("guardian-boots", "Guardian Boots", "Boots", fighters, 80, 199, "Custo-benefício", 22, ["proteção física"], "Botas seguras para Knights e Paladins.", { dataStatus: "validated" }),
  item("pair-of-soft-boots", "Pair of Soft Boots", "Boots", allVocations, 80, 249, "Melhor possível", 25, ["recuperação"], "Bota clássica para conforto e recuperação.", { dataStatus: "validated" }),
  item("oriental-shoes", "Oriental Shoes", "Boots", mages, 80, 199, "Barato", 18, ["movimento"], "Ajuda magos a se reposicionarem melhor.", { dataStatus: "validated" }),
  item("emerald-sword", "Emerald Sword", "Weapon", ["Elite Knight"], 80, 129, "Custo-benefício", 22, ["bom dano"], "Arma real para Knights intermediários.", { dataStatus: "validated" }),
  item("rift-bow", "Rift Bow", "Weapon", ["Royal Paladin"], 120, 199, "Barato", 22, ["distância"], "Arco real para Paladins intermediários.", { dataStatus: "needs_review" }),
  item("rift-crossbow", "Rift Crossbow", "Weapon", ["Royal Paladin"], 120, 199, "Custo-benefício", 23, ["distância"], "Crossbow real para Paladins intermediários.", { dataStatus: "needs_review" }),
  item("wand-of-defiance", "Wand of Defiance", "Weapon", ["Master Sorcerer"], 80, 199, "Custo-benefício", 23, ["dano mágico"], "Varinha consistente para Sorcerers.", { dataStatus: "validated" }),
  item("underworld-rod", "Underworld Rod", "Weapon", ["Elder Druid"], 80, 199, "Custo-benefício", 23, ["dano mágico"], "Rod consistente para Druids.", { dataStatus: "validated" }),
  item("foxtail-amulet", "Foxtail Amulet", "Amulet", fighters, 100, 249, "Custo-benefício", 24, ["proteção física"], "Amuleto ótimo para diminuir dano recebido.", { dataStatus: "validated" }),
  item("kosheis-ancient-amulet", "Koshei's Ancient Amulet", "Amulet", mages, 100, 249, "Custo-benefício", 21, ["situacional"], "Amuleto útil em hunts com dano perigoso.", { dataStatus: "validated" }),
  item("plasma-ring", "Plasma Ring", "Ring", allVocations, 100, 249, "Custo-benefício", 22, ["dano"], "Anel temporário para melhorar a hunt.", { dataStatus: "validated" }),
  item("might-ring", "Might Ring", "Ring", allVocations, 130, 299, "Melhor possível", 24, ["sobrevivência"], "Anel de emergência para hunts perigosas.", { dataStatus: "validated" }),

  item("terra-helmet", "Terra Helmet", "Helmet", ["Elite Knight"], 200, 349, "Custo-benefício", 34, ["knight"], "Capacete forte para Knights de level 200+.", { dataStatus: "validated" }),
  item("falcon-coif", "Falcon Coif", "Helmet", ["Royal Paladin"], 300, 599, "Melhor possível", 44, ["paladin"], "Capacete avançado para Paladins.", { dataStatus: "needs_review", sourceUrls: [`${tibiaWiki}Falcon_Coif`, tibiaPal] }),
  item("galea-mortis", "Galea Mortis", "Helmet", mages, 200, 349, "Melhor possível", 35, ["magic level"], "Capacete forte para magos avançados.", { dataStatus: "validated" }),
  item("gnome-helmet", "Gnome Helmet", "Helmet", mages, 300, 599, "Melhor possível", 43, ["mage"], "Capacete avançado para magos.", { dataStatus: "needs_review" }),
  item("ornate-chestplate", "Ornate Chestplate", "Armor", ["Elite Knight"], 200, 399, "Custo-benefício", 36, ["imbuements"], "Armadura ótima para Knights que já usam imbuements.", { dataStatus: "validated" }),
  item("depth-lorica", "Depth Lorica", "Armor", ["Royal Paladin"], 200, 349, "Custo-benefício", 34, ["paladin"], "Armadura segura para Paladins 200+.", { dataStatus: "validated" }),
  item("bear-skin", "Bear Skin", "Armor", mages, 200, 349, "Custo-benefício", 32, ["proteção"], "Armadura boa para magos em hunts com mais risco.", { dataStatus: "validated" }),
  item("falcon-plate", "Falcon Plate", "Armor", ["Elite Knight"], 300, 599, "Melhor possível", 45, ["alto investimento"], "Armadura avançada para Knights.", { dataStatus: "validated", sourceUrls: [`${tibiaWiki}Falcon_Plate`, tibiaPal] }),
  item("gnome-armor", "Gnome Armor", "Armor", ["Royal Paladin"], 300, 599, "Melhor possível", 42, ["paladin"], "Armadura avançada para Paladins.", { dataStatus: "needs_review" }),
  item("soulmantle", "Soulmantle", "Armor", mages, 400, undefined, "Melhor possível", 48, ["mage", "alto investimento"], "Armadura avançada para magos.", { dataStatus: "needs_review" }),
  item("ornate-legs", "Ornate Legs", "Legs", ["Elite Knight"], 185, 349, "Custo-benefício", 34, ["defesa alta"], "Calça forte para Knights.", { dataStatus: "validated" }),
  item("fabulous-legs", "Fabulous Legs", "Legs", ["Royal Paladin"], 200, 399, "Custo-benefício", 32, ["paladin"], "Calça boa para Paladins avançando.", { dataStatus: "validated" }),
  item("grasshopper-legs", "Grasshopper Legs", "Legs", mages, 200, 349, "Custo-benefício", 30, ["mage"], "Opção real para magos intermediários.", { dataStatus: "needs_review" }),
  item("falcon-greaves", "Falcon Greaves", "Legs", fighters, 300, undefined, "Melhor possível", 45, ["alto investimento"], "Peça avançada para EK/RP.", { dataStatus: "validated", sourceUrls: [`${tibiaWiki}Falcon_Greaves`, tibiaPal] }),
  item("soulshanks", "Soulshanks", "Legs", mages, 400, undefined, "Melhor possível", 47, ["mage"], "Peça avançada para magos.", { dataStatus: "needs_review" }),
  item("depth-calcei", "Depth Calcei", "Boots", fighters, 150, 349, "Custo-benefício", 30, ["proteção"], "Botas boas para hunts mais exigentes.", { dataStatus: "validated" }),
  item("nightmare-boots", "Nightmare Boots", "Boots", mages, 200, 349, "Custo-benefício", 28, ["proteção"], "Botas úteis para magos em hunts perigosas.", { dataStatus: "validated" }),
  item("winged-boots", "Winged Boots", "Boots", ["Royal Paladin"], 300, undefined, "Melhor possível", 43, ["paladin"], "Bota avançada para Paladins.", { dataStatus: "needs_review" }),
  item("cobra-boots", "Cobra Boots", "Boots", fighters, 300, undefined, "Melhor possível", 41, ["alto investimento"], "Bota avançada real para personagens físicos.", { dataStatus: "needs_review", sourceUrls: [`${tibiaWiki}Cobra_Boots`, tibiaPal] }),
  item("pair-of-soulwalkers", "Pair of Soulwalkers", "Boots", mages, 300, undefined, "Melhor possível", 43, ["mage"], "Bota avançada para magos.", { dataStatus: "needs_review" }),
  item("slayer-of-destruction", "Slayer of Destruction", "Weapon", ["Elite Knight"], 200, 399, "Barato", 30, ["duas mãos"], "Arma de destruição real para Knights.", { dataStatus: "needs_review" }),
  item("blade-of-destruction", "Blade of Destruction", "Weapon", ["Elite Knight"], 200, 399, "Custo-benefício", 34, ["imbuements"], "Arma forte para Knights 200+.", { dataStatus: "validated" }),
  item("bow-of-destruction", "Bow of Destruction", "Weapon", ["Royal Paladin"], 200, 399, "Custo-benefício", 34, ["imbuements"], "Arco forte para Paladins 200+.", { dataStatus: "validated" }),
  item("crossbow-of-destruction", "Crossbow of Destruction", "Weapon", ["Royal Paladin"], 200, 399, "Barato", 31, ["imbuements"], "Crossbow real de destruição.", { dataStatus: "needs_review" }),
  item("wand-of-destruction", "Wand of Destruction", "Weapon", ["Master Sorcerer"], 200, 399, "Custo-benefício", 34, ["imbuements"], "Varinha forte para Sorcerers 200+.", { dataStatus: "validated" }),
  item("rod-of-destruction", "Rod of Destruction", "Weapon", ["Elder Druid"], 200, 399, "Custo-benefício", 34, ["imbuements"], "Rod forte para Druids 200+.", { dataStatus: "validated" }),
  item("soulshredder", "Soulshredder", "Weapon", ["Elite Knight"], 400, undefined, "Melhor possível", 50, ["alto investimento"], "Arma avançada para Knights.", { dataStatus: "needs_review" }),
  item("soulbleeder", "Soulbleeder", "Weapon", ["Royal Paladin"], 400, undefined, "Melhor possível", 50, ["alto investimento"], "Arco avançado para Paladins.", { dataStatus: "validated", sourceUrls: [`${tibiaWiki}Soulbleeder`, tibiaPal] }),
  item("soulhexer", "Soulhexer", "Weapon", ["Master Sorcerer"], 400, undefined, "Melhor possível", 50, ["alto investimento"], "Varinha avançada para Sorcerers.", { dataStatus: "needs_review" }),
  item("soulshaper", "Soulshaper", "Weapon", ["Elder Druid"], 400, undefined, "Melhor possível", 50, ["alto investimento"], "Rod avançada para Druids.", { dataStatus: "needs_review" }),
  item("ornate-shield", "Ornate Shield", "Shield/Spellbook", ["Elite Knight"], 200, 399, "Custo-benefício", 34, ["defesa alta"], "Escudo forte para Knights.", { dataStatus: "validated" }),
  item("gnome-shield", "Gnome Shield", "Shield/Spellbook", ["Elite Knight"], 300, undefined, "Melhor possível", 42, ["defesa"], "Escudo avançado real.", { dataStatus: "needs_review" }),
  item("lion-spellbook", "Lion Spellbook", "Shield/Spellbook", mages, 300, undefined, "Melhor possível", 42, ["magic level"], "Livro avançado para magos.", { dataStatus: "needs_review" }),
  item("umbral-master-spellbook", "Umbral Master Spellbook", "Shield/Spellbook", mages, 200, 399, "Custo-benefício", 32, ["magic level"], "Spellbook intermediário para magos.", { dataStatus: "validated" }),
  item("collar-of-blue-plasma", "Collar of Blue Plasma", "Amulet", fighters, 200, 399, "Custo-benefício", 30, ["dano"], "Amuleto temporário para melhorar a hunt.", { dataStatus: "validated" }),
  item("theurgic-amulet", "Theurgic Amulet", "Amulet", mages, 200, 399, "Custo-benefício", 30, ["magic level"], "Amuleto bom para aumentar magia.", { dataStatus: "validated" }),
  item("soulbastion-amulet", "Soulbastion Amulet", "Amulet", allVocations, 400, undefined, "Melhor possível", 43, ["alto investimento"], "Amuleto avançado para hunts difíceis.", { dataStatus: "needs_review" }),
  item("ring-of-blue-plasma", "Ring of Blue Plasma", "Ring", fighters, 200, 399, "Custo-benefício", 30, ["dano"], "Anel temporário para melhorar dano.", { dataStatus: "validated" }),
  item("ring-of-green-plasma", "Ring of Green Plasma", "Ring", mages, 200, 399, "Custo-benefício", 30, ["magic level"], "Anel temporário para melhorar magia.", { dataStatus: "validated" }),
  item("spiritthorn-ring", "Spiritthorn Ring", "Ring", ["Elite Knight"], 600, undefined, "Melhor possível", 52, ["endgame"], "Anel avançado para Knights de level alto.", { dataStatus: "needs_review", sourceUrls: [`${tibiaWiki}Spiritthorn_Ring`, tibiaPal] }),
  item("soulcore-ring", "Soulcore Ring", "Ring", mages, 400, undefined, "Melhor possível", 43, ["alto investimento"], "Anel avançado para magos.", { dataStatus: "needs_review" }),

  item("spiritthorn-helmet", "Spiritthorn Helmet", "Helmet", ["Elite Knight"], 600, undefined, "Melhor possível", 54, ["endgame"], "Capacete avançado para Knights.", { dataStatus: "needs_review", sourceUrls: [`${tibiaWiki}Spiritthorn_Helmet`, tibiaPal] }),
  item("spiritthorn-armor", "Spiritthorn Armor", "Armor", ["Elite Knight"], 600, undefined, "Melhor possível", 54, ["endgame"], "Armadura avançada para Knights.", { dataStatus: "needs_review", sourceUrls: [`${tibiaWiki}Spiritthorn_Armor`, tibiaPal] }),

  item("ethereal-coned-hat", "Ethereal Coned Hat", "Helmet", monk, 300, undefined, "Custo-benefício", 34, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("soulgarb", "Soulgarb", "Armor", monk, 300, undefined, "Custo-benefício", 34, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("sanguine-trousers", "Sanguine Trousers", "Legs", monk, 300, undefined, "Melhor possível", 40, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("soulsoles", "Soulsoles", "Boots", monk, 300, undefined, "Melhor possível", 38, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("sanguine-claws", "Sanguine Claws", "Weapon", monk, 300, undefined, "Melhor possível", 42, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("soulkamas", "Soulkamas", "Weapon", monk, 300, undefined, "Custo-benefício", 38, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("enchanted-merudri-brooch", "Enchanted Merudri Brooch", "Amulet", monk, 300, undefined, "Custo-benefício", 34, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
  item("charged-ethereal-ring", "Charged Ethereal Ring", "Ring", monk, 300, undefined, "Custo-benefício", 34, ["monk"], "Item citado em referências de Monk. Revisar antes de produção.", { dataStatus: "needs_review", sourceUrls: [tibiaMonk, tibiaBuddyMonk] }),
];
