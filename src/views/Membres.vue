<template>
  <Container>
    <!-- En-tête de la page avec notre nouveau composant Header -->
    <Header
      title="MEMBRES DE LA GUILDE"
      :showMissionInfo="true"
      mission="HALLOWEEN-2025"
    />

    <!-- Statistiques rapides -->
    <Card variant="primary" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-color-primary-light font-heading">
            {{ memberStore.members.length }}
          </div>
          <div class="text-color-text-muted">Total membres</div>
        </div>
        <div class="text-center">
          <div
            class="text-3xl font-bold text-color-secondary-light font-heading"
          >
            {{ memberStats.admins }}
          </div>
          <div class="text-color-text-muted">Administrateurs</div>
        </div>
      </div>
    </Card>

    <!-- Recherche et filtres -->
    <Card variant="dark" className="mb-6 mt-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Recherche -->
        <div>
          <Input
            id="member-search"
            v-model="searchTerm"
            label="Rechercher un membre"
            placeholder="Nom, rôle..."
            class="search-filter"
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
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
          </Input>
        </div>

        <!-- Filtre par rôle -->
        <div>
          <Dropdown
            id="role-filter"
            v-model="roleFilter"
            label="Filtrer par rôle"
            placeholder="Tous les rôles"
            class="role-filter"
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
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <option value="">Tous les rôles</option>
            <option value="user">Membres</option>
            <option value="admin">Administrateurs</option>
            <option value="superadmin">Super Admin</option>
          </Dropdown>
        </div>

        <!-- Options de tri -->
        <div>
          <Dropdown
            id="sort-select"
            v-model="currentSort"
            label="Trier par"
            placeholder="Nom (A-Z)"
            class="sort-filter"
          >
            <template #icon>
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
            </template>
            <option
              v-for="option in sortOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.label }}
            </option>
          </Dropdown>
        </div>
      </div>

      <!-- Boutons d'action pour les filtres -->
      <div
        v-if="searchTerm || roleFilter"
        class="mt-4 flex justify-between items-center"
      >
        <div class="text-sm text-color-text-muted">
          {{ searchResults.length }} résultat{{
            searchResults.length > 1 ? "s" : ""
          }}
          trouvé{{ searchResults.length > 1 ? "s" : "" }}
        </div>
        <Button @click="resetFilters" variant="secondary" size="sm">
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
        </Button>
      </div>
    </Card>

    <!-- État de chargement -->
    <div v-if="memberStore.loading" class="flex justify-center py-12">
      <Loader text="Chargement des membres en cours..." />
    </div>

    <!-- État d'erreur -->
    <Alert v-else-if="memberStore.error" variant="error" className="my-8">
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
        <p class="text-color-text mb-4">{{ memberStore.error }}</p>
        <Button
          @click="memberStore.fetchMembers(true)"
          variant="error"
          size="sm"
        >
          Réessayer
        </Button>
      </div>
    </Alert>

    <!-- Liste vide -->
    <Terminal
      v-else-if="sortedUsers.length === 0"
      :command="`find_users ${
        searchTerm ? '--search=\'' + searchTerm + '\'' : '--all'
      }${roleFilter ? ' --role=' + roleFilter : ''}`"
      title="Console de recherche"
      showCursor
      className="my-8"
    >
      <div class="text-color-error font-mono">
        Erreur 404: Aucun membre ne correspond à cette recherche.
      </div>
      <div class="text-color-text-muted mt-2 mb-4">
        {{ emptyStateMessage }}
      </div>
      <div v-if="searchTerm || roleFilter" class="flex gap-3">
        <Button @click="resetFilters" variant="primary" size="sm">
          Réinitialiser les filtres
        </Button>
        <Button
          @click="memberStore.fetchMembers(true)"
          variant="secondary"
          size="sm"
        >
          Actualiser la liste
        </Button>
      </div>
    </Terminal>
    <!-- Liste des membres -->
    <div v-else class="members-grid-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MemberCard
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
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage"
        @page-select="currentPage = $event"
      />
    </div>
  </Container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useMemberStore } from "../stores/memberStore";

//-------------------------------------------------------
// ÉTAT RÉACTIF ET STORE
//-------------------------------------------------------

// Utilisation du store pour la gestion des membres
const memberStore = useMemberStore();

// États locaux pour les filtres et la pagination
const searchTerm = ref("");
const roleFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = 9; // Configuration pour une grille 3x3

//-------------------------------------------------------
// CONFIGURATION DES OPTIONS
//-------------------------------------------------------

/**
 * Options de tri disponibles pour les membres
 */
const sortOptions = [
  { id: "username-asc", label: "Nom (A-Z)" },
  { id: "username-desc", label: "Nom (Z-A)" },
];
const currentSort = ref("username-asc");

//-------------------------------------------------------
// PROPRIÉTÉS CALCULÉES
//-------------------------------------------------------

/**
 * Calcule les statistiques des membres (nombre d'admins, etc.)
 * @returns Objet contenant les statistiques des membres
 */
const memberStats = computed(() => {
  const stats = {
    admins: 0,
  };

  memberStore.members.forEach((member) => {
    if (member.role === "admin" || member.role === "superadmin") {
      stats.admins++;
    }
  });

  return stats;
});

/**
 * Filtre les membres selon les critères de recherche et de rôle
 * @returns Liste des membres filtrés
 */
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

/**
 * Trie les membres filtrés selon l'option sélectionnée
 * @returns Liste des membres triés
 */
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

/**
 * Calcule le nombre total de pages pour la pagination
 * @returns Nombre total de pages
 */
const totalPages = computed(() =>
  Math.ceil(sortedUsers.value.length / itemsPerPage)
);

/**
 * Retourne les membres à afficher sur la page courante
 * @returns Liste des membres paginés
 */
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedUsers.value.slice(start, end);
});

/**
 * Génère un message d'état vide contextuel basé sur les filtres actifs
 * @returns Message explicatif pour l'état vide
 */
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

//-------------------------------------------------------
// FONCTIONS UTILITAIRES
//-------------------------------------------------------

/**
 * Récupère l'ID joueur associé à un utilisateur
 * @param user - L'utilisateur dont on cherche l'ID joueur
 * @returns L'ID joueur ou null si non trouvé
 */
const getPlayerIdForUser = (user: any): string | null => {
  if (!memberStore.members) return null;

  const matchingMember = memberStore.members.find(
    (member) => member._id === user._id && member.playerId
  );

  return matchingMember?.playerId || null;
};

/**
 * Réinitialise tous les filtres à leurs valeurs par défaut
 */
const resetFilters = () => {
  searchTerm.value = "";
  roleFilter.value = "";
  resetPagination();
};

/**
 * Remet la pagination à la première page
 */
const resetPagination = () => {
  currentPage.value = 1;
};

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

//-------------------------------------------------------
// WATCHERS ET CYCLE DE VIE
//-------------------------------------------------------

/**
 * Fonction de debounce pour limiter les appels répétitifs
 * @param fn - Fonction à debouncer
 * @param wait - Délai d'attente en millisecondes
 * @returns Fonction debouncée
 */
function debounce<T extends (...args: any[]) => any>(fn: T, wait = 300) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const debouncedResetPagination = debounce(resetPagination, 250);

// Watcher consolidé pour tous les filtres avec debouncing
watch([searchTerm, roleFilter, currentSort], debouncedResetPagination);

/**
 * Initialise le composant au montage
 */
onMounted(() => {
  memberStore.fetchMembers();
});
</script>

<style scoped>
/* Styles spécifiques pour les dropdowns compacts */
.search-filter {
  --filter-color: var(--color-primary-rgb);
}

.role-filter {
  --filter-color: var(--color-accent-rgb);
}

.sort-filter {
  --filter-color: var(--color-secondary-rgb);
}

/* Styles communs pour tous les filtres */
.search-filter :deep(label),
.role-filter :deep(.dropdown-label),
.sort-filter :deep(.dropdown-label) {
  font-size: 0.875rem !important;
  margin-bottom: 0.5rem !important;
  font-family: var(--font-body) !important;
  font-weight: 500 !important;
  color: rgba(var(--filter-color), 1) !important;
  text-shadow: 0 0 8px rgba(var(--filter-color), 0.6) !important;
}

.role-filter :deep(.dropdown-select),
.sort-filter :deep(.dropdown-select) {
  padding: 0.5rem 2rem 0.5rem 0.75rem !important;
  font-size: 0.875rem !important;
  font-family: var(--font-body) !important;
  line-height: 1.4 !important;
  border-color: rgba(var(--filter-color), 0.5) !important;
  box-shadow: 0 0 10px rgba(var(--filter-color), 0.3) !important;
}

.role-filter :deep(.dropdown-select:hover),
.sort-filter :deep(.dropdown-select:hover) {
  border-color: rgba(var(--filter-color), 0.8) !important;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(var(--filter-color), 0.5) !important;
}

.role-filter :deep(.dropdown-label svg),
.sort-filter :deep(.dropdown-label svg) {
  margin-right: 0.5rem !important;
}

.role-filter :deep(.dropdown-arrow),
.sort-filter :deep(.dropdown-arrow) {
  right: 0.5rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 10 !important;
}

.role-filter :deep(.dropdown-arrow svg),
.sort-filter :deep(.dropdown-arrow svg) {
  height: 0.75rem !important;
  width: 0.75rem !important;
}

/* Input de recherche */
.search-filter :deep(input) {
  padding: 0.5rem 0.75rem 0.5rem 2.5rem !important;
  font-size: 0.875rem !important;
  font-family: var(--font-body) !important;
  line-height: 1.4 !important;
  border-color: rgba(var(--filter-color), 0.5) !important;
  box-shadow: 0 0 10px rgba(var(--filter-color), 0.3) !important;
}

.search-filter :deep(input:hover) {
  border-color: rgba(var(--filter-color), 0.8) !important;
  box-shadow: 0 0 15px rgba(var(--filter-color), 0.4) !important;
}

.search-filter :deep(input:focus) {
  border-color: rgba(var(--filter-color), 1) !important;
  box-shadow: 0 0 20px rgba(var(--filter-color), 0.6) !important;
}

.search-filter :deep(.absolute.inset-y-0.left-0) {
  padding-left: 0.75rem !important;
  display: flex !important;
  align-items: center !important;
  pointer-events: none !important;
}

.search-filter :deep(.absolute.inset-y-0.left-0 svg) {
  height: 1rem !important;
  width: 1rem !important;
  color: rgba(var(--color-text-rgb), 0.6) !important;
}

/* Grid responsive avec animations subtiles */
.members-grid-container .grid > * {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.members-grid-container .grid > *:hover {
  transform: translateY(-2px);
}

/* Amélioration des performances selon les préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .members-grid-container .grid > * {
    transition: none;
  }
}
</style>
