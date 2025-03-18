<template>
  <div class="flex flex-col items-center justify-center p-8 bg-neon-gradient">
    <h1 class="text-4xl text-white mb-8 neon-text">
      Modification d'un Tournoi
    </h1>
    <form @submit.prevent="editTournament" class="w-full max-w-lg">
      <div class="mb-6 form-group">
        <label
          for="tournament"
          class="block text-lg text-white mb-2 neon-label"
        >
          Sélectionner un Tournoi <span class="text-red-500">*</span>
        </label>
        <select
          id="tournament"
          v-model="selectedTournament"
          @change="loadTournamentDetails"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        >
          <option
            v-for="tournament in tournaments"
            :key="tournament._id"
            :value="tournament._id"
          >
            {{ tournament.name }}
          </option>
        </select>
      </div>
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
          Date et heure <span class="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
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
        <label
          for="description"
          class="block text-lg text-white mb-2 neon-label"
        >
          Description <span class="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          v-model="description"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        ></textarea>
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
      <div class="flex justify-between">
        <button
          type="submit"
          class="px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Modifier le Tournoi
        </button>
        <button
          v-if="selectedTournament"
          type="button"
          @click="confirmDeleteTournament"
          class="ml-4 px-6 py-3 text-lg font-bold text-white bg-red-500 rounded shadow neon-button hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Supprimer le Tournoi
        </button>
      </div>
    </form>
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      :title="'Confirmer la suppression du tournoi'"
      :message="'Êtes-vous sûr de vouloir supprimer ce tournoi ? Cette action est irréversible.'"
      @confirm="deleteTournament"
      @cancel="showConfirmationDialog = false"
    />
  </div>
</template>
<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\EditTournoi.vue -->
<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\EditTournoi.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ConfirmationDialog from "../shared/ConfirmationDialog.vue";
import Toast from "@/shared/Toast.vue";
import tournamentService from "../services/tournamentService";
import gameService from "../services/gameService";
import playerService from "../services/playerService";
import type { Tournament } from "../services/tournamentService";
import type { Game } from "../services/gameService";
import type { Player, PlayerCheckedIn } from "../services/playerService";

const tournaments = ref<Tournament[]>([]);
const selectedTournament = ref<string>("");
const name = ref<string>("");
const game = ref<string>(""); // Stocke uniquement l'ID du jeu
const date = ref<string>("");
const discordChannelName = ref<string>("");
const playerSearch = ref<string>("");
const playerSearchResults = ref<Player[]>([]);
const selectedPlayers = ref<PlayerCheckedIn[]>([]);
const allPlayers = ref<Player[]>([]);
const showPlayerList = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showConfirmationDialog = ref<boolean>(false);
const description = ref<string>(""); // Ajout de la description

const games = ref<Game[]>([]);

const fetchTournaments = async () => {
  try {
    const allTournaments = await tournamentService.getTournaments();
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
    );
    if (tournaments.value.length === 0) {
      showMessage(
        "error",
        "Aucun tournoi n'est disponible pour le moment. Veuillez en créer un."
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tournois:", error);
  }
};

const formatDate = (isoString: string) => {
  return isoString.slice(0, 16); // Garde la partie YYYY-MM-DDTHH:mm
};

const loadTournamentDetails = async () => {
  if (selectedTournament.value) {
    const tournament = await tournamentService.getTournamentById(
      selectedTournament.value
    );
    name.value = tournament.name;
    game.value = (tournament.game as any)._id;
    date.value = formatDate(tournament.date); // Si `tournament.date` est en format ISO
    discordChannelName.value = tournament.discordChannelName;
    description.value = tournament.description || ""; // Utiliser directement la description du tournoi

    // Utiliser directement les données des joueurs renvoyées par l'API
    selectedPlayers.value = tournament.players.map((player: any) => ({
      _id: player._id,
      username: player.username,
      userId: player.userId,
      checkedIn: tournament.checkIns
        ? tournament.checkIns[player._id] || false
        : false,
    }));
  }
};

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
    selectedPlayers.value.push({ ...player, checkedIn: false });
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

const removePlayer = (player: PlayerCheckedIn) => {
  selectedPlayers.value = selectedPlayers.value.filter(
    (p) => p._id !== player._id
  );
};

const editTournament = async () => {
  try {
    const tournament: Tournament = {
      _id: selectedTournament.value,
      name: name.value,
      game: games.value.find((g) => g._id === game.value) as Game,
      date: new Date(date.value).toISOString(), // Convertir en format ISO
      discordChannelName: discordChannelName.value,
      description: description.value, // Ajout de la description
      players: selectedPlayers.value,
      finished: false,
    };
    await tournamentService.updateTournament(
      selectedTournament.value,
      tournament
    );
    showMessage("success", "Tournoi modifié avec succès !");
  } catch (err) {
    console.error("Erreur lors de la modification du tournoi:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
  }
};

const confirmDeleteTournament = () => {
  showConfirmationDialog.value = true;
};

const deleteTournament = async () => {
  try {
    if (selectedTournament.value) {
      await tournamentService.deleteTournament(selectedTournament.value);
      showMessage("success", "Tournoi supprimé avec succès !");
      fetchTournaments();
      selectedTournament.value = "";
      name.value = "";
      game.value = "";
      date.value = "";
      description.value = ""; // Réinitialiser la description
      discordChannelName.value = "";
      selectedPlayers.value = [];
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du tournoi:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
  } finally {
    showConfirmationDialog.value = false;
  }
};

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
  }, 5000);
};

const hidePlayerList = () => {
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

onMounted(() => {
  fetchTournaments();
  fetchGames();
  fetchAllPlayers();
});
</script>

<style scoped></style>
