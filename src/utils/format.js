import { POKEMON_TYPES, STAT_LABELS } from "./constants";

export function formatName(name) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function formatHeight(decimeters) {
  return `${(decimeters / 10).toLocaleString("pt-BR")} m`;
}

export function formatWeight(hectograms) {
  return `${(hectograms / 10).toLocaleString("pt-BR")} kg`;
}

export function getTypeLabel(type) {
  return POKEMON_TYPES.find((item) => item.id === type)?.label || formatName(type);
}

const LIGHT_TEXT_TYPES = new Set([
  "fighting",
  "poison",
  "ghost",
  "dragon",
  "dark",
  "water",
]);

export function getTypeColor(type) {
  return POKEMON_TYPES.find((item) => item.id === type)?.color || "#5c6b82";
}

export function getTypeTextColor(type) {
  return LIGHT_TEXT_TYPES.has(type) ? "#ffffff" : "#172033";
}

export function getStatLabel(stat) {
  return STAT_LABELS[stat] || formatName(stat);
}

export function toTeamMember(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
  };
}
