import axios from "axios";
// ✅ CORRIGER : Importer les interfaces depuis User.ts
import type { GameRoles } from "../types/User";

/**
 * URL de base de l'API, récupérée depuis les variables d'environnement
 */
const API_URL = import.meta.env.VITE_API_URL + "/users";

/**
 * Interface pour les données de mise à jour du profil
 */
export interface UpdateProfileData {
  userId: string;
  twitchUsername?: string | null;
  gameRoles?: GameRoles[]; // ✅ UTILISER GameRoles de User.ts
}

/**
 * Met à jour le profil utilisateur
 */
const updateUserProfile = async (profileData: UpdateProfileData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

/**
 * Récupère les utilisateurs avec rôle pour un jeu (admin only)
 */
const getUsersWithGameRole = async (gameId: string) => {
  try {
    const response = await axios.get(`${API_URL}/roles/game/${gameId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users with game role:", error);
    throw error;
  }
};

// Dans profileService.ts
const getNotificationPreferences = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/status`, {
    withCredentials: true
  });
  return response.data;
};

const updateNotificationPreferences = async (data: {
  userId: string;
  type: string;
  enabled: boolean;
}) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/notifications/preferences`, {
    isActive: true, 
    preferences: {
      [data.type]: data.enabled
    }
  }, { withCredentials: true });
  return response.data;
};

export default {
  updateUserProfile,
  getUsersWithGameRole,
  getNotificationPreferences,
  updateNotificationPreferences,
};
