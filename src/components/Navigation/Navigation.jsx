import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../utils/constants";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {NAV_LINKS.map((link) => (
          <li className="navigation__item" key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navigation__link${isActive ? " navigation__link_active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
