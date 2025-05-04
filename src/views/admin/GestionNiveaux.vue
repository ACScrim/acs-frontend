<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <div
      class="bg-black/50 backdrop-blur-xl rounded-lg p-6 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
    >
      <h1 class="text-4xl text-white mb-4 font-audiowide text-center neon-text">
        Gestion des niveaux de jeu
      </h1>
      <div class="flex justify-center">
        <div
          class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        ></div>
      </div>
    </div>

    <!-- Panel principal -->
    <div
      class="bg-black/70 backdrop-blur-md rounded-lg p-6 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <!-- Sélection de jeu -->
        <div class="relative w-full md:w-96">
          <label
            for="gameSelect"
            class="block text-cyan-400 font-orbitron text-sm mb-2"
          >
            Sélectionner un jeu
          </label>
          <select
            id="gameSelect"
            v-model="selectedGameId"
            @change="fetchPlayerLevels"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-orbitron appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
          >
            <option value="">Tous les jeux</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </select>
          <div class="absolute right-4 top-1/2 mt-3 pointer-events-none">
            <div
              class="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-cyan-500"
            ></div>
          </div>
        </div>

        <!-- Sélection de tournoi (affiché uniquement si un jeu est sélectionné) -->
        <div v-if="selectedGameId" class="relative w-full md:w-96">
          <label
            for="tournamentSelect"
            class="block text-cyan-400 font-orbitron text-sm mb-2"
          >
            Filtrer par tournoi (optionnel)
          </label>
          <select
            id="tournamentSelect"
            v-model="selectedTournamentId"
            @change="filterPlayersByTournament"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-orbitron appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
          >
            <option value="">Tous les joueurs</option>
            <option
              v-for="tournament in tournaments"
              :key="tournament._id"
              :value="tournament._id"
            >
              {{ tournament.name }} - {{ formatDate(tournament.date) }}
            </option>
          </select>
          <div class="absolute right-4 top-1/2 mt-3 pointer-events-none">
            <div
              class="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-cyan-500"
            ></div>
          </div>
        </div>
      </div>

      <!-- Résultats -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl text-cyan-400 font-audiowide flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
              />
            </svg>
            <span v-if="selectedTournamentId">
              Joueurs du tournoi inscrits à
              <span class="text-pink-400">{{ selectedGameName }}</span>
            </span>
            <span v-else-if="selectedGameId">
              Joueurs ayant défini leur niveau sur
              <span class="text-pink-400">{{ selectedGameName }}</span>
            </span>
            <span v-else
              >Tous les niveaux de jeux ({{
                filteredPlayerLevels.length
              }})</span
            >
          </h2>

          <div v-if="filteredPlayerLevels.length > 0" class="flex items-center">
            <span class="text-gray-400 font-orbitron text-sm mr-2">
              {{ filteredPlayerLevels.length }} joueur(s)
            </span>
            <button
              @click="exportToCSV"
              class="p-2 rounded-lg bg-blue-900/40 hover:bg-blue-900/60 text-blue-300 border border-blue-500/40 hover:border-blue-500/80 transition-all duration-300 font-orbitron text-sm flex items-center"
              title="Exporter en CSV"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Exporter
            </button>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="loading" class="flex justify-center p-12">
          <CyberpunkLoader />
        </div>

        <!-- Message quand aucun jeu n'est sélectionné -->
        <div
          v-if="!selectedGameId && filteredPlayerLevels.length === 0"
          class="bg-gray-900/60 rounded-lg p-12 border border-cyan-500/30 flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-cyan-500/50 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          <p class="text-cyan-300 font-orbitron text-center">
            Aucun niveau de jeu défini pour le moment
          </p>
        </div>

        <!-- Aucun résultat -->
        <div
          v-else-if="filteredPlayerLevels.length === 0"
          class="bg-gray-900/60 rounded-lg p-8 border border-cyan-500/30 flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-gray-500 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-gray-400 font-orbitron text-center">
            Aucun joueur trouvé pour ce critère de recherche
          </p>
        </div>

        <!-- Tableau des joueurs -->
        <div v-else>
          <div class="hidden md:block overflow-x-auto">
            <table
              class="min-w-full bg-gray-900/40 border border-cyan-500/30 rounded-lg overflow-hidden"
            >
              <thead>
                <tr class="bg-cyan-900/30 border-b border-cyan-500/30">
                  <th
                    class="py-3 px-4 text-left text-xs font-orbitron text-cyan-300 uppercase tracking-wider"
                  >
                    Joueur
                  </th>
                  <!-- Ajout de la colonne Jeu quand aucun filtre n'est appliqué -->
                  <th
                    v-if="!selectedGameId"
                    class="py-3 px-4 text-left text-xs font-orbitron text-cyan-300 uppercase tracking-wider w-40"
                  >
                    Jeu
                  </th>
                  <th
                    class="py-3 px-4 text-left text-xs font-orbitron text-cyan-300 uppercase tracking-wider"
                  >
                    Pseudo dans le jeu
                  </th>
                  <th
                    class="py-3 px-4 text-left text-xs font-orbitron text-cyan-300 uppercase tracking-wider"
                  >
                    Niveau
                  </th>

                  <th
                    class="py-3 px-4 text-left text-xs font-orbitron text-cyan-300 uppercase tracking-wider"
                  >
                    Rang
                  </th>
                  <th
                    class="py-3 px-4 text-left text-xs font-orbitron text-cyan-300 uppercase tracking-wider"
                  >
                    Commentaire
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-cyan-500/20">
                <tr
                  v-for="playerLevel in filteredPlayerLevels"
                  :key="playerLevel._id"
                  class="hover:bg-cyan-900/20 transition-colors duration-150"
                >
                  <td class="py-4 px-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <!-- Mise à jour de l'avatar comme dans la vue Membres -->
                      <div class="avatar-container">
                        <img
                          v-if="playerLevel.player.userInfo?.avatarUrl"
                          :src="playerLevel.player.userInfo.avatarUrl"
                          class="w-8 h-8 rounded-full object-cover border-2 border-cyan-500 avatar-glow"
                          alt="Avatar"
                          loading="lazy"
                          @error="handleImageError($event)"
                        />
                        <div
                          v-else
                          class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border-2 border-pink-500"
                        >
                          <span class="text-pink-500 text-xs font-bold">{{
                            getUserInitials(
                              playerLevel.player.username || "inconnu"
                            )
                          }}</span>
                        </div>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-white">
                          {{ playerLevel.player.username }}
                        </div>
                        <div
                          v-if="playerLevel.player.userInfo?.username"
                          class="text-xs text-gray-400"
                        >
                          {{ playerLevel.player.userInfo.username }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    v-if="!selectedGameId"
                    class="py-4 px-4 whitespace-nowrap max-w-[160px]"
                  >
                    <div class="flex items-center">
                      <img
                        v-if="getGameImage(playerLevel)"
                        :src="getGameImage(playerLevel)"
                        class="w-6 h-6 rounded object-cover mr-2 flex-shrink-0"
                        alt="Logo du jeu"
                        loading="lazy"
                        @error="handleImageError($event)"
                      />
                      <span
                        class="text-xs font-medium text-white truncate"
                        title="{{ getGameName(playerLevel) }}"
                        >{{ getGameName(playerLevel) }}</span
                      >
                    </div>
                  </td>
                  <td class="py-4 px-4 whitespace-nowrap">
                    <div class="text-sm text-gray-300">
                      {{ playerLevel.gameUsername || "Non renseigné" }}
                    </div>
                  </td>
                  <td class="py-4 px-4 whitespace-nowrap">
                    <span :class="getLevelBadgeClass(playerLevel.level)">
                      {{ capitalizeFirstLetter(playerLevel.level) }}
                    </span>
                  </td>

                  <td class="py-4 px-4 whitespace-nowrap">
                    <div
                      v-if="playerLevel.isRanked && playerLevel.rank"
                      class="flex items-center"
                    >
                      <span
                        :class="[
                          'h-2 w-2 rounded-full mr-2',
                          getRankClass(playerLevel.rank).replace(
                            'text-',
                            'bg-'
                          ),
                        ]"
                        :style="{
                          boxShadow: `0 0 5px ${getRankColor(
                            playerLevel.rank
                          )}`,
                        }"
                      ></span>
                      <span
                        :class="[
                          'text-sm font-medium',
                          getRankClass(playerLevel.rank),
                        ]"
                        :style="getRankStyle(playerLevel.rank)"
                      >
                        {{ playerLevel.rank }}
                      </span>
                    </div>
                    <div v-else class="text-sm text-gray-500 italic">
                      Non classé
                    </div>
                  </td>
                  <td class="py-4 px-4 max-w-xs">
                    <div
                      v-if="playerLevel.comment"
                      class="text-sm text-gray-300"
                    >
                      <div class="relative group">
                        <!-- Commentaire tronqué -->
                        <div class="truncate max-w-xs">
                          {{ playerLevel.comment }}
                        </div>

                        <!-- Tooltip pour afficher le commentaire complet au survol -->
                        <div
                          class="absolute left-0 -bottom-1 translate-y-full w-72 z-30 hidden group-hover:block bg-gray-800 border border-cyan-500/40 p-3 rounded-lg shadow-lg shadow-cyan-500/20 whitespace-pre-wrap break-words"
                        >
                          <div class="text-sm text-gray-300">
                            {{ playerLevel.comment }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-sm text-gray-500 italic">
                      Aucun commentaire
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Vue mobile - cartes empilées -->
          <div class="md:hidden space-y-4">
            <div
              v-for="playerLevel in filteredPlayerLevels"
              :key="playerLevel._id"
              class="bg-gray-900/40 border border-cyan-500/30 rounded-lg p-4 shadow-md hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <!-- En-tête de la carte avec avatar et nom -->
              <div
                class="flex items-center mb-3 pb-2 border-b border-cyan-500/20"
              >
                <div class="avatar-container">
                  <img
                    v-if="playerLevel.player.userInfo?.avatarUrl"
                    :src="playerLevel.player.userInfo.avatarUrl"
                    class="w-10 h-10 rounded-full object-cover border-2 border-cyan-500 avatar-glow"
                    alt="Avatar"
                    loading="lazy"
                    @error="handleImageError($event)"
                  />
                  <div
                    v-else
                    class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-pink-500"
                  >
                    <span class="text-pink-500 text-sm font-bold">
                      {{
                        getUserInitials(
                          playerLevel.player.username || "inconnu"
                        )
                      }}
                    </span>
                  </div>
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-white">
                    {{ playerLevel.player.username }}
                  </div>
                  <div
                    v-if="playerLevel.player.userInfo?.username"
                    class="text-xs text-gray-400"
                  >
                    {{ playerLevel.player.userInfo.username }}
                  </div>
                </div>
              </div>

              <!-- Informations du jeu quand aucun filtre n'est appliqué -->
              <div v-if="!selectedGameId" class="flex items-center mb-3">
                <div class="text-xs text-cyan-400 font-orbitron uppercase w-24">
                  Jeu
                </div>
                <div class="flex items-center max-w-[calc(100%-96px)]">
                  <img
                    v-if="getGameImage(playerLevel)"
                    :src="getGameImage(playerLevel)"
                    class="w-6 h-6 rounded object-cover mr-2 flex-shrink-0"
                    alt="Logo du jeu"
                    loading="lazy"
                    @error="handleImageError($event)"
                  />
                  <span
                    class="text-xs font-medium text-white truncate"
                    title="{{ getGameName(playerLevel) }}"
                  >
                    {{ getGameName(playerLevel) }}
                  </span>
                </div>
              </div>

              <!-- Pseudo dans le jeu -->
              <div class="flex items-start mb-3">
                <div class="text-xs text-cyan-400 font-orbitron uppercase w-24">
                  Pseudo jeu
                </div>
                <div class="text-sm text-gray-300">
                  {{ playerLevel.gameUsername || "Non renseigné" }}
                </div>
              </div>

              <!-- Niveau -->
              <div class="flex items-start mb-3">
                <div class="text-xs text-cyan-400 font-orbitron uppercase w-24">
                  Niveau
                </div>
                <span :class="getLevelBadgeClass(playerLevel.level)">
                  {{ capitalizeFirstLetter(playerLevel.level) }}
                </span>
              </div>

              <!-- Rang -->
              <div class="flex items-start mb-3">
                <div class="text-xs text-cyan-400 font-orbitron uppercase w-24">
                  Rang
                </div>
                <div
                  v-if="playerLevel.isRanked && playerLevel.rank"
                  class="flex items-center"
                >
                  <span
                    :class="[
                      'h-2 w-2 rounded-full mr-2',
                      getRankClass(playerLevel.rank).replace('text-', 'bg-'),
                    ]"
                    :style="{
                      boxShadow: `0 0 5px ${getRankColor(playerLevel.rank)}`,
                    }"
                  ></span>
                  <span
                    :class="[
                      'text-sm font-medium',
                      getRankClass(playerLevel.rank),
                    ]"
                    :style="getRankStyle(playerLevel.rank)"
                  >
                    {{ playerLevel.rank }}
                  </span>
                </div>
                <div v-else class="text-sm text-gray-500 italic">
                  Non classé
                </div>
              </div>

              <!-- Commentaire amélioré -->
              <div class="flex items-start">
                <div class="text-xs text-cyan-400 font-orbitron uppercase w-24">
                  Commentaire
                </div>
                <div v-if="playerLevel.comment">
                  <div
                    class="text-sm text-gray-300 whitespace-pre-wrap break-words max-w-xs"
                  >
                    {{ playerLevel.comment }}
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 italic">
                  Aucun commentaire
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages d'état -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Toast from "@/shared/Toast.vue";
import gameService from "../../services/gameService";
import playerGameLevelService from "../../services/playerGameLevelService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament, PlayerGameLevel } from "../../types";
import { getRankClass, getRankColor } from "../../utils/rankHelper"; // Ajoutez cette ligne
import CyberpunkLoader from "../../shared/CyberpunkLoader.vue"; // Assurez-vous que cette ligne est présente

