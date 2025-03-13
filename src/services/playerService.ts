import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/players";

export interface Player {
  _id?: string;
  username: string;
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
  console.log("search", search);
  const response = await axios.get(`${API_URL}/search`, {
    params: { search },
    withCredentials: true,
  });
  return response.data;
};

const deletePlayer = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export default {
  addPlayer,
  getPlayers,
  searchPlayers,
  deletePlayer,
  getPlayerById,
};
