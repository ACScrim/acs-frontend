<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<template>
  <div class="container mx-auto p-4 pt-20 min-h-screen">
    <!-- État d'erreur -->
    <CyberTerminal
      v-if="error"
      command="get_player_profile --id=${route.params.id}"
      errorCode="ERROR_404_PLAYER_NOT_FOUND"
      :message="error"
      title="SYSTÈME DE PROFIL · ACS"
      class="max-w-4xl mx-auto my-8"
    />

    <!-- Profil du joueur -->
    <div v-else-if="player" class="max-w-4xl mx-auto">
      <!-- En-tête du profil -->
      <div
        class="bg-black/50 backdrop-blur-2xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <div class="flex items-center justify-center mb-4">
          <div class="avatar-container mr-4">
            <img
              v-if="user && user.avatarUrl"
              :src="user.avatarUrl"
              alt="Avatar"
              class="h-24 w-24 rounded-full object-cover border-2 border-pink-500 shadow-glow-pink"
              loading="lazy"
              @error="handleImageError"
            />
            <div
              v-else
              class="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-pink-500"
            >
              <span class="text-pink-500 text-3xl font-bold">{{
                getInitials(player.username)
              }}</span>
            </div>
          </div>
          <h1
            class="text-4xl sm:text-5xl text-white neon-text font-audiowide capitalize"
          >
            {{ player.username }}
          </h1>
        </div>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Section des statistiques - Version simplifiée -->
      <div
        class="bg-black/75 rounded-lg p-8 mb-8 border border-cyan-500 shadow-lg shadow-cyan-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-cyan flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-cyan-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
            />
          </svg>
          Statistiques
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="bg-gray-800/70 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-gray-800/90 duration-300"
          >
            <div class="text-3xl font-bold text-pink-500 mb-1">
              {{ playerRanking?.totalVictories || 0 }}
            </div>
            <div class="text-gray-300 text-sm">Victoires</div>
          </div>
          <div
            class="bg-gray-800/70 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-gray-800/90 duration-300"
          >
            <div class="text-3xl font-bold text-cyan-500 mb-1">
              {{ playerRanking?.totalTournaments || 0 }}
            </div>
            <div class="text-gray-300 text-sm">Tournois</div>
          </div>
        </div>
      </div>

      <!-- Section Palmarès avec podium -->
      <div
        class="bg-black/75 rounded-lg p-8 mb-8 border border-amber-500 shadow-lg shadow-amber-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-gold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-amber-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Palmarès
        </h2>

        <!-- Visualisation du podium -->
        <div class="flex justify-center mb-6 relative py-10">
          <!-- Podium avec positions -->
          <div class="flex items-end h-40 space-x-1 sm:space-x-3">
            <!-- 2ème place (argent) -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.silver > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
                <div
                  class="absolute -bottom-1 -right-1 bg-gray-300 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 font-bold text-xs"
                >
                  2
                </div>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-gray-600 to-gray-300 rounded-t-md flex items-center justify-center h-24 border-t border-l border-r border-gray-300 shadow-inner relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gray-300 opacity-30 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-orbitron text-gray-800 z-10"
                  >{{ medalCount.silver }}</span
                >
              </div>
            </div>

            <!-- 1ère place (or) - plus haute -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.gold > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 shadow-md shadow-yellow-400/30"
                />
                <div
                  class="absolute -bottom-1 -right-1 bg-yellow-500 text-yellow-900 rounded-full w-6 h-6 flex items-center justify-center border border-yellow-400 font-bold text-xs animate-pulse-subtle"
                >
                  1
                </div>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-t-md flex items-center justify-center h-32 border-t border-l border-r border-yellow-400 shadow-inner shadow-yellow-400/20 relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-yellow-300 opacity-30 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-orbitron text-yellow-800 z-10"
                  >{{ medalCount.gold }}</span
                >
              </div>
            </div>

            <!-- 3ème place (bronze) -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.bronze > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-10 h-10 rounded-full object-cover border-2 border-amber-700 shadow-md"
                />
                <div
                  class="absolute -bottom-1 -right-1 bg-amber-700 text-amber-100 rounded-full w-6 h-6 flex items-center justify-center border border-amber-600 font-bold text-xs"
                >
                  3
                </div>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-amber-800 to-amber-500 rounded-t-md flex items-center justify-center h-16 border-t border-l border-r border-amber-700 shadow-inner relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-amber-600 opacity-30 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-orbitron text-amber-100 z-10"
                  >{{ medalCount.bronze }}</span
                >
              </div>
            </div>
          </div>

          <!-- Base du podium -->
          <div
            class="absolute bottom-0 bg-gray-800 h-4 w-full max-w-md rounded-md border-t border-purple-500/30"
          ></div>
        </div>

        <!-- Statistiques des médailles -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <!-- Or -->
          <div
            class="bg-gradient-to-br from-black/70 to-yellow-950/30 p-4 rounded-lg text-center border border-yellow-500/50 shadow-md shadow-yellow-500/10 transform transition-all hover:scale-105 hover:shadow-yellow-500/30 duration-300"
          >
            <div class="text-yellow-400 text-lg font-orbitron mb-1">🥇 Or</div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.gold }}
            </div>
            <div class="text-xs text-yellow-300/70">victoires</div>
          </div>

          <!-- Argent -->
          <div
            class="bg-gradient-to-br from-black/70 to-gray-800/30 p-4 rounded-lg text-center border border-gray-400/50 shadow-md shadow-gray-400/10 transform transition-all hover:scale-105 hover:shadow-gray-400/30 duration-300"
          >
            <div class="text-gray-300 text-lg font-orbitron mb-1">
              🥈 Argent
            </div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.silver }}
            </div>
            <div class="text-xs text-gray-400/70">2e places</div>
          </div>

          <!-- Bronze -->
          <div
            class="bg-gradient-to-br from-black/70 to-amber-950/30 p-4 rounded-lg text-center border border-amber-700/50 shadow-md shadow-amber-700/10 transform transition-all hover:scale-105 hover:shadow-amber-700/30 duration-300"
          >
            <div class="text-amber-600 text-lg font-orbitron mb-1">
              🥉 Bronze
            </div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.bronze }}
            </div>
            <div class="text-xs text-amber-600/70">3e places</div>
          </div>

          <!-- Jeu favori -->
          <div
            class="bg-gradient-to-br from-black/70 to-cyan-950/30 p-4 rounded-lg text-center border border-cyan-500/50 shadow-md shadow-cyan-500/10 transform transition-all hover:scale-105 hover:shadow-cyan-500/30 duration-300"
          >
            <div class="text-cyan-400 text-lg font-orbitron mb-1">
              🎮 Meilleur jeu
            </div>
            <div
              class="text-base font-bold text-white font-orbitron truncate max-w-full"
              :title="favoriteGame.name"
            >
              {{ favoriteGame.name || "Aucun" }}
            </div>
            <div class="text-xs text-cyan-300/70 mt-1">
              {{
                favoriteGame.count
                  ? `${favoriteGame.count} victoire${
                      favoriteGame.count > 1 ? "s" : ""
                    }`
                  : "Pas encore de victoire"
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- Section des badges -->
      <div
        class="bg-black/75 rounded-lg p-8 mb-8 border border-purple-500 shadow-lg shadow-purple-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-purple flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-purple-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Badges
          <span class="text-sm text-gray-400 ml-2">({{ badgeCount }})</span>
        </h2>
        <div
          v-if="hasBadges"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="badge in player.badges"
            :key="badge._id"
            class="flex flex-col items-center p-4 bg-gray-800/70 rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 duration-300 cursor-pointer"
            @click="selectBadge(badge)"
          >
            <img
              :src="badge.imageUrl"
              :alt="badge.title"
              class="h-16 w-16 mb-3 rounded-full border-2 border-purple-500 glow-badge object-cover"
              loading="lazy"
              @error="handleImageError"
            />
            <span class="text-white text-center font-orbitron text-sm">{{
              badge.title
            }}</span>
          </div>
        </div>
        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Aucun badge obtenu pour le moment
        </div>
      </div>

      <!-- Section des tournois -->
      <div
        class="bg-black/75 rounded-lg p-8 border border-pink-500 shadow-lg shadow-pink-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-pink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 2v5h5" />
            <path d="M2 7h12v5H2z" />
            <path d="M14 4v8" />
            <path d="M14 12h5v5h-5z" />
            <path d="M19 17h3v5h-3z" />
            <path d="M8 12v5h6" />
            <path d="M8 17h3v5H8z" />
          </svg>
          Tournois
          <span class="text-sm text-gray-400 ml-2"
            >({{ tournamentCount }})</span
          >
        </h2>

        <!-- Options de tri pour les tournois -->
        <div v-if="hasTournaments" class="flex justify-end mb-4">
          <div class="relative">
            <select
              v-model="tournamentSort"
              class="appearance-none bg-black/50 border border-pink-500/50 text-pink-400 text-sm font-orbitron px-3 py-1 pr-8 rounded-lg focus:outline-none focus:border-pink-500"
              aria-label="Trier les tournois"
            >
              <option value="date-desc">Plus récents d'abord</option>
              <option value="date-asc">Plus anciens d'abord</option>
              <option value="rank-asc">Meilleurs classements</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-400"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Liste des tournois -->
        <div v-if="hasTournaments">
          <ul class="space-y-4">
            <li
              v-for="tournament in paginatedTournaments"
              :key="tournament._id"
              class="bg-gray-800/70 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between transform transition-all hover:bg-gray-700/90 duration-300"
            >
              <div class="flex items-center mb-2 sm:mb-0 flex-1">
                <div
                  class="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 border border-pink-500/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-pink-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span class="text-white font-orbitron">{{
                  tournament.name
                }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-gray-400 text-sm">{{
                  formatDate(tournament.date)
                }}</span>
                <span
                  v-if="tournament && 'rank' in tournament"
                  class="px-3 py-1 rounded text-xs font-orbitron"
                  :class="getRankingClass(tournament.rank ?? 0)"
                >
                  {{ getRankingLabel(tournament.rank ?? 0) }} /
                  {{ tournament.numberOfTeams }}
                </span>
                <!-- Bouton détails du tournoi -->
                <router-link
                  :to="`/tournois/${tournament._id}`"
                  class="cyberpunk-btn-mini-pink px-3 py-1 rounded text-xs font-orbitron flex items-center"
                  title="Voir les détails du tournoi"
                >
                  <span>Détails</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </router-link>
              </div>
            </li>
          </ul>

          <!-- Pagination pour les tournois -->
          <div
            v-if="totalTournamentPages > 1"
            class="flex justify-center mt-6 space-x-2"
          >
            <button
              @click="prevTournamentPage"
              :disabled="currentTournamentPage === 1"
              class="px-3 py-1 bg-black/70 border border-pink-500/50 text-pink-400 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed font-orbitron transition-all hover:bg-black/90 hover:border-pink-500 hover:shadow-glow-pink"
            >
              &laquo; Précédent
            </button>

            <div
              class="flex items-center px-3 font-orbitron text-white text-xs"
            >
              Page {{ currentTournamentPage }} / {{ totalTournamentPages }}
            </div>

            <button
              @click="nextTournamentPage"
              :disabled="currentTournamentPage === totalTournamentPages"
              class="px-3 py-1 bg-black/70 border border-pink-500/50 text-pink-400 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed font-orbitron transition-all hover:bg-black/90 hover:border-pink-500 hover:shadow-glow-pink"
            >
              Suivant &raquo;
            </button>
          </div>
        </div>
        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Aucun tournoi pour le moment
        </div>
      </div>
    </div>

    <!-- Modal détail badge -->
    <div
      v-if="selectedBadge"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
      @click="selectedBadge = null"
    >
      <div
        class="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 max-w-md mx-4 transform transition-all duration-300 scale-100 shadow-2xl shadow-purple-500/30"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-orbitron text-purple-400 neon-text-purple">
            Détails du badge
          </h3>
          <button
            @click="selectedBadge = null"
            class="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center mb-4">
          <img
            :src="selectedBadge.imageUrl"
            :alt="selectedBadge.title"
            class="h-24 w-24 rounded-full border-2 border-purple-500 glow-badge mb-4"
          />
          <h4 class="text-xl text-white font-orbitron">
            {{ selectedBadge.title }}
          </h4>
          <p class="text-gray-400 mt-2 text-center">
            {{ selectedBadge.description || "Aucune description disponible" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import playerService from "../services/playerService";
import userService from "../services/userService";
import type { Player, PlayerRanking, Badge, User } from "../types";
import CyberTerminal from "../shared/CyberTerminal.vue";
//-------------------------------------------------------
// SECTION: Définition des états
//-------------------------------------------------------
/**
 * États pour la pagination et le tri des tournois
 */
const tournamentSort = ref("date-desc"); // Tri par défaut: plus récents d'abord
const currentTournamentPage = ref(1); // Page actuelle pour les tournois
const tournamentsPerPage = 5; // Nombre de tournois par page

/**
 * Données principales du profil
 */
const player = ref<Player | null>(null); // Données du joueur
const user = ref<User | null>(null); // Utilisateur associé au joueur
const playerRanking = ref<PlayerRanking | null>(null); // Classement du joueur

/**
 * États UI
 */
const loading = ref(true); // État de chargement
const error = ref<string | null>(null); // Message d'erreur
const selectedBadge = ref<Badge | null>(null); // Badge sélectionné pour affichage détaillé

/**
 * Accès aux paramètres de route
 */
const route = useRoute();

/**
 * Calcule le nombre de médailles pour chaque type (or, argent, bronze)
 */
const medalCount = computed(() => {
  // Valeurs par défaut
  const counts = { gold: 0, silver: 0, bronze: 0 };

  // Si pas de données de tournoi, retourner les compteurs à zéro
  if (!playerRanking.value?.tournamentsParticipated) return counts;

  // Compter les médailles basées sur le rang
  playerRanking.value.tournamentsParticipated.forEach((tournament) => {
    if (tournament.rank === 1) counts.gold++;
    else if (tournament.rank === 2) counts.silver++;
    else if (tournament.rank === 3) counts.bronze++;
  });

  return counts;
});

/**
 * Détermine le jeu sur lequel le joueur a obtenu le plus de victoires
 */
const favoriteGame = computed(() => {
  // Si pas de données de tournoi, retourner un objet vide
  if (!playerRanking.value?.tournamentsParticipated) {
    return { name: "Aucun", count: 0 };
  }

  // Filtrer les tournois avec victoire (rang 1)
  const victories = playerRanking.value.tournamentsParticipated.filter(
    (t) => t.rank === 1
  );

  if (victories.length === 0) {
    return { name: "Aucun", count: 0 };
  }

  // Compter les victoires par jeu
  const gameWins: Record<string, number> = {};
  const gameMap: Record<string, string> = {}; // Pour stocker les noms de jeux par ID

  victories.forEach((tournament) => {
    if (!tournament.game) return;

    // Récupérer l'ID et le nom du jeu
    const gameId =
      typeof tournament.game === "string"
        ? tournament.game
        : tournament.game._id || "";

    const gameName =
      typeof tournament.game === "object" && tournament.game.name
        ? tournament.game.name
        : "Jeu inconnu";

    // Stocker le nom du jeu
    if (gameId && gameName !== "Jeu inconnu") {
      gameMap[gameId] = gameName;
    }

    // Compter les victoires
    if (gameId) {
      gameWins[gameId] = (gameWins[gameId] || 0) + 1;
    }
  });

  // Trouver le jeu avec le plus de victoires
  let topGameId = "unknown";
  let topCount = 0;

  Object.entries(gameWins).forEach(([id, count]) => {
    if (count > topCount) {
      topGameId = id;
      topCount = count as number;
    }
  });

  // Récupérer le nom du jeu gagnant
  const topGameName = gameMap[topGameId] || "Jeu inconnu";

  return { name: topGameName, count: topCount };
});

//-------------------------------------------------------
// SECTION: Formatage et utilitaires
//-------------------------------------------------------

/**
 * Formatte une date au format français
 * @param dateString - Date à formater
 * @returns Date formatée en français (ex: "15 mars 2023")
 */
const formatDate = (dateString: string | Date) => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  } catch (err) {
    console.error("Erreur de formatage de date:", err);
    return "Date inconnue";
  }
};

