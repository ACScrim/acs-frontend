<template>
  <div
    class="p-8 bg-gray-900/70 border border-pink-500/30 rounded-xl shadow-lg shadow-pink-500/20 backdrop-blur-md"
  >
    <h1 class="text-4xl text-white text-center mb-8 neon-text font-audiowide">
      Modification d'un Tournoi
    </h1>

    <form @submit.prevent="editTournament" class="w-full max-w-2xl mx-auto">
      <!-- Sélection du tournoi -->
      <div class="mb-6">
        <label
          for="tournament"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
            />
          </svg>
          Sélectionner un Tournoi <span class="text-pink-500">*</span>
        </label>
        <div class="relative">
          <select
            id="tournament"
            v-model="selectedTournament"
            @change="loadTournamentDetails"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
            required
          >
            <option value="" disabled selected>Choisir un tournoi</option>
            <option
              v-for="tournament in tournaments"
              :key="tournament._id"
              :value="tournament._id"
            >
              {{ tournament.name }}
            </option>
          </select>
          <div
            class="absolute top-1/2 right-4 -translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-cyan-500 pointer-events-none"
          ></div>
        </div>
      </div>

      <!-- Nom du tournoi -->
      <div class="form-group">
        <label for="name" class="form-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          Nom du Tournoi <span class="text-pink-500">*</span>
        </label>
        <div class="input-wrapper">
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-input"
            required
            placeholder="Nom du tournoi"
          />
          <div class="input-glow"></div>
        </div>
      </div>

      <!-- Sélection du jeu -->

      <div class="mb-6">
        <label
          for="game"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          Jeu <span class="text-pink-500">*</span>
        </label>
        <div class="relative">
          <select
            id="game"
            v-model="game"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
            required
          >
            <option value="" disabled selected>Sélectionnez un jeu</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </select>
          <div
            class="absolute top-1/2 right-4 -translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-cyan-500 pointer-events-none"
          ></div>
        </div>
      </div>

      <!-- Date et heure -->
      <div class="mb-6">
        <label
          for="date"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          Date <span class="text-pink-500">*</span>
        </label>
        <div class="relative">
          <input
            type="datetime-local"
            id="date"
            v-model="date"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
            required
          />
        </div>
      </div>

      <!-- Nom du channel Discord -->
      <div class="mb-6">
        <label
          for="discordChannelName"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            />
          </svg>
          Nom du Channel Discord <span class="text-pink-500">*</span>
          <span class="group relative ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-cyan-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
            <div
              class="absolute left-1/2 -translate-x-1/2 -top-[60px] w-48 p-2 bg-gray-900 text-cyan-400 text-xs border border-cyan-500/30 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-center font-['Orbitron']"
            >
              Ne pas inclure le symbole "#" dans le nom du canal
            </div>
          </span>
        </label>
        <div class="relative">
          <input
            type="text"
            id="discordChannelName"
            v-model="discordChannelName"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
            required
            placeholder="Ex: tournoi-mario-kart"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label
          for="description"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
          Description <span class="text-pink-500">*</span>
        </label>
        <div class="relative">
          <textarea
            id="description"
            v-model="description"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50 min-h-[120px] resize-y"
            required
            placeholder="Décrivez les détails du tournoi..."
          ></textarea>
        </div>
      </div>

      <!-- Sélection des joueurs -->
      <div class="form-group">
        <label for="players" class="form-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          Ajouter des Joueurs
        </label>
        <div class="input-wrapper">
          <input
            type="text"
            id="players"
            autocomplete="off"
            v-model="playerSearch"
            @focus="showPlayerList = true"
            @blur="hidePlayerList"
            @input="searchPlayers"
            class="form-input"
            placeholder="Rechercher un joueur..."
          />
          <div class="input-glow"></div>
        </div>

        <!-- Liste des résultats de recherche -->
        <div v-if="showPlayerList" class="player-search-results">
          <ul>
            <li
              v-for="player in filteredPlayers"
              :key="player._id"
              @mousedown.prevent="addPlayer(player)"
              class="player-search-item"
            >
              {{ player.username }}
            </li>
            <li v-if="filteredPlayers.length === 0" class="player-search-empty">
              Aucun joueur trouvé
            </li>
          </ul>
        </div>

        <!-- Liste des joueurs sélectionnés -->
        <div class="selected-players-container">
          <div
            v-for="player in selectedPlayers"
            :key="player._id"
            class="selected-player"
          >
            {{ player.username }}
            <button
              @click="removePlayer(player)"
              class="remove-player-btn"
              aria-label="Retirer le joueur"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-wrap gap-4 mt-8 justify-center">
        <button
          type="submit"
          class="cyberpunk-btn-cyan py-3 px-6 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 relative z-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
          <span class="relative z-10 font-['Orbitron'] font-semibold uppercase"
            >Modifier le Tournoi</span
          >
        </button>

        <button
          v-if="selectedTournament"
          type="button"
          @click="confirmDeleteTournament"
          class="cyberpunk-btn-red py-3 px-6 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 relative z-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="relative z-10 font-['Orbitron'] font-semibold uppercase"
            >Supprimer le Tournoi</span
          >
        </button>
      </div>
    </form>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      title="Confirmer la suppression du tournoi"
      message="Êtes-vous sûr de vouloir supprimer ce tournoi ? Cette action est irréversible."
      @confirm="deleteTournament"
      @cancel="showConfirmationDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
