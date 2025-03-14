import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/games";

export interface Game {
  _id: string;
  name: string;
  description?: string;
}

export interface CreateGame {
  name: string;
  description?: string;
}

const createGame = async (game: CreateGame): Promise<Game> => {
  const response = await axios.post(API_URL, game, { withCredentials: true });
  return response.data;
};

const getGames = async (): Promise<Game[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

export default {
  createGame,
  getGames,
};
