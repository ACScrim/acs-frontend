<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\CreationTournoi.vue -->
<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <SpaceHeader
      title="CRÉATION DE TOURNOI"
      titleSize="3xl"
      :showMissionInfo="true"
      mission="TOURNAMENT-CREATION"
    />

    <!-- Formulaire principal -->
    <SpaceCard
      variant="primary"
      :stars="true"
      :decorated="true"
      className="mt-6"
    >
      <form @submit.prevent="createTournament" class="space-y-6">
        <!-- Nom du Tournoi -->
        <div>
          <label
            for="name"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
          >
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
            Nom du Tournoi <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceInput
            id="name"
            v-model="name"
            placeholder="Ex: Tournoi Mario Kart 8"
            required
          />
        </div>

        <!-- Sélection du Jeu -->
        <div>
          <label
            for="game"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
            Jeu <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceDropdown id="game" v-model="game" required>
            <option value="" disabled selected>Sélectionnez un jeu</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>

        <!-- Deux champs par ligne sur grand écran -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Date du tournoi -->
          <div>
            <label
              for="date"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
              Date <span class="text-space-accent ml-1">*</span>
            </label>
            <SpaceInput
              id="date"
              v-model="date"
              type="datetime-local"
              required
            />
          </div>

          <!-- Nom du channel Discord -->
          <div>
            <label
              for="discordChannelName"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
              Nom du Channel Discord
              <span class="text-space-accent ml-1">*</span>
              <div class="relative group ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-primary-light cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <div
                  class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
                >
                  Ne pas inclure le symbole "#" dans le nom du canal
                </div>
              </div>
            </label>
            <SpaceInput
              id="discordChannelName"
              v-model="discordChannelName"
              placeholder="Ex: tournoi-mario-kart"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Rappel Discord -->
          <div>
            <label
              for="discordReminderDate"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                  clip-rule="evenodd"
                />
              </svg>
              Rappel sur Discord
              <div class="relative group ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-primary-light cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <div
                  class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
                >
                  Date à laquelle un rappel sera envoyé sur le canal Discord.
                  Par défaut 2 jours avant le tournoi à 12h.
                </div>
              </div>
            </label>
            <SpaceInput
              id="discordReminderDate"
              v-model="discordReminderDate"
              type="datetime-local"
            />
          </div>

          <!-- Rappel privé -->
          <div>
            <label
              for="privateReminderDate"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
              Rappel privé
              <div class="relative group ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-primary-light cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <div
                  class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
                >
                  Date à laquelle un rappel sera envoyé en message privé à
                  chaque joueur. Par défaut 1 jour avant le tournoi à 12h.
                </div>
              </div>
            </label>
            <SpaceInput
              id="privateReminderDate"
              v-model="privateReminderDate"
              type="datetime-local"
            />
          </div>
        </div>

        <!-- Limite de joueurs -->
        <div>
          <label
            for="playerCap"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
            Limite de Joueurs
            <div class="relative group ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-space-primary-light cursor-help"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <div
                class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
              >
                0 = Pas de limite | Sinon, nombre maximum de joueurs
              </div>
            </div>
          </label>
          <SpaceInput
            id="playerCap"
            v-model="playerCap"
            type="number"
            min="0"
            placeholder="0 = Pas de limite"
          />
        </div>

        <!-- Description -->
        <div>
          <label
            for="description"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
            Description <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceInput
            id="description"
            v-model="description"
            type="textarea"
            :rows="4"
            placeholder="Décrivez les détails du tournoi..."
            required
          />
        </div>

        <!-- Sélection des joueurs -->
        <div>
          <label
            for="players"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
          >
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
          <div class="relative">
            <input
              type="text"
              id="players"
              autocomplete="off"
              v-model="playerSearch"
              @focus="showPlayerList = true"
              @blur="hidePlayerList"
              @input="searchPlayers"
              class="w-full py-3 px-4 bg-space-bg-light/50 text-space-text border border-space-primary/50 rounded-lg font-nasa shadow-glow-primary-sm transition-all duration-300 focus:outline-none focus:border-space-primary focus:shadow-glow-primary"
              placeholder="Rechercher un joueur..."
            />

            <!-- Liste des résultats de recherche - POSITIONNEMENT AMÉLIORÉ -->
            <div
              v-if="showPlayerList"
              class="absolute mt-2 bg-black border border-space-accent/30 rounded-lg max-h-[200px] overflow-y-auto shadow-glow-accent z-[9999]"
              style="width: 100%; top: 100%; left: 0"
            >
              <ul class="py-1">
                <li
                  v-for="player in filteredPlayers"
                  :key="player._id"
                  @mousedown.prevent="addPlayer(player)"
                  class="px-4 py-3 cursor-pointer transition-colors hover:bg-space-accent/20 text-space-text font-nasa text-sm"
                >
                  {{ player.username }}
                </li>
                <li
                  v-if="filteredPlayers.length === 0"
                  class="px-4 py-3 text-space-text-muted italic text-center text-sm"
                >
                  Aucun joueur trouvé
                </li>
              </ul>
            </div>
          </div>

          <!-- Liste des joueurs sélectionnés -->
          <div class="flex flex-wrap gap-2 mt-4">
            <div
              v-for="player in selectedPlayers"
              :key="player._id"
              class="flex items-center bg-space-accent/20 text-space-text px-3 py-2 rounded-full text-sm border border-space-accent/50 transition-all hover:bg-space-accent/30 hover:border-space-accent/70 hover:shadow-glow-accent font-nasa"
            >
              {{ player.username }}
              <button
                @click.prevent="removePlayer(player)"
                class="ml-2 text-space-text/70 hover:text-space-error transition-colors"
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

        <!-- Bouton de soumission -->
        <div class="flex justify-center mt-8">
          <SpaceButton
            type="submit"
            variant="accent"
            size="lg"
            :loading="isLoading"
            icon
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Créer le Tournoi
          </SpaceButton>
        </div>
      </form>
    </SpaceCard>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import tournamentService from "../../services/tournamentService";
