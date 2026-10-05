import avatar from "../../images/avatar.svg";
import { AUTHOR } from "../../utils/constants";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <img className="about__photo" src={avatar} alt={`Foto de ${AUTHOR.name}`} />
      <div className="about__content">
        <p className="about__eyebrow">Sobre o autor</p>
        <h1 className="about__title">{AUTHOR.name}</h1>
        <p className="about__role">{AUTHOR.role}</p>
        {AUTHOR.bio.map((paragraph) => (
          <p className="about__text" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <h2 className="about__subtitle">Tecnologias</h2>
        <ul className="about__skills">
          {AUTHOR.skills.map((skill) => (
            <li className="about__skill" key={skill}>
              {skill}
            </li>
          ))}
        </ul>
        <a
          className="about__link"
          href={AUTHOR.github}
          target="_blank"
          rel="noreferrer"
        >
          Ver meu GitHub
        </a>
      </div>
    </section>
  );
}
