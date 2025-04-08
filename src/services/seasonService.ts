import axios from "axios";
import type { Season, Tournament, PlayerRanking } from "../types";

/**
 * URL de base pour les opérations sur les saisons
 */
const API_URL = import.meta.env.VITE_API_URL + "/seasons";

/**
 * Récupère toutes les saisons
 * @returns Liste des saisons triées par numéro décroissant
 */
const getAllSeasons = async (): Promise<Season[]> => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des saisons:", error);
    throw error;
  }
};

/**
 * Récupère la saison en cours (numéro le plus élevé)
 * @returns Détails de la saison en cours
 */
const getCurrentSeason = async (): Promise<Season> => {
  try {
    const response = await axios.get(`${API_URL}/current`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la saison actuelle:",
      error
    );
    throw error;
  }
};

/**
 * Récupère une saison par son identifiant
 * @param id - ID de la saison
 * @returns Détails de la saison avec ses tournois
 */
const getSeasonById = async (id: string): Promise<Season> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la saison ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère le classement des joueurs pour une saison spécifique
 * @param id - ID de la saison
 * @param gameId - ID du jeu (optionnel) pour filtrer par jeu
 * @returns Classement des joueurs pour cette saison
 */
const getSeasonRanking = async (
  id: string,
  gameId?: string
): Promise<{
  seasonNumber: number;
  rankings: PlayerRanking[];
  totalTournaments: number;
}> => {
  try {
    const params = gameId ? { gameId } : {};
    const response = await axios.get(`${API_URL}/${id}/ranking`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du classement de la saison ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Crée une nouvelle saison
 * @param seasonData - Données de la saison à créer
 * @returns La saison créée avec son ID généré
 */
const createSeason = async (seasonData: {
  numero: number;
}): Promise<Season> => {
  try {
    const response = await axios.post(API_URL, seasonData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la saison:", error);
    throw error;
  }
};

/**
 * Met à jour une saison existante
 * @param id - ID de la saison à modifier
 * @param seasonData - Nouvelles données de la saison
 * @returns La saison mise à jour
 */
const updateSeason = async (
  id: string,
  seasonData: { numero: number }
): Promise<Season> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, seasonData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la saison ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime une saison
 * @param id - ID de la saison à supprimer
 */
const deleteSeason = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  } catch (error) {
    console.error(`Erreur lors de la suppression de la saison ${id}:`, error);
    throw error;
  }
};

/**
 * Ajoute un tournoi à une saison
 * @param seasonId - ID de la saison
 * @param tournamentId - ID du tournoi à ajouter
 * @returns La saison mise à jour avec le nouveau tournoi
 */
const addTournamentToSeason = async (
  seasonId: string,
  tournamentId: string
): Promise<Season> => {
  try {
    const response = await axios.post(
      `${API_URL}/${seasonId}/tournaments`,
      { tournamentId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de l'ajout du tournoi ${tournamentId} à la saison ${seasonId}:`,
      error
    );
    throw error;
  }
};

/**
 * Retire un tournoi d'une saison
 * @param seasonId - ID de la saison
 * @param tournamentId - ID du tournoi à retirer
 * @returns La saison mise à jour sans le tournoi
 */
const removeTournamentFromSeason = async (
  seasonId: string,
  tournamentId: string
): Promise<Season> => {
  try {
    const response = await axios.delete(
      `${API_URL}/${seasonId}/tournaments/${tournamentId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors du retrait du tournoi ${tournamentId} de la saison ${seasonId}:`,
      error
    );
    throw error;
  }
};

/**
 * Récupère les tournois disponibles pour une saison (non encore associés)
 * @param seasonId - ID de la saison
 * @param gameId - ID du jeu (optionnel) pour filtrer par jeu
 * @returns Liste des tournois disponibles
 */
const getAvailableTournaments = async (
  seasonId: string,
  gameId?: string
): Promise<Tournament[]> => {
  try {
    const params = gameId ? { gameId } : {};
    const response = await axios.get(
      `${API_URL}/${seasonId}/available-tournaments`,
      {
        params,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des tournois disponibles pour la saison ${seasonId}:`,
      error
    );
    throw error;
  }
};

export default {
  getAllSeasons,
  getCurrentSeason,
  getSeasonById,
  getSeasonRanking,
  createSeason,
  updateSeason,
  deleteSeason,
  addTournamentToSeason,
  removeTournamentFromSeason,
  getAvailableTournaments,
};
