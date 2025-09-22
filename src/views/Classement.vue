<template>
  <Container>
    <!-- En-tête de la page avec style NASA -->
    <Header title="CLASSEMENT" mission="RANKING" />
    <div class="flex flex-col gap-6">
      <!-- En-tête de la page -->
      <div class="relative flex justify-between items-center">
        <!-- Bouton d'export -->
        <Button
          @click="exportCSV"
          variant="secondary"
          size="sm"
          icon
          class="absolute right-0"
        >
          <template #icon>
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
          </template>
          CSV
        </Button>
      </div>

      <!-- Filtres -->
      <Card variant="primary" :stars="false" className="overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Sélecteur de jeux -->
          <div>
            <label for="game" class="mb-3 flex items-center gap-2">
              <div
                class="font-body text-color-primary-light flex items-center gap-2"
              >
                <!-- Icône de citrouille pour les jeux -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2c-1.1 0-2 .9-2 2 0 .5.2 1 .6 1.3-.4.2-.6.6-.6 1.1v.6c-2.2.4-4 2.2-4 4.5v3c0 2.8 2.2 5 5 5h2c2.8 0 5-2.2 5-5v-3c0-2.3-1.8-4.1-4-4.5v-.6c0-.5-.2-.9-.6-1.1.4-.3.6-.8.6-1.3 0-1.1-.9-2-2-2zm-3 9.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm6 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm-3 3c-.8 0-1.5.7-1.5 1.5 0 .4.2.8.5 1l-1 1c-.3-.2-.5-.5-.5-1 0-.8.7-1.5 1.5-1.5z"
                  />
                </svg>
                Filtrer par jeu
              </div>
            </label>
            <div class="relative">
              <select
                id="game"
                v-model="selectedGame"
                class="w-full rounded-lg border-2 border-color-primary/30 bg-color-bg-light text-color-text px-4 py-2 appearance-none focus:ring-2 focus:ring-color-primary/50 focus:border-color-primary focus:outline-none transition-all duration-300 hover:border-color-primary/50 hover:shadow-glow-primary"
                style="box-shadow: 0 0 10px rgba(217, 119, 6, 0.2)"
              >
                <option value="">Tous les jeux</option>
                <option v-for="game in games" :key="game._id" :value="game._id">
                  {{ game.name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              >
                <!-- Icône de flèche vers le bas avec style Halloween -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-color-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="filter: drop-shadow(0 0 4px rgba(217, 119, 6, 0.6))"
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
            <label for="season" class="mb-3 flex items-center gap-2">
              <div
                class="font-body text-color-secondary-light flex items-center gap-2"
              >
                <!-- Icône de lune sanglante pour les saisons -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    opacity="0.3"
                  />
                  <path
                    d="M12 22c5.52 0 10-4.48 10-10 0-1.19-.22-2.33-.62-3.38-.4-.72-1.43-.65-1.71.13-.37 1.04-.99 1.96-1.82 2.68C16.93 12.45 16 13.68 16 15.12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.44-.93-2.67-1.85-3.69-.83-.72-1.45-1.64-1.82-2.68-.28-.78-1.31-.85-1.71-.13C2.22 9.67 2 10.81 2 12c0 5.52 4.48 10 10 10z"
                  />
                </svg>
                Filtrer par saison
              </div>
            </label>
            <div class="relative">
              <select
                id="season"
                v-model="selectedSeason"
                class="w-full rounded-lg border-2 border-color-secondary/30 bg-color-bg-light text-color-text px-4 py-2 appearance-none focus:ring-2 focus:ring-color-secondary/50 focus:border-color-secondary focus:outline-none transition-all duration-300 hover:border-color-secondary/50 hover:shadow-glow-secondary"
                style="box-shadow: 0 0 10px rgba(220, 38, 38, 0.2)"
              >
                <option value="">Classement général</option>
                <option
                  v-for="season in seasons"
                  :key="season._id"
                  :value="season._id"
                >
                  {{
                    season.numero === 0
                      ? "Alors ça chill"
                      : `Saison ${season.numero}`
                  }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              >
                <!-- Icône de flèche vers le bas avec style Halloween sang -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-color-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="filter: drop-shadow(0 0 4px rgba(220, 38, 38, 0.6))"
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

          <!-- Recherche par joueur -->
          <div>
            <label for="search" class="mb-3 flex items-center gap-2">
              <div class="font-body text-color-text flex items-center gap-2">
                <!-- Icône loupe fantomatique -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-color-text-muted"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
                  />
                </svg>
                Rechercher un joueur
              </div>
            </label>
            <div class="relative">
              <input
                id="search"
                v-model.trim="searchQuery"
                type="text"
                inputmode="search"
                placeholder="Ex: Heekoz, Tekninon, ..."
                class="w-full rounded-lg border-2 border-color-bg-light/40 bg-color-bg-light text-color-text px-4 py-2 focus:ring-2 focus:ring-color-primary/40 focus:border-color-primary focus:outline-none transition-all duration-300 hover:border-color-primary/50 hover:shadow-glow-primary placeholder:text-color-text-muted"
                style="box-shadow: 0 0 10px rgba(148, 163, 184, 0.15)"
                aria-label="Rechercher un joueur par nom"
              />
            </div>
          </div>
        </div>
      </Card>

      <!-- État de chargement -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <Loader text="Chargement du classement..." />
      </div>

      <!-- Message si aucun résultat -->
      <Terminal
        v-else-if="sortedRankings.length === 0"
        :command="`search_players ${
          selectedGame ? '-g game_id:' + selectedGame : ''
        } ${selectedSeason ? '-s season_id:' + selectedSeason : ''}`"
        title="Console de recherche"
        showCursor
        className="my-8"
      >
        <div class="text-color-error font-mono">
          Erreur 404: Aucun joueur n'a été trouvé pour cette recherche.
        </div>
        <div class="text-color-text-muted mt-2">
          Essayez de modifier vos critères de recherche.
        </div>
      </Terminal>

      <!-- Tableau de classement -->
      <Card v-else variant="dark" :stars="false" className="overflow-hidden ">
        <!-- Barre d'options au-dessus du tableau -->
        <div
          class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-color-bg-light/10 border-b border-color-bg-light/30"
        >
          <div class="flex items-center gap-2">
            <span
              class="font-heading text-xs uppercase tracking-wider text-color-text-muted"
              >Éléments/page</span
            >
            <select
              v-model.number="itemsPerPage"
              class="rounded-md border-2 border-color-bg-light/40 bg-color-bg-light text-color-text px-2 py-1 text-sm focus:ring-2 focus:ring-color-primary/40 focus:border-color-primary"
              aria-label="Nombre d'éléments par page"
            >
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>

          <div class="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              @click="resetFilters"
              title="Réinitialiser les filtres"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
        <!-- Version desktop du tableau (caché sur mobile) -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full shadow-lg">
            <thead class="bg-color-bg-light/40 backdrop-blur sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  aria-sort="none"
                  class="px-6 py-4 text-center text-sm font-heading text-color-text-muted uppercase tracking-wider"
                >
                  Rang
                </th>
                <th
                  scope="col"
                  :aria-sort="
                    sortKey === 'username'
                      ? sortOrder === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  "
                  class="px-6 py-3 text-center text-xs font-heading text-color-text-muted uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Joueur</span>
                    <button
                      @click="sortBy('username')"
                      class="ml-1 p-1 rounded-full h-6 w-6 flex items-center justify-center hover:bg-color-bg-light/50 focus:outline-none"
                      :class="{
                        'bg-color-primary/50 text-white shadow-md':
                          sortKey === 'username',
                      }"
                      :aria-label="`Trier par joueur (${
                        sortKey === 'username'
                          ? sortOrder === 'asc'
                            ? 'croissant'
                            : 'décroissant'
                          : 'activer le tri'
                      })`"
                    >
                      <span v-if="sortKey === 'username' && sortOrder === 'asc'"
                        >▲</span
                      >
                      <span
                        v-else-if="
                          sortKey === 'username' && sortOrder === 'desc'
                        "
                        >▼</span
                      >
                      <span v-else>▼</span>
                    </button>
                  </div>
                </th>
                <th
                  scope="col"
                  :aria-sort="
                    sortKey === 'totalTournaments'
                      ? sortOrder === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  "
                  class="px-6 py-3 text-center text-xs font-heading text-color-text-muted uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Tournois</span>
                    <button
                      @click="sortBy('totalTournaments')"
                      class="ml-1 p-1 rounded-full h-6 w-6 flex items-center justify-center hover:bg-color-bg-light/50 focus:outline-none"
                      :class="{
                        'bg-color-primary/50 text-white shadow-md':
                          sortKey === 'totalTournaments',
                      }"
                      :aria-label="`Trier par nombre de tournois (${
                        sortKey === 'totalTournaments'
                          ? sortOrder === 'asc'
                            ? 'croissant'
                            : 'décroissant'
                          : 'activer le tri'
                      })`"
                    >
                      <span
                        v-if="
                          sortKey === 'totalTournaments' && sortOrder === 'asc'
                        "
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
                <th
                  scope="col"
                  :aria-sort="
                    sortKey === 'totalVictories'
                      ? sortOrder === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  "
                  class="px-6 py-3 text-center text-xs font-heading text-color-text-muted uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Victoires</span>
                    <button
                      @click="sortBy('totalVictories')"
                      class="ml-1 p-1 rounded-full h-6 w-6 flex items-center justify-center hover:bg-color-bg-light/50 focus:outline-none"
                      :class="{
                        'bg-color-primary/50 text-white shadow-md':
                          sortKey === 'totalVictories',
                      }"
                      :aria-label="`Trier par nombre de victoires (${
                        sortKey === 'totalVictories'
                          ? sortOrder === 'asc'
                            ? 'croissant'
                            : 'décroissant'
                          : 'activer le tri'
                      })`"
                    >
                      <span
                        v-if="
                          sortKey === 'totalVictories' && sortOrder === 'asc'
                        "
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
                class="transition-all duration-300"
                :class="[index % 2 === 0 ? 'row-even' : 'row-odd', 'row-hover']"
              >
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center">
                    <Badge
                      v-if="calculateGlobalRank(index) <= 3"
                      :variant="
                        getRankBadgeVariant(calculateGlobalRank(index) - 1)
                      "
                      class="mr-2 transform scale-125 shadow-glow"
                    >
                      {{ calculateGlobalRank(index) }}
                    </Badge>
                    <span v-else class="text-color-text-muted">{{
                      calculateGlobalRank(index)
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <router-link
                    :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                    class="text-color-text hover:text-color-primary-light font-body transition-all duration-300 text-center text-lg hover:underline hover:shadow-glow-primary"
                  >
                    {{ ranking.username }}
                  </router-link>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div
                    class="text-sm font-mono font-semibold text-color-secondary-light"
                  >
                    {{ ranking.totalTournaments }}
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div
                    class="text-sm font-mono font-semibold text-color-secondary-light"
                  >
                    {{ ranking.totalVictories }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Version mobile du tableau (affichée uniquement sur mobile) -->
        <div class="block md:hidden">
          <!-- Barre de tri pour mobile -->
          <div
            class="flex justify-between items-center p-3 bg-color-bg-light/20 border-b border-color-bg-light/30"
          >
            <div
              class="flex gap-2 items-center overflow-x-auto pb-2 hide-scrollbar w-full"
            >
              <span
                class="font-heading text-color-text-muted text-sm whitespace-nowrap flex-shrink-0"
                >Trier par:</span
              >
              <!-- Boutons de tri -->
              <Button
                @click="sortBy('username')"
                variant="ghost"
                size="xs"
                :className="
                  sortKey === 'username'
                    ? 'bg-color-primary/50 text-white flex-1 min-w-0 text-xs px-2 py-1'
                    : 'flex-1 min-w-0 text-xs px-2 py-1'
                "
              >
                <span class="truncate">
                  Nom
                  {{
                    sortKey === "username"
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : ""
                  }}
                </span>
              </Button>
              <Button
                @click="sortBy('totalVictories')"
                variant="ghost"
                size="xs"
                :className="
                  sortKey === 'totalVictories'
                    ? 'bg-color-primary/50 text-white flex-1 min-w-0 text-xs px-2 py-1'
                    : 'flex-1 min-w-0 text-xs px-2 py-1'
                "
              >
                <span class="truncate">
                  Victoires
                  {{
                    sortKey === "totalVictories"
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : ""
                  }}
                </span>
              </Button>
            </div>
          </div>

          <!-- Liste des joueurs version mobile -->
          <div>
            <div
              v-for="(ranking, index) in paginatedRankings"
              :key="ranking.playerId"
              class="p-3 transition-colors duration-200"
              :class="[index % 2 === 0 ? 'row-even' : 'row-odd', 'row-hover']"
            >
              <div class="flex items-center">
                <!-- Rang -->
                <div class="w-10 flex-shrink-0 flex justify-center">
                  <Badge
                    v-if="calculateGlobalRank(index) <= 3"
                    :variant="
                      getRankBadgeVariant(calculateGlobalRank(index) - 1)
                    "
                  >
                    {{ calculateGlobalRank(index) }}
                  </Badge>
                  <span v-else class="text-color-text-muted">{{
                    calculateGlobalRank(index)
                  }}</span>
                </div>

                <!-- Joueur avec troncature -->
                <div class="flex-grow min-w-0">
                  <router-link
                    :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                    class="text-color-primary hover:text-color-primary-light font-body transition-all duration-300 block truncate hover:underline hover:shadow-glow-primary"
                    :title="ranking.username"
                  >
                    {{ ranking.username }}
                  </router-link>
                </div>

                <!-- Victoires -->
                <div class="flex items-center ml-2 flex-shrink-0">
                  <div class="flex items-center">
                    <span
                      class="font-mono text-color-secondary font-semibold mr-1 whitespace-nowrap"
                    >
                      {{ ranking.totalVictories }}
                    </span>
                    <span
                      class="text-xs text-color-text-muted whitespace-nowrap"
                      >victoires</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="py-4 px-6">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @prev-page="prevPage"
            @next-page="nextPage"
            @page-select="currentPage = $event"
          />
        </div>
      </Card>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// Types pour le typage fort
import type { PlayerRanking, Season, Game } from "../types";

// Services
import seasonService from "../services/seasonService";
import gameService from "../services/gameService";
import playerService from "../services/playerService";

// Router
const route = useRoute();
const router = useRouter();

// État du composant
const isLoading = ref(true);
const games = ref<Game[]>([]);
const seasons = ref<Season[]>([]);
const rankings = ref<PlayerRanking[]>([]);

// État du tri
const sortKey = ref<keyof PlayerRanking>("totalVictories");
const sortOrder = ref<"asc" | "desc">("desc");

// Recherche
const searchQuery = ref("");

// État de la pagination
const currentPage = ref(1);
const itemsPerPage = ref(10); // Nombre d'éléments par page

// Filtres
const selectedGame = ref<string>("");
const selectedSeason = ref<string>("");

//-------------------------------------------------------
// SECTION: Récupération des données et actions
//-------------------------------------------------------

/**
 * Récupère les saisons disponibles
 */
const fetchSeasons = async () => {
  try {
    seasons.value = await seasonService.getAllSeasons();
  } catch (error) {
    console.error("Erreur lors de la récupération des saisons:", error);
  }
};

/**
 * Récupère les jeux disponibles
 */
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
  }
};

/**
 * Met à jour le classement selon les filtres sélectionnés (jeu et saison)
 */
const fetchRankingsByFilter = async () => {
  isLoading.value = true;
  currentPage.value = 1; // Réinitialiser à la première page

  try {
    if (selectedSeason.value) {
      // Récupérer le classement par saison
      const result = await seasonService.getSeasonRanking(
        selectedSeason.value,
        selectedGame.value
      );
      rankings.value = result.rankings || [];
    } else {
      // Récupérer le classement général
      if (selectedGame.value) {
        rankings.value = await playerService.getPlayerRankingsByGame(
          selectedGame.value
        );
      } else {
        rankings.value = await playerService.getPlayerRankings();
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du classement:", error);
    rankings.value = [];
  } finally {
    isLoading.value = false;
  }
};

//--- URL <-> State synchronisation helpers ----------------------------------
const syncFromRoute = () => {
  const q = route.query;
  if (typeof q.g === "string") selectedGame.value = q.g;
  if (typeof q.s === "string") selectedSeason.value = q.s;
  if (typeof q.q === "string") searchQuery.value = q.q;
  if (typeof q.p === "string" && !Number.isNaN(parseInt(q.p)))
    currentPage.value = Math.max(1, parseInt(q.p));
  if (typeof q.pp === "string" && !Number.isNaN(parseInt(q.pp))) {
    const pp = parseInt(q.pp);
    itemsPerPage.value = [10, 25, 50].includes(pp) ? pp : 10;
  }
};

const updateRouteQuery = () => {
  const next: Record<string, any> = { ...route.query };
  // Minimal keys
  if (selectedGame.value) next.g = selectedGame.value;
  else delete next.g;
  if (selectedSeason.value) next.s = selectedSeason.value;
  else delete next.s;
  if (searchQuery.value) next.q = searchQuery.value;
  else delete next.q;
  next.p = currentPage.value;
  next.pp = itemsPerPage.value;
  router.replace({ query: next });
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
      games.value.find((g) => g._id === selectedGame.value)?.name ||
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

/**
 * Réinitialise les filtres et la recherche
 */
const resetFilters = () => {
  selectedGame.value = "";
  // Saison par défaut: la plus récente si disponible, sinon classement général
  selectedSeason.value = seasons.value.length > 0 ? seasons.value[0]._id : "";
  searchQuery.value = "";
  sortKey.value = "totalVictories";
  sortOrder.value = "desc";
  itemsPerPage.value = 10;
  currentPage.value = 1;
  fetchRankingsByFilter();
};

//-------------------------------------------------------
// SECTION: Gestion du tri
//-------------------------------------------------------

/**
 * Gère le tri du tableau de classement
 * @param key - Clé de colonne sur laquelle effectuer le tri
 */
const sortBy = (key: string) => {
  const typedKey = key as keyof PlayerRanking;

  // Si on clique sur la même colonne
  if (sortKey.value === typedKey) {
    // Inverser l'ordre de tri
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    // Nouvelle colonne: définir la clé et commencer par ordre ascendant
    sortKey.value = typedKey;
    sortOrder.value = "asc";
  }

  // Revenir à la première page après un tri
  currentPage.value = 1;
};

/**
 * Détermine la variante de badge pour les rangs 1, 2 et 3
 */
const getRankBadgeVariant = (index: number) => {
  switch (index) {
    case 0:
      return "gold"; // 1er place (Or)
    case 1:
      return "silver"; // 2ème place (Argent)
    case 2:
      return "bronze"; // 3ème place (Bronze)
    default:
      return "primary";
  }
};

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Filtre par recherche (nom de joueur)
 */
const filteredRankings = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return rankings.value;
  return rankings.value.filter((r) => r.username.toLowerCase().includes(q));
});

/**
 * Propriété calculée qui retourne le classement trié selon les critères actuels
 */
const sortedRankings = computed(() => {
  return [...filteredRankings.value].sort((a, b) => {
    const valueA = a[sortKey.value];
    const valueB = b[sortKey.value];

    let result;
    // Tri spécifique pour les chaînes de caractères
    if (typeof valueA === "string" && typeof valueB === "string") {
      result = valueA.localeCompare(valueB);
    }
    // Tri pour les autres types de données
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
  Math.ceil(sortedRankings.value.length / itemsPerPage.value)
);

/**
 * Extrait les classements à afficher sur la page courante
 */
const paginatedRankings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = Math.min(start + itemsPerPage.value, sortedRankings.value.length);
  return sortedRankings.value.slice(start, end);
});

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
 * Calcule le rang global d'un joueur baséé sur son index dans la page courante
 */
const calculateGlobalRank = (index: number): number => {
  return (currentPage.value - 1) * itemsPerPage.value + index + 1;
};

//-------------------------------------------------------
// SECTION: Cycle de vie et watchers
//-------------------------------------------------------

// Petite fonction de debounce pour éviter les appels répétitifs
function debounce<T extends (...args: any[]) => any>(fn: T, wait = 250) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const debouncedFetch = debounce(fetchRankingsByFilter, 250);
const debouncedUpdateRoute = debounce(updateRouteQuery, 200);

// Observer les changements de selectedGame et selectedSeason
watch([() => selectedGame.value, () => selectedSeason.value], () => {
  debouncedFetch();
  debouncedUpdateRoute();
});

// Revenir à la première page quand on recherche ou change le nombre d'éléments par page
watch(searchQuery, () => {
  currentPage.value = 1;
  debouncedUpdateRoute();
});
watch(itemsPerPage, () => {
  currentPage.value = 1;
  debouncedUpdateRoute();
});
watch(currentPage, () => {
  debouncedUpdateRoute();
});

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  isLoading.value = true;
  try {
    // Charger les saisons et les jeux
    await Promise.all([fetchSeasons(), fetchGames()]);

    // Synchroniser depuis l'URL si disponible
    syncFromRoute();

    // Définir la saison actuelle comme valeur par défaut si aucune dans l'URL
    if (!route.query.s && seasons.value.length > 0) {
      // Les saisons sont triées par numéro décroissant, donc la première est la plus récente
      selectedSeason.value = seasons.value[0]._id;
    }

    // Charger le classement initial
    await fetchRankingsByFilter();
    updateRouteQuery();
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Améliorations pour la responsivité des mobiles */
@media (max-width: 640px) {
  .space-page-container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  /* Assure que les cartes ne débordent pas sur mobile */
  .color-card {
    overflow: hidden;
  }
}

th {
  position: relative;
  text-align: center;
  font-size: 0.95rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

td {
  position: relative;
  text-align: center;
  font-size: 1.05rem;
  padding: 1rem 0.75rem;
}

th:not(:last-child)::after,
td:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 20%;
  right: 0;
  height: 60%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(var(--color-primary-rgb), 0.6),
    transparent
  );
}

/* Lignes alternées avec thème Halloween */
.row-even {
  background-color: transparent;
}

.row-odd {
  background-color: rgba(
    var(--color-primary-rgb),
    0.08
  ); /* Orange Halloween au lieu de violet */
}

.row-hover:hover {
  background-color: rgba(
    var(--color-primary-rgb),
    0.15
  ); /* Orange plus intense au survol */
  z-index: 1;
  box-shadow: inset 0 0 8px rgba(var(--color-primary-rgb), 0.2);
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

/* Structure du tableau */
table {
  border-collapse: separate;
  border-spacing: 0;
}

tbody tr {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Effet de lueur pour les badges des premiers */
.shadow-glow {
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
}
</style>
