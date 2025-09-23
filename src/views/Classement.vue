<template>
  <Container>
    <Header title="CLASSEMENT" mission="RANKING" />
    <div class="flex flex-col gap-6">
      <!-- Bouton d'export CSV -->
      <div class="relative flex justify-between items-center">
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

      <!-- Filtres de recherche et sélection -->
      <Card variant="primary" :stars="false" className="overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Sélecteur de jeux -->
          <div>
            <Dropdown
              id="game"
              v-model="selectedGame"
              label="Filtrer par jeu"
              placeholder="Tous les jeux"
              class="compact-dropdown game-dropdown"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M21,6H18A6,6 0 0,0 12,0A6,6 0 0,0 6,6H3A3,3 0 0,0 0,9V19A3,3 0 0,0 3,22H21A3,3 0 0,0 24,19V9A3,3 0 0,0 21,6M12,2A4,4 0 0,1 16,6H8A4,4 0 0,1 12,2M22,19A1,1 0 0,1 21,20H3A1,1 0 0,1 2,19V9A1,1 0 0,1 3,8H21A1,1 0 0,1 22,9"
                  />
                </svg>
              </template>
              <option value="">Tous les jeux</option>
              <option v-for="game in games" :key="game._id" :value="game._id">
                {{ game.name }}
              </option>
            </Dropdown>
          </div>

          <!-- Sélecteur de saisons -->
          <div>
            <Dropdown
              id="season"
              v-model="selectedSeason"
              label="Filtrer par saison"
              placeholder="Classement général"
              class="compact-dropdown season-dropdown"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                  />
                </svg>
              </template>
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
            </Dropdown>
          </div>

          <!-- Recherche par nom de joueur -->
          <div>
            <Input
              id="search"
              v-model="searchQuery"
              label="Rechercher un joueur"
              type="text"
              placeholder="Ex: Heekoz, Tekninon, ..."
              class="compact-input search-input"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </template>
            </Input>
          </div>
        </div>
      </Card>

      <!-- État de chargement -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <Loader text="Chargement du classement..." />
      </div>

      <!-- Message d'absence de résultats -->
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

      <!-- Tableau de classement principal -->
      <Card v-else variant="dark" :stars="false" className="overflow-hidden ">
        <!-- Barre d'options et contrôles -->
        <div
          class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-color-bg-light/10 border-b border-color-bg-light/30"
        >
          <div class="flex items-center gap-2">
            <span
              class="font-heading text-xs uppercase tracking-wider text-color-text-muted"
              >Éléments/page</span
            >
            <Dropdown
              id="itemsPerPage"
              v-model="itemsPerPage"
              placeholder="10"
              size="sm"
              class="compact-dropdown"
            >
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </Dropdown>
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

        <!-- Version desktop du tableau -->
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

        <!-- Version mobile du tableau -->
        <div class="block md:hidden">
          <!-- Barre de tri mobile -->
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

          <!-- Liste des joueurs mobile -->
          <div>
            <div
              v-for="(ranking, index) in paginatedRankings"
              :key="ranking.playerId"
              class="p-3 transition-colors duration-200"
              :class="[index % 2 === 0 ? 'row-even' : 'row-odd', 'row-hover']"
            >
              <div class="flex items-center">
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

                <div class="flex-grow min-w-0">
                  <router-link
                    :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                    class="text-color-primary hover:text-color-primary-light font-body transition-all duration-300 block truncate hover:underline hover:shadow-glow-primary"
                    :title="ranking.username"
                  >
                    {{ ranking.username }}
                  </router-link>
                </div>

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

        <!-- Pagination du tableau -->
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
import type { PlayerRanking, Season, Game } from "../types";
import seasonService from "../services/seasonService";
import gameService from "../services/gameService";
import playerService from "../services/playerService";

const route = useRoute();
const router = useRouter();

//-------------------------------------------------------
// ÉTAT RÉACTIF
//-------------------------------------------------------

const isLoading = ref(true);
const games = ref<Game[]>([]);
const seasons = ref<Season[]>([]);
const rankings = ref<PlayerRanking[]>([]);

const sortKey = ref<keyof PlayerRanking>("totalVictories");
const sortOrder = ref<"asc" | "desc">("desc");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const selectedGame = ref<string>("");
const selectedSeason = ref<string>("");

//-------------------------------------------------------
// SERVICES ET ACTIONS
//-------------------------------------------------------

/**
 * Récupère la liste des saisons disponibles depuis l'API
 */
const fetchSeasons = async () => {
  try {
    seasons.value = await seasonService.getAllSeasons();
  } catch (error) {
    console.error("Erreur lors de la récupération des saisons:", error);
  }
};

