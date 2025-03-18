<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\VoirCheckIn.vue -->
<template>
  <div class="container mx-auto p-4 bg-neon-gradient min-h-screen">
    <h1 class="text-4xl text-white mb-8 neon-text">Voir les Check-in</h1>

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

    <div v-if="selectedTournamentDetails">
      <h2 class="text-xl font-bold mb-4 text-white">Joueurs du tournoi</h2>
      <ul class="text-white">
        <li
          v-for="player in selectedTournamentDetails.players"
          :key="player._id"
        >
          {{ player.username }} - Check-in:
          {{
            player._id && selectedTournamentDetails?.checkIns?.[player._id]
              ? "Oui"
              : "Non"
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import type { Game } from "../services/gameService";
import type { Tournament } from "../services/tournamentService";
import type { Player } from "../services/playerService";

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const selectedGame = ref("");
const selectedTournament = ref("");

const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);

// Récupérer la liste des jeux
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

// Récupérer les tournois pour un jeu sélectionné
const fetchTournamentsByGame = async () => {
  if (selectedGame.value) {
    const allTournaments = await tournamentService.getTournamentsByGame(
      selectedGame.value
    );
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
    );
  }
};

// Récupérer les détails d'un tournoi sélectionné
const fetchTournamentDetails = async () => {
  if (selectedTournament.value) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      selectedTournament.value
    );
  }
};

// Charger les jeux au montage du composant
onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
/* Add any specific styles for the VoirCheckIn component here */
</style>
