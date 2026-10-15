import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header({ user, onLogin, onSignup, onLogout }) {
  return (
    <header className="header">
      <div className="header__bar">
        <Link className="header__logo" to="/">
          <img className="header__logo-image" src={logo} alt="" />
          <span className="header__logo-text">PokéTimes</span>
        </Link>
        <div className="header__actions">
          <Navigation />
          {user ? (
            <div className="header__user">
              <span className="header__name">{user.name}</span>
              <Button type="button" variant="secondary" onClick={onLogout}>
                Sair
              </Button>
            </div>
          ) : (
            <div className="header__user">
              <Button type="button" variant="secondary" onClick={onLogin}>
                Entrar
              </Button>
              <Button type="button" onClick={onSignup}>
                Cadastrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