/**
 * Extrait les initiales d'un nom d'utilisateur
 * @param username - Nom d'utilisateur
 * @returns Première lettre du nom en majuscule
 */
const getInitials = (username: string) => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

/**
 * Gère les erreurs de chargement d'image
 * Remplace l'image par un placeholder en cas d'échec
 * @param e - Événement d'erreur
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = "https://via.placeholder.com/100?text=?";
  }
};

//-------------------------------------------------------
// SECTION: Actions utilisateur
//-------------------------------------------------------

/**
 * Sélectionne un badge pour afficher ses détails dans une modal
 * @param badge - Badge à afficher
 */
const selectBadge = (badge: Badge) => {
  selectedBadge.value = badge;
};

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Vérifie si le joueur possède des badges
 */
const hasBadges = computed(
  () => player.value?.badges && player.value.badges.length > 0
);

/**
 * Compte le nombre de badges du joueur
 */
const badgeCount = computed(() => player.value?.badges?.length || 0);

/**
 * Vérifie si le joueur a participé à des tournois
 */
const hasTournaments = computed(
  () =>
    playerRanking.value?.tournamentsParticipated &&
    playerRanking.value.tournamentsParticipated.length > 0
);

/**
 * Compte le nombre de tournois auxquels le joueur a participé
 */
