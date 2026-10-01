import { useState } from "react";
import { Link } from "react-router-dom";
import { TEAM_SIZE } from "../../utils/constants";
import {
  formatName,
  getTypeColor,
  getTypeLabel,
  getTypeTextColor,
} from "../../utils/format";
import Button from "../Button/Button";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Status from "../Status/Status";
import "./Teams.css";

export default function Teams({
  teams,
  onCreateTeam,
  onRemoveMember,
  onDeleteTeam,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState("");

  function handleCreate(name) {
    onCreateTeam(name);
    setIsModalOpen(false);
  }

  return (
    <section className="teams">
      <div className="teams__header">
        <div>
          <h1 className="teams__title">Seus times</h1>
          <p className="teams__text">
            Cada time cabe 6 Pokémon. Eles ficam salvos neste navegador até a fase de
            back-end.
          </p>
        </div>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          Novo time
        </Button>
      </div>
      {teams.length === 0 ? (
        <Status>Você ainda não criou um time.</Status>
      ) : (
        <ul className="teams__list">
          {teams.map((team) => (
            <li className="teams__item" key={team.id}>
              <article className="team">
                <div className="team__header">
                  <h2 className="team__title">{team.name}</h2>
                  <p className="team__count">
                    {team.members.length}/{TEAM_SIZE}
                  </p>
                </div>
                {team.members.length === 0 ? (
                  <p className="team__empty">
                    Time vazio. Abra um Pokémon na Pokédex para adicionar.
                  </p>
                ) : (
                  <ul className="team__members">
                    {team.members.map((member) => (
                      <li className="team__member" key={member.id}>
                        <Link className="team__link" to={`/pokemon/${member.name}`}>
                          {member.image ? (
                            <img
                              className="team__image"
                              src={member.image}
                              alt=""
                            />
                          ) : null}
                          <span className="team__name">{formatName(member.name)}</span>
                          <span className="team__types">
                            {member.types.map((type) => (
                              <span
                                className="team__type"
                                key={type}
                                style={{ backgroundColor: getTypeColor(type), color: getTypeTextColor(type) }}
                              >
                                {getTypeLabel(type)}
                              </span>
                            ))}
                          </span>
                        </Link>
                        <button
                          className="team__remove"
                          type="button"
                          onClick={() => onRemoveMember(team.id, member.id)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {pendingDeleteId === team.id ? (
                  <div className="team__confirm">
                    <p>Apagar o time {team.name}?</p>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => {
                        onDeleteTeam(team.id);
                        setPendingDeleteId("");
                      }}
                    >
                      Apagar
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setPendingDeleteId("")}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setPendingDeleteId(team.id)}
                  >
                    Apagar time
                  </Button>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
      <ModalWithForm
        key={isModalOpen ? "open" : "closed"}
        name="create-team"
        title="Novo time"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        submitText="Criar time"
      />
    </section>
  );
}
