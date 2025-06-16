/**
 * Interface pour un stream Twitch
 */
export interface TwitchStream {
  userId: string;
  userName: string;
  gameId: string;
  gameName: string;
  title: string;
  viewerCount: number;
  startedAt: string;
  thumbnailUrl: string;
  isLive: boolean;

  // Informations enrichies sur le participant
  participantId: string;
  participantUsername: string;
  playerId?: string;
  playerName?: string;
}

/**
 * Interface pour un utilisateur avec Twitch
 */
export interface UserWithTwitch {
  userId: string;
  username: string;
  twitchUsername: string;
  isLive: boolean;
  isParticipant: boolean;
  stream?: TwitchStream | null;
}

/**
 * Interface pour la réponse de l'API des streams de tournoi
 */
export interface StreamResponse {
  tournamentId: string;
  tournamentName: string;
  liveStreams: TwitchStream[];
  allUsersWithTwitch: UserWithTwitch[];
  totalStreams: number;
  totalUsersWithTwitch: number;
  isToday: boolean;
  participantsCount: number;
  lastUpdated: string;
  message?: string;
  tournamentDate?: string;
}