const tournamentCount = computed(
  () => playerRanking.value?.tournamentsParticipated?.length || 0
);

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère toutes les données du profil joueur:
 * - Informations du joueur
 * - Données de l'utilisateur associé
 * - Classement et historique des tournois
 */
const fetchPlayerProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const playerId = route.params.id as string;

    // Récupération des données du joueur
    const playerData = await playerService.getPlayerProfile(playerId);
    player.value = playerData;

    // Récupération de l'utilisateur associé pour l'avatar
    if (player.value && player.value.userId) {
      try {
        const userData = await userService.getUserById(player.value.userId);
        user.value = userData;
      } catch (userErr) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          userErr
        );
        // Ne pas bloquer le reste du chargement si l'utilisateur n'est pas trouvé
      }
    }

    // Récupération du classement et de l'historique des tournois
    try {
      const rankings = await playerService.getPlayerRankings();
      playerRanking.value =
        rankings.find((ranking) => ranking.playerId === playerId) || null;
    } catch (rankErr) {
      console.error("Erreur lors de la récupération du classement:", rankErr);
      // Ne pas bloquer le reste du chargement si le classement n'est pas disponible
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du profil du joueur:", err);
    error.value = "Impossible de charger le profil de ce joueur.";
  } finally {
    loading.value = false;
  }
};

