<template>
  <div class="flex flex-col items-center justify-center p-8 bg-neon-gradient">
    <h1 class="text-4xl text-white mb-8 neon-text">Création d'un Tournoi</h1>
    <form @submit.prevent="createTournament" class="w-full max-w-lg">
      <div class="mb-6 form-group">
        <label for="name" class="block text-lg text-white mb-2 neon-label">
          Nom du Tournoi <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>
      <div class="mb-6 form-group">
        <label for="game" class="block text-lg text-white mb-2 neon-label">
          Jeu <span class="text-red-500">*</span>
        </label>
        <select
          id="game"
          v-model="game"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        >
          <option v-for="game in games" :key="game._id" :value="game._id">
            {{ game.name }}
          </option>
        </select>
      </div>
      <div class="mb-6 form-group">
        <label for="date" class="block text-lg text-white mb-2 neon-label">
          Date <span class="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          v-model="date"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>
      <div class="mb-6 form-group">
        <label
          for="discordChannelName"
          class="block text-lg text-white mb-2 neon-label"
        >
          Nom du Channel Discord <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="discordChannelName"
          v-model="discordChannelName"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>
      <div class="mb-6 form-group">
        <label for="players" class="block text-lg text-white mb-2 neon-label">
          Ajouter des Joueurs
        </label>
        <input
          type="text"
          id="players"
          autocomplete="off"
          v-model="playerSearch"
          @focus="showPlayerList = true"
          @blur="hidePlayerList"
          @input="searchPlayers"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <div
          v-if="showPlayerList"
          class="mt-2 bg-gray-800 rounded shadow p-4 max-h-48 overflow-y-auto"
        >
          <ul>
            <li
              v-for="player in filteredPlayers"
              :key="player._id"
              @mousedown.prevent="addPlayer(player)"
              class="cursor-pointer hover:bg-gray-700 p-2 rounded"
            >
              {{ player.username }}
            </li>
          </ul>
        </div>
        <div class="mt-2">
          <span
            v-for="player in selectedPlayers"
            :key="player._id"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {{ player.username }}
            <button @click="removePlayer(player)" class="ml-2 text-red-500">
              x
            </button>
          </span>
        </div>
      </div>
      <button
        type="submit"
        class="px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Créer le Tournoi
      </button>
    </form>
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import tournamentService from "../services/tournamentService";
import gameService from "../services/gameService";
import type { Game } from "../services/gameService";
import playerService from "../services/playerService";
import type { Player } from "../services/playerService";
import Toast from "@/shared/Toast.vue";

const name = ref<string>("");
const game = ref<Game | null>(null);
const date = ref<string>("");
const discordChannelName = ref<string>("");
const playerSearch = ref<string>("");
const playerSearchResults = ref<Player[]>([]);
const selectedPlayers = ref<Player[]>([]);
const allPlayers = ref<Player[]>([]);
const showPlayerList = ref<boolean>(false);

const games = ref<Game[]>([]);

const fetchGames = async () => {
  games.value = await gameService.getGames();
};

const fetchAllPlayers = async () => {
  allPlayers.value = await playerService.getPlayers();
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
  const selectedPlayerIds = new Set(selectedPlayers.value.map((p) => p._id));
  if (playerSearch.value.length > 0) {
    return playerSearchResults.value.filter(
      (player) => !selectedPlayerIds.has(player._id)
    );
  }
  return allPlayers.value.filter(
    (player) => !selectedPlayerIds.has(player._id)
  );
});

const addPlayer = (player: Player) => {
  if (!selectedPlayers.value.some((p) => p._id === player._id)) {
    selectedPlayers.value.push(player);
  }
  playerSearch.value = "";
  playerSearchResults.value = [];
  showPlayerList.value = false;

  // Retirer le focus de l'input
  const playerInput = document.getElementById("players") as HTMLInputElement;
  if (playerInput) {
    playerInput.blur();
  }
};

const removePlayer = (player: Player) => {
  selectedPlayers.value = selectedPlayers.value.filter(
    (p) => p._id !== player._id
  );
};

const createTournament = async () => {
  try {
    const tournament = {
      name: name.value,
      game: game.value as Game,
      date: date.value,
      discordChannelName: discordChannelName.value,
      players: selectedPlayers.value,
      finished: false,
    };
    await tournamentService.createTournament(tournament);
    showMessage("success", "Tournoi créé avec succès !");
    resetForm();
  } catch (err) {
    console.error("Erreur lors de la création du tournoi:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
  }
};

const resetForm = () => {
  name.value = "";
  game.value = null;
  date.value = "";
  discordChannelName.value = "";
  selectedPlayers.value = [];
};

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

const hidePlayerList = () => {
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

fetchGames();
fetchAllPlayers();
</script>

<style scoped></style>
