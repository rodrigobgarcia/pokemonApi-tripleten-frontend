import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import "./Pokedex.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";
import { getPokemonPage, searchPokemon, getPokemonByType } from "../../utils/api";
import { POKEMON_TYPES, PAGE_SIZE } from "../../utils/constants";
import Status from "../Status/Status"
export default function Pokedex() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("busca") || "");
  const [type, setType] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const request = query ? searchPokemon(query, page) : type ? getPokemonByType(type, page) : getPokemonPage(page);
    setIsLoading(true);
    request
      .then(({pokemons, total}) => {
        setPokemonList(pokemons);
        setTotal(total);
        setError("");
      })
      .catch((err) => {
        setError("Não foi possível carregar os Pokémons. Tente novamente.");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [query, type, page]);

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  return (
    <section className="pokedex">
      <h1 className="pokedex__title">Pokédex</h1>
      <p className="pokedex__text">
        A busca aceita parte do nome. Deixe o tipo em “Todos” para ver a lista geral.
      </p>
      <SearchForm initialValue={query} onSearch={(query) => {setQuery(query); setPage(1);}} />
      <label className="filter">
        Tipo
        <select value={type} onChange={(event) => {setType(event.target.value); setQuery(""); setPage(1)}} className="filter__select">
            <option value="">Todos</option>
            {POKEMON_TYPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
        </select>
      </label>
      {isLoading 
        ? <Preloader/>
        : error
          ? <Status type="error">{error}</Status>
          : <ul className="pokedex__list">
              {pokemonList.map((pkm) => {
                return (
                  <li className="pokedex__item" key={pkm.id}>
                    <PokemonCard pokemon={pkm} />
                  </li>
                )
              })}
            </ul>
      }
      <div className="pagination">
        <button className="button button_secondary" type="button" onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Anterior
        </button>
        <p className="pagination__status">Página {page} de {totalPages}</p>
        <button className="button button_secondary" type="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Próxima
        </button>
      </div>
    </section>
  );
}