/**
 * Obtient le libellé correspondant au classement
 * @param rank - Rang de l'équipe (1 pour 1er, 2 pour 2ème, etc.)
 * @returns Libellé formaté avec emoji pour les 3 premiers rangs
 */
const getRankingLabel = (rank: number): string => {
  if (!rank) return "Non classé";

  switch (rank) {
    case 1:
      return "🥇 Or";
    case 2:
      return "🥈 Argent";
    case 3:
      return "🥉 Bronze";
    default:
      return `${rank}ème`;
  }
};

/**
 * Obtient la classe CSS correspondant au rang pour styliser les badges
 * @param rank - Rang de l'équipe
 * @returns Classe CSS pour l'apparence du badge
 */
const getRankingClass = (rank: number): string => {
  if (!rank) return "bg-gray-700 text-gray-300 border border-gray-600";

  switch (rank) {
    case 1:
      return "bg-yellow-500/70 text-yellow-900 border border-yellow-400";
    case 2:
      return "bg-gray-300/70 text-gray-800 border border-gray-200";
    case 3:
      return "bg-amber-700/70 text-amber-100 border border-amber-600";
    default:
      return "bg-purple-700/70 text-white border border-purple-600";
  }
};

/**
 * Trie les tournois selon le critère sélectionné
 */
