import type { VocationOption } from "@/types";

export const vocations: VocationOption[] = [
  {
    name: "Elite Knight",
    slug: "knight",
    image: "/images/vocations/knight.png",
    description:
      "O Knight é resistente, fica perto dos monstros e aguenta bastante dano. É uma boa escolha para aprender o básico com segurança.",
    beginnerDifficulty: "Fácil a média",
    playStyle: "Corpo a corpo",
    strengths: ["muita vida", "boa defesa", "bom para aprender"],
    weaknesses: ["depende de bons equipamentos", "começa mais lento"],
    recommendedFor: "Jogadores que gostam de ficar na linha de frente.",
  },
  {
    name: "Royal Paladin",
    slug: "paladin",
    image: "/images/vocations/paladin.png",
    description:
      "O Paladin ataca de longe, tem boa sobrevivência e costuma jogar bem sozinho quando começa a evoluir.",
    beginnerDifficulty: "Média",
    playStyle: "Ataque à distância",
    strengths: ["ataca de longe", "versátil", "bom solo"],
    weaknesses: ["controla munição", "pode gastar mais no começo"],
    recommendedFor: "Quem gosta de atacar de longe e ter boa flexibilidade.",
  },
  {
    name: "Master Sorcerer",
    slug: "sorcerer",
    image: "/images/vocations/sorcerer.png",
    description:
      "O Sorcerer causa muito dano mágico, mas tem pouca vida. É forte, divertido e exige atenção com posicionamento.",
    beginnerDifficulty: "Média a difícil",
    playStyle: "Dano mágico",
    strengths: ["muito dano", "ótimo dano em área", "upa rápido"],
    weaknesses: ["pouca vida", "erros custam caro"],
    recommendedFor: "Quem gosta de causar muito dano e aceita jogar com cuidado.",
  },
  {
    name: "Elder Druid",
    slug: "druid",
    image: "/images/vocations/druid.png",
    description:
      "O Druid cura, ajuda o time e também causa dano mágico. É excelente para quem gosta de apoiar o grupo.",
    beginnerDifficulty: "Média",
    playStyle: "Suporte e magia",
    strengths: ["cura forte", "útil em grupo", "bom dano mágico"],
    weaknesses: ["exige atenção com cura", "também é frágil"],
    recommendedFor: "Quem gosta de curar, ajudar o time e também causar dano.",
  },
  {
    name: "Monk",
    slug: "monk",
    image: "/images/vocations/monk.svg",
    description:
      "O Monk é uma vocação versátil, com foco em combate corpo a corpo, suporte e sobrevivência. É uma boa opção para quem gosta de jogar de forma equilibrada.",
    beginnerDifficulty: "Média",
    playStyle: "Corpo a corpo e suporte",
    strengths: ["boa sobrevivência", "versátil", "útil em grupo"],
    weaknesses: ["exige entender mecânicas", "depende de boa rotação"],
    recommendedFor: "Jogadores que gostam de lutar de perto, ajudar o grupo e ter flexibilidade.",
  },
];
