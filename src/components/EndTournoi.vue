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
            'mb-4 p-4 rounded shadow team-card',
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
              :disabled="!!winningTeamId"
            />
            <button
              @click="updateScore(team._id, team.score)"
              class="ml-2 px-4 py-2 text-white bg-blue-500 rounded shadow neon-button hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="!!winningTeamId"
            >
              Mettre à jour
            </button>
          </div>
          <button
            @click="confirmFinishTournament(team._id)"
            class="mt-4 px-6 py-3 text-lg font-bold text-white bg-green-500 rounded shadow neon-button hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            :disabled="!!winningTeamId"
          >
            Déclarer Vainqueur
          </button>
        </div>
      </div>
    </div>

    <!-- Toasts -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

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
import Toast from "@/shared/Toast.vue";

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
      teams.value = selectedTournamentDetails.value.teams || [];
      winningTeamId.value =
        selectedTournamentDetails.value.winningTeam?._id ?? null;
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
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

/* Container principal */
.container {
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(13, 6, 23, 0.9) 0%,
    rgba(29, 7, 66, 0.8) 100%
  );
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
}

/* Titre principal avec effet néon */
.neon-text {
  font-family: "Audiowide", cursive;
  color: #ffffff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
  animation: pulsate 2s infinite alternate;
}

@keyframes pulsate {
  0% {
    text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
  }
  100% {
    text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff,
      0 0 50px #ff00ff;
  }
}

/* Label avec effet néon */
.neon-label {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  color: #22d3ee;
  text-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
  margin-bottom: 0.5rem;
  display: block;
  letter-spacing: 1px;
}

/* Select stylisé */
select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(17, 24, 39, 0.8);
  color: white;
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

/* Input stylisé */
input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(17, 24, 39, 0.8);
  color: white;
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Détails du tournoi */
h2 {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  color: #f0abfc;
  text-shadow: 0 0 5px rgba(240, 171, 252, 0.7);
  margin: 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(240, 171, 252, 0.3);
}

p {
  font-family: "Orbitron", sans-serif;
  margin-bottom: 0.5rem;
  color: #e2e8f0;
}

strong {
  color: #a78bfa;
  font-weight: 700;
}

/* Grille des équipes */
.grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Carte d'équipe */
.team-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: rgba(31, 41, 55, 0.7);
  border: 2px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4),
    inset 0 0 10px rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.team-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #ec4899, #8b5cf6);
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: rgba(236, 72, 153, 0.7);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5),
    inset 0 0 15px rgba(236, 72, 153, 0.3);
}

/* Équipe gagnante */
.bg-green-500 {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.8),
    rgba(5, 150, 105, 0.9)
  );
  border: 2px solid #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6),
    inset 0 0 15px rgba(16, 185, 129, 0.4);
}

.bg-green-500::before {
  background: linear-gradient(90deg, #10b981, #059669);
}

/* Liste de joueurs */
ul {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
}

li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background-color: rgba(55, 65, 81, 0.8);
  border-radius: 0.375rem;
  font-family: "Orbitron", sans-serif;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

li:hover {
  background-color: rgba(75, 85, 99, 0.8);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
}

li::before {
  content: "▶";
  color: #a78bfa;
  margin-right: 0.5rem;
  font-size: 0.75rem;
}

/* Boutons */
button {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* Bouton de mise à jour */
.bg-blue-500 {
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
}

.bg-blue-500:hover {
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

.bg-blue-500:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Bouton déclarer vainqueur */
.bg-green-500 {
  background: linear-gradient(45deg, #10b981, #34d399);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
  width: 100%;
  margin-top: 1rem;
  text-transform: uppercase;
}

.bg-green-500:hover {
  background: linear-gradient(45deg, #34d399, #6ee7b7);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
  transform: translateY(-2px);
}

.bg-green-500:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Effet de brillance qui balaie le bouton */
button::before {
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

button:hover::before {
  left: 100%;
}

/* Animation pour les boutons et cartes */
@keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
  }
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
  .container {
    padding: 1rem;
  }

  .neon-text {
    font-size: 1.75rem;
  }

  button {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}

/* Animation de grille en fond (lignes horizontales) */
.container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(139, 92, 246, 0.05) 25%,
      rgba(139, 92, 246, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.05) 75%,
      rgba(139, 92, 246, 0.05) 76%,
      transparent 77%
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(139, 92, 246, 0.05) 25%,
      rgba(139, 92, 246, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.05) 75%,
      rgba(139, 92, 246, 0.05) 76%,
      transparent 77%
    );
  background-size: 50px 50px;
  z-index: -1;
}

/* Mise à jour pour le mode écran divisé score/équipes */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.mt-2,
.mt-4 {
  margin-top: 0.5rem;
}

.mb-2,
.mb-4 {
  margin-bottom: 0.5rem;
}
</style>