import gameService from "../../services/gameService";
import type { Game } from "../../types";
import playerService from "../../services/playerService";
import type { Player, PlayerCheckedIn } from "../../types";
import Toast from "@/shared/Toast.vue";

const name = ref<string>("");
const game = ref<Game | null>(null);
const date = ref<string>("");
const discordChannelName = ref<string>("");
const description = ref<string>("");
const playerSearch = ref<string>("");
const playerSearchResults = ref<Player[]>([]);
const selectedPlayers = ref<PlayerCheckedIn[]>([]);
const allPlayers = ref<Player[]>([]);
const showPlayerList = ref<boolean>(false);
const games = ref<Game[]>([]);
const isLoading = ref<boolean>(false);
const playerCap = ref<string>("0");
const discordReminderDate = ref<string>("");
const privateReminderDate = ref<string>("");

const fetchGames = async () => {
  games.value = await gameService.getGames();
};

const fetchAllPlayers = async () => {
  allPlayers.value = await playerService.getPlayers();
};

// Remplacez la fonction handleSearch par la fonction d'origine searchPlayers
const searchPlayers = async () => {
  if (playerSearch.value.length > 0) {
    playerSearchResults.value = await playerService.searchPlayers(
      playerSearch.value
    );
  } else {
    playerSearchResults.value = [];
  }
};

// Gardez cette fonction qui fonctionnait bien
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

// Ajouter cette fonction pour mettre à jour automatiquement les dates de rappel
const updateReminderDates = () => {
  if (!date.value) return;

  // Convertir la date du tournoi en objet Date
  const tournamentDate = new Date(date.value);

  // Calculer les dates par défaut (2 jours avant pour Discord, 1 jour avant pour les messages privés)
  const discordDate = new Date(tournamentDate);
  discordDate.setDate(tournamentDate.getDate() - 2);
  discordDate.setHours(12, 0, 0, 0);

  const privateDate = new Date(tournamentDate);
  privateDate.setDate(tournamentDate.getDate() - 1);
  privateDate.setHours(12, 0, 0, 0);

  // Formater les dates pour les inputs datetime-local (YYYY-MM-DDTHH:MM)
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Mettre à jour les champs date-time
  discordReminderDate.value = formatDateForInput(discordDate);
  privateReminderDate.value = formatDateForInput(privateDate);
};

