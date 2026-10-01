import { AUTHOR } from "../../utils/constants";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <p className="about__eyebrow">Autor</p>
      <h1 className="about__title">{AUTHOR.name}</h1>
      <p className="about__text">{AUTHOR.bio}</p>
    </section>
  );
}
