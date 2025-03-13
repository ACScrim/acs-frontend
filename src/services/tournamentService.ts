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
  teams?: Team[]; // Add the teams property
}

export interface Team {
  name: string;
  players: Player[];
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

export default {
  createTournament,
  getTournamentsByGame,
  getTournamentById,
  updateTournament,
  getTournaments,
  generateTeams,
};
