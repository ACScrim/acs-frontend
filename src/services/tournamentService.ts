import axios from "axios";
import type { Game } from "./gameService";

const API_URL = import.meta.env.VITE_API_URL + "/tournaments";

export interface Tournament {
  name: string;
  game: string;
  date: string;
  discordChannelName: string;
  players: string[];
  finished: boolean;
}
export interface GetTournament {
  _id: string;
  name: string;
  game: Game;
  date: string;
  discordChannelName: string;
  players: string[];
  finished: boolean;
}

const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  const response = await axios.post(API_URL, tournament, {
    withCredentials: true,
  });
  return response.data;
};

const getTournaments = async (): Promise<GetTournament[]> => {
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

const getTournamentById = async (
  tournamentId: string
): Promise<GetTournament> => {
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

export default {
  createTournament,
  getTournamentsByGame,
  getTournamentById,
  updateTournament,
  getTournaments,
};
