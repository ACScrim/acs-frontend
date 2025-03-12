import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/games";

interface Game {
  name: string;
  description?: string;
}

const createGame = async (game: Game): Promise<Game> => {
  const response = await axios.post(API_URL, game, { withCredentials: true });
  return response.data;
};

export default {
  createGame,
};
