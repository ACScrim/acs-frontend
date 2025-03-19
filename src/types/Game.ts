/**
 * Interface représentant le résultat d'un tournoi
 *
 * Utilisée pour afficher les gagnants d'un tournoi spécifique
 * dans les classements et historiques
 */
export interface Game {
  _id?: string;
  name: string;
  description?: string;
}
