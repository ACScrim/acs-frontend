import type { Game } from "./Game";
import type { Player } from "./Player";

export interface Team {
  _id: string;
  name: string;
  players: Player[];
  score: number;
}

export interface Tournament {
  _id?: string;
  name: string;
  game: Game;
  date: string;
  discordChannelName: string;
  players: Player[];
  finished: boolean;
  teams?: Team[];
  description?: string;
  winningTeam?: Team;
  checkIns?: { [key: string]: boolean };
}

export interface TournamentWinner {
  tournamentId: string;
  tournamentName: string;
  winningTeam: {
    name: string;
    players: Player[];
  };
}
