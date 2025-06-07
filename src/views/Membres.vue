<template>
  <div class="container mx-auto p-8 sm:p-8 pt-20 sm:pt-24">
    <h1
      class="text-3xl sm:text-4xl text-white mb-2 neon-text font-audiowide text-center"
      tabindex="0"
    >
      Liste des membres
    </h1>

    <!-- Compteur en dessous du titre -->
    <div class="cyber-counter-container mb-6">
      <div class="cyber-counter">
        <span class="cyber-counter-number">{{
          memberStore.members.length
        }}</span>
        <span class="cyber-counter-label"
          >membre{{ memberStore.members.length > 1 ? "s" : "" }}</span
        >
      </div>
    </div>

    <!-- Recherche accessible -->
    <div class="mb-6 flex justify-center">
      <div class="relative w-full max-w-md">
        <label for="member-search" class="sr-only">Rechercher un membre</label>
        <input
          id="member-search"
          v-model="searchTerm"
          type="text"
          placeholder="Rechercher un membre..."
          class="w-full px-4 py-2 bg-black/50 border border-pink-500/50 rounded-lg text-white font-orbitron focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 placeholder-gray-500"
          aria-label="Rechercher un membre"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Options de tri -->
    <div class="mb-4 flex justify-end">
      <div class="relative">
        <select
          v-model="currentSort"
          class="appearance-none bg-black/50 border border-cyan-500/50 text-cyan-400 text-sm sm:text-base font-orbitron px-3 py-1 sm:px-4 sm:py-2 pr-8 rounded-lg focus:outline-none focus:border-cyan-500"
          aria-label="Trier par"
        >
          <option
            v-for="option in sortOptions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400"
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

    <!-- État de chargement avec CyberpunkLoader -->
    <div
      v-if="memberStore.loading"
      class="text-center my-8 sm:my-12"
      role="status"
      aria-live="polite"
    >
      <CyberpunkLoader />
    </div>

    <!-- État d'erreur -->
    <div
      v-else-if="memberStore.error"
      class="text-center my-8 sm:my-12 p-4 sm:p-6 border border-red-500 bg-red-900/20 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 sm:h-12 sm:w-12 text-red-400 mx-auto mb-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-red-300 font-orbitron">{{ memberStore.error }}</p>
      <button
        @click="memberStore.fetchMembers(true)"
        class="cyberpunk-btn-pink mt-4 px-4 py-2 rounded-md font-orbitron text-sm"
      >
        Réessayer
      </button>
    </div>

    <!-- Liste vide -->
    <CyberTerminal
      v-else-if="sortedUsers.length === 0"
      :command="`find_users ${
        searchTerm ? '--search=\'' + searchTerm + '\'' : '--all'
      }`"
      errorCode="404_NO_USERS_FOUND"
      :message="emptyStateMessage"
      class="my-8 sm:my-12"
    />
    <!-- Liste des membres -->
    <div
      v-else
      role="list"
      aria-label="Liste des membres"
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-pink-500 shadow-lg shadow-pink-500/30 overflow-hidden"
    >
      <!-- Afficher le nombre de membres trouvés -->
      <p class="sr-only" aria-live="polite" role="status">
        {{ sortedUsers.length }} membres trouvés
      </p>

      <div class="grid grid-cols-1 divide-y divide-pink-500/30">
        <div
          v-for="user in paginatedUsers"
          :key="user._id"
          role="listitem"
          class="member-card p-3 sm:p-4 transition-all hover:bg-purple-900/20"
        >
          <!-- Version mobile (flex-col) et desktop (flex-row) -->
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <!-- Avatar et informations utilisateur -->
            <div class="flex items-center gap-3 sm:gap-4">
              <div class="avatar-container">
                <img
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  alt="Avatar"
                  class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-cyan-500 avatar-glow"
                  loading="lazy"
                  @error="handleImageError($event)"
                />
                <div
                  v-else
                  class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-pink-500"
                >
                  <span class="text-pink-500 text-sm sm:text-xl font-bold">{{
                    getUserInitials(user.username)
                  }}</span>
                </div>
              </div>
              <div>
                <router-link
                  v-if="getPlayerIdForUser(user)"
                  :to="{
                    name: 'Profil',
                    params: { id: getPlayerIdForUser(user) },
                  }"
                  class="text-base sm:text-lg text-white hover:text-pink-400 font-orbitron transition-colors member-link capitalize"
                >
                  {{ user.username }}
                </router-link>
                <span
                  v-else
                  class="text-base sm:text-lg text-white font-orbitron"
                >
                  {{ user.username }}
                </span>
                <div class="text-xs sm:text-sm text-gray-400 mt-1">
                  <span v-if="user.role === 'admin'" class="role-badge admin"
                    >Admin</span
                  >
                  <span
                    v-else-if="user.role === 'superadmin'"
                    class="role-badge superadmin"
                    >Super Admin</span
                  >
                  <span v-else class="role-badge member">Membre</span>
                </div>
              </div>
            </div>

            <!-- Bouton de profil - aligné à droite sur desktop, centré sur mobile -->
            <div
              class="view-profile-button mt-3 sm:mt-0 flex justify-center sm:justify-end"
            >
              <router-link
                v-if="getPlayerIdForUser(user)"
                :to="{
                  name: 'Profil',
                  params: { id: getPlayerIdForUser(user) },
                }"
                class="cyberpunk-btn-cyan px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-orbitron"
              >
                Voir profil
              </router-link>
              <span
                v-else
                class="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-400 font-orbitron"
              >
                Pas de profil
              </span>
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

    <Toast v-if="memberStore.error" type="error" :message="memberStore.error" />
    <Toast
      v-if="memberStore.success"
      type="success"
      :message="memberStore.success"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useMemberStore } from "../stores/memberStore";
import Toast from "@/shared/Toast.vue";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import CyberpunkPagination from "@/shared/CyberpunkPagination.vue";
import CyberTerminal from "@/shared/CyberTerminal.vue";

// Utilisation du store
const memberStore = useMemberStore();

// États pour la recherche et la pagination
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

// Options de tri
const sortOptions = [
  { id: "username-asc", label: "Nom (A-Z)" },
  { id: "username-desc", label: "Nom (Z-A)" },
  { id: "role-asc", label: "Rôle (croissant)" },
  { id: "role-desc", label: "Rôle (décroissant)" },
];
const currentSort = ref("username-asc");

// Propriétés calculées
const searchResults = computed(() => {
  if (!searchTerm.value.trim()) return memberStore.members;

  const term = searchTerm.value.toLowerCase();
  return memberStore.members.filter(
    (user) =>
      user.username.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
  );
});

const getPlayerIdForUser = (user: any): string | null => {
  // Récupérer les players depuis le store ou faire un appel API
  // Pour l'instant, on va chercher dans les members enrichis du store
  if (!memberStore.members) return null;

  // Trouver le player correspondant par discordId ou username
  const matchingMember = memberStore.members.find(
    (member) => member._id === user._id && member.playerId
  );

  return matchingMember?.playerId || null;
};

const sortedUsers = computed(() => {
  const usersToSort = [...searchResults.value];

  switch (currentSort.value) {
    case "username-asc":
      return usersToSort.sort((a, b) => a.username.localeCompare(b.username));
    case "username-desc":
      return usersToSort.sort((a, b) => b.username.localeCompare(a.username));
    case "role-asc": {
      const roleOrder = { user: 1, admin: 2, superadmin: 3 };
      return usersToSort.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    }
    case "role-desc": {
      const roleOrder = { user: 1, admin: 2, superadmin: 3 };
      return usersToSort.sort((a, b) => roleOrder[b.role] - roleOrder[a.role]);
    }
    default:
      return usersToSort;
  }
});

const totalPages = computed(() =>
  Math.ceil(sortedUsers.value.length / itemsPerPage)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedUsers.value.slice(start, end);
});

const emptyStateMessage = computed(() => {
  if (searchTerm.value) {
    return `Aucun membre ne correspond à votre recherche "${searchTerm.value}".`;
  }
  return "Aucun membre trouvé dans la base de données.";
});

// Fonctions utilitaires
const getUserInitials = (username: string) => {
  if (!username) return "?";
  const nameParts = username.split(" ");
  if (nameParts.length === 1) return username.charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    // Remplacer par un avatar généré avec les initiales ou une image de secours
    const username =
      e.target
        .closest(".member-card")
        ?.querySelector(".text-white")
        ?.textContent?.trim() || "?";
    const initials = getUserInitials(username);

    // Utiliser une API pour générer un avatar basé sur les initiales
    e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;

    // Ajouter une classe pour styliser différemment les avatars de remplacement
    e.target.classList.remove("avatar-glow");
    e.target.classList.add("fallback-avatar");
  }
};

const resetPagination = () => {
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Cycle de vie
onMounted(() => {
  memberStore.fetchMembers();
});

// Watchers
watch(searchTerm, () => {
  resetPagination();
});

watch(currentSort, () => {
  resetPagination();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.member-card {
  transition: all 0.3s ease;
}

.member-card:hover {
  background-color: rgba(168, 85, 247, 0.15);
}

.avatar-container {
  position: relative;
}

.avatar-glow {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
  transition: all 0.3s ease;
}

.member-card:hover .avatar-glow {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
}

.role-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.neon-text-subtle {
  text-shadow: 0 0 5px rgba(34, 211, 238, 0.5), 0 0 10px rgba(34, 211, 238, 0.3);
  letter-spacing: normal;
}

@media (max-width: 640px) {
  .role-badge {
    padding: 1px 5px;
    font-size: 0.65rem;
    letter-spacing: 0.5px;
  }
}

.role-badge.admin {
  background-color: rgba(219, 39, 119, 0.2);
  color: #f472b6;
  border: 1px solid #f472b6;
}

.role-badge.superadmin {
  background-color: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border: 1px solid #ec4899;
}

.role-badge.member {
  background-color: rgba(34, 211, 238, 0.2);
  color: #22d3ee;
  border: 1px solid #22d3ee;
}

.member-link {
  position: relative;
  display: inline-block;
}

.member-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
  transition: width 0.3s ease-in-out;
}

.member-link:hover::after {
  width: 100%;
}

.neon-button-cyan {
  display: inline-block;
  background: rgba(6, 182, 212, 0.1);
  color: #22d3ee;
  border: 1px solid #06b6d4;
  box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
  transition: all 0.3s ease;
  text-align: center;
}

.neon-button-cyan:hover {
  background: rgba(6, 182, 212, 0.2);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
  transform: translateY(-1px);
}

.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 20px #ff00ff,
    0 0 20px #ff00ff, 0 0 20px #ff00ff;
  letter-spacing: 2px;
}

/* Réduire l'intensité du neon sur mobile pour éviter le flou */
@media (max-width: 640px) {
  .neon-text {
    text-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff;
    letter-spacing: 1px;
  }
}

.shadow-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

@keyframes glowPulse {
  0% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
}

/* Assurer que le spinner a une animation fluide */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cyber-counter-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cyber-counter {
  display: inline-flex;
  align-items: center;
  margin-top: 0.75rem;
  position: relative;
  padding: 0 1rem;
}

.cyber-counter::before,
.cyber-counter::after {
  content: "";
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #22d3ee, transparent);
  width: 60%;
  left: 20%;
}

.cyber-counter::before {
  top: -2px;
}

.cyber-counter::after {
  bottom: -2px;
}

.cyber-counter-number {
  font-family: "Orbitron", sans-serif;
  color: #22d3ee;
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 0.5rem;
  text-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
}

.cyber-counter-label {
  font-family: "Orbitron", sans-serif;
  color: #22d3ee;
  font-size: 0.875rem;
  opacity: 0.8;
}

@media (max-width: 640px) {
  .cyber-counter {
    margin-top: 0.5rem;
  }

  .cyber-counter-number {
    font-size: 1rem;
  }

  .cyber-counter-label {
    font-size: 0.75rem;
  }
}
</style>
