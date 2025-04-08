<template>
  <div class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24 relative">
    <div class="relative mb-6">
      <h1
        class="text-3xl sm:text-4xl neon-text text-white font-audiowide text-center"
      >
        Classement des joueurs
      </h1>

      <!-- Bouton d'export repositionné -->
      <button
        @click="exportCSV"
        class="cyberpunk-btn-purple absolute top-0 right-0 transform translate-y-1 px-3 py-1.5 text-xs font-orbitron rounded-md"
      >
        <span class="relative z-10 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span>CSV</span>
        </span>
      </button>
    </div>

    <!-- Sélecteurs de filtres: Jeu et Saison -->
    <div
      class="cyberpunk-panel-purple bg-black/75 backdrop-blur-sm rounded-lg border border-purple-500/70 shadow-lg shadow-purple-500/30 p-4 sm:p-6 mb-6 sm:mb-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sélecteur de jeux -->
        <div>
          <label
            for="game"
            class="relative flex items-center gap-2 font-orbitron text-base sm:text-lg text-purple-400 mb-3 cyberpunk-label-purple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"
              />
            </svg>
            <span>FILTRER PAR JEU</span>
            <div
              class="h-px flex-grow bg-gradient-to-r from-purple-500 to-transparent mx-2 opacity-70"
            ></div>
          </label>
          <div class="relative group">
            <select
              id="game"
              v-model="selectedGame"
              @change="fetchRankingsByFilter"
              class="cyberpunk-select-purple w-full p-2.5 sm:p-3 text-purple-300 bg-gray-900/80 border-2 border-purple-500/70 rounded-md font-orbitron focus:outline-none focus:border-purple-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">Tous les jeux</option>
              <option
                v-for="game in rankingStore.games"
                :key="game._id"
                :value="game._id"
              >
                {{ game.name }}
              </option>
            </select>

            <!-- Effet de contour néon sur hover -->
            <div
              class="cyberpunk-select-glow-purple absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <!-- Icône personnalisée -->
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-purple-400 cyberpunk-icon-purple"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Sélecteur de saisons -->
        <div>
          <label
            for="season"
            class="relative flex items-center gap-2 font-orbitron text-base sm:text-lg text-cyan-400 mb-3 cyberpunk-label-cyan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            <span>FILTRER PAR SAISON</span>
            <div
              class="h-px flex-grow bg-gradient-to-r from-cyan-500 to-transparent mx-2 opacity-70"
            ></div>
          </label>
          <div class="relative group">
            <select
              id="season"
              v-model="selectedSeason"
              @change="fetchRankingsByFilter"
              class="cyberpunk-select-cyan w-full p-2.5 sm:p-3 text-cyan-300 bg-gray-900/80 border-2 border-cyan-500/70 rounded-md font-orbitron focus:outline-none focus:border-cyan-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">Classement général</option>
              <option
                v-for="season in seasons"
                :key="season._id"
                :value="season._id"
                :selected="season._id === seasons[0]?._id"
              >
                Saison {{ season.numero }}
              </option>
            </select>

            <!-- Effet de contour néon sur hover -->
            <div
              class="cyberpunk-select-glow-cyan absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <!-- Icône personnalisée -->
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-cyan-400 cyberpunk-icon-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
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

    <CyberTerminal
      v-else-if="sortedRankings.length === 0"
      :command="`search_players ${
        selectedGame ? '-g game_id:' + selectedGame : ''
      } ${selectedSeason ? '-s season_id:' + selectedSeason : ''}`"
      errorCode="404_NO_DATA"
      message="Aucun joueur n'a été trouvé pour cette recherche."
      class="my-8"
    />

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
              <div class="flex items-center justify-center">
                <span>Joueur</span>
                <button
                  @click="sortBy('username')"
                  class="cyberpunk-btn-gray p-1 ml-1 text-xs rounded-full h-6 w-6 items-center justify-center inline-flex"
                  :class="
                    sortKey === 'username' ? 'cyberpunk-btn-cyan' : 'opacity-60'
                  "
                >
                  <span v-if="sortKey === 'username' && sortOrder === 'asc'"
                    >▲</span
                  >
                  <span
                    v-else-if="sortKey === 'username' && sortOrder === 'desc'"
                    >▼</span
                  >
                  <span v-else>▼</span>
                </button>
              </div>
            </th>

            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              <div class="flex items-center justify-center">
                <span>Tournois</span>
                <button
                  @click="sortBy('totalTournaments')"
                  class="cyberpunk-btn-gray p-1 ml-1 text-xs rounded-full h-6 w-6 items-center justify-center inline-flex"
                  :class="
                    sortKey === 'totalTournaments'
                      ? 'cyberpunk-btn-cyan'
                      : 'opacity-60'
                  "
                >
                  <span
                    v-if="sortKey === 'totalTournaments' && sortOrder === 'asc'"
                    >▲</span
                  >
                  <span
                    v-else-if="
                      sortKey === 'totalTournaments' && sortOrder === 'desc'
                    "
                    >▼</span
                  >
                  <span v-else>▼</span>
                </button>
              </div>
            </th>

            <th class="py-4 px-4 text-center font-audiowide text-pink-400">
              <div class="flex items-center justify-center">
                <span>Victoires</span>
                <button
                  @click="sortBy('totalVictories')"
                  class="cyberpunk-btn-gray p-1 ml-1 text-xs rounded-full h-6 w-6 items-center justify-center inline-flex"
                  :class="
                    sortKey === 'totalVictories'
                      ? 'cyberpunk-btn-cyan'
                      : 'opacity-60'
                  "
                >
                  <span
                    v-if="sortKey === 'totalVictories' && sortOrder === 'asc'"
                    >▲</span
                  >
                  <span
                    v-else-if="
                      sortKey === 'totalVictories' && sortOrder === 'desc'
                    "
                    >▼</span
                  >
                  <span v-else>▼</span>
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(ranking, index) in paginatedRankings"
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
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
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
              class="px-2 py-1 text-xs font-orbitron rounded"
              :class="
                sortKey === 'username'
                  ? 'cyberpunk-btn-cyan'
                  : 'cyberpunk-btn-gray opacity-70'
              "
            >
              Nom
              <span v-if="sortKey === 'username'" class="ml-1">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </button>
            <button
              @click="sortBy('totalVictories')"
              class="px-2 py-1 text-xs font-orbitron rounded"
              :class="
                sortKey === 'totalVictories'
                  ? 'cyberpunk-btn-cyan'
                  : 'cyberpunk-btn-gray opacity-70'
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
            v-for="(ranking, index) in paginatedRankings"
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
                  :class="{ 'rank-top': calculateGlobalRank(index) <= 3 }"
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/80 border border-purple-500/50 font-orbitron text-white text-sm"
                >
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
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

    <!-- Pagination -->
    <CyberpunkPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      prev-label="&laquo; Précédent"
      next-label="Suivant &raquo;"
      color="cyan"
      :show-dots="totalPages > 5"
      @prev-page="prevPage"
      @next-page="nextPage"
      @page-select="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

//-------------------------------------------------------
// SECTION: Imports et services
//-------------------------------------------------------

// Store pour la gestion des données
import { useRankingStore } from "../stores/rankingStore";

// Types pour le typage fort
import type { PlayerRanking, Season } from "../types";

// Composants
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import CyberpunkPagination from "@/shared/CyberpunkPagination.vue";
import CyberTerminal from "@/shared/CyberTerminal.vue";

// Importation du service pour les saisons
import seasonService from "../services/seasonService";

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

// Initialisation du store
const rankingStore = useRankingStore();

/**
 * État du tri
 */
const sortKey = ref<keyof PlayerRanking>(DEFAULT_SORT_KEY);
const sortOrder = ref<string>(DEFAULT_SORT_ORDER);

/**
 * État de la pagination
 */
const currentPage = ref(1);
const itemsPerPage = 10; // Nombre d'éléments par page

/**
 * Filtres
 */
const selectedGame = ref<string>("");
const selectedSeason = ref<string>("");
const seasons = ref<Season[]>([]);

//-------------------------------------------------------
// SECTION: Récupération des données et actions
//-------------------------------------------------------

/**
 * Récupère les saisons disponibles
 */
const fetchSeasons = async () => {
  try {
    const result = await seasonService.getAllSeasons();
    seasons.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des saisons:", error);
  }
};

/**
 * Met à jour le classement selon les filtres sélectionnés (jeu et saison)
 */
const fetchRankingsByFilter = async () => {
  currentPage.value = 1; // Réinitialiser à la première page

  try {
    if (selectedSeason.value) {
      // Récupérer le classement par saison
      await rankingStore.fetchSeasonRankings(
        selectedSeason.value,
        selectedGame.value
      );
    } else {
      // Récupérer le classement général (comme avant)
      await rankingStore.fetchRankingsByGame(selectedGame.value);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du classement:", error);
  }
};

/**
 * Met à jour le classement selon le jeu sélectionné
 */
const fetchRankingsByGame = async () => {
  currentPage.value = 1; // Réinitialiser à la première page
  await rankingStore.fetchRankingsByGame(selectedGame.value);
};

/**
 * Exporte les données en CSV
 */
const exportCSV = () => {
  // Créer l'en-tête CSV
  let csvContent = "Rang,Joueur,Tournois,Victoires\n";

  // Ajouter chaque ligne
  sortedRankings.value.forEach((player, index) => {
    csvContent += `${index + 1},${player.username},${player.totalTournaments},${
      player.totalVictories
    }\n`;
  });

  // Créer un blob et télécharger
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Générer un nom de fichier avec date et filtres
  const date = new Date().toISOString().split("T")[0];

  let fileName = "classement";

  // Ajouter info sur la saison
  if (selectedSeason.value) {
    const season = seasons.value.find((s) => s._id === selectedSeason.value);
    if (season) {
      fileName += `-saison-${season.numero}`;
    } else {
      fileName += "-saison";
    }
  } else {
    fileName += "-general";
  }

  // Ajouter info sur le jeu
  if (selectedGame.value) {
    const gameName =
      rankingStore.games.find((g) => g._id === selectedGame.value)?.name ||
      "jeu-specifique";
    fileName += `-${gameName}`;
  } else {
    fileName += "-tous-jeux";
  }

  // Ajouter la date
  fileName += `-${date}`;

  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

//-------------------------------------------------------
// SECTION: Gestion du tri
//-------------------------------------------------------

/**
 * Gère le tri du tableau de classement avec un comportement plus prévisible:
 * - Premier clic: tri ascendant
 * - Deuxième clic sur la même colonne: tri descendant
 * - Troisième clic: retour au tri par défaut (mais uniquement si c'est une colonne différente de la colonne par défaut)
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
    // Si on est en ordre descendant...
    else {
      // Si c'est la colonne par défaut (totalVictories), on alterne simplement entre asc/desc
      if (typedKey === DEFAULT_SORT_KEY) {
        sortOrder.value = "asc";
      }
      // Sinon, on revient au tri par défaut
      else {
        sortKey.value = DEFAULT_SORT_KEY;
        sortOrder.value = DEFAULT_SORT_ORDER;
      }
    }
  }
  // Si on clique sur une nouvelle colonne
  else {
    sortKey.value = typedKey;
    sortOrder.value = "asc"; // Commencer en ordre ascendant
  }

  // Revenir à la première page après un tri
  currentPage.value = 1;
};
//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Propriété calculée qui retourne le classement trié selon les critères actuels
 * avec un tri secondaire par tournois en cas d'égalité des victoires
 */
const sortedRankings = computed(() => {
  return [...rankingStore.rankings].sort((a, b) => {
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

    // Si on trie par victoires et qu'il y a égalité, départager par le nombre de tournois
    if (sortKey.value === "totalVictories" && result === 0) {
      return sortOrder.value === "asc"
        ? a.totalTournaments - b.totalTournaments
        : b.totalTournaments - a.totalTournaments;
    }

    // Inverser le résultat si l'ordre est descendant
    return sortOrder.value === "asc" ? result : -result;
  });
});

/**
 * Calcule le nombre total de pages pour la pagination
 */
const totalPages = computed(() =>
  Math.ceil(sortedRankings.value.length / itemsPerPage)
);

/**
 * Extrait les classements à afficher sur la page courante
 */
const paginatedRankings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, sortedRankings.value.length);
  return sortedRankings.value.slice(start, end);
});

/**
 * Propriété d'état pour savoir si on est en train de charger
 */
const isLoading = computed(() => rankingStore.loading);

//-------------------------------------------------------
// SECTION: Méthodes de pagination
//-------------------------------------------------------

/**
 * Passe à la page suivante
 */
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

/**
 * Revient à la page précédente
 */
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

/**
 * Calcule le rang global d'un joueur basé sur son index dans la page courante
 */
const calculateGlobalRank = (index: number): number => {
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};

//-------------------------------------------------------
// SECTION: Cycle de vie et watchers
//-------------------------------------------------------

// Synchroniser avec la valeur du gameId dans le store
watch(
  () => rankingStore.currentGameId,
  (newGameId) => {
    selectedGame.value = newGameId;
  }
);

// Observer les changements de selectedGame
watch(
  () => selectedGame.value,
  (newGameId) => {
    if (newGameId !== rankingStore.currentGameId) {
      fetchRankingsByGame();
    }
  }
);
// Observer les changements de selectedGame et selectedSeason
watch([() => selectedGame.value, () => selectedSeason.value], () => {
  fetchRankingsByFilter();
});

// Synchroniser avec la valeur du gameId dans le store
watch(
  () => rankingStore.currentGameId,
  (newGameId) => {
    selectedGame.value = newGameId;
  }
);

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  // Initialiser le jeu sélectionné avec la valeur stockée dans le store
  selectedGame.value = rankingStore.currentGameId;

  // Charger les saisons
  await fetchSeasons();

  // Charger les jeux
  await rankingStore.fetchGames();

  // Définir la saison actuelle comme valeur par défaut si elle existe
  if (seasons.value.length > 0) {
    // Les saisons sont déjà triées par numéro décroissant, donc la première est la plus récente
    selectedSeason.value = seasons.value[0]._id;
  }

  // Charger le classement selon le filtre par défaut
  await fetchRankingsByFilter();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.rank-top {
  font-weight: bold;
  background: linear-gradient(to right, #4a0072, #9900ff);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
  text-shadow: 0 0 5px #fff;
}

.transition-colors {
  transition: background-color 0.3s ease;
}

.cyberpunk-select {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  background: linear-gradient(
    135deg,
    rgba(8, 8, 16, 0.95),
    rgba(14, 23, 36, 0.95)
  );
  box-shadow: inset 0 0 10px rgba(6, 182, 212, 0.3),
    0 0 5px rgba(6, 182, 212, 0.3);
  text-shadow: 0 0 3px rgba(6, 182, 212, 0.7);
  caret-color: #06b6d4;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  padding-right: 2.5rem !important;
  color: #06b6d4; /* Ajout de la couleur du texte */
  border: 2px solid rgba(6, 182, 212, 0.7); /* Bordure cyan */
}

/* Styles pour les options du select */
.cyberpunk-select option {
  background-color: #0f172a; /* Fond sombre */
  color: #67e8f9; /* Texte cyan clair */
  font-family: "Orbitron", sans-serif;
}

/* Style au focus */
.cyberpunk-select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5);
}

.cyberpunk-select-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
  border: 2px solid rgba(6, 182, 212, 0.8);
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  transform: scale(1.01);
  z-index: 0;
}

.cyberpunk-icon {
  filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.7));
  transition: transform 0.3s ease;
}

.cyberpunk-select:focus + .cyberpunk-select-glow + div .cyberpunk-icon,
.group:hover .cyberpunk-icon {
  transform: translateY(2px);
  filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.9));
}

.cyberpunk-label {
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
  letter-spacing: 1px;
}

.cyberpunk-label svg {
  filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.7));
}

.cyberpunk-panel-purple {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    0 100%
  );
  background: radial-gradient(
      circle at top right,
      rgba(126, 34, 206, 0.2),
      transparent 60%
    ),
    linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 23, 42, 0.9));
  position: relative;
}

.cyberpunk-panel-purple::before {
  content: "";
  position: absolute;
  right: 15px;
  bottom: 0;
  width: 30px;
  height: 2px;
  background: rgba(139, 92, 246, 0.7);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
}

.cyberpunk-panel-purple::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 15px;
  width: 2px;
  height: 30px;
  background: rgba(139, 92, 246, 0.7);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
}

/* Label avec teinte violette */
.cyberpunk-label-purple {
  text-shadow: 0 0 5px rgba(139, 92, 246, 0.7);
  letter-spacing: 1px;
}

.cyberpunk-label-purple svg {
  filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.7));
}

/* Select avec style violet */
.cyberpunk-select-purple {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  background: linear-gradient(
    135deg,
    rgba(8, 8, 16, 0.95),
    rgba(14, 23, 36, 0.95)
  );
  box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.3),
    0 0 5px rgba(139, 92, 246, 0.3);
  text-shadow: 0 0 3px rgba(139, 92, 246, 0.7);
  caret-color: #a855f7;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  padding-right: 2.5rem !important;
  color: #a855f7; /* Couleur du texte violette */
  border: 2px solid rgba(139, 92, 246, 0.7); /* Bordure violette */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Style au focus */
.cyberpunk-select-purple:focus {
  outline: none;
  border-color: #a855f7;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.5);
  animation: pulse-glow-purple 2s infinite;
}

/* Effet de lueur violet sur survol */
.cyberpunk-select-glow-purple {
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
  border: 2px solid rgba(139, 92, 246, 0.8);
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  transform: scale(1.01);
  z-index: 0;
}

/* Icône avec effet violet */
.cyberpunk-icon-purple {
  filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.7));
  transition: transform 0.3s ease;
}

.cyberpunk-select-purple:focus
  + .cyberpunk-select-glow-purple
  + div
  .cyberpunk-icon-purple,
.group:hover .cyberpunk-icon-purple {
  transform: translateY(2px);
  filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.9));
}

/* Styles pour les options du select */
.cyberpunk-select-purple option {
  background-color: #0f172a; /* Fond sombre */
  color: #c4b5fd; /* Texte violet clair */
  font-family: "Orbitron", sans-serif;
}

/* Animation de pulsation violette */
@keyframes pulse-glow-purple {
  0% {
    box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.3),
      0 0 5px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: inset 0 0 15px rgba(139, 92, 246, 0.4),
      0 0 10px rgba(139, 92, 246, 0.4);
  }
  100% {
    box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.3),
      0 0 5px rgba(139, 92, 246, 0.3);
  }
}

.cyber-terminal {
  font-family: "Courier New", monospace;
  position: relative;
  overflow: hidden;
}

.cyber-terminal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(6, 182, 212, 0.5) 25%,
    rgba(6, 182, 212, 0.5) 75%,
    transparent 100%
  );
}

.cyber-terminal-header {
  font-size: 0.7rem;
  color: #94a3b8;
  letter-spacing: 1px;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(6, 182, 212, 0.3);
  text-align: center;
}

.cyber-terminal-content {
  line-height: 1.6;
}

.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .rank-top {
    background: linear-gradient(to right, #4a0072, #9900ff);
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
    color: white !important;
    border-color: rgba(236, 72, 153, 0.7) !important;
  }
}

.cyberpunk-label-cyan {
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
  letter-spacing: 1px;
}

.cyberpunk-label-cyan svg {
  filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.7));
}

.cyberpunk-select-cyan {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  background: linear-gradient(
    135deg,
    rgba(8, 8, 16, 0.95),
    rgba(14, 23, 36, 0.95)
  );
  box-shadow: inset 0 0 10px rgba(6, 182, 212, 0.3),
    0 0 5px rgba(6, 182, 212, 0.3);
  text-shadow: 0 0 3px rgba(6, 182, 212, 0.7);
  caret-color: #06b6d4;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  padding-right: 2.5rem !important;
  color: #06b6d4;
  border: 2px solid rgba(6, 182, 212, 0.7);
}

.cyberpunk-select-cyan:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5);
  animation: pulse-glow-cyan 2s infinite;
}

.cyberpunk-select-glow-cyan {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
  border: 2px solid rgba(6, 182, 212, 0.8);
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  transform: scale(1.01);
  z-index: 0;
}

.cyberpunk-icon-cyan {
  filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.7));
  transition: transform 0.3s ease;
}

.cyberpunk-select-cyan:focus
  + .cyberpunk-select-glow-cyan
  + div
  .cyberpunk-icon-cyan,
.group:hover .cyberpunk-icon-cyan {
  transform: translateY(2px);
  filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.9));
}

@keyframes pulse-glow-cyan {
  0% {
    box-shadow: inset 0 0 10px rgba(6, 182, 212, 0.3),
      0 0 5px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: inset 0 0 15px rgba(6, 182, 212, 0.4),
      0 0 10px rgba(6, 182, 212, 0.4);
  }
  100% {
    box-shadow: inset 0 0 10px rgba(6, 182, 212, 0.3),
      0 0 5px rgba(6, 182, 212, 0.3);
  }
}
</style>
