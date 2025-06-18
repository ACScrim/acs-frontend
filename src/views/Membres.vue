<template>
  <SpaceContainer>
    <!-- En-tête de la page avec notre nouveau composant SpaceHeader -->
    <SpaceHeader
      title="MEMBRES DE L'ÉQUIPAGE"
      :showMissionInfo="true"
      mission="CREWMATES-2025"
    >
      <template #badge v-if="memberStore.members.length > 0">
        <SpaceBadge variant="secondary" size="lg">{{
          memberStore.members.length
        }}</SpaceBadge>
      </template>
    </SpaceHeader>

    <!-- Recherche et filtres -->
    <SpaceCard variant="dark" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Recherche -->
        <div>
          <label for="member-search" class="mb-3 flex items-center gap-2">
            <div
              class="font-nasa text-space-primary-light flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
              Rechercher un membre
            </div>
          </label>
          <SpaceInput
            id="member-search"
            v-model="searchTerm"
            placeholder="Nom, rôle..."
            variant="primary"
            :stars="true"
          />
        </div>

        <!-- Options de tri -->
        <div>
          <label for="sort-select" class="mb-3 flex items-center gap-2">
            <div
              class="font-nasa text-space-secondary-light flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                />
              </svg>
              Trier par
            </div>
          </label>
          <div class="relative">
            <select
              id="sort-select"
              v-model="currentSort"
              class="w-full rounded-lg border border-space-secondary/30 bg-space-bg-light text-space-text px-4 py-2 appearance-none focus:ring-2 focus:ring-space-secondary/30 focus:outline-none transition-all duration-300"
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
    <div v-if="memberStore.loading" class="flex justify-center py-12">
      <SpaceLoader text="Scan des données biométriques en cours..." />
    </div>

    <!-- État d'erreur -->
    <SpaceAlert v-else-if="memberStore.error" variant="error" className="my-8">
      <div class="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-space-error mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-space-text mb-4">{{ memberStore.error }}</p>
        <SpaceButton
          @click="memberStore.fetchMembers(true)"
          variant="error"
          size="sm"
        >
          Réessayer
        </SpaceButton>
      </div>
    </SpaceAlert>

    <!-- Liste vide -->
    <SpaceTerminal
      v-else-if="sortedUsers.length === 0"
      :command="`find_users ${
        searchTerm ? '--search=\'' + searchTerm + '\'' : '--all'
      }`"
      title="Console de recherche"
      showCursor
      className="my-8"
    >
      <div class="text-space-error font-mono">
        Erreur 404: Aucun membre ne correspond à cette recherche.
      </div>
      <div class="text-space-text-muted mt-2">
        {{ emptyStateMessage }}
      </div>
    </SpaceTerminal>

    <!-- Liste des membres -->
    <div v-else class="members-grid-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Carte de membre améliorée -->          <div
            v-for="user in paginatedUsers"
            :key="user._id"
            class="member-card bg-space-bg-dark/80 backdrop-blur-sm rounded-xl overflow-hidden border border-space-primary/20 hover:border-space-primary/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-glow"
            :class="[
              user.role === 'admin' ? 'member-card-admin' : '',
              user.role === 'superadmin' ? 'member-card-superadmin' : '',
              getPlayerIdForUser(user) ? 'member-card-player' : ''
            ]"
          >
          <!-- En-tête de la carte avec le statut de l'utilisateur -->
          <div
            class="member-card-header p-3 flex justify-between items-center border-b border-space-primary/10"
          >
            <SpaceBadge
              v-if="user.role === 'admin'"
              variant="secondary"
              size="sm"
            >
              Admin
            </SpaceBadge>
            <SpaceBadge
              v-else-if="user.role === 'superadmin'"
              variant="accent"
              size="sm"
            >
              Super Admin
            </SpaceBadge>
            <SpaceBadge v-else variant="primary" size="sm"> Membre </SpaceBadge>
            <div class="text-space-text-muted text-xs">
              ID: {{ user._id ? user._id.substring(0, 8) : "N/A" }}
            </div>
          </div>

          <!-- Corps de la carte avec avatar et nom -->
          <div class="p-4 flex flex-col items-center text-center">            <div class="avatar-container mb-4 relative">
              <div
                class="avatar-glow absolute inset-0 rounded-full opacity-50"
                :class="[
                  user.role === 'admin' ? 'avatar-glow-admin' : '',
                  user.role === 'superadmin' ? 'avatar-glow-superadmin' : '',
                  getPlayerIdForUser(user) ? 'avatar-glow-player' : ''
                ]"
              ></div>
              <img
                v-if="user.avatarUrl"
                :src="user.avatarUrl"
                alt="Avatar"
                class="w-24 h-24 rounded-full object-cover border-2 border-space-primary-light space-avatar-glow"
                :class="[
                  user.role === 'admin' ? 'border-space-secondary-light' : '',
                  user.role === 'superadmin' ? 'border-space-accent-light' : '',
                  getPlayerIdForUser(user) ? 'avatar-has-profile' : ''
                ]"
                loading="lazy"
                @error="handleImageError($event)"
              />
              <div
                v-else
                class="w-24 h-24 rounded-full bg-space-bg-light flex items-center justify-center border-2 border-space-primary"
              >
                <span class="text-space-primary-light text-xl font-bold">{{
                  getUserInitials(user.username)
                }}</span>
              </div>
            </div>

            <div class="mb-4">
              <router-link
                v-if="getPlayerIdForUser(user)"
                :to="{
                  name: 'Profil',
                  params: { id: getPlayerIdForUser(user) },
                }"
                class="text-lg text-space-text hover:text-space-primary-light font-heading transition-colors capitalize block"
              >
                {{ user.username }}
              </router-link>
              <span v-else class="text-lg text-space-text font-heading block">
                {{ user.username }}
              </span>
            </div>

            <!-- Pied de carte avec action -->
            <div class="mt-2">
              <router-link
                v-if="getPlayerIdForUser(user)"
                :to="{
                  name: 'Profil',
                  params: { id: getPlayerIdForUser(user) },
                }"
                class="space-view-profile-button block"
              >
                <SpaceButton variant="secondary" size="sm" className="w-full">
                  Voir profil
                </SpaceButton>
              </router-link>
              <span
                v-else
                class="text-space-text-muted font-mono text-sm flex items-center justify-center p-2 border border-space-bg-light/20 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Accès restreint
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6">
      <SpacePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage"
        @page-select="currentPage = $event"
      />
    </div>
  </SpaceContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useMemberStore } from "../stores/memberStore";
import SpaceContainer from "@/components/ui/layout/Container.vue";

// Utilisation du store
const memberStore = useMemberStore();

// États pour la recherche et la pagination
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = 9; // Modifier pour 9 membres par page (3x3 grid)

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
  if (!memberStore.members) return null;

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
    const username =
      e.target
        .closest(".member-card")
        ?.querySelector(".text-space-text")
        ?.textContent?.trim() || "?";
    const initials = getUserInitials(username);

    e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;
    e.target.classList.remove("space-avatar-glow");
    e.target.classList.add("space-avatar-fallback");
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
.members-grid-container {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.member-card {
  position: relative;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(135deg, rgba(30, 30, 45, 0.85), rgba(20, 20, 35, 0.95));
}

.member-card:hover {
  box-shadow: 0 8px 30px rgba(109, 40, 217, 0.6);
  transform: translateY(-5px);
}

.avatar-container {
  position: relative;
  z-index: 1;
}

.space-avatar-glow {
  box-shadow: 0 0 15px rgba(109, 40, 217, 0.5);
  transition: all 0.3s ease;
}

.member-card:hover .space-avatar-glow {
  box-shadow: 0 0 25px rgba(109, 40, 217, 0.8);
}

.space-avatar-fallback {
  border: 2px solid var(--space-primary);
}

.avatar-glow {
  box-shadow: 0 0 30px rgba(109, 40, 217, 0.6);
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
    transform: scale(0.97);
  }
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.97);
  }
}

.space-view-profile-button {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

/* Animation de scan pour les membres */
@keyframes scan-line {
  0% {
    top: 0%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.member-card::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(109, 40, 217, 0.8),
    transparent
  );
  top: 0;
  animation: scan-line 3s linear infinite;
  opacity: 0;
  pointer-events: none;
}

.member-card:hover::after {
  opacity: 1;
}

/* Effet de brillance sur hover */
.shadow-glow {
  box-shadow: 0 0 25px rgba(109, 40, 217, 0.5);
}

/* Style pour le filtre de tri */
select {
  background-color: rgba(30, 30, 45, 0.8);
  border: 1px solid rgba(109, 40, 217, 0.3);
  color: var(--space-text);
  transition: all 0.3s ease;
}

select:focus {
  border-color: var(--space-secondary);
  box-shadow: 0 0 0 2px rgba(109, 40, 217, 0.2);
}

/* Animation subtile pour les badges */
.space-badge {
  position: relative;
  overflow: hidden;
}

.space-badge::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: badge-shine 3s infinite;
}

@keyframes badge-shine {
  0% {
    left: -100%;
  }
  20%, 100% {
    left: 100%;
  }
}

/* Styles améliorés pour les différents types de cartes de membre */
.member-card-admin {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(28, 36, 54, 0.95));
  border: 1px solid rgba(99, 102, 241, 0.3) !important;
  border-left: 4px solid var(--space-secondary) !important;
  box-shadow: 0 5px 20px rgba(99, 102, 241, 0.2) !important;
}

.member-card-superadmin {
  background: linear-gradient(135deg, rgba(36, 14, 40, 0.85), rgba(34, 13, 38, 0.95));
  border: 1px solid rgba(236, 72, 153, 0.3) !important;
  border-left: 4px solid var(--space-accent) !important;
  box-shadow: 0 5px 20px rgba(236, 72, 153, 0.2) !important;
}

.member-card-player {
  background: linear-gradient(135deg, rgba(25, 17, 45, 0.85), rgba(23, 15, 41, 0.95));
  border: 1px solid rgba(109, 40, 217, 0.3) !important;
  border-left: 4px solid var(--space-primary) !important;
}

.member-card-admin:hover {
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4) !important;
  background: linear-gradient(135deg, rgba(33, 44, 63, 0.85), rgba(30, 39, 59, 0.95));
}

.member-card-superadmin:hover {
  box-shadow: 0 8px 30px rgba(236, 72, 153, 0.4) !important;
  background: linear-gradient(135deg, rgba(39, 17, 44, 0.85), rgba(37, 16, 42, 0.95));
}

.member-card-player:hover {
  box-shadow: 0 8px 30px rgba(109, 40, 217, 0.5) !important;
  background: linear-gradient(135deg, rgba(28, 20, 48, 0.85), rgba(26, 18, 44, 0.95));
}

/* Styles pour les avatars selon le rôle */
.avatar-glow-admin {
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.6) !important;
  animation: pulse-admin 3s infinite !important;
}

.avatar-glow-superadmin {
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.6) !important;
  animation: pulse-superadmin 3s infinite !important;
}

.avatar-glow-player {
  box-shadow: 0 0 30px rgba(109, 40, 217, 0.6) !important;
  animation: pulse-player 3s infinite !important;
}

.avatar-has-profile {
  border-width: 3px !important;
  box-shadow: 0 0 15px rgba(109, 40, 217, 0.7);
}

/* Animations améliorées pour les avatars */
@keyframes pulse-admin {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.97);
    box-shadow: 0 0 25px rgba(99, 102, 241, 0.4);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
    box-shadow: 0 0 35px rgba(99, 102, 241, 0.7);
  }
}

@keyframes pulse-superadmin {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.97);
    box-shadow: 0 0 25px rgba(236, 72, 153, 0.4);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
    box-shadow: 0 0 35px rgba(236, 72, 153, 0.7);
  }
}

@keyframes pulse-player {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.97);
    box-shadow: 0 0 25px rgba(109, 40, 217, 0.4);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
    box-shadow: 0 0 35px rgba(109, 40, 217, 0.7);
  }
}

/* Effet de couleur de fond amélioré */
.member-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 10%, rgba(109, 40, 217, 0.15), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 0;
  pointer-events: none;
}

.member-card:hover::before {
  opacity: 1;
}

.member-card-admin::before {
  background: radial-gradient(circle at 50% 10%, rgba(99, 102, 241, 0.15), transparent 70%);
}

.member-card-superadmin::before {
  background: radial-gradient(circle at 50% 10%, rgba(236, 72, 153, 0.15), transparent 70%);
}

/* Ajouter un effet de bordure scintillante pour les différents types de membres */
.member-card-header {
  position: relative;
  overflow: hidden;
}

.member-card-header::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--space-primary), transparent);
  opacity: 0.7;
}

.member-card-admin .member-card-header::after {
  background: linear-gradient(90deg, transparent, var(--space-secondary), transparent);
}

.member-card-superadmin .member-card-header::after {
  background: linear-gradient(90deg, transparent, var(--space-accent), transparent);
}

/* Ajouter un effet de particules/étoiles pour les membres superadmin */
.member-card-superadmin {
  position: relative;
  overflow: hidden;
}

.member-card-superadmin::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(236, 72, 153, 0.15) 1px, transparent 1px),
    radial-gradient(circle at 30% 60%, rgba(236, 72, 153, 0.15) 1px, transparent 1px),
    radial-gradient(circle at 50% 40%, rgba(236, 72, 153, 0.15) 1px, transparent 1px),
    radial-gradient(circle at 70% 90%, rgba(236, 72, 153, 0.15) 1px, transparent 1px),
    radial-gradient(circle at 90% 10%, rgba(236, 72, 153, 0.15) 1px, transparent 1px);
  background-size: 80px 80px;
  z-index: 0;
  opacity: 0.5;
}

/* Responsive design */
@media (max-width: 640px) {
  .members-grid-container {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
