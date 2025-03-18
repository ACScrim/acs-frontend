<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Classement.vue -->
<template>
  <div class="container mx-auto p-8 pt-20">
    <h1 class="text-4xl text-white mb-8 neon-text font-audiowide text-center">
      Classement des joueurs
    </h1>

    <div
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-pink-500 shadow-lg shadow-pink-500/30 p-6 mb-8"
    >
      <label for="game" class="block text-lg text-white mb-2 font-orbitron">
        Filtrer par jeu
      </label>
      <select
        id="game"
        v-model="selectedGame"
        @change="fetchRankingsByGame"
        class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded font-orbitron focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
      >
        <option value="">Tous les jeux</option>
        <option v-for="game in games" :key="game._id" :value="game._id">
          {{ game.name }}
        </option>
      </select>
    </div>

    <div
      v-if="rankings.length > 0"
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-purple-500 shadow-lg shadow-purple-500/30 overflow-hidden"
    >
      <table class="min-w-full text-white">
        <thead>
          <tr class="bg-gray-800/80 border-b border-pink-500/50">
            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              Rang
            </th>
            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              Joueur
              <button @click="sortBy('username')" class="sort-button">
                <span
                  v-if="sortKey === 'username' && sortOrder === 'asc'"
                  class="text-cyan-400"
                  >▲</span
                >
                <span
                  v-else-if="sortKey === 'username' && sortOrder === 'desc'"
                  class="text-cyan-400"
                  >▼</span
                >
                <span v-else class="text-gray-500">▼</span>
              </button>
            </th>
            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              Points
              <button @click="sortBy('totalPoints')" class="sort-button">
                <span
                  v-if="sortKey === 'totalPoints' && sortOrder === 'asc'"
                  class="text-cyan-400"
                  >▲</span
                >
                <span
                  v-else-if="sortKey === 'totalPoints' && sortOrder === 'desc'"
                  class="text-cyan-400"
                  >▼</span
                >
                <span v-else class="text-gray-500">▼</span>
              </button>
            </th>
            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              Tournois
              <button @click="sortBy('totalTournaments')" class="sort-button">
                <span
                  v-if="sortKey === 'totalTournaments' && sortOrder === 'asc'"
                  class="text-cyan-400"
                  >▲</span
                >
                <span
                  v-else-if="
                    sortKey === 'totalTournaments' && sortOrder === 'desc'
                  "
                  class="text-cyan-400"
                  >▼</span
                >
                <span v-else class="text-gray-500">▼</span>
              </button>
            </th>
            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              Victoires
              <button @click="sortBy('totalVictories')" class="sort-button">
                <span
                  v-if="sortKey === 'totalVictories' && sortOrder === 'asc'"
                  class="text-cyan-400"
                  >▲</span
                >
                <span
                  v-else-if="
                    sortKey === 'totalVictories' && sortOrder === 'desc'
                  "
                  class="text-cyan-400"
                  >▼</span
                >
                <span v-else class="text-gray-500">▼</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ranking, index) in sortedRankings"
            :key="ranking.playerId"
            :class="{
              'bg-purple-900/20': index % 2 === 0,
              'hover:bg-cyan-900/20': true,
            }"
            class="transition-colors border-b border-gray-700/50"
          >
            <td class="py-4 px-4 text-center font-orbitron">
              <span
                :class="{ 'rank-top': index < 3 }"
                class="px-3 py-1 rounded-full"
              >
                {{ index + 1 }}
              </span>
            </td>
            <td class="py-4 px-4 text-center">
              <router-link
                :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                class="text-white hover:text-pink-400 font-orbitron transition-colors player-link"
              >
                {{ ranking.username }}
              </router-link>
            </td>
            <td class="py-4 px-4 text-center font-orbitron text-yellow-300">
              {{ ranking.totalPoints }}
            </td>
            <td class="py-4 px-4 text-center font-orbitron text-cyan-400">
              {{ ranking.totalTournaments }}
            </td>
            <td class="py-4 px-4 text-center font-orbitron text-pink-400">
              {{ ranking.totalVictories }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center p-12 bg-black/50 border border-pink-500/30 rounded-lg"
    >
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"
      ></div>
      <p class="text-white font-orbitron">Chargement du classement...</p>
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
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.neon-text {
  font-family: "Audiowide", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.sort-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  transition: all 0.2s ease;
}

.sort-button:focus {
  outline: none;
}

.sort-button:hover span {
  color: #ec4899;
}

.rank-top {
  font-weight: bold;
  background: linear-gradient(to right, #4a0072, #9900ff);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
  text-shadow: 0 0 5px #fff;
}

.player-link {
  position: relative;
  display: inline-block;
}

.player-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
  transition: width 0.3s ease-in-out;
}

.player-link:hover::after {
  width: 100%;
}

/* Animation pour le spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Animation pour les transitions de couleur */
.transition-colors {
  transition: background-color 0.3s ease;
}

select {
  background-image: linear-gradient(45deg, transparent 50%, #ec4899 50%),
    linear-gradient(135deg, #ec4899 50%, transparent 50%);
  background-position: calc(100% - 20px) center, calc(100% - 15px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select:focus {
  background-image: linear-gradient(45deg, transparent 50%, #06b6d4 50%),
    linear-gradient(135deg, #06b6d4 50%, transparent 50%);
}
</style>