// État de l'interface
const loading = ref(true);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

// Données
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const playerLevels = ref<PlayerGameLevel[]>([]);
const tournamentPlayers = ref<string[]>([]);

// Sélections
const selectedGameId = ref("");
const selectedTournamentId = ref("");

// Propriétés calculées
const selectedGameName = computed(() => {
  if (!selectedGameId.value) return "";
  const game = games.value.find((g) => g._id === selectedGameId.value);
  return game ? game.name : "";
});

const filteredPlayerLevels = computed(() => {
  let filtered = [...playerLevels.value];

  // Filtrer par jeu sélectionné si ce n'est pas vide
  if (selectedGameId.value) {
    filtered = filtered.filter((level) => {
      const gameId =
        typeof level.game === "object" ? level.game._id : level.game;
      return gameId === selectedGameId.value;
    });

    // Si un tournoi est sélectionné, filtrer par joueurs de ce tournoi
    if (selectedTournamentId.value && tournamentPlayers.value.length > 0) {
      filtered = filtered.filter((level) => {
        const playerId =
          typeof level.player === "object" ? level.player._id : level.player;
        return tournamentPlayers.value.includes(playerId ?? "");
      });
    }
  }

  return filtered;
});

/**
 * Récupérer tous les jeux
 */
const fetchGames = async () => {
  try {
    const response = await gameService.getGames();
    games.value = response;
  } catch (err) {
    console.error("Erreur lors du chargement des jeux:", err);
    showMessage("error", "Erreur lors du chargement des jeux");
  }
};

