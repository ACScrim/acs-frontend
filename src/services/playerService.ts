import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/players";

interface Player {
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

const deletePlayer = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export default {
  addPlayer,
  getPlayers,
  deletePlayer,
};
