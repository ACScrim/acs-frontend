<template>
  <SpaceContainer>
    <!-- En-tête de la page avec style NASA -->
    <SpaceHeader title="CLASSEMENT" />
    <div class="flex flex-col gap-6">
      <!-- En-tête de la page -->
      <div class="relative flex justify-between items-center">
        <!-- Bouton d'export -->
        <SpaceButton
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
        </SpaceButton>
      </div>

      <!-- Filtres -->
      <SpaceCard variant="primary" :stars="true" className="overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Filtrer par jeu
              </div>
            </label>
            <div class="relative">
              <select
                id="game"
                v-model="selectedGame"
                class="w-full rounded-lg border border-space-primary/30 bg-space-bg-light text-space-text px-4 py-2 appearance-none focus:ring-2 focus:ring-space-primary/30 focus:outline-none transition-all duration-300"
              >
                <option value="">Tous les jeux</option>
                <option v-for="game in games" :key="game._id" :value="game._id">
                  {{ game.name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-space-primary"
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
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Filtrer par saison
              </div>
            </label>
            <div class="relative">
              <select
                id="season"
                v-model="selectedSeason"
                class="w-full rounded-lg border border-space-secondary/30 bg-space-bg-light text-space-text px-4 py-2 appearance-none focus:ring-2 focus:ring-space-secondary/30 focus:outline-none transition-all duration-300"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-space-secondary"
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
      </SpaceCard>

      <!-- État de chargement -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <SpaceLoader text="Chargement du classement..." />
      </div>

      <!-- Message si aucun résultat -->
      <SpaceTerminal
        v-else-if="sortedRankings.length === 0"
        :command="`search_players ${
          selectedGame ? '-g game_id:' + selectedGame : ''
        } ${selectedSeason ? '-s season_id:' + selectedSeason : ''}`"
        title="Console de recherche"
        showCursor
        className="my-8"
      >
        <div class="text-space-error font-mono">
          Erreur 404: Aucun joueur n'a été trouvé pour cette recherche.
        </div>
        <div class="text-space-text-muted mt-2">
          Essayez de modifier vos critères de recherche.
        </div>
      </SpaceTerminal>

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
            <thead class="bg-space-bg-light/30">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 text-center text-sm font-heading text-space-text-muted uppercase tracking-wider"
                >
                  Rang
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-heading text-space-text-muted uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Joueur</span>
                    <button
                      @click="sortBy('username')"
                      class="ml-1 p-1 rounded-full h-6 w-6 flex items-center justify-center hover:bg-space-bg-light/50 focus:outline-none"
                      :class="{
                        'bg-space-primary/50 text-white shadow-md':
                          sortKey === 'username',
                      }"
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
                  class="px-6 py-3 text-center text-xs font-heading text-space-text-muted uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Tournois</span>
                    <button
                      @click="sortBy('totalTournaments')"
                      class="ml-1 p-1 rounded-full h-6 w-6 flex items-center justify-center hover:bg-space-bg-light/50 focus:outline-none"
                      :class="{
                        'bg-space-primary/50 text-white shadow-md':
                          sortKey === 'totalTournaments',
                      }"
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
                  class="px-6 py-3 text-center text-xs font-heading text-space-text-muted uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Victoires</span>
                    <button
                      @click="sortBy('totalVictories')"
                      class="ml-1 p-1 rounded-full h-6 w-6 flex items-center justify-center hover:bg-space-bg-light/50 focus:outline-none"
                      :class="{
                        'bg-space-primary/50 text-white shadow-md':
                          sortKey === 'totalVictories',
                      }"
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
                    <SpaceBadge
                      v-if="calculateGlobalRank(index) <= 3"
                      :variant="
                        getRankBadgeVariant(calculateGlobalRank(index) - 1)
                      "
                      class="mr-2 transform scale-125 shadow-glow"
                    >
                      {{ calculateGlobalRank(index) }}
                    </SpaceBadge>
                    <span v-else class="text-space-text-muted">{{
                      calculateGlobalRank(index)
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <router-link
                    :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                    class="text-space-text hover:text-space-primary-light font-heading transition-all duration-300 text-center text-lg"
                  >
                    {{ ranking.username }}
                  </router-link>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div
                    class="text-sm font-mono font-semibold text-space-secondary-light"
                  >
                    {{ ranking.totalTournaments }}
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div
                    class="text-sm font-mono font-semibold text-space-accent-light"
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
            class="flex justify-between items-center p-3 bg-space-bg-light/20 border-b border-space-bg-light/30"
          >
            <div
              class="flex gap-2 items-center overflow-x-auto pb-2 hide-scrollbar"
            >
              <span
                class="font-heading text-space-text-muted text-sm whitespace-nowrap"
                >Trier par:</span
              >
              <!-- Boutons de tri -->
              <SpaceButton
                @click="sortBy('username')"
                variant="ghost"
                size="xs"
                :className="
                  sortKey === 'username' ? 'bg-space-primary/50 text-white' : ''
                "
              >
                Nom
                {{
                  sortKey === "username"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""
                }}
              </SpaceButton>
              <SpaceButton
                @click="sortBy('totalVictories')"
                variant="ghost"
                size="xs"
                :className="
                  sortKey === 'totalVictories'
                    ? 'bg-space-primary/50 text-white'
                    : ''
                "
              >
                Victoires
                {{
                  sortKey === "totalVictories"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""
                }}
              </SpaceButton>
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
                  <SpaceBadge
                    v-if="calculateGlobalRank(index) <= 3"
                    :variant="
                      getRankBadgeVariant(calculateGlobalRank(index) - 1)
                    "
                  >
                    {{ calculateGlobalRank(index) }}
                  </SpaceBadge>
                  <span v-else class="text-space-text-muted">{{
                    calculateGlobalRank(index)
                  }}</span>
                </div>

                <!-- Joueur avec troncature -->
                <div class="flex-grow min-w-0">
                  <router-link
                    :to="{ name: 'Profil', params: { id: ranking.playerId } }"
                    class="text-space-primary hover:text-space-primary-light font-heading transition-all duration-300 block truncate"
                    :title="ranking.username"
                  >
                    {{ ranking.username }}
                  </router-link>
                </div>

                <!-- Victoires -->
                <div class="flex items-center ml-2 flex-shrink-0">
                  <div class="flex items-center">
                    <span
                      class="font-mono text-space-accent font-semibold mr-1 whitespace-nowrap"
                    >
                      {{ ranking.totalVictories }}
                    </span>
                    <span
                      class="text-xs text-space-text-muted whitespace-nowrap"
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
          <SpacePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @prev-page="prevPage"
            @next-page="nextPage"
            @page-select="currentPage = $event"
          />
        </div>
      </SpaceCard>
    </div>
  </SpaceContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

// Types pour le typage fort
import type { PlayerRanking, Season, Game } from "../types";

// Services
import seasonService from "../services/seasonService";
import gameService from "../services/gameService";
import playerService from "../services/playerService";

// État du composant
const isLoading = ref(true);
const games = ref<Game[]>([]);
const seasons = ref<Season[]>([]);
const rankings = ref<PlayerRanking[]>([]);

// État du tri
const sortKey = ref<keyof PlayerRanking>("totalVictories");
const sortOrder = ref<"asc" | "desc">("desc");

// État de la pagination
const currentPage = ref(1);
const itemsPerPage = 10; // Nombre d'éléments par page

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
 * Propriété calculée qui retourne le classement trié selon les critères actuels
 */
const sortedRankings = computed(() => {
  return [...rankings.value].sort((a, b) => {
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
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};

//-------------------------------------------------------
// SECTION: Cycle de vie et watchers
//-------------------------------------------------------

// Observer les changements de selectedGame et selectedSeason
watch([() => selectedGame.value, () => selectedSeason.value], () => {
  fetchRankingsByFilter();
});

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  isLoading.value = true;
  try {
    // Charger les saisons et les jeux
    await Promise.all([fetchSeasons(), fetchGames()]);

    // Définir la saison actuelle comme valeur par défaut si elle existe
    if (seasons.value.length > 0) {
      // Les saisons sont déjà triées par numéro décroissant, donc la première est la plus récente
      selectedSeason.value = seasons.value[0]._id;
    }

    // Charger le classement initial
    await fetchRankingsByFilter();
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
  .space-card {
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
    rgba(109, 40, 217, 1),
    transparent
  );
}

/* Garder les styles existants pour les lignes alternées, mais en éclaircissant */
.row-even {
  background-color: transparent;
}

.row-odd {
  background-color: rgba(109, 40, 217, 0.08); /* Plus claire que l'original */
}

.row-hover:hover {
  background-color: rgba(109, 40, 217, 0.15); /* Plus visible au survol */
  z-index: 1;
  box-shadow: inset 0 0 8px rgba(109, 40, 217, 0.2);
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
