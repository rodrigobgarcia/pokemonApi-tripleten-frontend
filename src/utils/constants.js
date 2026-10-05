export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
export const PAGE_SIZE = 12;
export const TEAM_SIZE = 6;
export const STORAGE_KEY = "poketimes-teams";


export const AUTHOR = {
  name: "Rodrigo",
  role: "Desenvolvedor web em formação",
  bio: [
    "Sou estudante de desenvolvimento web full-stack. Gosto de transformar dados de APIs em interfaces simples de usar.",
    "O PokéTimes é o projeto final do meu bootcamp. Nele pratiquei React, rotas, consumo de API e estados de carregamento e erro. A próxima fase traz um back-end próprio com login.",
  ],
  skills: ["React", "React Router", "JavaScript", "HTML e CSS", "Node.js", "Express", "MongoDB"],
  github: "https://github.com/rodrigobgarcia",
};

export const NAV_LINKS = [
  { to: "/", label: "Início", end: true },
  { to: "/pokedex", label: "Pokédex", end: false },
  { to: "/times", label: "Times", end: false },
  { to: "/sobre", label: "Sobre", end: false },
];

export const POKEMON_TYPES = [
  { id: "normal", label: "Normal", color: "#a8a77a" },
  { id: "fire", label: "Fogo", color: "#ee8130" },
  { id: "water", label: "Água", color: "#6390f0" },
  { id: "grass", label: "Planta", color: "#7ac74c" },
  { id: "electric", label: "Elétrico", color: "#f7d02c" },
  { id: "ice", label: "Gelo", color: "#96d9d6" },
  { id: "fighting", label: "Lutador", color: "#c22e28" },
  { id: "poison", label: "Venenoso", color: "#a33ea1" },
  { id: "ground", label: "Terra", color: "#e2bf65" },
  { id: "flying", label: "Voador", color: "#a98ff3" },
  { id: "psychic", label: "Psíquico", color: "#f95587" },
  { id: "bug", label: "Inseto", color: "#a6b91a" },
  { id: "rock", label: "Pedra", color: "#b6a136" },
  { id: "ghost", label: "Fantasma", color: "#735797" },
  { id: "dragon", label: "Dragão", color: "#6f35fc" },
  { id: "dark", label: "Sombrio", color: "#705746" },
  { id: "steel", label: "Aço", color: "#b7b7ce" },
  { id: "fairy", label: "Fada", color: "#d685ad" },
];

export const STAT_LABELS = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque especial",
  "special-defense": "Defesa especial",
  speed: "Velocidade",
};
