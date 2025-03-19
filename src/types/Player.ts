import type { Badge } from "./Badge";
import type { Tournament } from "./Tournament";

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

export interface PlayerRanking {
  playerId: string;
  username: string;
  totalPoints: number;
  totalTournaments: number;
  totalVictories: number;
  tournamentsParticipated: Tournament[];
  result: string;
}
