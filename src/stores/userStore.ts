import { defineStore } from "pinia";
import axios from "axios";
import playerService from "../services/playerService";
import type { Player, User } from "../types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    player: null as Player | null,
  }),
  getters: {
    isSuperAdmin: (state) => state.user?.role === "superadmin",
    isAdmin: (state) =>
      state.user?.role === "admin" || state.user?.role === "superadmin",
    isLoggedIn: (state) => !!state.user,
    playerId: (state) => state.player?._id || null,
  },
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            withCredentials: true,
          }
        );
        this.user = response.data;
        if (this.user) {
          await this.fetchPlayer(this.user._id);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.user = null; // Assurez-vous de réinitialiser l'utilisateur en cas d'erreur
      }
    },
    async fetchPlayer(userId: string) {
      try {
        const player = await playerService.getPlayerByIdUser(userId);
        this.player = player;
      } catch (error) {
        console.error("Error fetching player profile:", error);
        this.player = null; // Assurez-vous de réinitialiser le joueur en cas d'erreur
      }
    },
    async logout() {
      try {
        console.log("Logging out...");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        this.user = null;
        this.player = null;
        console.log("Logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
});
