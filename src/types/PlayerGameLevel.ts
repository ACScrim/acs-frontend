import type { Game } from "./Game";
import type { Player } from "./Player";

export interface PlayerGameLevel {
  _id?: string;
  player: Player;
  game: string | Game;
  level: "débutant" | "intermédiaire" | "avancé" | "expert";
  gameUsername?: string;
  isRanked?: boolean;
  rank?: string;
  selectedRoles?: string[];
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInfo {
  username: string;
  avatarUrl?: string;
}