const sortedTournaments = computed(() => {
  const tournaments = playerRanking.value?.tournamentsParticipated || [];

  switch (tournamentSort.value) {
    case "date-desc":
      return [...tournaments].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "date-asc":
      return [...tournaments].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "rank-asc":
      return [...tournaments].sort((a, b) => {
        // D'abord trier par rang (les non-classés en dernier)
        const rankA = a.rank || 999;
        const rankB = b.rank || 999;
        return rankA - rankB;
      });
    default:
      return tournaments;
  }
});

/**
 * Calcule le nombre total de pages pour la pagination des tournois
 */
const totalTournamentPages = computed(() =>
  Math.ceil((sortedTournaments.value?.length || 0) / tournamentsPerPage)
);

/**
 * Extrait les tournois à afficher sur la page courante
 */
const paginatedTournaments = computed(() => {
  const start = (currentTournamentPage.value - 1) * tournamentsPerPage;
  const end = start + tournamentsPerPage;
  return sortedTournaments.value?.slice(start, end) || [];
});

/**
 * Passe à la page suivante des tournois
 */
const nextTournamentPage = () => {
  if (currentTournamentPage.value < totalTournamentPages.value) {
    currentTournamentPage.value++;
  }
};

/**
 * Revient à la page précédente des tournois
 */
