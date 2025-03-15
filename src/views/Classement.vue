<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Classement.vue -->
<template>
  <div class="container mx-auto p-8 pt-20">
    <h1 class="text-4xl text-white mb-8 neon-text">Classement des joueurs</h1>
    <div class="mb-4">
      <label for="game" class="block text-lg text-white mb-2 neon-label">
        Filtrer par jeu
      </label>
      <select
        id="game"
        v-model="selectedGame"
        @change="fetchRankingsByGame"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">Tous les jeux</option>
        <option v-for="game in games" :key="game._id" :value="game._id">
          {{ game.name }}
        </option>
      </select>
    </div>
    <div v-if="rankings.length > 0">
      <table class="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th class="py-2 px-4 text-center">Rang</th>
            <th class="py-2 px-4 text-center">
              Joueur
              <button @click="sortBy('username')">
                <span v-if="sortKey === 'username' && sortOrder === 'asc'"
                  >▲</span
                >
                <span v-if="sortKey === 'username' && sortOrder === 'desc'"
                  >▼</span
                >
              </button>
            </th>
            <th class="py-2 px-4 text-center">
              Points
              <button @click="sortBy('totalPoints')">
                <span v-if="sortKey === 'totalPoints' && sortOrder === 'asc'"
                  >▲</span
                >
                <span v-if="sortKey === 'totalPoints' && sortOrder === 'desc'"
                  >▼</span
                >
              </button>
            </th>
            <th class="py-2 px-4 text-center">
              Tournois
              <button @click="sortBy('totalTournaments')">
                <span
                  v-if="sortKey === 'totalTournaments' && sortOrder === 'asc'"
                  >▲</span
                >
                <span
                  v-if="sortKey === 'totalTournaments' && sortOrder === 'desc'"
                  >▼</span
                >
              </button>
            </th>
            <th class="py-2 px-4 text-center">
              Victoires
              <button @click="sortBy('totalVictories')">
                <span v-if="sortKey === 'totalVictories' && sortOrder === 'asc'"
                  >▲</span
                >
                <span
                  v-if="sortKey === 'totalVictories' && sortOrder === 'desc'"
                  >▼</span
                >
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ranking, index) in sortedRankings"
            :key="ranking.playerId"
          >
            <td class="py-2 px-4 text-center">{{ index + 1 }}</td>
            <td class="py-2 px-4 text-center">{{ ranking.username }}</td>
            <td class="py-2 px-4 text-center">{{ ranking.totalPoints }}</td>
            <td class="py-2 px-4 text-center">
              {{ ranking.totalTournaments }}
            </td>
            <td class="py-2 px-4 text-center">{{ ranking.totalVictories }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-white">Aucun classement disponible.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import playerService from "../services/playerService";
import gameService from "../services/gameService";

import type { PlayerRanking } from "../services/playerService";
import type { Game } from "../services/gameService";

const rankings = ref<PlayerRanking[]>([]);
const games = ref<Game[]>([]);
const selectedGame = ref<string>("");
const sortKey = ref<keyof PlayerRanking>("totalPoints");
const sortOrder = ref<string>("desc");

const fetchRankings = async () => {
  try {
    const response = await playerService.getPlayerRankings();
    rankings.value = response;
  } catch (error) {
    console.error("Erreur lors de la récupération du classement:", error);
  }
};

const fetchRankingsByGame = async () => {
  if (selectedGame.value) {
    try {
      const response = await playerService.getPlayerRankingsByGame(
        selectedGame.value
      );
      rankings.value = response;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du classement par jeu:",
        error
      );
    }
  } else {
    fetchRankings();
  }
};

const fetchGames = async () => {
  try {
    const response = await gameService.getGames();
    games.value = response;
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
  }
};

const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key as keyof PlayerRanking;
    sortOrder.value = "asc";
  }
};

const sortedRankings = computed(() => {
  return [...rankings.value].sort((a, b) => {
    let result = 0;
    if (a[sortKey.value] < b[sortKey.value]) {
      result = -1;
    } else if (a[sortKey.value] > b[sortKey.value]) {
      result = 1;
    }
    return sortOrder.value === "asc" ? result : -result;
  });
});

onMounted(() => {
  fetchRankings();
  fetchGames();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.neon-text {
  font-family: "Streamster", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

th,
td {
  text-align: center;
}

button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
}

button:focus {
  outline: none;
}
</style>
