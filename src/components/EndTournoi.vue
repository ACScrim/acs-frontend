<template>
  <div class="container mx-auto p-4 bg-neon-gradient min-h-screen">
    <!-- Sélection du jeu et du tournoi -->
    <h1 class="text-4xl text-white mb-8 neon-text">Terminer un Tournoi</h1>
    <div class="mb-4">
      <label for="game" class="block text-lg text-white mb-2 neon-label"
        >Sélectionner un jeu</label
      >
      <select
        id="game"
        v-model="selectedGame"
        @change="fetchTournamentsByGame"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option v-for="game in games" :key="game._id" :value="game._id">
          {{ game.name }}
        </option>
      </select>
    </div>
    <div class="mb-4" v-if="tournaments.length > 0">
      <label for="tournament" class="block text-lg text-white mb-2 neon-label"
        >Sélectionner un tournoi</label
      >
      <select
        id="tournament"
        v-model="selectedTournament"
        @change="fetchTournamentDetails"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
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

    <!-- Détails du tournoi -->
    <div v-if="selectedTournamentDetails">
      <h2 class="text-xl font-bold mb-4 text-white">Détails du tournoi</h2>
      <p class="text-white">
        <strong>Nom:</strong> {{ selectedTournamentDetails.name }}
      </p>
      <p class="text-white">
        <strong>Date:</strong> {{ selectedTournamentDetails.date }}
      </p>
      <p class="text-white">
        <strong>Discord Channel:</strong>
        {{ selectedTournamentDetails.discordChannelName }}
      </p>
    </div>

    <!-- Affichage des équipes avec possibilité de mettre à jour les scores -->
    <div v-if="teams.length > 0">
      <h2 class="text-xl font-bold mb-4 text-white">Équipes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(team, index) in teams"
          :key="index"
          :class="[
            'mb-4 p-4 rounded shadow',
            team._id === winningTeamId ? 'bg-green-500' : 'bg-gray-800',
          ]"
        >
          <div class="flex items-center mb-2">
            <input
              type="text"
              v-model="team.name"
              class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled
            />
          </div>
          <ul>
            <li
              v-for="player in team.players"
              :key="player._id"
              class="p-2 bg-gray-700 rounded mb-2 text-white"
            >
              {{ player.username }}
            </li>
          </ul>
          <div class="flex items-center mt-2">
            <input
              type="number"
              v-model.number="team.score"
              class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
              :disabled="winningTeamId"
            />
            <button
              @click="updateScore(team._id, team.score)"
              class="ml-2 px-4 py-2 text-white bg-blue-500 rounded shadow neon-button hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="winningTeamId"
            >
              Mettre à jour
            </button>
          </div>
          <button
            @click="confirmFinishTournament(team._id)"
            class="mt-4 px-6 py-3 text-lg font-bold text-white bg-green-500 rounded shadow neon-button hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            :disabled="winningTeamId"
          >
            Déclarer Vainqueur
          </button>
        </div>
      </div>
    </div>

    <!-- Toasts -->
    <div
      v-if="error"
      class="mt-4 p-4 bg-red-500 text-white rounded shadow error-toast"
    >
      {{ error }}
    </div>
    <div
      v-if="success"
      class="mt-4 p-4 bg-green-500 text-white rounded shadow success-toast"
    >
      {{ success }}
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      :title="'Confirmer la fin du tournoi'"
      :message="'Êtes-vous sûr de vouloir déclarer cette équipe comme gagnante ? Cette action est irréversible.'"
      @confirm="finishTournament"
      @cancel="showConfirmationDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import ConfirmationDialog from "../shared/ConfirmationDialog.vue";
import type { Game } from "../services/gameService";
import type { Tournament, Team } from "../services/tournamentService";
import type { Player } from "../services/playerService";

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const selectedGame = ref("");
const selectedTournament = ref("");

const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);
const teams = ref<Team[]>([]);
const winningTeamId = ref<string | null>(null);
const showConfirmationDialog = ref(false);
const teamToFinish = ref<string | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

// Récupérer la liste des jeux
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

// Récupérer les tournois pour un jeu sélectionné
const fetchTournamentsByGame = async () => {
  if (selectedGame.value) {
    tournaments.value = await tournamentService.getTournamentsByGame(
      selectedGame.value
    );
  }
};

// Récupérer les détails d'un tournoi sélectionné
const fetchTournamentDetails = async () => {
  if (selectedTournament.value) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      selectedTournament.value
    );
    // Si des équipes existent déjà, les afficher
    if (selectedTournamentDetails.value.teams) {
      teams.value = selectedTournamentDetails.value.teams;
      winningTeamId.value =
        selectedTournamentDetails.value.winningTeam?._id || null;
    }
  }
};

// Mettre à jour le score d'une équipe
const updateScore = async (teamId: string, score: number) => {
  if (selectedTournament.value) {
    await tournamentService.updateTeamScore(
      selectedTournament.value,
      teamId,
      score
    );
    showMessage("success", "Score mis à jour avec succès !");
  }
};

// Afficher la confirmation avant de terminer le tournoi
const confirmFinishTournament = (teamId: string) => {
  teamToFinish.value = teamId;
  showConfirmationDialog.value = true;
};

// Terminer le tournoi en déclarant une équipe gagnante
const finishTournament = async () => {
  if (selectedTournament.value && teamToFinish.value) {
    await tournamentService.finishTournament(
      selectedTournament.value,
      teamToFinish.value
    );
    winningTeamId.value = teamToFinish.value;
    showConfirmationDialog.value = false;
    showMessage("success", "Tournoi terminé avec succès !");
  }
};

// Afficher les messages de succès et d'erreur
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

// Charger les jeux au montage du composant
onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
.bg-neon-gradient {
  background: linear-gradient(
    135deg,
    #0d0221 0%,
    #45125e 40%,
    #a22561 80%,
    #ff3864 100%
  );
}

.neon-text {
  font-family: "Streamster", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

.neon-input {
  background: #1a1a1a;
  box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
  transition: box-shadow 0.3s ease;
}

.neon-input:focus {
  outline: none;
  box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
}

.neon-button {
  font-size: 1rem;
  background: #ff00ff;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.neon-button:hover {
  background: #e600e6;
  box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff;
}

.toast {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px, 0 0 20px;
}

.error-toast {
  background: #ff3864;
  color: white;
  box-shadow: 0 0 10px #ff3864, 0 0 20px #ff3864;
}

.success-toast {
  background: #28a745;
  color: white;
  box-shadow: 0 0 10px #28a745, 0 0 20px #28a745;
}
</style>
