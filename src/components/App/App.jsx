import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "../About/About";
import AuthModal from "../AuthModal/AuthModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Pokedex from "../Pokedex/Pokedex";
import PokemonDetail from "../PokemonDetail/PokemonDetail";
import Teams from "../Teams/Teams";
import {
  TOKEN_KEY,
  addRemoteMember,
  createRemoteTeam,
  deleteRemoteTeam,
  getCurrentUser,
  getTeams,
  removeRemoteMember,
  signin,
  signup,
} from "../../utils/auth";
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
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("");

  useEffect(() => {
    if (!token) {
      setUser(null);
      setTeams(loadTeams());
      return undefined;
    }

    let ignore = false;
    getCurrentUser(token)
      .then((currentUser) => {
        if (ignore) {
          return null;
        }
        setUser(currentUser);
        return getTeams(token);
      })
      .then((remoteTeams) => {
        if (!ignore && remoteTeams) {
          setTeams(remoteTeams);
        }
      })
      .catch(() => {
        if (!ignore) {
          localStorage.removeItem(TOKEN_KEY);
          setToken("");
        }
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      saveTeams(teams);
    }
  }, [teams, token]);

  function saveSession(nextToken) {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setAuthMode("");
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setUser(null);
    setTeams(loadTeams());
  }

  function handleAuthSubmit(values) {
    if (authMode === "signup") {
      return signup(values).then(() => signin(values).then((data) => saveSession(data.token)));
    }

    return signin(values).then((data) => saveSession(data.token));
  }

  function handleCreateTeam(name, pokemon) {
    const member = pokemon ? toTeamMember(pokemon) : null;
    if (!token) {
      setTeams((current) => [...current, createTeam(name, member)]);
      return;
    }

    createRemoteTeam(token, name, member).then((team) => {
      setTeams((current) => [...current, team]);
    });
  }

  function handleAddToTeam(teamId, pokemon) {
    const member = toTeamMember(pokemon);
    if (!token) {
      setTeams((current) => addMember(current, teamId, member));
      return;
    }

    addRemoteMember(token, teamId, member).then((team) => {
      setTeams((current) => current.map((item) => (item.id === team.id ? team : item)));
    });
  }

  function handleRemoveMember(teamId, pokemonId) {
    if (!token) {
      setTeams((current) => removeMember(current, teamId, pokemonId));
      return;
    }

    removeRemoteMember(token, teamId, pokemonId).then((team) => {
      setTeams((current) => current.map((item) => (item.id === team.id ? team : item)));
    });
  }

  function handleDeleteTeam(teamId) {
    if (!token) {
      setTeams((current) => deleteTeam(current, teamId));
      return;
    }

    deleteRemoteTeam(token, teamId).then(() => {
      setTeams((current) => current.filter((team) => team.id !== teamId));
    });
  }

  return (
    <div className="page">
      <ScrollToTop />
      <Header
        user={user}
        onLogin={() => setAuthMode("signin")}
        onSignup={() => setAuthMode("signup")}
        onLogout={handleLogout}
      />
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
      {authMode ? (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode("")}
          onSubmit={handleAuthSubmit}
        />
      ) : null}
    </div>
  );
}
