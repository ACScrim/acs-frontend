import axios from "axios";
import type { Tournament } from "../types";
import type { Team } from "../types";
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

const createDiscordChannels = async (teams: Team[]): Promise<void> => {
  await axios.post(
    `${API_URL}/create-discord-channels`,
    { teams },
    {
      withCredentials: true,
    }
  );
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
 * Met à jour uniquement les équipes d'un tournoi
 * Méthode dédiée pour optimiser les performances et éviter les conflits
 * @param tournamentId - ID du tournoi
 * @param teams - Nouvelles équipes à sauvegarder
 * @returns Tournoi avec les équipes mises à jour
 */
const updateTournamentTeams = async (
  tournamentId: string,
  teams: Team[]
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/teams`,
    { teams },
    {
      withCredentials: true,
    }
  );
  return response.data.tournament;
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

/**
 * Met à jour le classement d'une équipe dans un tournoi
 * @param tournamentId - ID du tournoi
 * @param teamId - ID de l'équipe
 * @param ranking - Nouveau classement (1 = premier, 2 = deuxième, etc.)
 * @returns Tournoi avec le classement mis à jour
 */
const updateTeamRanking = async (
  tournamentId: string,
  teamId: string,
  ranking: number
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/teams/${teamId}/ranking`,
    { ranking },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Marque un tournoi comme terminé sans déclarer d'équipe gagnante particulière
 * Toutes les équipes classées 1ère seront considérées comme gagnantes
 * @param tournamentId - ID du tournoi
 * @returns Tournoi mis à jour
 */
const markTournamentAsFinished = async (
  tournamentId: string
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/mark-finished`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

/**
 * Annule la finalisation d'un tournoi (le remettre en état "non terminé")
 * @param tournamentId - ID du tournoi
 * @returns Tournoi mis à jour
 */
const unmarkTournamentAsFinished = async (
  tournamentId: string
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/unmark-finished`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

/**
 * Supprime toutes les équipes d'un tournoi
 * @param tournamentId - ID du tournoi dont on veut supprimer les équipes
 * @returns Tournoi avec les équipes supprimées
 */
const deleteAllTeams = async (tournamentId: string): Promise<Tournament> => {
  const response = await axios.delete(
    `${API_URL}/${tournamentId}/delete-teams`,
    {
      withCredentials: true,
    }
  );
  return response.data.tournament;
};

/**
 * Publie ou dépublie les équipes d'un tournoi
 * @param tournamentId - ID du tournoi
 * @param published - Statut de publication (true = publié, false = non publié)
 * @returns Tournoi mis à jour avec les équipes publiées ou dépubliées
 */
const toggleTeamsPublication = async (
  tournamentId: string,
  published: boolean
): Promise<Tournament> => {
  const response = await axios.put(
    `${API_URL}/${tournamentId}/publish-teams`,
    { published },
    {
      withCredentials: true,
    }
  );
  return response.data.tournament;
};

export default {
  createTournament,
  getTournamentsByGame,
  getTournamentById,
  updateTournament,
  getTournaments,
  generateTeams,
  updateTeamScore,
  deleteTournament,
  registerPlayer,
  unregisterPlayer,
  checkInPlayer,
  updateTeamRanking,
  createDiscordChannels,
  updateTournamentTeams,
  markTournamentAsFinished,
  unmarkTournamentAsFinished,
  deleteAllTeams,
  toggleTeamsPublication,
};
