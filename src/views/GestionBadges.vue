<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\GestionBadges.vue -->
<template>
  <div class="container mx-auto p-4 bg-neon-gradient min-h-screen">
    <h1 class="text-4xl text-white mb-8 neon-text">Gestion des Badges</h1>

    <div class="mb-4">
      <h2 class="text-2xl text-white mb-4">Créer un nouveau badge</h2>
      <form @submit.prevent="createBadge">
        <div class="mb-4">
          <label for="title" class="block text-lg text-white mb-2">Titre</label>
          <input
            id="title"
            v-model="newBadge.title"
            type="text"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="imageUrl" class="block text-lg text-white mb-2"
            >URL de l'image</label
          >
          <input
            id="imageUrl"
            v-model="newBadge.imageUrl"
            type="text"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600"
        >
          Créer le badge
        </button>
      </form>
    </div>

    <div class="mb-4">
      <h2 class="text-2xl text-white mb-4">Associer un badge à un joueur</h2>
      <form @submit.prevent="assignBadge">
        <div class="mb-4">
          <label for="playerId" class="block text-lg text-white mb-2"
            >Joueur</label
          >
          <input
            id="playerId"
            v-model="playerSearch"
            @focus="showPlayerList = true"
            @blur="hidePlayerList"
            @input="searchPlayers"
            type="text"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <div
            v-if="showPlayerList"
            class="mt-2 bg-gray-800 rounded shadow p-4 max-h-48 overflow-y-auto"
          >
            <ul>
              <li
                v-for="player in filteredPlayers"
                :key="player._id"
                @mousedown.prevent="selectPlayer(player)"
                class="cursor-pointer hover:bg-gray-700 p-2 rounded"
              >
                {{ player.username }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-4">
          <label for="badgeId" class="block text-lg text-white mb-2"
            >Badge</label
          >
          <select
            id="badgeId"
            v-model="badgeId"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          >
            <option v-for="badge in badges" :key="badge._id" :value="badge._id">
              {{ badge.title }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600"
        >
          Associer le badge
        </button>
      </form>
    </div>

    <div class="mb-4">
      <h2 class="text-2xl text-white mb-4">Liste des badges du joueur</h2>
      <div v-if="selectedPlayerBadges.length > 0">
        <ul class="text-white">
          <li v-for="badge in selectedPlayerBadges" :key="badge._id">
            <img
              :src="badge.imageUrl"
              alt="Badge Image"
              class="h-10 w-10 inline-block mr-2"
            />
            {{ badge.title }}
            <button
              @click="removeBadge(badge._id)"
              class="ml-2 px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Supprimer
            </button>
          </li>
        </ul>
      </div>
      <div v-else class="text-white">Aucun badge associé à ce joueur.</div>
    </div>

    <div class="mb-4">
      <h2 class="text-2xl text-white mb-4">Liste des badges</h2>
      <ul class="text-white">
        <li v-for="badge in badges" :key="badge._id">
          <img
            :src="badge.imageUrl"
            alt="Badge Image"
            class="h-10 w-10 inline-block mr-2"
          />
          {{ badge.title }}
        </li>
      </ul>
    </div>

    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import badgeService, { Badge } from "../services/badgeService";
import playerService, { Player } from "../services/playerService";
import Toast from "@/shared/Toast.vue";

const newBadge = ref<Badge>({ title: "", imageUrl: "" });
const playerSearch = ref("");
const playerSearchResults = ref<Player[]>([]);
const selectedPlayer = ref<Player | null>(null);
const badgeId = ref("");
const badges = ref<Badge[]>([]);
const showPlayerList = ref<boolean>(false);
const selectedPlayerBadges = ref<Badge[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

const createBadge = async () => {
  try {
    const createdBadge = await badgeService.createBadge(newBadge.value);
    badges.value.push(createdBadge);
    newBadge.value = { title: "", imageUrl: "" };
    showMessage("success", "Badge créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création du badge:", error);
    showMessage("error", "Erreur lors de la création du badge.");
  }
};

const assignBadge = async () => {
  try {
    if (selectedPlayer.value && badgeId.value) {
      await badgeService.assignBadgeToPlayer(
        selectedPlayer.value._id!,
        badgeId.value
      );
      fetchPlayerBadges(selectedPlayer.value._id!);
      badgeId.value = "";
      showMessage("success", "Badge associé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de l'association du badge:", error);
    showMessage("error", "Erreur lors de l'association du badge.");
  }
};

const removeBadge = async (badgeId: string) => {
  try {
    if (selectedPlayer.value) {
      await badgeService.removeBadgeFromPlayer(
        selectedPlayer.value._id!,
        badgeId
      );
      fetchPlayerBadges(selectedPlayer.value._id!);
      showMessage("success", "Badge supprimé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du badge:", error);
    showMessage("error", "Erreur lors de la suppression du badge.");
  }
};

const fetchBadges = async () => {
  try {
    badges.value = await badgeService.getBadges();
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    showMessage("error", "Erreur lors de la récupération des badges.");
  }
};

const fetchPlayerBadges = async (playerId: string) => {
  try {
    const player = await playerService.getPlayerById(playerId);
    const badgePromises = player.badges.map((badgeId: string) =>
      badgeService.getBadgeById(badgeId)
    );
    selectedPlayerBadges.value = await Promise.all(badgePromises);
    console.log("selectedPlayerBadges", selectedPlayerBadges.value);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des badges du joueur:",
      error
    );
    showMessage(
      "error",
      "Erreur lors de la récupération des badges du joueur."
    );
  }
};

const searchPlayers = async () => {
  if (playerSearch.value.length > 0) {
    playerSearchResults.value = await playerService.searchPlayers(
      playerSearch.value
    );
  } else {
    playerSearchResults.value = [];
  }
};

const filteredPlayers = computed(() => {
  return playerSearchResults.value;
});

const selectPlayer = (player: Player) => {
  selectedPlayer.value = player;
  playerSearch.value = player.username;
  showPlayerList.value = false;
  fetchPlayerBadges(player._id!);
};

const hidePlayerList = () => {
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

onMounted(() => {
  fetchBadges();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
