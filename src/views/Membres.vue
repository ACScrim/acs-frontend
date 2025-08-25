<template>
  <SpaceContainer>
    <!-- En-tête de la page avec notre composant SpaceHeader Far West -->
    <SpaceHeader
      title="MEMBRES DE L'ÉQUIPAGE"
      :showMissionInfo="true"
      :wantedCandidates="memberStore.members.map((m) => m.username)"
    />

    <!-- Statistiques rapides -->
    <SpaceCard variant="primary" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-color-primary font-heading">
            {{ memberStore.members.length }}
          </div>
          <div class="text-normal-text-muted">Total membres</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-color-secondary font-heading">
            {{ memberStats.admins }}
          </div>
          <div class="text-normal-text-muted">Administrateurs</div>
        </div>
      </div>
    </SpaceCard>

    <!-- Recherche et filtres -->
    <SpaceCard variant="dark" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Recherche -->
        <div>
          <label for="member-search" class="mb-3 flex items-center gap-2">
            <div class="font-heading text-normal-text flex items-center gap-2">
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
          />
        </div>

        <!-- Filtre par rôle -->
        <div>
          <SpaceDropdown v-model="roleFilter" label="Filtrer par rôle">
            <option value="">Tous les rôles</option>
            <option value="user">Membres</option>
            <option value="admin">Administrateurs</option>
            <option value="superadmin">Super Admin</option>
          </SpaceDropdown>
        </div>

        <!-- Options de tri -->
        <div>
          <SpaceDropdown v-model="currentSort" label="Trier par">
            <option
              v-for="option in sortOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.label }}
            </option>
          </SpaceDropdown>
        </div>
      </div>

      <!-- Boutons d'action pour les filtres -->
      <div
        v-if="searchTerm || roleFilter"
        class="mt-4 flex justify-between items-center"
      >
        <div class="text-sm text-normal-text-muted">
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
      <SpaceLoader text="Recensement des membres en cours..." />
    </div>

    <!-- État d'erreur -->
    <SpaceAlert v-else-if="memberStore.error" variant="error" className="my-8">
      <div class="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-color-error mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-normal-text mb-4">{{ memberStore.error }}</p>
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
      :command="emptyStateMessage"
      title="Avis de recherche : Membres"
      :showCursor="false"
      className="my-8"
    >
      <div class="text-normal-text-muted mt-2 mb-4 text-center">
        Aucun membre ne correspond à ces critères.
      </div>
      <div v-if="searchTerm || roleFilter" class="flex gap-3 justify-center">
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
import SpaceHeader from "@/components/ui/molecules/Header.vue";
import SpaceCard from "@/components/ui/molecules/Card.vue";
import SpaceInput from "@/components/ui/atoms/Input.vue";
import SpaceDropdown from "@/components/ui/atoms/Dropdown.vue";
import SpaceButton from "@/components/ui/atoms/Button.vue";
import SpaceLoader from "@/components/ui/molecules/Loader.vue";
import SpacePagination from "@/components/ui/organisms/Pagination.vue";
import SpaceTerminal from "@/components/ui/organisms/Terminal.vue";
import SpaceAlert from "@/components/ui/molecules/Alert.vue";
import SpaceMemberCard from "@/components/ui/molecules/MemberCard.vue";

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

/* Performance optimisée */
.grid {
  contain: layout style;
}
</style>
