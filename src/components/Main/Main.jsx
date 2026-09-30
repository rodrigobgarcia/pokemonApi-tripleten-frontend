import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRandomPokemon } from "../../utils/api";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

export default function Main() {
  const navigate = useNavigate();
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  function handleRandom() {
    setIsLoadingRandom(true);
    getRandomPokemon()
      .then((pokemon) => navigate(`/pokemon/${pokemon.name}`))
      .catch((err) => alert("Erro ao buscar Pokémon aleatório:", err))
      .finally(() => setIsLoadingRandom(false));
  }

  function handleSearch(query) {
    if (!query) {
      navigate("/pokedex");
      return;
    }

    navigate(`/pokedex?busca=${encodeURIComponent(query)}`);
  }

  return (
    <div className="main">
      <section className="hero">
        <p className="hero__eyebrow">PokéAPI</p>
        <h1 className="hero__title">Pesquise um Pokémon e monte o seu time</h1>
        <p className="hero__text">
          Encontre pelo nome, abra a ficha e guarde até 6 Pokémon em cada time.
        </p>
        <SearchForm onSearch={handleSearch} />
        <button
          className="button button_secondary hero__random"
          type="button"
          onClick={handleRandom}
        >
          {isLoadingRandom ? "Sorteando..." : "Pokémon aleatório"}
        </button>
      </section>
      <section className="steps" aria-labelledby="steps-title">
        <h2 className="steps__heading" id="steps-title">
          Como usar
        </h2>
        <ol className="steps__list">
          <li className="steps__item">
            <span className="steps__number">1</span>
            <h3 className="steps__title">Pesquise</h3>
            <p className="steps__text">Digite o nome, como pikachu ou charizard.</p>
          </li>
          <li className="steps__item">
            <span className="steps__number">2</span>
            <h3 className="steps__title">Abra a ficha</h3>
            <p className="steps__text">Veja tipo, altura, peso, habilidades e status.</p>
          </li>
          <li className="steps__item">
            <span className="steps__number">3</span>
            <h3 className="steps__title">Monte o time</h3>
            <p className="steps__text">Crie um time e adicione até 6 Pokémon.</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
