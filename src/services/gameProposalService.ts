import axios from "axios";
import type { GameProposal } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/game-proposals";

/**
 * Récupère les propositions de jeu avec filtres optionnels
 * @param status - Statut des propositions à récupérer (pending, approved, rejected)
 * @param sort - Critère de tri (votes, recent)
 * @returns Liste des propositions de jeu
 */
const getProposals = async (
  status?: string,
  sort: string = "votes"
): Promise<GameProposal[]> => {
  try {
    const params: Record<string, string> = { sort };
    if (status) params.status = status;

    const response = await axios.get(API_URL, {
      params,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des propositions de jeu:",
      error
    );
    throw error;
  }
};

/**
 * Crée une nouvelle proposition de jeu
 * @param proposal - Données de la proposition
 * @returns Proposition créée
 */
const createProposal = async (
  proposal: Partial<GameProposal>
): Promise<GameProposal> => {
  try {
    const response = await axios.post(API_URL, proposal, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création de la proposition de jeu:",
      error
    );
    throw error;
  }
};

/**
 * Vote pour une proposition de jeu
 * @param proposalId - Identifiant de la proposition
 * @param value - Valeur du vote (1=upvote, -1=downvote)
 * @returns Proposition mise à jour
 */
const voteProposal = async (
  proposalId: string,
  value: number
): Promise<GameProposal> => {
  try {
    const response = await axios.post(
      `${API_URL}/${proposalId}/vote`,
      { value },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors du vote pour la proposition:", error);
    throw error;
  }
};

/**
 * Modère une proposition (admin uniquement)
 * @param proposalId - Identifiant de la proposition
 * @param status - Nouveau statut (approved ou pending)
 * @returns Proposition mise à jour
 */
const moderateProposal = async (
  proposalId: string,
  status: "approved" | "pending"
): Promise<GameProposal> => {
  try {
    const response = await axios.patch(
      `${API_URL}/${proposalId}/moderate`,
      {
        status,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modération de la proposition:", error);
    throw error;
  }
};

// Modifier toutes les fonctions pour utiliser cette instance
const deleteProposal = async (proposalId: string) => {
  // Utiliser l'instance api configurée ou ajouter withCredentials à votre appel existant
  const response = await axios.delete(`${API_URL}/${proposalId}`, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getProposals,
  createProposal,
  voteProposal,
  moderateProposal,
  deleteProposal,
};
