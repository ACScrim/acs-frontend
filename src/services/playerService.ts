import axios from "axios";
import type { Player, PlayerRanking, ExtendedStats } from "../types";
import type { SeasonChampionship } from "../types/SeasonChampionship";

/**
 * URL de base pour les opérations sur les joueurs
 */
const API_URL = import.meta.env.VITE_API_URL + "/players";

/**
 * Ajoute un nouveau joueur dans le système
 * @param player - Données du joueur à créer
 * @returns Le joueur créé avec son ID généré
 */
const addPlayer = async (player: Player): Promise<Player> => {
  const response = await axios.post(API_URL, player, { withCredentials: true });
  return response.data;
};

/**
 * Récupère tous les joueurs du système
 * @returns Liste des joueurs
 */
const getPlayers = async (): Promise<Player[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

/**
 * Récupère un joueur par son ID
 * @param id - ID du joueur
 * @returns Détails du joueur
 */
const getPlayerById = async (id: string): Promise<Player> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Recherche des joueurs par nom d'utilisateur
 * @param search - Terme de recherche
 * @returns Liste des joueurs correspondant au critère
 */
const searchPlayers = async (search: string): Promise<Player[]> => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { search },
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère un joueur par son ID utilisateur associé
 * @param userId - ID de l'utilisateur associé au profil joueur
 * @returns Le profil joueur lié à l'utilisateur
 */
const getPlayerByIdUser = async (userId: string): Promise<Player> => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Supprime un joueur du système
 * @param id - ID du joueur à supprimer
 */
const deletePlayer = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

/**
 * Synchronise les joueurs avec les utilisateurs
 * Associe automatiquement les profils joueurs aux utilisateurs par nom d'utilisateur
 */
const synchronizePlayers = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/synchronize`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error synchronizing players:", error);
  }
};

/**
 * Met à jour le nom d'utilisateur d'un joueur
 * @param playerId - ID du joueur à modifier
 * @param username - Nouveau nom d'utilisateur
 */
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

/**
 * Récupère le classement global de tous les joueurs
 * @returns Liste des joueurs avec leurs statistiques et classements
 */
const getPlayerRankings = async (): Promise<PlayerRanking[]> => {
  const response = await axios.get(`${API_URL}/rankings`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère le classement des joueurs pour un jeu spécifique
 * @param gameId - ID du jeu pour lequel filtrer le classement
 * @returns Liste des joueurs avec leurs statistiques pour ce jeu
 */
const getPlayerRankingsByGame = async (
  gameId: string
): Promise<PlayerRanking[]> => {
  const response = await axios.get(`${API_URL}/rankings/game/${gameId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère le profil complet d'un joueur avec ses badges et statistiques
 * @param userId - ID du joueur
 * @returns Profil détaillé du joueur
 */
const getPlayerProfile = async (userId: string): Promise<Player> => {
  const response = await axios.get(`${API_URL}/profile/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère les statistiques étendues d'un joueur
 * @param playerId - ID du joueur
 * @returns Statistiques détaillées du joueur
 */
const getExtendedStats = async (playerId: string): Promise<ExtendedStats> => {
  try {
    const response = await axios.get(`${API_URL}/${playerId}/extended-stats`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des statistiques étendues:",
      error
    );
    throw error;
  }
};

/**
 * Récupère les championnats de saisons d'un joueur
 * @param id - ID du joueur
 * @returns Liste des saisons où le joueur a été champion
 */
const getPlayerSeasonChampionships = async (
  id: string
): Promise<SeasonChampionship[]> => {
  try {
    const response = await axios.get(`${API_URL}/${id}/season-championships`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des championnats de saisons:",
      error
    );
    throw error;
  }
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
  getPlayerByIdUser,
  getPlayerProfile,
  getExtendedStats,
  getPlayerSeasonChampionships,
};
