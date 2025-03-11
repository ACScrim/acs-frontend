import { defineStore } from "pinia";
import axios from "axios";

interface User {
  username: string;
  email: string;
  role: string;
  discordId: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
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
        console.log("User fetched:", this.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.user = null; // Assurez-vous de réinitialiser l'utilisateur en cas d'erreur
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
        console.log("Logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
});
