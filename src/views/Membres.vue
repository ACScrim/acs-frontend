<template>
  <SpaceContainer>
    <!-- En-tête de la page avec notre nouveau composant SpaceHeader -->
    <SpaceHeader
      title="MEMBRES DE L'ÉQUIPAGE"
      :showMissionInfo="true"
      mission="CREWMATES-2025"
    >
      <template #badge>
        <div class="flex items-center gap-3">
          <SpaceBadge variant="secondary" size="lg">
            {{ memberStore.members.length }} membre{{
              memberStore.members.length > 1 ? "s" : ""
            }}
          </SpaceBadge>
          <SpaceBadge
            v-if="searchResults.length !== memberStore.members.length"
            variant="accent"
            size="md"
          >
            {{ searchResults.length }} trouvé{{
              searchResults.length > 1 ? "s" : ""
            }}
          </SpaceBadge>
        </div>
      </template>
    </SpaceHeader>

    <!-- Statistiques rapides -->
    <SpaceCard variant="primary" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-space-primary-light font-nasa">
            {{ memberStore.members.length }}
          </div>
          <div class="text-space-text-muted">Total membres</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-space-secondary-light font-nasa">
            {{ memberStats.admins }}
          </div>
          <div class="text-space-text-muted">Administrateurs</div>
        </div>
      </div>
    </SpaceCard>

    <!-- Recherche et filtres -->
    <SpaceCard variant="dark" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <!-- Filtre par rôle -->
        <div>
          <label for="role-filter" class="mb-3 flex items-center gap-2">
            <div class="font-nasa text-space-accent flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
              Filtrer par rôle
            </div>
          </label>
          <div class="relative">
            <select
              id="role-filter"
              v-model="roleFilter"
              class="w-full rounded-lg border border-space-accent/30 bg-space-bg-light text-space-text px-4 py-2 appearance-none focus:ring-2 focus:ring-space-accent/30 focus:outline-none transition-all duration-300"
            >
              <option value="">Tous les rôles</option>
              <option value="user">Membres</option>
              <option value="admin">Administrateurs</option>
              <option value="superadmin">Super Admin</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-space-accent"
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

      <!-- Boutons d'action pour les filtres -->
      <div
        v-if="searchTerm || roleFilter"
        class="mt-4 flex justify-between items-center"
      >
        <div class="text-sm text-space-text-muted">
          {{ searchResults.length }} résultat{{
            searchResults.length > 1 ? "s" : ""
          }}
          trouvé{{ searchResults.length > 1 ? "s" : "" }}
        </div>
        <SpaceButton @click="resetFilters" variant="secondary" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
          Réinitialiser les filtres
        </SpaceButton>
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
      }${roleFilter ? ' --role=' + roleFilter : ''}`"
      title="Console de recherche"
      showCursor
      className="my-8"
    >
      <div class="text-space-error font-mono">
        Erreur 404: Aucun membre ne correspond à cette recherche.
      </div>
      <div class="text-space-text-muted mt-2 mb-4">
        {{ emptyStateMessage }}
      </div>
      <div v-if="searchTerm || roleFilter" class="flex gap-3">
        <SpaceButton @click="resetFilters" variant="primary" size="sm">
          Réinitialiser les filtres
        </SpaceButton>
        <SpaceButton
          @click="memberStore.fetchMembers(true)"
          variant="secondary"
          size="sm"
        >
          Actualiser la liste
        </SpaceButton>
      </div>
    </SpaceTerminal>
    <!-- Liste des membres -->
    <div v-else class="members-grid-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SpaceMemberCard
          v-for="user in paginatedUsers"
          :key="user._id"
          :user-id="user._id"
          :username="user.username"
          :role="user.role"
          :avatar-url="user.avatarUrl"
          :player-id="getPlayerIdForUser(user)"
        />
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
const roleFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = 9; // Modifier pour 9 membres par page (3x3 grid)

// Options de tri
const sortOptions = [
  { id: "username-asc", label: "Nom (A-Z)" },
  { id: "username-desc", label: "Nom (Z-A)" },
];
const currentSort = ref("username-asc");

// Propriétés calculées
const memberStats = computed(() => {
  const stats = {
    total: memberStore.members.length,
    admins: 0,
    users: 0,
  };

  memberStore.members.forEach((member) => {
    if (member.role === "admin" || member.role === "superadmin") {
      stats.admins++;
    } else {
      stats.users++;
    }
  });

  return stats;
});

const searchResults = computed(() => {
  let results = memberStore.members;

  // Filtre par rôle
  if (roleFilter.value) {
    results = results.filter((user) => user.role === roleFilter.value);
  }

  // Filtre par terme de recherche
  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase().trim();
    results = results.filter((user) => {
      const matchesUsername = user.username.toLowerCase().includes(term);
      const matchesRole = user.role.toLowerCase().includes(term);

      // Recherche avancée pour les rôles en français
      const roleTranslations = {
        admin: ["admin", "administrateur"],
        superadmin: ["superadmin", "super admin", "super administrateur"],
        user: ["user", "utilisateur", "membre"],
      };

      const matchesTranslatedRole =
        roleTranslations[user.role]?.some((translation) =>
          translation.includes(term)
        ) || false;

      return matchesUsername || matchesRole || matchesTranslatedRole;
    });
  }

  return results;
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
  const hasFilters = searchTerm.value || roleFilter.value;

  if (hasFilters) {
    const filters = [];
    if (searchTerm.value) filters.push(`recherche "${searchTerm.value}"`);
    if (roleFilter.value) {
      const roleNames: { [key: string]: string } = {
        user: "Membres",
        admin: "Administrateurs",
        superadmin: "Super Admin",
      };
      filters.push(`rôle "${roleNames[roleFilter.value]}"`);
    }
    return `Aucun membre ne correspond aux critères : ${filters.join(", ")}.`;
  }
  return "Aucun membre trouvé dans la base de données.";
});

// Fonctions utilitaires
const resetFilters = () => {
  searchTerm.value = "";
  roleFilter.value = "";
  resetPagination();
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

watch(roleFilter, () => {
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

/* Style pour les filtres - optimisé */
select {
  background-color: rgba(30, 30, 45, 0.8);
  border: 1px solid rgba(109, 40, 217, 0.3);
  color: var(--space-text);
  transition: border-color 0.15s ease;
}

select:focus {
  border-color: var(--space-secondary);
  box-shadow: 0 0 0 2px rgba(109, 40, 217, 0.15);
}

/* Suppression des animations coûteuses */
.grid > * {
  transition: none;
}

/* Optimisation performance - désactivation des animations */
.members-grid-container *,
.members-grid-container *::before,
.members-grid-container *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}

/* Responsive design simplifié */
@media (max-width: 640px) {
  .members-grid-container {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

/* Amélioration de l'accessibilité sans animations */
select:focus-visible {
  outline: 2px solid var(--space-primary);
  outline-offset: 2px;
}

/* Performance optimisée */
.grid {
  contain: layout style;
}
</style>
