import axios from "axios";
import type { Announcement } from "../types/Announcement";

/**
 * URL de base pour les opérations sur les annonces
 */
const API_URL = import.meta.env.VITE_API_URL + "/announcements";

/**
 * Récupère toutes les annonces existantes
 * @returns Liste des annonces
 */
const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

/**
 * Récupère une annonce par son ID
 * @param id - ID de l'annonce
 * @returns Détails de l'annonce
 */
const getAnnouncement = async (id: string): Promise<Announcement> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Crée une nouvelle annonce
 * @param announcementData - Données de l'annonce à créer
 * @returns L'annonce créée avec son ID généré
 */
const createAnnouncement = async (
  announcementData: Partial<Announcement>
): Promise<Announcement> => {
  const response = await axios.post(`${API_URL}`, announcementData, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Met à jour une annonce existante
 * @param id - ID de l'annonce à mettre à jour
 * @param announcementData - Nouvelles données de l'annonce
 * @returns Annonce mise à jour
 */
const updateAnnouncement = async (
  id: string,
  announcementData: Partial<Announcement>
): Promise<Announcement> => {
  const response = await axios.put(`${API_URL}/${id}`, announcementData, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Supprime une annonce
 * @param id - ID de l'annonce à supprimer
 */
const deleteAnnouncement = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
};

/**
 * Met à jour la mise en avant d'une annonce
 * @param id - ID de l'annonce
 * @param featured - Statut de mise en avant (true = mise en avant, false = standard)
 * @returns Annonce mise à jour
 */
const updateAnnouncementFeatured = async (
  id: string,
  featured: boolean
): Promise<Announcement> => {
  const response = await axios.put(
    `${API_URL}/${id}/featured`,
    { featured },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Récupère les annonces mises en avant uniquement
 * @returns Liste des annonces mises en avant
 */
const getFeaturedAnnouncements = async (): Promise<Announcement[]> => {
  const response = await axios.get(`${API_URL}/featured`);
  return response.data;
};

/**
 * Récupère les dernières annonces publiées avec une limite optionnelle
 * @param limit - Nombre maximum d'annonces à récupérer
 * @returns Liste des dernières annonces
 */
const getLatestAnnouncements = async (
  limit?: number
): Promise<Announcement[]> => {
  const params = limit ? { limit } : {};
  const response = await axios.get(`${API_URL}/latest`, { params });
  return response.data;
};

export default {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  updateAnnouncementFeatured,
  getFeaturedAnnouncements,
  getLatestAnnouncements,
};
