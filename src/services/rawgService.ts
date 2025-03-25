import axios from "axios";
import type { RawgGame } from "../types";

// Configuration de l'API
const API_KEY =
  import.meta.env.VITE_RAWG_API_KEY || "ca7084b6f5884397a839c71c5c81a95f";
const API_URL = "https://api.rawg.io/api";

/**
 * Recherche de jeux via l'API RAWG
 * @param query - Terme de recherche
 * @returns Liste des jeux correspondants
 */
const searchGames = async (query: string): Promise<RawgGame[]> => {
  try {
    // Validation de la requête
    if (!query || query.trim().length < 3) {
      console.log("Requête trop courte, retour tableau vide");
      return [];
    }

    const response = await axios.get(`${API_URL}/games`, {
      params: {
        key: API_KEY,
        search: query.trim(),
        page_size: 10,
        search_precise: true,
      },
    });

    // Tri par pertinence du nom
    const sortedResults = response.data.results.sort(
      (a: RawgGame, b: RawgGame) => {
        const nameA: string = a.name.toLowerCase();
        const nameB: string = b.name.toLowerCase();
        const queryLower: string = query.trim().toLowerCase();

        // Priorité aux jeux dont le nom commence par la requête
        if (nameA.startsWith(queryLower) && !nameB.startsWith(queryLower))
          return -1;
        if (nameB.startsWith(queryLower) && !nameA.startsWith(queryLower))
          return 1;

        // Puis tri alphabétique
        return nameA.localeCompare(nameB);
      }
    );

    return sortedResults;
  } catch (error) {
    console.error("Erreur lors de la recherche de jeux:", error);
    throw error;
  }
};

/**
 * Récupère les détails d'un jeu par son ID
 * @param gameId - ID du jeu dans l'API RAWG
 * @returns Détails du jeu
 */
const getGameDetails = async (gameId: number): Promise<any> => {
  try {
    if (!gameId) {
      throw new Error("ID de jeu non valide");
    }

    const response = await axios.get(`${API_URL}/games/${gameId}`, {
      params: {
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails du jeu #${gameId}:`,
      error
    );
    throw error;
  }
};

/**
 * Formatte la date de sortie d'un jeu
 * @param dateString - Date au format string
 * @returns Date formattée
 */
const formatGameReleaseDate = (dateString: string): string => {
  if (!dateString) return "Date inconnue";

  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default {
  searchGames,
  getGameDetails,
  formatGameReleaseDate,
};
