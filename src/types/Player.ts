import type { Badge } from "./Badge";

export interface Player {
  _id?: string;
  username: string;
  userId: string;
  discordId?: string;
  badges?: Badge[];
}

export interface PlayerCheckedIn extends Player {
  checkedIn: boolean;
}

// Nouveau type pour représenter un tournoi dans lequel un joueur a participé
export interface TournamentParticipation {
  _id: string;
  name: string;
  date: string;
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