/**
 * Récupérer les niveaux des joueurs pour un jeu spécifique ou tous les niveaux
 */
const fetchPlayerLevels = async () => {
  // Réinitialiser la sélection du tournoi
  selectedTournamentId.value = "";
  tournamentPlayers.value = [];

  try {
    loading.value = true;

    if (!selectedGameId.value) {
      // Si aucun jeu n'est sélectionné, récupérer tous les niveaux
      await fetchAllPlayerLevels();
    } else {
      // Récupérer les niveaux des joueurs pour ce jeu
      const response = await playerGameLevelService.getPlayerLevelsByGame(
        selectedGameId.value
      );
      playerLevels.value = response;

      // Récupérer les tournois associés à ce jeu
      const tournamentsResponse = await tournamentService.getTournamentsByGame(
        selectedGameId.value
      );
      tournaments.value = tournamentsResponse;
    }
  } catch (err) {
    console.error("Erreur lors du chargement des niveaux de jeu:", err);
    showMessage("error", "Erreur lors du chargement des niveaux de jeu");
    playerLevels.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * Récupérer tous les niveaux de tous les jeux
 */
const fetchAllPlayerLevels = async () => {
  try {
    loading.value = true;
    // Appel à une API qui récupère tous les niveaux de tous les jeux
    const response = await playerGameLevelService.getAllPlayerLevels();
    playerLevels.value = response;
  } catch (err) {
    console.error("Erreur lors du chargement des niveaux de jeu:", err);
    showMessage("error", "Erreur lors du chargement des niveaux de jeu");
    playerLevels.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * Filtrer les joueurs par tournoi
 */
const filterPlayersByTournament = async () => {
  if (!selectedTournamentId.value) {
    tournamentPlayers.value = [];
    return;
  }

  try {
    loading.value = true;

    // Récupérer le tournoi sélectionné avec les joueurs
    const tournament = await tournamentService.getTournamentById(
      selectedTournamentId.value
    );

    // Extraire tous les IDs des joueurs du tournoi (liste principale et liste d'attente)
    const playerIds = [
      ...(tournament.players || []).map((p) =>
        typeof p === "object" ? p._id : p
      ),
      ...(tournament.waitlistPlayers || []).map((p) =>
        typeof p === "object" ? p._id : p
      ),
    ];

    tournamentPlayers.value = playerIds.filter(
      (id): id is string => id !== undefined
    );
  } catch (err) {
    console.error("Erreur lors du chargement des joueurs du tournoi:", err);
    showMessage("error", "Erreur lors du chargement des joueurs du tournoi");
    tournamentPlayers.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * Obtenir la classe CSS pour le badge de niveau
 */
const getLevelBadgeClass = (level: string): string => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-md";

  switch (level) {
    case "débutant":
      return `${baseClasses} bg-green-900/50 text-green-300 border border-green-500/50`;
    case "intermédiaire":
      return `${baseClasses} bg-blue-900/50 text-blue-300 border border-blue-500/50`;
    case "avancé":
      return `${baseClasses} bg-purple-900/50 text-purple-300 border border-purple-500/50`;
    case "expert":
      return `${baseClasses} bg-pink-900/50 text-pink-300 border border-pink-500/50`;
    default:
      return `${baseClasses} bg-gray-900/50 text-gray-300 border border-gray-500/50`;
  }
};

/**
 * Récupérer l'image du jeu
 */
const getGameImage = (level: PlayerGameLevel): string | undefined => {
  return typeof level.game === "object" && level.game.imageUrl
    ? level.game.imageUrl
    : undefined;
};

/**
 * Récupérer le nom du jeu
 */
const getGameName = (level: PlayerGameLevel): string => {
  return typeof level.game === "object" && level.game.name
    ? level.game.name
    : "Jeu inconnu";
};
/**
 * Gère l'erreur de chargement d'image
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    // Vérifier si c'est un avatar ou une image de jeu
    const isAvatar = e.target.classList.contains("rounded-full");

    if (isAvatar) {
      // Récupérer le nom d'utilisateur pour générer les initiales
      const container = e.target.closest(".avatar-container");
      const usernameElement =
        container?.parentElement?.querySelector(".text-white");
      const username = usernameElement?.textContent?.trim() || "?";
      const initials = getUserInitials(username);

      // Utiliser l'API ui-avatars pour générer un avatar
      e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;

      // Modifier le style
      e.target.classList.remove("avatar-glow");
      e.target.classList.add("border-pink-500");
    } else {
      // Pour les images de jeu, utiliser une image générique
      e.target.src = "/images/default-game.png"; // Créez cette image par défaut
      e.target.classList.add("opacity-70");
    }
  }
};

/**
 * Récupère les initiales d'un nom d'utilisateur
 */
const getUserInitials = (username: string) => {
  if (!username) return "?";
  const nameParts = username.split(" ");
  if (nameParts.length === 1) return username.charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

/**
 * Mettre la première lettre en majuscule
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Formater une date pour l'affichage
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
/**
 * Obtenir un style personnalisé pour l'affichage du rang
 */
const getRankStyle = (rank: string) => {
  if (!rank) return {};
  const color = getRankColor(rank);
  return {
    textShadow: `0 0 8px ${color}90`,
  };
};
/**
 * Exporter les données en format CSV
 */
const exportToCSV = () => {
  const headers = [
    "Joueur",
    "Discord",
    "Pseudo dans le jeu",
    "Niveau",
    "Classé",
    "Rang",
    "Catégorie de rang", // Nouvelle colonne
    "Commentaire",
  ];

  // Préparer les données
  const data = filteredPlayerLevels.value.map((level) => {
    const playerName = level.player ? level.player.username : "Inconnu";
    const discordName =
      level.player && level.player.userInfo
        ? level.player.userInfo.username
        : "N/A";

    // Déterminer la catégorie de rang
    const rankCategory = level.rank
      ? getRankClass(level.rank).replace("text-", "")
      : "N/A";

    return [
      playerName,
      discordName,
      level.gameUsername || "Non renseigné",
      level.level,
      level.isRanked ? "Oui" : "Non",
      level.rank || "Non classé",
      rankCategory, // Ajout de la catégorie
      level.comment || "",
    ];
  });

  // Créer le contenu CSV
  const csvContent = [
    headers.join(","),
    ...data.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  // Créer et déclencher le téléchargement
  const gameName = selectedGameName.value || "tous-les-jeux";
  const tournamentLabel = selectedTournamentId.value ? "-tournoi" : "";
  const fileName = `niveaux-${gameName}${tournamentLabel}-${
    new Date().toISOString().split("T")[0]
  }.csv`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Afficher un message
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  // Masquer le message après 3 secondes
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

const fetchTournamentsForGame = async (gameId: string) => {
  try {
    // Réinitialiser la sélection du tournoi
    selectedTournamentId.value = "";
    tournamentPlayers.value = [];

    // Récupérer les tournois associés à ce jeu
    const tournamentsResponse = await tournamentService.getTournamentsByGame(
      gameId
    );
    tournaments.value = tournamentsResponse;
  } catch (err) {
    console.error("Erreur lors du chargement des tournois:", err);
    showMessage("error", "Erreur lors du chargement des tournois");
    tournaments.value = [];
  }
};

// Observer les changements de jeu sélectionné
watch(selectedGameId, () => {
  if (selectedGameId.value) {
    // Si un jeu est sélectionné, on charge les tournois associés
    fetchTournamentsForGame(selectedGameId.value);
  } else {
    // Si on désélectionne, on réinitialise juste le tournoi mais pas les niveaux
    selectedTournamentId.value = "";
    tournaments.value = [];
  }
});

// Initialisation
onMounted(async () => {
  try {
    // Chargement parallèle des jeux et de tous les niveaux
    await Promise.all([fetchGames(), fetchAllPlayerLevels()]);
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Animation pour le bouton d'export */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.avatar-container {
  position: relative;
}

.avatar-glow {
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
  transition: all 0.3s ease;
}

tr:hover .avatar-glow,
div:hover .avatar-glow {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
}

[title] {
  cursor: help;
  position: relative;
}

/* Style pour l'affichage des commentaires sur mobile */
.break-words {
  word-break: break-word;
}

/* Animation du tooltip */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .group-hover\:block {
  display: block;
  animation: fadeIn 0.2s ease-out forwards;
}

/* Responsive design pour le container principal */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
