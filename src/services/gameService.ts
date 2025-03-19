import axios from "axios";
import type { Game } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/games";

const createGame = async (game: Game): Promise<Game> => {
  const response = await axios.post(API_URL, game, { withCredentials: true });
  return response.data;
};

const getGames = async (): Promise<Game[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

const deleteGame = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export default {
  createGame,
  getGames,
  deleteGame,
};
