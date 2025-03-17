import axios from "axios";
import type { Game } from "./gameService";
import type { Player } from "./playerService";
const API_URL = import.meta.env.VITE_API_URL + "/tournaments";

export interface Tournament {
  _id?: string;
  name: string;
  game: Game;
  date: string;
  discordChannelName: string;
  players: Player[];
  finished: boolean;
  teams?: Team[];
  description?: string;
  winningTeam?: Team;
}

export interface Team {
  _id: string;
  name: string;
  players: Player[];
  score: number;
}

const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  const response = await axios.post(API_URL, tournament, {
    withCredentials: true,
  });
  return response.data;
};

const getTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get(`${API_URL}/`, {
    withCredentials: true,
  });
  return response.data;
};

const getTournamentsByGame = async (gameId: string): Promise<Tournament[]> => {
  const response = await axios.get(`${API_URL}/game/${gameId}`, {
    withCredentials: true,
  });
  return response.data;
};

const getTournamentById = async (tournamentId: string): Promise<Tournament> => {
  const response = await axios.get(`${API_URL}/${tournamentId}`, {
    withCredentials: true,
  });
  return response.data;
};

const updateTournament = async (
  tournamentId: string,
  tournament: Tournament
): Promise<Tournament> => {
  const response = await axios.put(`${API_URL}/${tournamentId}`, tournament, {
    withCredentials: true,
  });
  return response.data;
};

const generateTeams = async (
  tournamentId: string,
  numTeams: number
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/generate-teams`,
    { numTeams },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updateTeamScore = async (
  tournamentId: string,
  teamId: string,
  score: number
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/teams/${teamId}/score`,
    { score },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const finishTournament = async (
  tournamentId: string,
  winningTeamId: string
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/finish`,
    { winningTeamId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteTournament = async (tournamentId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${tournamentId}`, {
    withCredentials: true,
  });
};

// Nouvelle méthode pour inscrire un joueur à un tournoi
const registerPlayer = async (
  tournamentId: string,
  userId: string
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/register`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const unregisterPlayer = async (
  tournamentId: string,
  userId: string
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/unregister`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Nouvelle méthode pour le check-in d'un joueur
const checkInPlayer = async (
  tournamentId: string,
  playerId: string,
  checkedIn: boolean
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/check-in`,
    { playerId, checkedIn },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  createTournament,
  getTournamentsByGame,
  getTournamentById,
  updateTournament,
  getTournaments,
  generateTeams,
  updateTeamScore,
  finishTournament,
  deleteTournament,
  registerPlayer,
  unregisterPlayer,
  checkInPlayer, // Ajout de la méthode checkInPlayer
};
