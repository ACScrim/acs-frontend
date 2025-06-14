/**
 * Interface pour les roles de jeu Discord
 */
export interface GameRoles {
  gameId: string;
  enabled: boolean;
}

/**
 * Interface pour le profil utilisateur
 */
export interface UserProfile {
  twitchUsername?: string | null; // ✅ CORRIGER : permettre null
  gameRoles: GameRoles[];
}

/**
 * Interface représentant un utilisateur dans le système
 *
 * Cette interface définit la structure d'un utilisateur telle qu'attendue
 * par les composants frontend et reçue depuis l'API backend.
 */
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  discordId: string;
  avatarUrl: string;
  profile: UserProfile;
}
