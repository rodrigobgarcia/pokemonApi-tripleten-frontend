import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const year = CURRENT_YEAR;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__text">PokéTimes · {year}</p>
        <a
          className="footer__link"
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
        >
          Dados: PokéAPI
        </a>
      </div>
    </footer>
  );
}
