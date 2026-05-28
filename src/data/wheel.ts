import type { Objective, WheelSuggestion } from "@/types";

const allObjectives: Objective[] = ["XP", "Loot", "Loot/XP"];

export const wheelSuggestions: WheelSuggestion[] = [
  {
    vocation: "Elite Knight",
    minLevel: 50,
    objectives: allObjectives,
    title: "Knight: sobreviver primeiro, bater depois",
    priorities: ["mais vida", "mais defesa", "roubo de vida", "dano em área", "proteção"],
    summary:
      "Para iniciantes, o Knight fica melhor quando aguenta bem a hunt. Priorize vida, defesa e recuperação antes de buscar só dano.",
  },
  {
    vocation: "Royal Paladin",
    minLevel: 50,
    objectives: allObjectives,
    title: "Paladin: atacar de longe com segurança",
    priorities: ["distância", "dano crítico", "recuperação", "resistência", "movimento"],
    summary:
      "Para Paladin, escolha bônus que ajudem a bater de longe, manter vida e mana estáveis e se mover com segurança.",
  },
  {
    vocation: "Master Sorcerer",
    minLevel: 50,
    objectives: allObjectives,
    title: "Sorcerer: dano mágico com cuidado",
    priorities: ["magic level", "dano em área", "menos tempo de espera", "mana", "sobrevivência"],
    summary:
      "Sorcerer causa muito dano, mas é frágil. Busque dano mágico sem esquecer opções que aumentem sua margem de erro.",
  },
  {
    vocation: "Elder Druid",
    minLevel: 50,
    objectives: allObjectives,
    title: "Druid: cura, apoio e dano seguro",
    priorities: ["cura", "apoio ao grupo", "magic level", "sobrevivência", "dano em área"],
    summary:
      "Druid funciona bem quando equilibra cura e dano. Para começar, escolha bônus que ajudem você e seu time a ficarem vivos.",
  },
  {
    vocation: "Monk",
    minLevel: 50,
    objectives: allObjectives,
    title: "Monk: equilíbrio entre luta e apoio",
    priorities: ["sobrevivência", "controle de combate", "dano consistente", "recursos", "apoio ao grupo"],
    summary:
      "Priorize sobrevivência, controle de combate, dano consistente e recursos que ajudem em hunts solo e em grupo.",
  },
];
