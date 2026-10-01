import { STORAGE_KEY, TEAM_SIZE } from "./constants";

// Temporário: a fase de back-end troca este localStorage por times autenticados.
export function loadTeams() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (team) =>
        team &&
        typeof team.id === "string" &&
        typeof team.name === "string" &&
        Array.isArray(team.members),
    );
  } catch {
    return [];
  }
}

export function saveTeams(teams) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function createTeam(name, member = null) {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    members: member ? [member] : [],
  };
}

export function addMember(teams, teamId, member) {
  return teams.map((team) => {
    if (team.id !== teamId) {
      return team;
    }

    const exists = team.members.some((item) => item.id === member.id);
    if (exists || team.members.length >= TEAM_SIZE) {
      return team;
    }

    return { ...team, members: [...team.members, member] };
  });
}

export function removeMember(teams, teamId, pokemonId) {
  return teams.map((team) => {
    if (team.id !== teamId) {
      return team;
    }

    return {
      ...team,
      members: team.members.filter((member) => member.id !== pokemonId),
    };
  });
}

export function deleteTeam(teams, teamId) {
  return teams.filter((team) => team.id !== teamId);
}
