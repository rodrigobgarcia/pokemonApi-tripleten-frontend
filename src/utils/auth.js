const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const TOKEN_KEY = "poketimes-token";

function request(path, { method = "GET", body, token } = {}) {
  return fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error = new Error(data.message || "Algo deu errado. Tente novamente.");
      error.status = res.status;
      throw error;
    }
    return data;
  });
}

export function mapTeam(team) {
  return {
    id: team._id,
    name: team.name,
    members: team.members || [],
  };
}

export function signup({ name, email, password }) {
  return request("/signup", { method: "POST", body: { name, email, password } });
}

export function signin({ email, password }) {
  return request("/signin", { method: "POST", body: { email, password } });
}

export function getCurrentUser(token) {
  return request("/users/me", { token });
}

export function getTeams(token) {
  return request("/teams", { token }).then((teams) => teams.map(mapTeam));
}

export function createRemoteTeam(token, name, member) {
  return request("/teams", {
    method: "POST",
    token,
    body: member ? { name, member } : { name },
  }).then(mapTeam);
}

export function deleteRemoteTeam(token, teamId) {
  return request(`/teams/${teamId}`, { method: "DELETE", token });
}

export function addRemoteMember(token, teamId, member) {
  return request(`/teams/${teamId}/members`, {
    method: "POST",
    token,
    body: member,
  }).then(mapTeam);
}

export function removeRemoteMember(token, teamId, pokemonId) {
  return request(`/teams/${teamId}/members/${pokemonId}`, {
    method: "DELETE",
    token,
  }).then(mapTeam);
}
