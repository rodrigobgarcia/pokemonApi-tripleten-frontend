import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Pokedex from "../Pokedex/Pokedex";
import PokemonDetail from "../PokemonDetail/PokemonDetail";
import Teams from "../Teams/Teams";
import {
  addMember,
  createTeam,
  deleteTeam,
  loadTeams,
  removeMember,
  saveTeams,
} from "../../utils/teams";
import { toTeamMember } from "../../utils/format";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [teams, setTeams] = useState(loadTeams);

  useEffect(() => {
    saveTeams(teams);
  }, [teams]);

  function handleCreateTeam(name, pokemon) {
    const member = pokemon ? toTeamMember(pokemon) : null;
    setTeams((current) => [...current, createTeam(name, member)]);
  }

  function handleAddToTeam(teamId, pokemon) {
    setTeams((current) => addMember(current, teamId, toTeamMember(pokemon)));
  }

  function handleRemoveMember(teamId, pokemonId) {
    setTeams((current) => removeMember(current, teamId, pokemonId));
  }

  function handleDeleteTeam(teamId) {
    setTeams((current) => deleteTeam(current, teamId));
  }

  return (
    <div className="page">
      <ScrollToTop />
      <Header />
      <main className="page__main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route
            path="/pokemon/:name"
            element={
              <PokemonDetail
                teams={teams}
                onAddToTeam={handleAddToTeam}
                onCreateTeam={handleCreateTeam}
              />
            }
          />
          <Route
            path="/times"
            element={
              <Teams
                teams={teams}
                onCreateTeam={handleCreateTeam}
                onRemoveMember={handleRemoveMember}
                onDeleteTeam={handleDeleteTeam}
              />
            }
          />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
