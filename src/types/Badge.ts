export interface Badge {
  _id?: string;
  title: string;
  imageUrl: string;
  description?: string;
  categoryType: string; // "game" | "season" | "event"
  categoryId: string; // ID du jeu, de la saison ou de l'événement associé
}
