import axios from "axios";

/**
 * URL de base de l'API, récupérée depuis les variables d'environnement
 */
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Récupère tous les utilisateurs du système
 * @returns Liste des utilisateurs ou tableau vide en cas d'erreur
 */
const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true, // Inclut les cookies d'authentification
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

/**
 * Met à jour le rôle d'un utilisateur spécifique
 * @param userId - ID de l'utilisateur à modifier
 * @param role - Nouveau rôle à attribuer ("user", "admin", "superadmin")
 * @throws Erreur si la mise à jour échoue
 */
const updateUserRole = async (userId: string, role: string) => {
  try {
    await axios.put(
      `${API_URL}/users/role`,
      { userId, role },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error; // Propage l'erreur pour gestion par l'appelant
  }
};

/**
 * Récupère un utilisateur par son ID
 * @param userId - ID de l'utilisateur à récupérer
 * @returns Données de l'utilisateur ou null si non trouvé
 */
const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null; // Retourne null en cas d'erreur
  }
};

export default {
  fetchAllUsers,
  updateUserRole,
  getUserById,
};
