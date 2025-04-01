import { defineStore } from "pinia";
import { ref, computed } from "vue";
import userService from "../services/userService";
import playerService from "../services/playerService";

interface User {
  _id?: string;
  username: string;
  email: string;
  role: "user" | "admin" | "superadmin";
  avatarUrl?: string;
  playerId?: string;
}

export const useMemberStore = defineStore("members", () => {
  // State
  const members = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref<string | null>(null); // Ajout du state pour les succès
  const lastFetchTime = ref<number | null>(null);

  // Getters
  const shouldRefreshData = computed(() => {
    if (!lastFetchTime.value) return true;
    return Date.now() - lastFetchTime.value > 1800000; // 5 minutes
  });

  // Actions
  const fetchMembers = async (forceRefresh = false) => {
    if (!forceRefresh && members.value.length > 0 && !shouldRefreshData.value) {
      return;
    }

    loading.value = true;
    error.value = null;
    success.value = null; // Reset du message de succès

    try {
      const fetchedUsers = await userService.fetchAllUsers();

      const playerPromises = fetchedUsers.map((user: { _id: string }) =>
        playerService
          .getPlayerByIdUser(user._id!)
          .then((player) => ({ userId: user._id, playerId: player._id }))
          .catch((err) => {
            console.error(`Erreur pour l'utilisateur ${user._id}:`, err);
            return { userId: user._id, playerId: null };
          })
      );

      const playerResults = await Promise.all(playerPromises);

      const playerIdMap = playerResults.reduce((acc, curr) => {
        if (curr.playerId) {
          acc[curr.userId] = curr.playerId;
        }
        return acc;
      }, {} as Record<string, string>);

      members.value = fetchedUsers.map((user: { _id: string }) => ({
        ...user,
        playerId: playerIdMap[user._id as string],
      }));

      lastFetchTime.value = Date.now();
      saveToLocalStorage();

      // Message de succès
      success.value = "Liste des membres mise à jour avec succès";

      // Effacer automatiquement le message après 5 secondes
      setTimeout(() => {
        success.value = null;
      }, 5000);
    } catch (err) {
      console.error("Erreur lors de la récupération des membres:", err);
      error.value = "Erreur lors de la récupération des membres.";
      loadFromLocalStorage();
    } finally {
      loading.value = false;
    }
  };

  // Méthodes pour localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem(
      "memberStore",
      JSON.stringify({
        members: members.value,
        lastFetchTime: lastFetchTime.value,
      })
    );
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("memberStore");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        members.value = parsedData.members || [];
        lastFetchTime.value = parsedData.lastFetchTime || null;
      } catch (e) {
        console.error("Erreur lors du parsing des données sauvegardées", e);
      }
    }
  };

  // Initialisation
  loadFromLocalStorage();

  return {
    members,
    loading,
    error,
    success, // Exposer le state success
    fetchMembers,
    shouldRefreshData,
  };
});
