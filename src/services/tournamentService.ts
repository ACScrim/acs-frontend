import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/tournaments";

export interface Tournament {
  name: string;
  game: string;
  date: string;
  discordChannelName: string;
  players: string[];
}

const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  const response = await axios.post(API_URL, tournament, {
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

export default {
  createTournament,
  getTournamentsByGame,
  getTournamentById,
};
