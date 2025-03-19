import axios from "axios";
import type { Badge } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/badges";

const createBadge = async (badge: Badge): Promise<Badge> => {
  const response = await axios.post(API_URL, badge, { withCredentials: true });
  return response.data;
};

const getBadges = async (): Promise<Badge[]> => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

const getBadgeById = async (badgeId: string): Promise<Badge> => {
  const response = await axios.get(`${API_URL}/${badgeId}`, {
    withCredentials: true,
  });
  return response.data;
};

const assignBadgeToPlayer = async (
  playerId: string,
  badgeId: string
): Promise<void> => {
  const response = await axios.post(
    `${API_URL}/assign`,
    { playerId, badgeId },
    { withCredentials: true }
  );
  return response.data;
};

const removeBadgeFromPlayer = async (
  playerId: string,
  badgeId: string
): Promise<void> => {
  const response = await axios.post(
    `${API_URL}/remove`,
    { playerId, badgeId },
    { withCredentials: true }
  );
  return response.data;
};

export default {
  createBadge,
  getBadges,
  getBadgeById,
  assignBadgeToPlayer,
  removeBadgeFromPlayer,
};
