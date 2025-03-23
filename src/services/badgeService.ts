import axios from "axios";
import type { Badge } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/badges";

/**
 * Crée un nouveau badge dans le système
 * @param badge - Données du badge à créer
 * @returns Le badge créé avec son ID généré
 */
const createBadge = async (badge: Badge): Promise<Badge> => {
  const response = await axios.post(API_URL, badge, { withCredentials: true });
  return response.data;
};

/**
 * Récupère tous les badges disponibles
 * @returns Liste des badges
 */
const getBadges = async (): Promise<Badge[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

/**
 * Récupère un badge par son ID
 * @param badgeId - ID du badge
 * @returns Détails du badge
 */
const getBadgeById = async (badgeId: string): Promise<Badge> => {
  const response = await axios.get(`${API_URL}/${badgeId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Assigne un badge à un joueur
 * @param playerId - ID du joueur
 * @param badgeId - ID du badge
 */
const assignBadgeToPlayer = async (
  playerId: string,
  badgeId: string
): Promise<void> => {
  await axios.post(
    `${API_URL}/assign`,
    { playerId, badgeId },
    { withCredentials: true }
  );
};

/**
 * Retire un badge d'un joueur
 * @param playerId - ID du joueur
 * @param badgeId - ID du badge
 */
const removeBadgeFromPlayer = async (
  playerId: string,
  badgeId: string
): Promise<void> => {
  await axios.post(
    `${API_URL}/remove`,
    { playerId, badgeId },
    { withCredentials: true }
  );
};

/**
 * Met à jour un badge existant
 * @param badgeId - ID du badge à mettre à jour
 * @param badge - Nouvelles données du badge
 * @returns Le badge mis à jour
 */
const updateBadge = async (badgeId: string, badge: Badge): Promise<Badge> => {
  const response = await axios.put(`${API_URL}/${badgeId}`, badge, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Supprime un badge existant
 * @param badgeId - ID du badge à supprimer
 */
const deleteBadge = async (badgeId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${badgeId}`, { withCredentials: true });
};

export default {
  createBadge,
  getBadges,
  getBadgeById,
  assignBadgeToPlayer,
  removeBadgeFromPlayer,
  updateBadge,
  deleteBadge,
};