const prevTournamentPage = () => {
  if (currentTournamentPage.value > 1) {
    currentTournamentPage.value--;
  }
};

/**
 * Réinitialise la pagination quand le tri change
 */
watch(tournamentSort, () => {
  currentTournamentPage.value = 1;
});

//-------------------------------------------------------
// SECTION: Cycle de vie du composant
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 * Charge les données du profil joueur
 */
onMounted(() => {
  fetchPlayerProfile();
});

// Ajouter ce watcher pour réagir aux changements d'ID dans l'URL
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchPlayerProfile();
    }
  }
);
</script>

<style scoped>
/* Variables CSS */

/* Effets de néon */
.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 15px #ff00ff;
}

.neon-text-purple {
  color: white;
  text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 15px #a855f7;
}

.neon-text-cyan {
  color: white;
  text-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 15px #06b6d4;
}

/* Effets de lueur */
.glow-badge {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
}

.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

/* Animation pour les cartes */
.transform {
  transition: all 0.3s ease;
}

/* Styles pour les titres de section et textes */
h2 {
  letter-spacing: 1px;
}

.text-3xl,
.text-4xl {
  font-family: "Orbitron", sans-serif;
  letter-spacing: 1px;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-subtle {
  animation: pulse 2s infinite;
}

/* Animation au survol des éléments */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

/* Assurer que les boutons de pagination sont bien alignés */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.cyberpunk-btn-mini-pink {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.5);
  color: rgba(236, 72, 153, 0.9);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cyberpunk-btn-mini-pink:hover {
  background: rgba(236, 72, 153, 0.3);
  border-color: rgba(236, 72, 153, 0.8);
  box-shadow: 0 0 8px rgba(236, 72, 153, 0.5);
  transform: translateY(-1px);
}

.cyberpunk-btn-mini-pink:active {
  transform: translateY(1px);
}

/* Effet de néon doré */
.neon-text-gold {
  color: white;
  text-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 15px #f59e0b;
}

/* Effet de scanline pour le podium */
.scanline {
  background: repeating-linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 0.5%,
    transparent 1%
  );
  background-size: 100% 4px;
  animation: scanline 10s linear infinite;
}

@keyframes scanline {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}

/* Animation pour les médailles */
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}
</style>
