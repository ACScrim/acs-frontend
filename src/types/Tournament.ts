import type { Game } from "./Game";
import type { Player } from "./Player";
/**
 * Interface représentant une équipe participant à un tournoi
 *
 * Cette structure définit les propriétés d'une équipe et ses relations
 * avec les joueurs et les scores dans le contexte d'un tournoi
 */
export interface Team {
  _id: string;
  name: string;
  players: Player[];
  score: number;
  ranking: number;
}

export interface Clip {
  _id: string;
  url: string;
  title?: string;
  addedBy: Player;
  addedAt: string;
}

/**
 * Interface principale représentant un tournoi
 *
 * Définit la structure complète d'un tournoi avec ses propriétés,
 * participants et résultats
 */
export interface Tournament {
  _id?: string;
  name: string;
  game: Game;
  date: string;
  discordChannelName: string;
  players: Player[];
  waitlistPlayers?: Player[]; // Nouvelle propriété
  playerCap: number; // Nouvelle propriété
  teams?: Team[];
  teamsPublished: boolean;
  finished: boolean;
  description?: string;
  checkIns?: { [key: string]: boolean };
  registrationDates?: { [key: string]: string };
  waitlistRegistrationDates?: { [key: string]: string }; // Nouvelle propriété
  discordReminderDate: Date;
  privateReminderDate: Date;
  mvps?: { player: Player & { avatarUrl: string }; votes: string[]; isMvp: boolean }[];
  mvpVoteOpen?: boolean;
  casters: Player[];
  clips: Clip[];
}

/**
 * Interface représentant le résultat d'un tournoi
 *
 * Utilisée pour afficher les gagnants d'un tournoi spécifique
 * dans les classements et historiques
 */
export interface TournamentWinner {
  tournamentId: string;
  tournamentName: string;
}