/**
 * Récupère la liste des jeux disponibles depuis l'API
 */
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
  }
};

/**
 * Met à jour le classement en fonction des filtres sélectionnés (jeu et saison)
 */
const fetchRankingsByFilter = async () => {
  isLoading.value = true;
  currentPage.value = 1;

  try {
    if (selectedSeason.value) {
      const result = await seasonService.getSeasonRanking(
        selectedSeason.value,
        selectedGame.value
      );
      rankings.value = result.rankings || [];
    } else {
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

//-------------------------------------------------------
// SYNCHRONISATION URL
//-------------------------------------------------------

/**
 * Synchronise l'état local avec les paramètres d'URL
 */
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

/**
 * Met à jour l'URL avec les paramètres de filtrage actuels
 */
const updateRouteQuery = () => {
  const next: Record<string, any> = { ...route.query };
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

//-------------------------------------------------------
// UTILITAIRES
//-------------------------------------------------------

/**
 * Exporte les données du classement au format CSV
 */
const exportCSV = () => {
  let csvContent = "Rang,Joueur,Tournois,Victoires\n";

  sortedRankings.value.forEach((player, index) => {
    csvContent += `${index + 1},${player.username},${player.totalTournaments},${
      player.totalVictories
    }\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const date = new Date().toISOString().split("T")[0];
  let fileName = "classement";

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
 * Réinitialise tous les filtres aux valeurs par défaut
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

/**
 * Gère le tri des colonnes du tableau
 * @param key - Nom de la propriété sur laquelle trier
 */
const sortBy = (key: string) => {
  const typedKey = key as keyof PlayerRanking;

  if (sortKey.value === typedKey) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = typedKey;
    sortOrder.value = "asc";
  }

  currentPage.value = 1;
};

/**
 * Retourne la variante de badge appropriée selon le rang
 * @param rank - Position dans le classement (0-based)
 * @returns Variante de badge (gold, silver, bronze, primary)
 */
const getRankBadgeVariant = (rank: number) => {
  const variants = ["gold", "silver", "bronze"] as const;
  return variants[rank] || "primary";
};

//-------------------------------------------------------
// PROPRIÉTÉS CALCULÉES
//-------------------------------------------------------

/**
 * Filtre les classements selon la recherche textuelle
 */
const filteredRankings = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return rankings.value;
  return rankings.value.filter((r) => r.username.toLowerCase().includes(q));
});

/**
 * Trie les classements filtrés selon les critères sélectionnés
 */
const sortedRankings = computed(() => {
  return [...filteredRankings.value].sort((a, b) => {
    const valueA = a[sortKey.value];
    const valueB = b[sortKey.value];

    let result = 0;
    if (typeof valueA === "string" && typeof valueB === "string") {
      result = valueA.localeCompare(valueB);
    } else {
      result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    // Départage spécial : victoires en priorité, puis tournois seulement si égalité parfaite sur les victoires
    if (sortKey.value === "totalVictories" && result === 0) {
      // Si égalité sur les victoires, on départage par le nombre de tournois (moins = mieux)
      result =
        sortOrder.value === "asc"
          ? a.totalTournaments - b.totalTournaments
          : a.totalTournaments - b.totalTournaments; // Toujours croissant pour départager
    }

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
 * Retourne les classements à afficher sur la page courante
 */
const paginatedRankings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedRankings.value.slice(start, start + itemsPerPage.value);
});

//-------------------------------------------------------
// PAGINATION
//-------------------------------------------------------

/**
 * Passe à la page suivante si possible
 */
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

/**
 * Revient à la page précédente si possible
 */
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

/**
 * Calcule le rang global d'un joueur basé sur la pagination
 * @param index - Index du joueur dans la page courante
 * @returns Rang global du joueur
 */
const calculateGlobalRank = (index: number): number => {
  return (currentPage.value - 1) * itemsPerPage.value + index + 1;
};

//-------------------------------------------------------
// WATCHERS ET CYCLE DE VIE
//-------------------------------------------------------

/**
 * Fonction de debounce pour limiter les appels répétitifs
 * @param fn - Fonction à debouncer
 * @param wait - Délai d'attente en millisecondes
 * @returns Fonction debouncée
 */
function debounce<T extends (...args: any[]) => any>(fn: T, wait = 250) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const debouncedUpdateRoute = debounce(updateRouteQuery, 200);

const updateData = debounce(() => {
  currentPage.value = 1;
  fetchRankingsByFilter();
  updateRouteQuery();
}, 250);

watch([selectedGame, selectedSeason, searchQuery, itemsPerPage], updateData);
watch(currentPage, debouncedUpdateRoute);

onMounted(async () => {
  isLoading.value = true;
  try {
    await Promise.all([fetchSeasons(), fetchGames()]);
    syncFromRoute();

    if (!route.query.s && seasons.value.length > 0) {
      selectedSeason.value = seasons.value[0]._id;
    }

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
/* Utilitaires de base */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Structure du tableau avec thème Halloween */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  position: relative;
  text-align: center;
  padding: 1rem 0.75rem;
}

th {
  font-size: 0.95rem;
}

td {
  font-size: 1.05rem;
}

/* Séparateurs verticaux entre colonnes */
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
.row-odd {
  background-color: rgba(var(--color-primary-rgb), 0.08);
}

.row-hover:hover {
  background-color: rgba(var(--color-primary-rgb), 0.15);
  box-shadow: inset 0 0 8px rgba(var(--color-primary-rgb), 0.2);
  transition: all 0.2s ease-in-out;
}

/* Animation de lueur pour les badges de podium */
.shadow-glow {
  animation: mystical-glow 2s infinite;
}

@keyframes mystical-glow {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
}

/* Styles spécifiques pour les dropdowns compacts */
.compact-dropdown :deep(.dropdown-label) {
  font-size: 0.875rem !important;
  margin-bottom: 0.5rem !important;
  font-family: var(--font-body) !important;
  color: rgba(var(--color-text-rgb), 0.8) !important;
}

.compact-dropdown :deep(.dropdown-select) {
  padding: 0.5rem 2rem 0.5rem 0.75rem !important;
  font-size: 0.875rem !important;
  min-height: auto !important;
  line-height: 1.4 !important;
}

.compact-dropdown :deep(.dropdown-label svg) {
  margin-right: 0.5rem !important;
}

.compact-dropdown :deep(.dropdown-arrow) {
  right: 0.5rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 10 !important;
}

.compact-dropdown :deep(.dropdown-arrow svg) {
  height: 0.75rem !important;
  width: 0.75rem !important;
}

/* Couleurs spécifiques pour différents types de dropdowns */
.game-dropdown :deep(.dropdown-label) {
  color: rgba(var(--color-secondary-rgb), 1) !important;
  text-shadow: 0 0 8px rgba(var(--color-secondary-rgb), 0.6) !important;
  font-weight: 500 !important;
}

.game-dropdown :deep(.dropdown-select) {
  border-color: rgba(var(--color-secondary-rgb), 0.5) !important;
  box-shadow: 0 0 10px rgba(var(--color-secondary-rgb), 0.3) !important;
}

.game-dropdown :deep(.dropdown-select:hover) {
  border-color: rgba(var(--color-secondary-rgb), 0.8) !important;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(var(--color-secondary-rgb), 0.5) !important;
}

.season-dropdown :deep(.dropdown-label) {
  color: rgba(var(--color-accent-rgb), 1) !important;
  text-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.6) !important;
  font-weight: 500 !important;
}

.season-dropdown :deep(.dropdown-select) {
  border-color: rgba(var(--color-accent-rgb), 0.5) !important;
  box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.3) !important;
}

.season-dropdown :deep(.dropdown-select:hover) {
  border-color: rgba(var(--color-accent-rgb), 0.8) !important;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(var(--color-accent-rgb), 0.5) !important;
}

/* Harmonisation de la taille de l'input avec les dropdowns */
.compact-input :deep(input) {
  padding: 0.5rem 0.75rem 0.5rem 2.5rem !important;
  font-size: 0.875rem !important;
  line-height: 1.4 !important;
  font-family: var(--font-body) !important;
}

.compact-input :deep(label) {
  font-size: 0.875rem !important;
  margin-bottom: 0.5rem !important;
  font-family: var(--font-body) !important;
  color: rgba(var(--color-text-rgb), 0.8) !important;
}

.compact-input :deep(.absolute.inset-y-0.left-0) {
  padding-left: 0.75rem !important;
  display: flex !important;
  align-items: center !important;
  pointer-events: none !important;
}

.compact-input :deep(.absolute.inset-y-0.left-0 svg) {
  height: 1rem !important;
  width: 1rem !important;
  color: rgba(var(--color-text-rgb), 0.6) !important;
}

.search-input :deep(label) {
  color: rgba(var(--color-primary-rgb), 1) !important;
  text-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.6) !important;
  font-weight: 500 !important;
}

.search-input :deep(input) {
  border-color: rgba(var(--color-primary-rgb), 0.5) !important;
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.3) !important;
}

.search-input :deep(input:hover) {
  border-color: rgba(var(--color-primary-rgb), 0.8) !important;
  box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4) !important;
}

.search-input :deep(input:focus) {
  border-color: rgba(var(--color-primary-rgb), 1) !important;
  box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.6) !important;
}
</style>
