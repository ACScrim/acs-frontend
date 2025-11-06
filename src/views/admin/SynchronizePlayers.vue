<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <Header
      title="SYNCHRONISATION DES JOUEURS"
      titleSize="3xl"
      :showMissionInfo="true"
      mission="PLAYER-SYNC"
    >
      <template #badge>
        <SpaceBadge v-if="players.length > 0" variant="primary" size="lg">
          {{ players.length }}
        </SpaceBadge>
      </template>
    </Header>

    <!-- Instructions -->
    <Card
      variant="accent"
      :stars="true"
      :decorated="true"
      className="mb-8 mt-6"
    >
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <div
            class="w-10 h-10 bg-space-accent/20 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-space-accent"
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
          <h3 class="text-space-accent-light font-nasa font-semibold mb-2">
            Instructions importantes
          </h3>
          <p
            class="text-space-text font-body text-sm sm:text-base leading-relaxed"
          >
            Assurez-vous que les noms d'utilisateur de
            <SpaceBadge variant="primary" className="mx-1">Player</SpaceBadge>
            et de
            <SpaceBadge variant="secondary" className="mx-1">User</SpaceBadge>
            soient similaires avant de lancer la synchronisation.
          </p>
        </div>
      </div>
    </Card>

    <!-- Barre de recherche -->
    <Card
      variant="primary"
      :stars="true"
      :decorated="true"
      className="mb-8"
    >
      <div class="space-y-4">
        <div>
          <label
            for="searchInput"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
            Rechercher un joueur
          </label>
          <div class="relative">
            <SpaceInput
              id="searchInput"
              v-model="searchQuery"
              placeholder="Rechercher par nom ou Discord ID..."
              className="pl-12"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-space-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <template #rightIcon>
                <button
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="text-space-text-muted hover:text-space-text"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </template>
            </SpaceInput>
          </div>
        </div>

        <!-- Filtres et tri -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <!-- Filtre par statut -->
          <div class="flex gap-2 flex-wrap">
            <Button
              @click="filterStatus = 'all'"
              :variant="filterStatus === 'all' ? 'primary' : 'outline'"
              size="sm"
            >
              Tous ({{ players.length }})
            </Button>
            <Button
              @click="filterStatus = 'synced'"
              :variant="filterStatus === 'synced' ? 'success' : 'outline'"
              size="sm"
            >
              Synchronisés ({{ syncedCount }})
            </Button>
            <Button
              @click="filterStatus = 'unsynced'"
              :variant="filterStatus === 'unsynced' ? 'warning' : 'outline'"
              size="sm"
            >
              Non synchronisés ({{ unsyncedCount }})
            </Button>
          </div>

          <!-- Tri -->
          <div class="flex items-center gap-2">
            <span class="text-space-text-muted font-nasa text-sm">Tri:</span>
            <SpaceDropdown v-model="sortBy" className="w-48">
              <option value="username-asc">Nom A→Z</option>
              <option value="username-desc">Nom Z→A</option>
              <option value="status-synced">Synchronisés d'abord</option>
              <option value="status-unsynced">Non synchronisés d'abord</option>
              <option value="discord-asc">Discord ID A→Z</option>
              <option value="discord-desc">Discord ID Z→A</option>
            </SpaceDropdown>
          </div>
        </div>
      </div>
    </Card>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <Card
        variant="primary"
        :stars="false"
        :decorated="true"
        className="text-center cursor-pointer"
        :hover="true"
        @click="
          filterStatus = 'all';
          sortBy = 'username-asc';
        "
      >
        <div class="text-2xl font-bold text-space-primary-light mb-1">
          {{ players.length }}
        </div>
        <div class="text-xs text-space-text-muted font-nasa">Joueurs</div>
      </Card>

      <Card
        variant="secondary"
        :stars="false"
        :decorated="true"
        className="text-center cursor-pointer"
        :hover="true"
        @click="filterStatus = 'all'"
      >
        <div class="text-2xl font-bold text-space-secondary-light mb-1">
          {{ users.length }}
        </div>
        <div class="text-xs text-space-text-muted font-nasa">Utilisateurs</div>
      </Card>

      <Card
        variant="success"
        :stars="false"
        :decorated="true"
        className="text-center cursor-pointer"
        :hover="true"
        @click="showOnlySynced"
        :class="{
          'ring-2 ring-space-success/50': filterStatus === 'synced',
        }"
      >
        <div class="text-2xl font-bold text-space-success mb-1">
          {{ syncedCount }}
        </div>
        <div class="text-xs text-space-text-muted font-nasa">Synchronisés</div>
      </Card>

      <Card
        variant="warning"
        :stars="false"
        :decorated="true"
        className="text-center cursor-pointer"
        :hover="true"
        @click="showOnlyUnsynced"
        :class="{
          'ring-2 ring-space-warning/50': filterStatus === 'unsynced',
        }"
      >
        <div class="text-2xl font-bold text-space-warning mb-1">
          {{ unsyncedCount }}
        </div>
        <div class="text-xs text-space-text-muted font-nasa">En attente</div>
      </Card>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <Loader size="lg" text="Chargement des données en cours..." />
    </div>

    <!-- Tables -->
    <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <!-- Table des joueurs -->
      <Card
        variant="primary"
        :stars="true"
        :decorated="true"
        className="overflow-hidden"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-space-primary-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              <Title size="lg">Players</Title>
            </div>
            <SpaceBadge variant="primary" size="lg">
              {{ filteredPlayers.length }}
            </SpaceBadge>
          </div>
        </template>

        <div class="max-h-96 overflow-y-auto">
          <div class="space-y-3 p-4">
            <div
              v-for="player in filteredPlayers"
              :key="player._id"
              class="group bg-space-bg-light/5 hover:bg-space-bg-light/10 rounded-lg p-4 border border-space-primary/20 hover:border-space-primary/50 transition-all duration-300 cursor-pointer"
              :class="{
                'ring-2 ring-space-primary/50 bg-space-primary/10 border-space-primary/50':
                  highlightedPlayerId === player._id,
              }"
              @click="highlightPlayerAndUser(player)"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-space-primary to-space-primary-light rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow-primary"
                  >
                    {{ getInitials(player.username) }}
                  </div>
                  <div>
                    <div class="text-space-text font-nasa font-medium">
                      {{ player.username }}
                    </div>
                    <div class="text-xs text-space-text-muted font-mono">
                      {{ player.discordId || "Pas de Discord ID" }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <!-- Badge de statut -->
                  <SpaceBadge
                    v-if="player.userId"
                    variant="success"
                    className="flex items-center"
                    title="Synchronisé"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Sync
                  </SpaceBadge>
                  <SpaceBadge
                    v-else
                    variant="warning"
                    className="flex items-center"
                    title="Non synchronisé"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Attente
                  </SpaceBadge>

                  <Button
                    @click.stop="editPlayerUsername(player)"
                    variant="primary"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            </div>

            <Terminal
              v-if="filteredPlayers.length === 0"
              command="find --players"
              title="Recherche de joueurs"
              :showCursor="true"
            >
              <div class="text-space-text-muted">
                Aucun joueur trouvé avec ces critères.
              </div>
            </Terminal>
          </div>
        </div>
      </Card>

      <!-- Table des utilisateurs -->
      <Card
        variant="secondary"
        :stars="true"
        :decorated="true"
        className="overflow-hidden"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-space-secondary-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              <Title size="lg">Users</Title>
            </div>
            <SpaceBadge variant="secondary" size="lg">
              {{ filteredUsers.length }}
            </SpaceBadge>
          </div>
        </template>

        <div class="max-h-96 overflow-y-auto">
          <div class="space-y-3 p-4">
            <div
              v-for="user in filteredUsers"
              :key="user._id"
              class="bg-space-bg-light/5 hover:bg-space-bg-light/10 rounded-lg p-4 border border-space-secondary/20 hover:border-space-secondary/50 transition-all duration-300"
              :class="{
                'ring-2 ring-space-secondary/50 bg-space-secondary/10 border-space-secondary/50':
                  highlightedUserId === user._id,
              }"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-gradient-to-r from-space-secondary to-space-secondary-light rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow-secondary"
                >
                  {{ getInitials(user.username) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-space-text font-nasa font-medium truncate">
                    {{ user.username }}
                  </div>
                  <div class="text-xs text-space-text-muted font-mono truncate">
                    {{ user.email }}
                  </div>
                  <div
                    v-if="user.discordId"
                    class="text-xs text-space-secondary-light font-mono"
                  >
                    Discord: {{ user.discordId }}
                  </div>
                </div>
              </div>
            </div>

            <Terminal
              v-if="filteredUsers.length === 0"
              command="find --users"
              title="Recherche d'utilisateurs"
              :showCursor="true"
            >
              <div class="text-space-text-muted">
                Aucun utilisateur trouvé avec ces critères.
              </div>
            </Terminal>
          </div>
        </div>
      </Card>
    </div>

    <!-- Actions -->
    <div
      class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
    >
      <Button
        @click="synchronizePlayers"
        :disabled="isLoading"
        variant="accent"
        size="lg"
        icon
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
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        Synchroniser les joueurs
      </Button>

      <Button @click="fetchData" variant="outline" size="md" icon>
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        Actualiser
      </Button>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
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
const filterStatus = ref<"all" | "synced" | "unsynced">("all");
const sortBy = ref<string>("username-asc");

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

const filteredAndSortedPlayers = computed(() => {
  let result = [...players.value];

  // 1. Appliquer le filtre de recherche
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(
      (player) =>
        player.username?.toLowerCase().includes(query) ||
        player.discordId?.toLowerCase().includes(query)
    );
  }

  // 2. Appliquer le filtre de statut
  if (filterStatus.value === "synced") {
    result = result.filter((player) => player.userId);
  } else if (filterStatus.value === "unsynced") {
    result = result.filter((player) => !player.userId);
  }

  // 3. Appliquer le tri
  switch (sortBy.value) {
    case "username-asc":
      result.sort((a, b) => (a.username || "").localeCompare(b.username || ""));
      break;
    case "username-desc":
      result.sort((a, b) => (b.username || "").localeCompare(a.username || ""));
      break;
    case "status-synced":
      result.sort((a, b) => {
        if (a.userId && !b.userId) return -1;
        if (!a.userId && b.userId) return 1;
        return (a.username || "").localeCompare(b.username || "");
      });
      break;
    case "status-unsynced":
      result.sort((a, b) => {
        if (!a.userId && b.userId) return -1;
        if (a.userId && !b.userId) return 1;
        return (a.username || "").localeCompare(b.username || "");
      });
      break;
    case "discord-asc":
      result.sort((a, b) =>
        (a.discordId || "").localeCompare(b.discordId || "")
      );
      break;
    case "discord-desc":
      result.sort((a, b) =>
        (b.discordId || "").localeCompare(a.discordId || "")
      );
      break;
    default:
      break;
  }

  return result;
});

// Fonctions existantes...
const filteredPlayers = computed(() => filteredAndSortedPlayers.value);

const filteredUsers = computed(() => {
  // Si un joueur est mis en surbrillance, montrer les utilisateurs similaires
  if (highlightedPlayerId.value) {
    const highlightedPlayer = players.value.find(
      (p) => p._id === highlightedPlayerId.value
    );
    if (highlightedPlayer && highlightedPlayer.username) {
      return findSimilarUsers(highlightedPlayer.username);
    }
  }

  // Sinon, filtrer par recherche
  if (!searchQuery.value.trim()) {
    return users.value;
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
  filterStatus.value = "all";
  sortBy.value = "username-asc";
  highlightedPlayerId.value = null;
  highlightedUserId.value = null;
};

const showOnlyUnsynced = () => {
  filterStatus.value = "unsynced";
  sortBy.value = "username-asc";
};

const showOnlySynced = () => {
  filterStatus.value = "synced";
  sortBy.value = "username-asc";
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
