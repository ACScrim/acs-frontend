<template>
  <div class="container mx-auto p-4 sm:p-8 pt-20">
    <h1
      class="text-3xl sm:text-4xl text-white mb-6 sm:mb-8 neon-text font-audiowide text-center"
    >
      Classement des joueurs
    </h1>

    <!-- Sélecteur de jeux -->
    <div
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-pink-500 shadow-lg shadow-pink-500/30 p-4 sm:p-6 mb-6 sm:mb-8"
    >
      <label
        for="game"
        class="block text-base sm:text-lg text-white mb-2 font-orbitron"
      >
        Filtrer par jeu
      </label>
      <select
        id="game"
        v-model="selectedGame"
        @change="fetchRankingsByGame"
        class="w-full p-2 sm:p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded font-orbitron focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
      >
        <option value="">Tous les jeux</option>
        <option v-for="game in games" :key="game._id" :value="game._id">
          {{ game.name }}
        </option>
      </select>
    </div>

    <!-- État de chargement avec CyberpunkLoader -->
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center p-6 bg-black/50 border border-pink-500/30 rounded-lg"
      role="status"
      aria-live="polite"
    >
      <CyberpunkLoader />
    </div>

    <!-- Message "Aucun classement" -->
    <div
      v-else-if="rankings.length === 0"
      class="flex flex-col items-center justify-center p-6 sm:p-12 bg-black/50 border border-pink-500/30 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 sm:h-16 sm:w-16 text-pink-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="text-white font-orbitron text-center">
        Aucun classement disponible pour le moment.
      </p>
    </div>

    <!-- Tableau pour écrans moyens et grands -->
    <div
      v-else
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-purple-500 shadow-lg shadow-purple-500/30 overflow-hidden"
    >
      <!-- Version desktop du tableau (caché sur mobile) -->
      <table class="min-w-full text-white hidden md:table">
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
                class="text-white hover:text-pink-400 font-orbitron transition-colors player-link capitalize"
              >
                {{ ranking.username }}
              </router-link>
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

      <!-- Version mobile du tableau (affichée uniquement sur mobile) -->
      <div class="md:hidden">
        <!-- Barre de tri pour mobile -->
        <div
          class="flex justify-between items-center p-3 bg-gray-800/80 border-b border-pink-500/50"
        >
          <div class="flex gap-2 items-center">
            <span class="font-audiowide text-pink-400 text-sm">Trier par:</span>
            <!-- Inverser l'ordre des filtres: Nom d'abord, puis Victoires -->
            <button
              @click="sortBy('username')"
              class="px-2 py-1 text-xs font-orbitron rounded border"
              :class="
                sortKey === 'username'
                  ? 'bg-cyan-900/50 border-cyan-400/50 text-cyan-300'
                  : 'border-gray-600 text-gray-400'
              "
            >
              Nom
              <span v-if="sortKey === 'username'" class="ml-1">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </button>
            <button
              @click="sortBy('totalVictories')"
              class="px-2 py-1 text-xs font-orbitron rounded border"
              :class="
                sortKey === 'totalVictories'
                  ? 'bg-cyan-900/50 border-cyan-400/50 text-cyan-300'
                  : 'border-gray-600 text-gray-400'
              "
            >
              Victoires
              <span v-if="sortKey === 'totalVictories'" class="ml-1">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </button>
          </div>
        </div>

        <!-- Liste des joueurs version mobile -->
        <div class="divide-y divide-gray-700/50">
          <div
            v-for="(ranking, index) in sortedRankings"
            :key="ranking.playerId"
            :class="{
              'bg-purple-900/20': index % 2 === 0,
            }"
            class="p-3 transition-colors"
          >
            <!-- Structure modifiée pour avoir rang - joueur - victoires alignés horizontalement -->
            <div class="flex items-center">
              <!-- Rang - maintenant avec une meilleure visibilité -->
              <div class="w-12 flex justify-center">
                <span
                  :class="{ 'rank-top': index < 3 }"
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/80 border border-purple-500/50 font-orbitron text-white text-sm"
                >
                  {{ index + 1 }}
                </span>
              </div>

              <!-- Joueur -->
              <div class="flex-grow">
                <router-link
                  :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                  class="text-white hover:text-pink-400 font-orbitron transition-colors player-link capitalize text-sm"
                >
                  {{ ranking.username }}
                </router-link>
              </div>

              <!-- Victoires (déplacé au centre) - sur une seule ligne -->
              <div class="flex items-center ml-auto">
                <div class="flex items-center">
                  <span class="font-orbitron text-pink-400 text-sm mr-1">
                    {{ ranking.totalVictories }}
                  </span>
                  <span class="text-xs text-gray-400">victoires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

