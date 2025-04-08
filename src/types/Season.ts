// Ajouter ce type à votre fichier de types existant
import type { Tournament } from "./Tournament"; // Adjust the path as needed

/**
 * Représente une saison de tournois
 */
export interface Season {
  _id: string;
  numero: number; // Numéro de la saison
  tournois: Tournament[]; // Ensure Tournament is defined or imported
}
