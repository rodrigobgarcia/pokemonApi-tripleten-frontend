import { Link } from "react-router-dom";
import {
  formatId,
  formatName,
  getTypeColor,
  getTypeLabel,
  getTypeTextColor,
} from "../../utils/format";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
  return (
    <article className="pokemon-card">
      <Link className="pokemon-card__link" to={`/pokemon/${pokemon.name}`}>
        {pokemon.image ? (
          <img
            className="pokemon-card__image"
            src={pokemon.image}
            alt={formatName(pokemon.name)}
          />
        ) : (
          <span className="pokemon-card__fallback">Sem imagem</span>
        )}
        <p className="pokemon-card__id">{formatId(pokemon.id)}</p>
        <h2 className="pokemon-card__name">{formatName(pokemon.name)}</h2>
        <ul className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <li
              className="pokemon-card__type"
              key={type}
              style={{ backgroundColor: getTypeColor(type), color: getTypeTextColor(type) }}
            >
              {getTypeLabel(type)}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
