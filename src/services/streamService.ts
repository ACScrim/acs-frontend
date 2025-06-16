import axios from "axios";
import type { TwitchStream, StreamResponse } from "../types";

/**
 * URL de base pour les opérations sur les streams
 */
const API_URL = import.meta.env.VITE_API_URL + "/streams";

/**
 * Récupère les streams en live pour un tournoi spécifique
 * @param tournamentId - ID du tournoi
 * @returns Détails des streams en live pour ce tournoi
 */
const getTournamentStreams = async (
  tournamentId: string
): Promise<StreamResponse> => {
  try {
    const response = await axios.get(`${API_URL}/tournament/${tournamentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des streams du tournoi ${tournamentId}:`,
      error
    );
    throw error;
  }
};

/**
 * Récupère tous les streams en live des utilisateurs ACS
 * @returns Liste de tous les streams en live
 */
const getAllLiveStreams = async (): Promise<{
  liveStreams: TwitchStream[];
  totalStreams: number;
  totalUsersWithTwitch: number;
  lastUpdated: string;
}> => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les streams:", error);
    throw error;
  }
};

/**
 * Récupère les informations d'un streamer spécifique
 * @param twitchUsername - Nom d'utilisateur Twitch
 * @returns Informations du stream si en live
 */
const getStreamerInfo = async (
  twitchUsername: string
): Promise<TwitchStream | null> => {
  try {
    const response = await axios.get(`${API_URL}/streamer/${twitchUsername}`, {
      withCredentials: true,
    });
    return response.data.isLive ? response.data : null;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des infos du streamer ${twitchUsername}:`,
      error
    );
    throw error;
  }
};

/**
 * Teste la connexion avec l'API Twitch
 * @returns Statut de la connexion Twitch
 */
const testTwitchConnection = async (): Promise<{
  message: string;
  hasToken: boolean;
  timestamp: string;
}> => {
  try {
    const response = await axios.get(`${API_URL}/test-connection`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du test de connexion Twitch:", error);
    throw error;
  }
};

/**
 * Récupère les détails des participants d'un tournoi (pour debug)
 * @param tournamentId - ID du tournoi
 * @returns Détails de debug sur les participants
 */
const getTournamentParticipantsDebug = async (
  tournamentId: string
): Promise<{
  tournamentName: string;
  totalPlayers: number;
  playersWithUserAccounts: number;
  usersWithTwitch: number;
  players: Array<{
    playerId: string;
    playerName: string;
    hasUserId: boolean;
    userId: string | null;
  }>;
  usersWithTwitchDetails: Array<{
    userId: string;
    username: string;
    twitchUsername: string;
  }>;
  usersWithoutTwitch: Array<{
    userId: string;
    username: string;
  }>;
}> => {
  try {
    const response = await axios.get(
      `${API_URL}/tournament/${tournamentId}/debug`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors du debug des participants du tournoi ${tournamentId}:`,
      error
    );
    throw error;
  }
};

/**
 * Génère l'URL de la thumbnail d'un stream avec une taille personnalisée
 * @param thumbnailUrl - URL de base de la thumbnail
 * @param width - Largeur souhaitée (par défaut 320)
 * @param height - Hauteur souhaitée (par défaut 180)
 * @returns URL de la thumbnail avec la taille spécifiée
 */
const getStreamThumbnail = (
  thumbnailUrl: string,
  width: number = 320,
  height: number = 180
): string => {
  return thumbnailUrl
    .replace("{width}", width.toString())
    .replace("{height}", height.toString());
};

/**
 * Génère l'URL d'embed Twitch pour un streamer
 * @param twitchUsername - Nom d'utilisateur Twitch
 * @param parent - Domaine parent pour l'embed (requis par Twitch)
 * @returns URL d'embed Twitch
 */
const getTwitchEmbedUrl = (
  twitchUsername: string,
  parent: string = window.location.hostname
): string => {
  return `https://player.twitch.tv/?channel=${twitchUsername}&parent=${parent}&autoplay=false&muted=false`;
};

/**
 * Formate le nombre de viewers avec des suffixes (K, M)
 * @param viewerCount - Nombre de viewers
 * @returns Nombre formaté (ex: "1.2K", "45", "2.1M")
 */
const formatViewerCount = (viewerCount: number): string => {
  if (viewerCount >= 1000000) {
    return (viewerCount / 1000000).toFixed(1) + "M";
  } else if (viewerCount >= 1000) {
    return (viewerCount / 1000).toFixed(1) + "K";
  }
  return viewerCount.toString();
};

/**
 * Calcule la durée du stream depuis son début
 * @param startedAt - Date de début du stream (ISO string)
 * @returns Durée formatée (ex: "2h 30m", "45m", "1h")
 */
const getStreamDuration = (startedAt: string): string => {
  const start = new Date(startedAt);
  const now = new Date();
  const durationMs = now.getTime() - start.getTime();

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Vérifie si un tournoi a lieu aujourd'hui
 * @param tournamentDate - Date du tournoi (ISO string)
 * @returns true si le tournoi a lieu aujourd'hui
 */
const isTournamentToday = (tournamentDate: string): boolean => {
  const today = new Date();
  const tournament = new Date(tournamentDate);

  return (
    today.getFullYear() === tournament.getFullYear() &&
    today.getMonth() === tournament.getMonth() &&
    today.getDate() === tournament.getDate()
  );
};

export default {
  // API calls
  getTournamentStreams,
  getAllLiveStreams,
  getStreamerInfo,
  testTwitchConnection,
  getTournamentParticipantsDebug,

  // Utility functions
  getStreamThumbnail,
  getTwitchEmbedUrl,
  formatViewerCount,
  getStreamDuration,
  isTournamentToday,
};
