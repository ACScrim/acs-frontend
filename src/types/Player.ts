import type { Badge } from "./Badge";
import type { Game } from "./Game";
import type { UserInfo } from "./PlayerGameLevel";
export interface Player {
  _id?: string;
  username: string;
  userId: string;
  discordId?: string;
  badges?: Badge[];
  userInfo?: UserInfo; // Ajout de cette propriété pour le rendu
}

export interface PlayerCheckedIn extends Player {
  checkedIn: boolean;
}

// Nouveau type pour représenter un tournoi dans lequel un joueur a participé
export interface TournamentParticipation {
  _id: string;
  name: string;
  date: string;
  game: Game;
  rank: number | null;
  teamName: string;
  numberOfTeams: number;
}

export interface PlayerRanking {
  playerId: string;
  username: string;
  totalPoints: number;
  totalTournaments: number;
  totalVictories: number;
  tournamentsParticipated: TournamentParticipation[];
}
