/**
 * Interface représentant un rôle de jeu
 */
export interface GameRole {
  name: string;
  color: string;
}

/**
 * Interface représentant un jeu
 */
export interface Game {
  _id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  roles?: GameRole[];
}

/**
 * Interface représentant un jeu de l'API RAWG avec détails supplémentaires
 */
// Define or import the RawgGame interface
import type { RawgGame } from "./GameProposal";

export interface RawgGameDetails extends RawgGame {
  description_raw?: string;
  released?: string;
  website?: string;
  developers?: Array<{ name: string }>;
  genres: Array<{ id: number; name: string }>;
  platforms: Array<{ platform: { id: number; name: string } }>;
}
