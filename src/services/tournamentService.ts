import axios from "axios";
import type { Tournament } from "../types";

/**
 * URL de base pour les opérations sur les tournois
 */
const API_URL = import.meta.env.VITE_API_URL + "/tournaments";

/**
 * Crée un nouveau tournoi
 * @param tournament - Données du tournoi à créer
 * @returns Le tournoi créé avec son ID généré
 */
const createTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  const response = await axios.post(API_URL, tournament, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère tous les tournois existants
 * @returns Liste des tournois
 */
const getTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get(`${API_URL}/`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère les tournois associés à un jeu spécifique
 * @param gameId - ID du jeu
 * @returns Liste des tournois pour ce jeu
 */
const getTournamentsByGame = async (gameId: string): Promise<Tournament[]> => {
  const response = await axios.get(`${API_URL}/game/${gameId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Récupère un tournoi par son ID
 * @param tournamentId - ID du tournoi
 * @returns Détails du tournoi
 */
const getTournamentById = async (tournamentId: string): Promise<Tournament> => {
  const response = await axios.get(`${API_URL}/${tournamentId}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Met à jour un tournoi existant
 * @param tournamentId - ID du tournoi à mettre à jour
 * @param tournament - Nouvelles données du tournoi
 * @returns Tournoi mis à jour
 */
const updateTournament = async (
  tournamentId: string,
  tournament: Tournament
): Promise<Tournament> => {
  const response = await axios.put(`${API_URL}/${tournamentId}`, tournament, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Génère automatiquement des équipes équilibrées pour un tournoi
 * @param tournamentId - ID du tournoi
 * @param numTeams - Nombre d'équipes à générer
 * @returns Tournoi avec les équipes générées
 */
const generateTeams = async (
  tournamentId: string,
  numTeams: number
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/generate-teams`,
    { numTeams },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Met à jour le score d'une équipe dans un tournoi
 * @param tournamentId - ID du tournoi
 * @param teamId - ID de l'équipe
 * @param score - Nouveau score
 * @returns Tournoi avec le score mis à jour
 */
const updateTeamScore = async (
  tournamentId: string,
  teamId: string,
  score: number
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/teams/${teamId}/score`,
    { score },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Marque un tournoi comme terminé avec l'équipe gagnante
 * @param tournamentId - ID du tournoi
 * @param winningTeamId - ID de l'équipe gagnante
 * @returns Tournoi finalisé
 */
const finishTournament = async (
  tournamentId: string,
  winningTeamId: string
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/finish`,
    { winningTeamId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Supprime un tournoi
 * @param tournamentId - ID du tournoi à supprimer
 */
const deleteTournament = async (tournamentId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${tournamentId}`, {
    withCredentials: true,
  });
};

/**
 * Inscrit un joueur à un tournoi
 * @param tournamentId - ID du tournoi
 * @param userId - ID de l'utilisateur à inscrire
 * @returns Tournoi mis à jour avec le nouveau participant
 */
const registerPlayer = async (
  tournamentId: string,
  userId: string
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/register`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Désinscrit un joueur d'un tournoi
 * @param tournamentId - ID du tournoi
 * @param userId - ID de l'utilisateur à désinscrire
 * @returns Tournoi mis à jour sans le participant
 */
const unregisterPlayer = async (
  tournamentId: string,
  userId: string
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/unregister`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Enregistre le check-in d'un joueur pour un tournoi
 * @param tournamentId - ID du tournoi
 * @param userId - ID de l'utilisateur
 * @param checkedIn - Statut du check-in (true = présent, false = absent)
 * @returns Tournoi mis à jour avec le statut de check-in
 */
const checkInPlayer = async (
  tournamentId: string,
  userId: string,
  checkedIn: boolean
): Promise<Tournament> => {
  const response = await axios.post(
    `${API_URL}/${tournamentId}/check-in`,
    { userId, checkedIn },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  createTournament,
  getTournamentsByGame,
  getTournamentById,
  updateTournament,
  getTournaments,
  generateTeams,
  updateTeamScore,
  finishTournament,
  deleteTournament,
  registerPlayer,
  unregisterPlayer,
  checkInPlayer,
};
