<template>
  <div
    class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen p-4 sm:p-6 relative overflow-hidden"
  >
    <!-- ✅ Grille d'arrière-plan améliorée -->
    <div class="absolute inset-0 z-0">
      <div class="bg-grid-pattern opacity-10"></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"
      ></div>
    </div>

    <!-- ✅ Particles flottantes -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="floating-particles"></div>
    </div>

    <!-- Container principal -->
    <div class="relative z-10 max-w-7xl mx-auto pt-4 sm:pt-8">
      <!-- ✅ Header amélioré -->
      <div class="text-center mb-8 sm:mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4 shadow-lg shadow-purple-500/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <h1
          class="text-3xl sm:text-5xl font-audiowide text-center mb-4 text-white neon-text-pink leading-tight"
        >
          Synchronisation des Joueurs
        </h1>

        <p
          class="text-gray-300 font-orbitron text-sm sm:text-base max-w-2xl mx-auto"
        >
          Gérez la correspondance entre les profils de joueurs et les comptes
          utilisateurs
        </p>
      </div>

      <!-- ✅ Instructions redesignées -->
      <div
        class="bg-gradient-to-r from-gray-900/80 to-purple-900/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-purple-500/30 shadow-xl shadow-purple-500/20 mb-6 sm:mb-8"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-yellow-400 font-orbitron font-semibold mb-2">
              Instructions importantes
            </h3>
            <p
              class="text-cyan-300 font-orbitron text-sm sm:text-base leading-relaxed"
            >
              Assurez-vous que les noms d'utilisateur de
              <span
                class="inline-flex items-center px-2 py-1 rounded-md bg-pink-500/20 text-pink-400 font-bold text-xs mx-1"
                >Player</span
              >
              et de
              <span
                class="inline-flex items-center px-2 py-1 rounded-md bg-purple-500/20 text-purple-400 font-bold text-xs mx-1"
                >User</span
              >
              soient similaires avant de lancer la synchronisation.
            </p>
          </div>
        </div>
      </div>

      <!-- ✅ Barre de recherche améliorée -->
      <div class="mb-6 sm:mb-8">
        <div class="relative max-w-md mx-auto">
          <div
            class="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl blur-sm"
          ></div>
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher un joueur..."
              class="w-full bg-gray-800/80 backdrop-blur-sm text-white border border-pink-500/40 rounded-xl py-3 px-4 pl-12 font-orbitron focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all duration-300 placeholder-gray-400"
            />
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-4 flex items-center group"
            >
              <div
                class="w-6 h-6 bg-gray-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- ✅ Statistiques rapides -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <div
          class="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30 text-center"
        >
          <div class="text-2xl font-bold text-cyan-400 mb-1">
            {{ filteredPlayers.length }}
          </div>
          <div class="text-xs text-gray-400 font-orbitron">Joueurs</div>
        </div>
        <div
          class="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 text-center"
        >
          <div class="text-2xl font-bold text-purple-400 mb-1">
            {{ filteredUsers.length }}
          </div>
          <div class="text-xs text-gray-400 font-orbitron">Utilisateurs</div>
        </div>
        <div
          class="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 text-center"
        >
          <div class="text-2xl font-bold text-green-400 mb-1">
            {{ syncedCount }}
          </div>
          <div class="text-xs text-gray-400 font-orbitron">Synchronisés</div>
        </div>
        <div
          class="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30 text-center"
        >
          <div class="text-2xl font-bold text-yellow-400 mb-1">
            {{ unsyncedCount }}
          </div>
          <div class="text-xs text-gray-400 font-orbitron">En attente</div>
        </div>
      </div>

      <!-- ✅ Loading amélioré -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="relative">
          <div
            class="w-20 h-20 border-4 border-t-pink-500 border-r-purple-500 border-b-cyan-500 border-l-transparent rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-0 w-20 h-20 border-4 border-t-transparent border-r-transparent border-b-transparent border-l-pink-500 rounded-full animate-spin"
            style="animation-direction: reverse; animation-duration: 1.5s"
          ></div>
          <div
            class="absolute inset-2 w-16 h-16 border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
            style="animation-duration: 0.8s"
          ></div>
        </div>
      </div>

      <!-- ✅ Tables améliorées -->
      <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <!-- Table des joueurs -->
        <div
          class="bg-gradient-to-br from-gray-900/80 to-cyan-900/20 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20 overflow-hidden"
        >
          <div class="border-b border-cyan-500/40 p-4 sm:p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2
                  class="text-xl sm:text-2xl font-orbitron text-cyan-300 neon-text-cyan"
                >
                  Players
                </h2>
              </div>
              <span
                class="px-3 py-1 bg-cyan-500/20 text-cyan-300 font-orbitron text-sm rounded-full"
              >
                {{ filteredPlayers.length }}
              </span>
            </div>
          </div>

          <div class="p-4 sm:p-6 max-h-96 overflow-y-auto custom-scrollbar">
            <div class="space-y-3">
              <div
                v-for="player in filteredPlayers"
                :key="player._id"
                class="group relative bg-gray-800/40 hover:bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                :class="{
                  'ring-2 ring-cyan-500/50 bg-cyan-900/20 border-cyan-500/50':
                    highlightedPlayerId === player._id,
                }"
                @click="highlightPlayerAndUser(player)"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    >
                      {{ getInitials(player.username) }}
                    </div>
                    <div>
                      <div class="text-white font-orbitron font-medium">
                        {{ player.username }}
                      </div>
                      <div class="text-xs text-gray-400 font-mono">
                        {{ player.discordId || "Pas de Discord ID" }}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <!-- Badge de statut -->
                    <div
                      v-if="player.userId"
                      class="w-2 h-2 bg-green-400 rounded-full"
                      title="Synchronisé"
                    ></div>
                    <div
                      v-else
                      class="w-2 h-2 bg-yellow-400 rounded-full"
                      title="Non synchronisé"
                    ></div>

                    <button
                      @click.stop="editPlayerUsername(player)"
                      class="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-orbitron text-xs px-3 py-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="filteredPlayers.length === 0"
                class="text-center py-12"
              >
                <div
                  class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.828-6.137 2.208A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8c0 1.76-.57 3.384-1.537 4.708z"
                    />
                  </svg>
                </div>
                <p class="text-gray-400 font-orbitron">Aucun joueur trouvé</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Table des utilisateurs -->
        <div
          class="bg-gradient-to-br from-gray-900/80 to-purple-900/20 backdrop-blur-lg rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-500/20 overflow-hidden"
        >
          <div class="border-b border-purple-500/40 p-4 sm:p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h2
                  class="text-xl sm:text-2xl font-orbitron text-purple-400 neon-text-purple"
                >
                  Users
                </h2>
              </div>
              <span
                class="px-3 py-1 bg-purple-500/20 text-purple-300 font-orbitron text-sm rounded-full"
              >
                {{ filteredUsers.length }}
              </span>
            </div>
          </div>

          <div class="p-4 sm:p-6 max-h-96 overflow-y-auto custom-scrollbar">
            <div class="space-y-3">
              <div
                v-for="user in filteredUsers"
                :key="user._id"
                class="bg-gray-800/40 hover:bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                :class="{
                  'ring-2 ring-purple-500/50 bg-purple-900/20 border-purple-500/50':
                    highlightedUserId === user._id,
                }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    {{ getInitials(user.username) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-white font-orbitron font-medium truncate">
                      {{ user.username }}
                    </div>
                    <div class="text-xs text-gray-400 font-mono truncate">
                      {{ user.email }}
                    </div>
                    <div
                      v-if="user.discordId"
                      class="text-xs text-purple-300 font-mono"
                    >
                      Discord: {{ user.discordId }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="filteredUsers.length === 0" class="text-center py-12">
                <div
                  class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p class="text-gray-400 font-orbitron">
                  Aucun utilisateur trouvé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Actions améliorées -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="synchronizePlayers"
          :disabled="isLoading"
          class="group relative bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 text-white font-orbitron text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-1 disabled:hover:translate-y-0 disabled:hover:shadow-xl transition-all duration-300 relative overflow-hidden min-w-[280px]"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Synchroniser les joueurs
          </span>
          <div
            class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"
          ></div>
        </button>

        <button
          @click="fetchData"
          class="bg-gray-700 hover:bg-gray-600 text-white font-orbitron px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Actualiser
        </button>
      </div>

      <!-- Notifications -->
      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import playerService from "../../services/playerService";
import userService from "../../services/userService";
import Toast from "../../shared/Toast.vue";
import type { Player, User } from "../../types";

// États existants...
const players = ref<Player[]>([]);
const users = ref<User[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const isLoading = ref(true);
const searchQuery = ref("");
const highlightedPlayerId = ref<string | null>(null);
const highlightedUserId = ref<string | null>(null);

// ✅ Nouvelles computed properties pour les statistiques
const syncedCount = computed(() => {
  return players.value.filter((player) => player.userId).length;
});

const unsyncedCount = computed(() => {
  return players.value.filter((player) => !player.userId).length;
});

// ✅ Fonction pour les initiales
const getInitials = (name: string): string => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Fonctions existantes...
const filteredPlayers = computed(() => {
  if (!searchQuery.value.trim()) {
    return players.value;
  }
  const query = searchQuery.value.toLowerCase().trim();
  return players.value.filter(
    (player) =>
      player.username?.toLowerCase().includes(query) ||
      player.discordId?.toLowerCase().includes(query)
  );
});

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value;
  }
  if (highlightedPlayerId.value) {
    const highlightedPlayer = players.value.find(
      (p) => p._id === highlightedPlayerId.value
    );
    if (highlightedPlayer && highlightedPlayer.username) {
      return findSimilarUsers(highlightedPlayer.username);
    }
  }
  const query = searchQuery.value.toLowerCase().trim();
  return users.value.filter(
    (user) =>
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.discordId?.toLowerCase().includes(query)
  );
});

// Toutes les autres fonctions restent identiques...
const fetchData = async () => {
  isLoading.value = true;
  try {
    await Promise.all([fetchPlayers(), fetchUsers()]);
  } catch (err) {
    console.error("Erreur de chargement des données:", err);
  } finally {
    isLoading.value = false;
  }
};

const fetchPlayers = async () => {
  try {
    players.value = await playerService.getPlayers();
  } catch (err) {
    showMessage("error", "Erreur lors du chargement des joueurs.");
  }
};

const fetchUsers = async () => {
  try {
    users.value = await userService.fetchAllUsers();
  } catch (err) {
    showMessage("error", "Erreur lors du chargement des utilisateurs.");
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  highlightedPlayerId.value = null;
  highlightedUserId.value = null;
};

const highlightPlayerAndUser = (player: Player) => {
  highlightedPlayerId.value = player._id || null;
  if (player.username) {
    const similarUsers = findSimilarUsers(player.username);
    if (similarUsers.length > 0) {
      highlightedUserId.value = similarUsers[0]._id || null;
    } else {
      highlightedUserId.value = null;
    }
  }
};

const findSimilarUsers = (username: string): User[] => {
  const normalizedUsername = username.toLowerCase();
  return users.value
    .map((user) => ({
      ...user,
      similarity: calculateSimilarity(
        normalizedUsername,
        (user.username || "").toLowerCase()
      ),
    }))
    .filter((user) => user.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity);
};

const calculateSimilarity = (str1: string, str2: string): number => {
  if (str1.includes(str2) || str2.includes(str1)) {
    return 0.9;
  }
  let matches = 0;
  let i = 0,
    j = 0;
  while (i < str1.length && j < str2.length) {
    if (str1[i] === str2[j]) {
      matches++;
      i++;
      j++;
    } else if (str1.length > str2.length) {
      i++;
    } else {
      j++;
    }
  }
  const avgLength = (str1.length + str2.length) / 2;
  return matches / avgLength;
};

const synchronizePlayers = async () => {
  try {
    await playerService.synchronizePlayers();
    showMessage("success", "Synchronisation réussie !");
    fetchPlayers();
    highlightedPlayerId.value = null;
    highlightedUserId.value = null;
  } catch (err) {
    console.error("Erreur lors de la synchronisation:", err);
    showMessage("error", "Erreur lors de la synchronisation.");
  }
};

const editPlayerUsername = (player: Player) => {
  const newUsername = prompt("Modifier le nom d'utilisateur:", player.username);
  if (newUsername && newUsername !== player.username) {
    playerService
      .updatePlayerUsername(player._id!, newUsername)
      .then(() => {
        showMessage("success", "Nom d'utilisateur mis à jour avec succès !");
        fetchPlayers();
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la mise à jour du nom d'utilisateur:",
          err
        );
        showMessage(
          "error",
          "Erreur lors de la mise à jour du nom d'utilisateur."
        );
      });
  }
};

const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Styles existants + améliorations */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text-pink {
  text-shadow: 0 0 5px #ec4899, 0 0 15px #ec4899, 0 0 20px #ec4899;
  animation: pulsate 2s infinite alternate;
}

.neon-text-cyan {
  text-shadow: 0 0 5px #06b6d4, 0 0 15px #06b6d4;
}

.neon-text-purple {
  text-shadow: 0 0 5px #a855f7, 0 0 15px #a855f7;
}

@keyframes pulsate {
  0% {
    text-shadow: 0 0 5px #ec4899, 0 0 15px #ec4899;
  }
  100% {
    text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899;
  }
}

/* ✅ Grille d'arrière-plan améliorée */
.bg-grid-pattern {
  background-image: linear-gradient(
      rgba(139, 92, 246, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* ✅ Particules flottantes */
.floating-particles::before,
.floating-particles::after {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #ec4899, transparent);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.floating-particles::before {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.floating-particles::after {
  top: 60%;
  right: 30%;
  animation-delay: 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* ✅ Scrollbar personnalisée */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #ec4899, #a855f7);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #db2777, #9333ea);
}

/* ✅ Animation shimmer améliorée */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* ✅ Animations d'entrée */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* ✅ Responsive améliorations */
@media (max-width: 640px) {
  .neon-text-pink {
    font-size: 2rem;
  }

  .grid-cols-2 {
    gap: 0.75rem;
  }
}
</style>
