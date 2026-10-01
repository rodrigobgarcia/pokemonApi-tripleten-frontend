import { PAGE_SIZE, POKEAPI_BASE_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  const error = new Error(`Error: ${res.status}`);
  error.status = res.status;
  return Promise.reject(error);
}

let namesPromise = null;

function getAllNames() {
  if (!namesPromise) {
    namesPromise = fetch(`${POKEAPI_BASE_URL}/pokemon?limit=10000`)
      .then(checkResponse)
      .then((data) => data.results.map((item) => item.name))
      .catch((err) => {
        namesPromise = null;
        return Promise.reject(err);
      });
  }

  return namesPromise;
}

function mapPokemonCard(pokemon) {
  const artwork = pokemon.sprites.other?.["official-artwork"]?.front_default;

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: artwork || pokemon.sprites.front_default || "",
    types: pokemon.types.map((type) => type.type.name),
  };
}

function mapPokemonDetail(pokemon) {
  return {
    ...mapPokemonCard(pokemon),
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    abilities: pokemon.abilities.map((ability) => ({
      name: ability.ability.name,
      hidden: ability.is_hidden,
    })),
  };
}

function fetchCards(names) {
  return Promise.all(
    names.map((name) =>
      fetch(`${POKEAPI_BASE_URL}/pokemon/${name}`).then(checkResponse),
    ),
  ).then((list) => list.map(mapPokemonCard));
}

export function getPokemonPage(page = 1, pageSize = PAGE_SIZE) {
  const offset = (page - 1) * pageSize;

  return fetch(`${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${pageSize}`)
    .then(checkResponse)
    .then((data) =>
      fetchCards(data.results.map((item) => item.name)).then((pokemons) => ({
        pokemons,
        total: data.count,
      })),
    );
}

export function searchPokemon(query, page = 1, pageSize = PAGE_SIZE) {
  const normalized = query.toLowerCase().trim();

  return getAllNames().then((names) => {
    const matches = names.filter((name) => name.includes(normalized));
    const start = (page - 1) * pageSize;
    const slice = matches.slice(start, start + pageSize);

    return fetchCards(slice).then((pokemons) => ({
      pokemons,
      total: matches.length,
    }));
  });
}

export function getPokemonByType(type, page = 1, pageSize = PAGE_SIZE) {
  return fetch(`${POKEAPI_BASE_URL}/type/${type}`)
    .then(checkResponse)
    .then((data) => {
      const names = data.pokemon.map((entry) => entry.pokemon.name);
      const start = (page - 1) * pageSize;
      const slice = names.slice(start, start + pageSize);

      return fetchCards(slice).then((pokemons) => ({
        pokemons,
        total: names.length,
      }));
    });
}

export function getPokemonByName(name) {
  return fetch(
    `${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(name.toLowerCase().trim())}`,
  )
    .then(checkResponse)
    .then(mapPokemonDetail);
}

export function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  return fetch (`${POKEAPI_BASE_URL}/pokemon/${randomId}`)
  .then(checkResponse)
  .then(mapPokemonDetail);
}
