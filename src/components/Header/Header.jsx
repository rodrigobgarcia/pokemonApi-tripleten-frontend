import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__bar">
        <Link className="header__logo" to="/">
          <img className="header__logo-image" src={logo} alt="" />
          <span className="header__logo-text">PokéTimes</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