//-------------------------------------------------------
// SECTION: Imports et services
//-------------------------------------------------------

// Services pour l'accès aux données
import playerService from "../services/playerService";
import gameService from "../services/gameService";

// Types pour le typage fort
import type { PlayerRanking, Game } from "../types";

// Composants
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";

//-------------------------------------------------------
// SECTION: Constantes et configuration
//-------------------------------------------------------

/**
 * Valeurs par défaut pour le tri du classement
 */
const DEFAULT_SORT_KEY: keyof PlayerRanking = "totalVictories";
const DEFAULT_SORT_ORDER = "desc";

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

/**
 * Données principales
 */
const rankings = ref<PlayerRanking[]>([]); // Liste des classements de joueurs
const games = ref<Game[]>([]); // Liste des jeux disponibles
const selectedGame = ref<string>(""); // Jeu sélectionné pour le filtrage

/**
 * État du tri
 */
const sortKey = ref<keyof PlayerRanking>(DEFAULT_SORT_KEY);
const sortOrder = ref<string>(DEFAULT_SORT_ORDER);

/**
 * État de l'interface
 */
const isLoading = ref<boolean>(true); // Indicateur de chargement

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère le classement général des joueurs
 * Gère l'état de chargement et les erreurs
 */
const fetchRankings = async () => {
  isLoading.value = true;

  try {
    const response = await playerService.getPlayerRankings();
    rankings.value = response;
  } catch (error) {
    console.error("Erreur lors de la récupération du classement:", error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Récupère le classement des joueurs filtré par jeu
 * Si aucun jeu n'est sélectionné, récupère le classement général
 */
const fetchRankingsByGame = async () => {
  isLoading.value = true;

  try {
    if (selectedGame.value) {
      const response = await playerService.getPlayerRankingsByGame(
        selectedGame.value
      );
      rankings.value = response;
    } else {
      await fetchRankings();
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du classement par jeu:",
      error
    );
  } finally {
    // Ne pas mettre isLoading à false si on appelle fetchRankings
    // car fetchRankings gère déjà cela
    if (selectedGame.value) {
      isLoading.value = false;
    }
  }
};

/**
 * Récupère la liste des jeux pour le filtre
 */
const fetchGames = async () => {
  try {
    const response = await gameService.getGames();
    games.value = response;
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
  }
};

//-------------------------------------------------------
// SECTION: Gestion du tri
//-------------------------------------------------------

/**
 * Gère le tri du tableau de classement
 * Implémente une logique cyclique: ascendant → descendant → défaut
 * @param key - Clé de colonne sur laquelle effectuer le tri
 */
const sortBy = (key: string) => {
  const typedKey = key as keyof PlayerRanking;

  // Si on clique sur la même colonne
  if (sortKey.value === typedKey) {
    // Si on est en ordre ascendant, passer en descendant
    if (sortOrder.value === "asc") {
      sortOrder.value = "desc";
    }
    // Si on est en ordre descendant et pas sur la colonne par défaut
    else if (typedKey !== DEFAULT_SORT_KEY) {
      // Revenir au tri par défaut
      sortKey.value = DEFAULT_SORT_KEY;
      sortOrder.value = DEFAULT_SORT_ORDER;
    }
    // Si on est déjà en tri descendant sur la colonne par défaut, ne rien faire
  }
  // Si on clique sur une nouvelle colonne
  else {
    sortKey.value = typedKey;
    sortOrder.value = "asc"; // Commencer en ordre ascendant
  }
};

/**
 * Propriété calculée qui retourne le classement trié selon les critères actuels
 * Gère le tri des données numériques et textuelles
 */
const sortedRankings = computed(() => {
  return [...rankings.value].sort((a, b) => {
    const valueA = a[sortKey.value];
    const valueB = b[sortKey.value];

    let result;
    // Tri spécifique pour les chaînes de caractères (utiliser localeCompare)
    if (typeof valueA === "string" && typeof valueB === "string") {
      result = valueA.localeCompare(valueB);
    }
    // Tri pour les autres types de données (nombres, etc.)
    else {
      result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    // Inverser le résultat si l'ordre est descendant
    return sortOrder.value === "asc" ? result : -result;
  });
});

//-------------------------------------------------------
// SECTION: Cycle de vie
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 * Charge les données nécessaires pour l'affichage
 */
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

/* Ajout pour les rangs sur mobile */
@media (max-width: 768px) {
  .rank-top {
    background: linear-gradient(to right, #4a0072, #9900ff);
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
    color: white !important; /* Force la couleur du texte en blanc */
    border-color: rgba(236, 72, 153, 0.7) !important; /* Bordure plus visible */
  }
}
</style>
