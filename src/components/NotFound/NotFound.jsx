import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">Página não encontrada</h1>
      <p className="not-found__text">Esse endereço não existe neste projeto.</p>
      <Link className="button" to="/">
        Voltar ao início
      </Link>
    </section>
  );
}
