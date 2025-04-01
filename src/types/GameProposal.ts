// Ajouter ces interfaces à votre fichier de types existant

// SIMPLIFIER:
export interface GameProposal {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  rawgId?: number;
  // Simplifier cette définition
  proposedBy:
    | string
    | {
        _id?: string;
        username?: string;
        avatarUrl?: string;
      }
    | null;
  status: "pending" | "approved" | "rejected";
  votes: ProposalVote[];
  totalVotes: number;
  userVote: number | null;
  rejectionReason?: string;
  createdAt: string;
  expiresAt: string;
}

export interface ProposalVote {
  player: string;
  value: number;
  _id: string;
  createdAt: string;
}

/**
 * Interface pour les jeux RAWG (résultats de recherche)
 */
export interface RawgGame {
  id: number;
  name: string;
  background_image: string;
  description?: string;
  released?: string;
  metacritic?: number;
  genres?: Array<{ id: number; name: string }>;
  platforms?: Array<{ platform: { id: number; name: string } }>;
  description_raw?: string; // Ajouté du RawgGameDetails
  website?: string; // Ajouté du RawgGameDetails
  developers?: Array<{ name: string }>; // Ajouté du RawgGameDetails
}
