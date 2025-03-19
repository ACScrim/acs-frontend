import axios from "axios";
import type { Game } from "../types";

/**
 * URL de base pour les opérations sur les jeux
 */
const API_URL = import.meta.env.VITE_API_URL + "/games";

/**
 * Crée un nouveau jeu dans le système
 * @param game - Données du jeu à créer
 * @returns Le jeu créé avec son ID généré
 */
const createGame = async (game: Game): Promise<Game> => {
  const response = await axios.post(API_URL, game, { withCredentials: true });
  return response.data;
};

/**
 * Récupère tous les jeux disponibles
 * @returns Liste des jeux
 */
const getGames = async (): Promise<Game[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

/**
 * Récupère un jeu par son ID
 * @param id - ID du jeu
 * @returns Détails du jeu
 */
const getGameById = async (id: string): Promise<Game> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Supprime un jeu du système
 * @param id - ID du jeu à supprimer
 */
const deleteGame = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

/**
 * Met à jour un jeu existant
 * @param id - ID du jeu à mettre à jour
 * @param game - Nouvelles données du jeu
 * @returns Jeu mis à jour
 */
const updateGame = async (id: string, game: Game): Promise<Game> => {
  const response = await axios.put(`${API_URL}/${id}`, game, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  createGame,
  getGames,
  getGameById,
  deleteGame,
  updateGame,
};
