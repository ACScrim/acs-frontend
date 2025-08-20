/**
 * Interface pour représenter un championnat de saison d'un joueur
 */
export interface SeasonChampionship {
  seasonNumber: number;
  seasonId: string;
  totalVictories: number;
  totalTournaments: number;
  isChampion: boolean;
}