// Script inchangé
import { ref, onMounted, computed } from "vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import Toast from "@/shared/Toast.vue";
import tournamentService from "../../services/tournamentService";
import gameService from "../../services/gameService";
import playerService from "../../services/playerService";
import type { Tournament, Game, Player, PlayerCheckedIn } from "../../types";

const tournaments = ref<Tournament[]>([]);
const selectedTournament = ref<string>("");
const name = ref<string>("");
const game = ref<string>("");
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
const description = ref<string>("");

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
// Convertit une date ISO UTC en format local pour l'input datetime-local
const formatDateForInput = (isoString: string) => {
  const date = new Date(isoString);

  // Format YYYY-MM-DDTHH:MM requis par l'input datetime-local
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const loadTournamentDetails = async () => {
  if (selectedTournament.value) {
    const tournament = await tournamentService.getTournamentById(
      selectedTournament.value
    );

    name.value = tournament.name;
    game.value = (tournament.game as any)._id;

    // Formater la date pour l'affichage dans le champ date
    date.value = formatDateForInput(tournament.date);

    discordChannelName.value = tournament.discordChannelName;
    description.value = tournament.description || "";

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
    // Créer un objet Date à partir de l'entrée du formulaire
    const selectedDate = new Date(date.value);

    const tournament: Tournament = {
      _id: selectedTournament.value,
      name: name.value,
      game: games.value.find((g) => g._id === game.value) as Game,
      date: selectedDate.toISOString(), // Convertir automatiquement en UTC
      discordChannelName: discordChannelName.value,
      description: description.value,
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
      description.value = "";
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

<style scoped>
/* Formulaire */
.tournament-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

/* Groupe de formulaire */
.form-group {
  margin-bottom: 0.5rem;
  width: 100%;
}

/* Label du formulaire */
.form-label {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  color: #06b6d4;
  margin-bottom: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
}

/* Container d'input */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* Inputs stylisés */
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  color: white;
  background-color: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 5px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

/* Container pour le select */
.select-wrapper {
  position: relative;
  width: 100%;
}

/* Flèche personnalisée pour le select */
.select-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #06b6d4;
  pointer-events: none;
}

/* Effet de lueur pour les inputs */
.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}

.form-input:focus + .input-glow,
.form-textarea:focus + .input-glow,
.form-select:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Résultats de recherche de joueurs */
.player-search-results {
  margin-top: 0.5rem;
  background-color: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.player-search-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Orbitron", sans-serif;
  color: white;
}

.player-search-item:hover {
  background-color: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
}

.player-search-empty {
  padding: 0.75rem 1rem;
  color: #a78bfa;
  font-style: italic;
  text-align: center;
}

/* Container pour les joueurs sélectionnés */
.selected-players-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Style pour chaque joueur sélectionné */
.selected-player {
  display: flex;
  align-items: center;
  background: rgba(139, 92, 246, 0.2);
  color: white;
  font-family: "Orbitron", sans-serif;
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  border: 1px solid rgba(139, 92, 246, 0.5);
  transition: all 0.3s ease;
}

.selected-player:hover {
  background: rgba(139, 92, 246, 0.3);
  border-color: rgba(139, 92, 246, 0.7);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

/* Bouton pour retirer un joueur */
.remove-player-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.remove-player-btn:hover {
  color: #ec4899;
}

/* Groupe de boutons */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

/* Bouton d'édition néon */
.neon-button-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #0891b2, #06b6d4);
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  border: 1px solid rgba(6, 182, 212, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.neon-button-edit:hover {
  background: linear-gradient(45deg, #06b6d4, #22d3ee);
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7), 0 0 30px rgba(6, 182, 212, 0.4);
}

.neon-button-edit:active {
  transform: translateY(-1px);
}

/* Bouton de suppression néon */
.neon-button-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #be123c, #e11d48);
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(225, 29, 72, 0.5), 0 0 20px rgba(225, 29, 72, 0.3);
  border: 1px solid rgba(225, 29, 72, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.neon-button-delete:hover {
  background: linear-gradient(45deg, #e11d48, #fb7185);
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(225, 29, 72, 0.7), 0 0 30px rgba(225, 29, 72, 0.4);
}

.neon-button-delete:active {
  transform: translateY(-1px);
}

/* Effet de balayage lumineux pour les boutons */
.neon-button-edit::before,
.neon-button-delete::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s ease;
}

.neon-button-edit:hover::before,
.neon-button-delete:hover::before {
  left: 100%;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.8);
}

/* Media queries pour responsive */
@media (max-width: 640px) {
  .button-group {
    flex-direction: column;
  }

  .neon-button-edit,
  .neon-button-delete {
    width: 100%;
  }
}

/* Animation de pulse pour les boutons */
@keyframes pulse-cyan {
  0% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.7), 0 0 30px rgba(6, 182, 212, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  }
}

@keyframes pulse-red {
  0% {
    box-shadow: 0 0 10px rgba(225, 29, 72, 0.5), 0 0 20px rgba(225, 29, 72, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(225, 29, 72, 0.7), 0 0 30px rgba(225, 29, 72, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(225, 29, 72, 0.5), 0 0 20px rgba(225, 29, 72, 0.3);
  }
}

.neon-button-edit {
  animation: pulse-cyan 2s infinite;
}

.neon-button-delete {
  animation: pulse-red 2s infinite;
}

/* Animation d'apparition pour les messages */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
