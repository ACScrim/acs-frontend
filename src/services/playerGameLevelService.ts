import axios from "axios";
import type { PlayerGameLevel } from "../types";

const API_URL = `${import.meta.env.VITE_API_URL}/player-levels`;

interface SetPlayerLevelData {
  level: string;
  gameUsername?: string;
  isRanked?: boolean;
  rank?: string;
  comment?: string;
  selectedRoles?: string[];
}

/**
 * Service pour gérer les niveaux de joueur par jeu
 */
const playerGameLevelService = {
  /**
   * Supprime le niveau d'un joueur pour un jeu spécifique
   * @param playerId ID du joueur
   * @param gameId ID du jeu
   */
  deletePlayerLevel: async (
    playerId: string,
    gameId: string
  ): Promise<void> => {
    await axios.delete(`${API_URL}/player/${playerId}/game/${gameId}`, {
      withCredentials: true,
    });
  },

  /**
   * Récupérer tous les niveaux de joueurs pour un jeu spécifique
   */
  getPlayerLevelsByGame: async (gameId: string): Promise<PlayerGameLevel[]> => {
    try {
      const response = await axios.get(`${API_URL}/game/${gameId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des niveaux pour ce jeu:",
        error
      );
      throw error;
    }
  },

  /**
   * Récupère tous les niveaux d'un joueur
   * @param playerId ID du joueur
   */
  getPlayerLevels: async (playerId: string): Promise<PlayerGameLevel[]> => {
    const response = await axios.get(`${API_URL}/player/${playerId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  /**
   * Récupère le niveau d'un joueur pour un jeu spécifique
   * @param playerId ID du joueur
   * @param gameId ID du jeu
   */
  getPlayerLevelForGame: async (
    playerId: string,
    gameId: string
  ): Promise<PlayerGameLevel | null> => {
    try {
      const response = await axios.get(
        `${API_URL}/player/${playerId}/game/${gameId}`,
        {
          withCredentials: true,
          // Empêche axios de lancer une erreur pour 404
          // car c'est un comportement attendu quand le joueur n'a pas de niveau
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 404,
        }
      );

      // Si 404, le joueur n'a pas de niveau pour ce jeu
      if (response.status === 404) {
        return null;
      }

      return response.data;
    } catch (error) {
      // Cette gestion d'erreur ne devrait plus être nécessaire avec validateStatus,
      // mais on la garde pour d'autres erreurs réseau
      console.error("Erreur lors de la récupération du niveau:", error);
      throw error;
    }
  },

  /**
   * Récupère tous les niveaux de tous les joueurs pour tous les jeux
   */
  getAllPlayerLevels: async (): Promise<PlayerGameLevel[]> => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de tous les niveaux:",
        error
      );
      throw error;
    }
  },

  /**
   * Définit ou met à jour le niveau d'un joueur pour un jeu
   * @param playerId ID du joueur
   * @param gameId ID du jeu
   * @param level Niveau du joueur
   */
  setPlayerLevel: async (
    playerId: string,
    gameId: string,
    data: SetPlayerLevelData
  ): Promise<PlayerGameLevel> => {
    const response = await axios.post(
      `${API_URL}/player/${playerId}/game/${gameId}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },
};

export default playerGameLevelService;
