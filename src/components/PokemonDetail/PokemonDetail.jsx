import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonByName } from "../../utils/api";
import { getErrorMessage } from "../../utils/errors";
import Preloader from "../Preloader/Preloader";
import Status from "../Status/Status";
import "./PokemonDetail.css";

export default function PokemonDetail({teams, onAddToTeam, onCreateTeam}) {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  useEffect(() => {
    getPokemonByName(name)
      .then((result) => {
        setPokemon(result);
        setError("");
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        console.error(err);
      });
  }, [name]);

  if (error) {
    return (
      <section className="pokemon">
        <Link className="pokemon__back" to="/pokedex">
          Voltar para a Pokédex
        </Link>
        <Status type="error">{error}</Status>
      </section>
    );
  }

  if (!pokemon) {
    return (
      <section className="pokemon">
        <Link className="pokemon__back" to="/pokedex">
          Voltar para a Pokédex
        </Link>
        <Preloader />
      </section>
    );
  }

  return (
    <section className="pokemon">
      <Link className="pokemon__back" to="/pokedex">
        Voltar para a Pokédex
      </Link>
      <div className="pokemon__layout">
        <div className="pokemon__media">
          <img className="pokemon__image" src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className="pokemon__info">
          <p className="pokemon__id">#{pokemon.id}</p>
          <h1 className="pokemon__title">{pokemon.name}</h1>
          <ul className="pokemon__types">
            {pokemon.types.map((type) => (
              <li className="pokemon__type" key={type}>
                {type}
              </li>
            ))}
          </ul>
          <dl className="pokemon__facts">
            <div className="pokemon__fact">
              <dt>Altura</dt>
              <dd>{pokemon.height}</dd>
            </div>
            <div className="pokemon__fact">
              <dt>Peso</dt>
              <dd>{pokemon.weight}</dd>
            </div>
          </dl>
          <h2 className="pokemon__subtitle">Habilidades</h2>
          <ul className="pokemon__abilities">
            {pokemon.abilities.map((ability) => (
              <li className="pokemon__ability" key={ability.name}>
                {ability.name}
              </li>
            ))}
          </ul>
          <h2 className="pokemon__subtitle">Status</h2>
          <ul className="pokemon__stats">
            {pokemon.stats.map((stat) => (
              <li className="pokemon__stat" key={stat.name}>
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
          <h2 className="pokemon__subtitle">Time</h2>
          <label className="filter">
            Escolha o time
            <select
              className="filter__select"
              value={selectedTeamId}
              onChange={(event) => setSelectedTeamId(event.target.value)}
            >
              <option value="">Selecione...</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="button"
            type="button"
            disabled={!selectedTeamId}
            onClick={() => onAddToTeam(selectedTeamId, pokemon)}
          >
            Adicionar ao time
          </button>
        </div>
      </div>
    </section>
  );
}
