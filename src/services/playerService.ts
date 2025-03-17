import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/players";

export interface Player {
  _id?: string;
  username: string;
  userId: string;
  discordId?: string;
}

export interface PlayerCheckedIn extends Player {
  checkedIn: boolean;
}

export interface PlayerRanking {
  playerId: string;
  username: string;
  totalPoints: number;
  totalTournaments: number;
  totalVictories: number;
}

export interface TournamentWinner {
  tournamentId: string;
  tournamentName: string;
  winningTeam: {
    name: string;
    players: Player[];
  };
}

const addPlayer = async (player: Player): Promise<Player> => {
  const response = await axios.post(API_URL, player, { withCredentials: true });
  return response.data;
};

const getPlayers = async (): Promise<Player[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

const getPlayerById = async (id: string): Promise<Player> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

const searchPlayers = async (search: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { search },
    withCredentials: true,
  });
  return response.data;
};

const deletePlayer = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

const synchronizePlayers = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/synchronize`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error synchronizing players:", error);
  }
};

const updatePlayerUsername = async (
  playerId: string,
  username: string
): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/update-username`,
      { playerId, username },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error updating player username:", error);
  }
};

// Nouvelle fonction pour récupérer le classement des joueurs
const getPlayerRankings = async (): Promise<PlayerRanking[]> => {
  const response = await axios.get(`${API_URL}/rankings`, {
    withCredentials: true,
  });
  return response.data;
};

// Nouvelle fonction pour récupérer le classement des joueurs par jeu
const getPlayerRankingsByGame = async (
  gameId: string
): Promise<PlayerRanking[]> => {
  const response = await axios.get(`${API_URL}/rankings/game/${gameId}`, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  addPlayer,
  getPlayers,
  searchPlayers,
  deletePlayer,
  getPlayerById,
  synchronizePlayers,
  updatePlayerUsername,
  getPlayerRankings,
  getPlayerRankingsByGame,
};