const createTournament = async () => {
  isLoading.value = true;
  try {
    const localDate = new Date(date.value); // Utilisez directement la date locale

    // Calculer les dates de rappel par défaut si non spécifiées
    let discordReminder = discordReminderDate.value
      ? new Date(discordReminderDate.value)
      : new Date(localDate.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 jours avant

    let privateReminder = privateReminderDate.value
      ? new Date(privateReminderDate.value)
      : new Date(localDate.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 jour avant

    // Fixer l'heure à 12:00 si ce n'est pas spécifié
    if (!discordReminderDate.value) {
      discordReminder.setHours(12, 0, 0, 0);
    }

    if (!privateReminderDate.value) {
      privateReminder.setHours(12, 0, 0, 0);
    }

    const checkIns: { [key: string]: boolean } = {};
    selectedPlayers.value.forEach((player) => {
      if (player._id) {
        checkIns[player._id] = false;
      }
    });

    const tournament = {
      name: name.value,
      game: game.value as Game,
      date: localDate.toISOString(), // Enregistrez la date locale en ISO
      discordReminderDate: discordReminder, // Passer en tant qu'objet Date
      privateReminderDate: privateReminder, // Passer en tant qu'objet Date
      discordChannelName: discordChannelName.value,
      teamsPublished: false,
      description: description.value,
      players: selectedPlayers.value,
      playerCap: parseInt(playerCap.value) || 0,
      finished: false,
      checkIns,
      mvpVoteOpen: true,
      mvps: [],
      casters: [],
      clips: []
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
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  name.value = "";
  game.value = null;
  date.value = "";
  discordChannelName.value = "";
  description.value = "";
  selectedPlayers.value = [];
  discordReminderDate.value = "";
  privateReminderDate.value = "";
  playerCap.value = "0"; // Réinitialiser playerCap
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
  }, 5000);
};
watch(date, (newValue) => {
  if (newValue) {
    updateReminderDates();
  }
});

const hidePlayerList = () => {
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

fetchGames();
fetchAllPlayers();
</script>

<style scoped>
/* Conteneur principal */
.tournament-creation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);
  backdrop-filter: blur(5px);
}

/* En-tête */
.neon-text {
  font-family: "Audiowide", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
  margin-bottom: 2rem;
}

/* Groupe de formulaire */
.form-group {
  margin-bottom: 1.5rem;
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

/* Bouton néon */
.neon-button {
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(to right, #4a0072, #9900ff);
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Orbitron", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(236, 72, 153, 0.5);
}

.neon-button:hover {
  transform: translateY(-3px);
  background: linear-gradient(to right, #9900ff, #f900a0);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.7), 0 0 30px rgba(236, 72, 153, 0.4);
}

.neon-button:active {
  transform: translateY(-1px);
}

.neon-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: linear-gradient(to right, #4a0072, #9900ff);
  transform: none;
}

.neon-button::before {
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

.neon-button:hover::before {
  left: 100%;
}

/* Animation pour le spinner de chargement */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
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

/* Animation pour les notifications */
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

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .tournament-creation-container {
    padding: 1.5rem;
  }

  .form-label {
    font-size: 1rem;
  }

  .neon-button {
    width: 100%;
  }
}

/* Animation de pulsation pour les boutons */
@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(236, 72, 153, 0.5),
      0 0 20px rgba(236, 72, 153, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.7),
      0 0 30px rgba(236, 72, 153, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(236, 72, 153, 0.5),
      0 0 20px rgba(236, 72, 153, 0.3);
  }
}

/* Tooltip pour les informations supplémentaires */
.tooltip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}

/* Modification du style du tooltip pour éviter le débordement */
.tooltip-content {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  padding: 0.5rem;
  background: rgba(8, 8, 28, 0.95);
  color: #06b6d4;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  /* Remplacer white-space: nowrap par ces propriétés */
  white-space: normal;
  text-align: center;
  line-height: 1.3;
  width: auto;
  min-width: 180px;
  max-width: 250px;

  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 50;
  pointer-events: none;
  font-family: "Orbitron", sans-serif;
  font-weight: normal;
}

.tooltip-content::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(8, 8, 28, 0.95) transparent transparent transparent;
}

.tooltip-icon:hover .tooltip-content {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-110%);
}
</style>
