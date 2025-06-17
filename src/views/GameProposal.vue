<template>
  <div class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24 relative">
    <!-- En-tête de la page -->
    <SpaceHeader
      title="PROPOSITIONS DE JEUX"
      mission="GAMES-DISCOVERY"
      :showMissionInfo="true"
    >
      <template #badge v-if="proposals.length > 0">
        <SpaceBadge variant="accent" size="lg">{{
          proposals.length
        }}</SpaceBadge>
      </template>
    </SpaceHeader>

    <div class="flex flex-col gap-6 mt-6">
      <!-- Description/Introduction -->
      <SpaceCard variant="dark" className="mb-6">
        <p class="text-space-text font-body">
          Seuls les jeux approuvés par les administrateurs seront votables. Les
          propositions rejetées seront supprimées après un certain délai.
        </p>
      </SpaceCard>

      <!-- Filtres et bouton d'ajout -->
      <SpaceCard variant="primary" className="mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Filtres -->
          <div class="space-y-4">
            <label class="block mb-2 font-nasa text-space-primary-light"
              >Filtrer par statut</label
            >
            <div class="flex flex-wrap gap-2">
              <SpaceButton
                v-for="filter in filters"
                :key="filter.value"
                @click="
                  activeFilter = filter.value;
                  currentPage = 1;
                "
                :variant="activeFilter === filter.value ? 'primary' : 'outline'"
                size="sm"
              >
                {{ filter.label }}
              </SpaceButton>
            </div>
          </div>

          <!-- Tri -->
          <div class="space-y-4">
            <label class="block mb-2 font-nasa text-space-secondary-light"
              >Options de tri</label
            >
            <div class="flex flex-col gap-2">
              <select
                v-model="sortOption"
                class="w-full rounded-lg border border-space-secondary/30 bg-space-bg-light text-space-text px-4 py-2 appearance-none focus:ring-2 focus:ring-space-secondary/30 focus:outline-none transition-all duration-300"
              >
                <option value="default">Tri par défaut</option>
                <option value="votesDesc">Votes (+)</option>
                <option value="votesAsc">Votes (-)</option>
              </select>

              <div
                v-show="sortOption === 'votesDesc' || sortOption === 'votesAsc'"
                class="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="positiveVotesOnly"
                  v-model="onlyPositiveVotes"
                  class="rounded border-space-primary/30 bg-space-bg-light text-space-primary focus:ring-space-primary/30"
                />
                <label for="positiveVotesOnly" class="text-sm text-space-text">
                  Compter uniquement les votes positifs
                </label>
              </div>
            </div>
          </div>

          <!-- Recherche et Ajout -->
          <div class="space-y-4">
            <div class="relative">
              <label class="block mb-2 font-nasa text-space-accent-light"
                >Rechercher un jeu</label
              >
              <SpaceInput
                v-model="searchTerm"
                placeholder="Nom du jeu..."
                @input="handleSearch"
                variant="accent"
                :clearable="true"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-space-text-muted"
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
                </template>
              </SpaceInput>
            </div>

            <SpaceButton
              @click="showProposalForm = true"
              variant="accent"
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Proposer un jeu
            </SpaceButton>
          </div>
        </div>
      </SpaceCard>

      <!-- État de chargement -->
      <div v-if="loading" class="flex justify-center py-12">
        <SpaceLoader text="Chargement des propositions..." />
      </div>

      <!-- Message si aucune proposition -->
      <SpaceTerminal
        v-else-if="proposals.length === 0"
        :command="`list_proposals --filter=${activeFilter} ${
          searchTerm ? '--search=\'' + searchTerm + '\'' : ''
        }`"
        title="Console de recherche"
        showCursor
        className="my-8"
      >
        <div class="text-space-error font-mono">
          Erreur 404: Aucune proposition trouvée.
        </div>
        <div class="text-space-text-muted mt-2">
          {{ emptyStateMessage }}
        </div>
      </SpaceTerminal>

      <SpaceTerminal
        v-else-if="filteredProposals.length === 0"
        :command="`search_proposals --query='${searchTerm}' --filter=${activeFilter}`"
        title="Console de recherche"
        showCursor
        className="my-8"
      >
        <div class="text-space-error font-mono">
          Erreur 404: Aucun résultat pour cette recherche.
        </div>
        <div class="text-space-text-muted mt-2">
          {{ emptyStateMessage }}
        </div>
      </SpaceTerminal>

      <!-- Liste des propositions -->
      <div v-else class="space-y-4">
        <game-proposal-card
          v-for="proposal in paginatedProposals"
          :key="proposal._id"
          :proposal="proposal"
          :is-admin="isAdmin"
          :is-authenticated="isAuthenticated"
          :show-positive-only="onlyPositiveVotes"
          @vote="handleVote"
          @approve="approveProposal"
          @reject="openRejectDialog"
          @delete="confirmDelete"
        />

        <!-- Pagination -->
        <div class="mt-8">
          <SpacePagination
            v-if="filteredProposals.length > itemsPerPage"
            :current-page="currentPage"
            :total-pages="totalPages"
            @prev-page="prevPage"
            @next-page="nextPage"
            @page-select="goToPage"
          />
        </div>
      </div>
    </div>

    <!-- Modal de proposition de jeu -->
    <SpaceModal v-model="showProposalForm" title="PROPOSER UN NOUVEAU JEU">
      <div class="space-y-6">
        <div>
          <label
            class="block text-sm font-medium text-space-primary-light mb-1 font-nasa"
          >
            Rechercher un jeu
          </label>
          <div class="relative">
            <SpaceInput
              v-model="searchQuery"
              @input="debounceSearch"
              placeholder="Entrez le nom d'un jeu..."
              variant="primary"
              :stars="true"
            >
              <template #rightIcon v-if="searching">
                <div
                  class="animate-spin h-4 w-4 border-2 border-t-space-primary rounded-full"
                ></div>
              </template>
            </SpaceInput>
          </div>

          <!-- Résultats de recherche -->
          <div
            v-if="searchResults.length > 0"
            class="mt-2 border border-space-primary/30 rounded-lg overflow-hidden max-h-60 overflow-y-auto bg-space-bg/80"
          >
            <div
              v-for="game in searchResults"
              :key="game.id"
              @click="selectGame(game)"
              class="p-3 flex items-center hover:bg-space-primary/10 cursor-pointer border-b border-space-primary/20 transition-all"
            >
              <div class="relative overflow-hidden rounded">
                <img
                  :src="game.background_image || '/img/game-placeholder.jpg'"
                  :alt="game.name"
                  class="w-12 h-12 object-cover rounded border border-space-primary/50"
                  @error="(e) => ((e.target as HTMLImageElement).src = '/img/game-placeholder.jpg')"
                />
              </div>
              <div class="ml-3">
                <p class="text-space-text font-medium font-heading">
                  {{ game.name }}
                </p>
                <p class="text-space-primary-light text-xs">
                  <span v-if="game.released">{{
                    formatGameReleaseDate(game.released)
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-space-primary-light mb-1 font-nasa"
          >
            Nom du jeu
          </label>
          <SpaceInput v-model="newProposal.name" variant="primary" />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-space-primary-light mb-1 font-nasa"
          >
            Description (optionnelle)
          </label>
          <textarea
            v-model="newProposal.description"
            rows="3"
            class="w-full rounded-lg border border-space-primary/30 bg-space-bg-light text-space-text px-4 py-2 focus:ring-2 focus:ring-space-primary/30 focus:outline-none transition-all duration-300"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <SpaceButton @click="showProposalForm = false" variant="outline">
            Annuler
          </SpaceButton>
          <SpaceButton
            @click="submitProposal"
            :disabled="!isProposalValid || submitting"
            variant="primary"
          >
            <span
              v-if="submitting"
              class="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full mr-2"
            ></span>
            {{ submitting ? "Envoi en cours..." : "Proposer ce jeu" }}
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>

    <!-- Modal de rejet -->
    <SpaceModal v-model="showRejectDialog" title="MOTIF DU REJET">
      <div>
        <label
          class="block text-sm font-medium text-space-error mb-1 font-nasa"
        >
          Raison du rejet (visible par tous les utilisateurs)
        </label>
        <textarea
          v-model="rejectionReason"
          rows="3"
          placeholder="Expliquez pourquoi cette proposition ne convient pas..."
          class="w-full rounded-lg border border-space-error/30 bg-space-bg-light text-space-text px-4 py-2 focus:ring-2 focus:ring-space-error/30 focus:outline-none transition-all duration-300"
        ></textarea>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <SpaceButton @click="showRejectDialog = false" variant="outline">
            Annuler
          </SpaceButton>
          <SpaceButton @click="rejectProposal" variant="error">
            Rejeter la proposition
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>

    <!-- Toast via le composant partagé -->
    <Toast
      v-if="toastInfo.visible"
      :type="toastInfo.type"
      :message="toastInfo.message"
    />

    <!-- Dialog de confirmation de suppression -->
    <SpaceModal
      v-model="deleteDialogVisible"
      title="SUPPRIMER CETTE PROPOSITION"
    >
      <p class="text-space-text">
        Êtes-vous sûr de vouloir supprimer définitivement cette proposition de
        jeu ? Cette action est irréversible.
      </p>

      <template #footer>
        <div class="flex justify-end gap-2">
          <SpaceButton @click="deleteDialogVisible = false" variant="outline">
            Annuler
          </SpaceButton>
          <SpaceButton @click="deleteProposal" variant="error">
            Supprimer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import gameProposalService from "../services/gameProposalService";
import rawgService from "../services/rawgService";
import type { GameProposal, RawgGame } from "../types";
import GameProposalCard from "../components/GameProposalCard.vue";
import Toast from "../shared/Toast.vue";

// ===================================
// ÉTAT ET RÉFÉRENCES
// ===================================

// État utilisateur
const userStore = useUserStore();
const isAuthenticated = computed(() => !!userStore.user);
const isAdmin = computed(() =>
  ["admin", "superadmin"].includes(userStore.user?.role || "")
);

// Propositions de jeux
const proposals = ref<GameProposal[]>([]);
const loading = ref(true);
const activeFilter = ref("approved");

// Filtres disponibles
const filters = [
  { label: "Approuvés", value: "approved" },
  { label: "En attente", value: "pending" },
];
const sortOption = ref("default");

const onlyPositiveVotes = ref(false);

// Modal de nouvelle proposition
const showProposalForm = ref(false);
const newProposal = ref({
  name: "",
  description: "",
  imageUrl: "",
  rawgId: undefined as number | undefined,
});
const isProposalValid = computed(
  () => newProposal.value.name.trim().length > 0
);
const submitting = ref(false);

// Recherche de jeux
const searchQuery = ref("");
const searchResults = ref<RawgGame[]>([]);
const searching = ref(false);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

// Dialog de suppression
const deleteDialogVisible = ref(false);
const proposalToDelete = ref<string>("");

// Modal de rejet
const showRejectDialog = ref(false);
const rejectionReason = ref("");
const proposalToReject = ref("");

// Notification toast
const toastInfo = ref({
  visible: false,
  message: "",
  type: "success" as "success" | "error",
});

// ===================================
// PAGINATION ET RECHERCHE
// ===================================

// Pagination
const itemsPerPage = 10;
const currentPage = ref(1);

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Recherche
const searchTerm = ref("");
const searchDebounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

/**
 * Effectue la recherche avec debounce
 */
const handleSearch = () => {
  // Reset à la page 1 lors d'une recherche
  currentPage.value = 1;

  // Debounce
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value);
  }

  searchDebounceTimeout.value = setTimeout(() => {
    // La recherche est gérée par le computed filteredProposals
  }, 300);
};

/**
 * Efface la recherche
 */
const clearSearch = () => {
  searchTerm.value = "";
  currentPage.value = 1;
};

// Propositions filtrées selon la recherche
const filteredProposals = computed(() => {
  let result = proposals.value;

  if (searchTerm.value.trim()) {
    const searchTermLower = searchTerm.value.toLowerCase();
    result = result.filter(
      (proposal) =>
        proposal.name.toLowerCase().includes(searchTermLower) ||
        (proposal.description &&
          proposal.description.toLowerCase().includes(searchTermLower))
    );
  }

  // Appliquer le tri selon l'option sélectionnée
  if (sortOption.value === "votesDesc" || sortOption.value === "votesAsc") {
    result = [...result].sort((a, b) => {
      // Calculer les scores selon la préférence utilisateur
      const scoreA = onlyPositiveVotes.value
        ? a.votes?.filter((v) => v.value > 0).length || 0
        : a.totalVotes;
      const scoreB = onlyPositiveVotes.value
        ? b.votes?.filter((v) => v.value > 0).length || 0
        : b.totalVotes;

      // Tri ascendant ou descendant selon l'option
      return sortOption.value === "votesDesc"
        ? scoreB - scoreA
        : scoreA - scoreB;
    });
  }

  return result;
});

// Propositions paginées
const paginatedProposals = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProposals.value.slice(startIndex, endIndex);
});

// Nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(filteredProposals.value.length / itemsPerPage);
});

// Si la page actuelle devient invalide après un changement
watch(filteredProposals, () => {
  // Ajuster la page actuelle si elle dépasse le nombre total de pages
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value;
  }
  // Si aucun résultat, revenir à la page 1
  if (totalPages.value === 0) {
    currentPage.value = 1;
  }
});

watch(sortOption, () => {
  // Rester à la page 1 quand on change de tri
  currentPage.value = 1;
});

watch(onlyPositiveVotes, () => {
  // Rester à la page 1 quand on change le mode de comptage des votes
  currentPage.value = 1;
});

// ===================================
// CHARGEMENT DES DONNÉES
// ===================================

/**
 * Charge les propositions selon le filtre actif
 */
const loadProposals = async () => {
  try {
    loading.value = true;
    const status = activeFilter.value; // Suppression de la condition pour "all"
    const result = await gameProposalService.getProposals(status);
    proposals.value = result;
  } catch (error) {
    showToast("Erreur lors du chargement des propositions", "error");
    console.error("Erreur lors du chargement des propositions:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Message à afficher quand aucune proposition n'est trouvée
 */
const emptyStateMessage = computed(() => {
  if (searchTerm.value) {
    return `Aucune proposition ne correspond à votre recherche "${searchTerm.value}".`;
  }

  if (activeFilter.value === "pending") {
    return "Aucune proposition en attente de modération.";
  } else if (activeFilter.value === "approved") {
    return "Aucune proposition approuvée. Soyez le premier à proposer un jeu!";
  }

  return "Aucune proposition trouvée. Soyez le premier à proposer un jeu!";
});

// ===================================
// GESTION DES VOTES
// ===================================

/**
 * Gestion des votes sur une proposition
 */
const handleVote = async (proposalId: string, value: number) => {
  // Vérification de connexion
  if (!isAuthenticated.value) {
    showToast("Veuillez vous connecter pour voter", "error");
    return;
  }

  // Vérification du statut
  const proposal = proposals.value.find((p) => p._id === proposalId);
  if (proposal?.status === "pending") {
    showToast("Impossible de voter pour une proposition en attente", "error");
    return;
  }

  try {
    await gameProposalService.voteProposal(proposalId, value);
    await loadProposals();
  } catch (error) {
    showToast("Erreur lors du vote", "error");
  }
};

// ===================================
// GESTION DES PROPOSITIONS
// ===================================

/**
 * Soumettre une nouvelle proposition de jeu
 */
const submitProposal = async () => {
  if (!isProposalValid.value) return;

  try {
    submitting.value = true;
    await gameProposalService.createProposal({
      name: newProposal.value.name,
      description: newProposal.value.description,
      imageUrl: newProposal.value.imageUrl,
      rawgId: newProposal.value.rawgId,
    });

    showToast("Proposition soumise avec succès!", "success");
    showProposalForm.value = false;
    resetProposalForm();
    await loadProposals();
  } catch (error: any) {
    if (error.response?.status === 409) {
      showToast("Ce jeu a déjà été proposé", "error");
    } else {
      showToast("Erreur lors de la soumission de la proposition", "error");
    }
  } finally {
    submitting.value = false;
  }
};

/**
 * Réinitialiser le formulaire de proposition
 */
const resetProposalForm = () => {
  newProposal.value = {
    name: "",
    description: "",
    imageUrl: "",
    rawgId: undefined,
  };
};

// ===================================
// RECHERCHE DE JEUX (RAWG API)
// ===================================

/**
 * Recherche avec délai d'attente (debounce)
 */
const debounceSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);

  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    searching.value = false;
    return;
  }

  searching.value = true;
  searchTimeout = setTimeout(async () => {
    try {
      const results = await rawgService.searchGames(searchQuery.value);
      searchResults.value = results || [];
    } catch (error) {
      showToast("Erreur lors de la recherche de jeux", "error");
      searchResults.value = [];
    } finally {
      searching.value = false;
    }
  }, 500);
};

/**
 * Sélectionne un jeu dans les résultats de recherche
 */
const selectGame = (game: RawgGame) => {
  newProposal.value = {
    name: game.name,
    description: game.description || "",
    imageUrl: game.background_image || "",
    rawgId: game.id,
  };
  searchResults.value = [];
  searchQuery.value = "";
};

// ===================================
// MODÉRATION (ADMIN)
// ===================================

/**
 * Approuve une proposition (admin)
 */
const approveProposal = async (proposalId: string) => {
  try {
    await gameProposalService.moderateProposal(proposalId, "approved");
    showToast("Proposition approuvée", "success");
    await loadProposals();
  } catch (error) {
    showToast("Erreur lors de l'approbation", "error");
  }
};

/**
 * Ouvre le modal de rejet
 */
const openRejectDialog = (proposalId: string) => {
  proposalToReject.value = proposalId;
  rejectionReason.value = "";
  showRejectDialog.value = true;
};

/**
 * Rejette une proposition (admin)
 */
const rejectProposal = async () => {
  try {
    await gameProposalService.moderateProposal(
      proposalToReject.value,
      "rejected",
      rejectionReason.value
    );

    showRejectDialog.value = false;
    showToast("Proposition rejetée", "success");
    await loadProposals();
  } catch (error) {
    showToast("Erreur lors du rejet", "error");
  }
};

/**
 * Ouvre le modal de confirmation de suppression
 */
const confirmDelete = (proposalId: string) => {
  proposalToDelete.value = proposalId;
  deleteDialogVisible.value = true;
};

/**
 * Supprime une proposition (admin)
 */
const deleteProposal = async () => {
  try {
    await gameProposalService.deleteProposal(proposalToDelete.value);
    deleteDialogVisible.value = false;
    showToast("Proposition supprimée avec succès", "success");
    await loadProposals();
  } catch (error) {
    showToast("Erreur lors de la suppression", "error");
  }
};

// ===================================
// UTILITAIRES
// ===================================

/**
 * Affiche une notification temporaire
 */
const showToast = (message: string, type: "success" | "error" = "success") => {
  toastInfo.value = {
    visible: true,
    message,
    type,
  };

  setTimeout(() => {
    toastInfo.value.visible = false;
  }, 3000);
};

/**
 * Formatage de la date de sortie d'un jeu
 */
const formatGameReleaseDate = (dateString: string) => {
  if (!dateString) return "Date inconnue";

  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ===================================
// CYCLE DE VIE
// ===================================

// Observer les changements de filtre
watch(activeFilter, () => {
  loadProposals();
});

// Charger les données au montage
onMounted(() => {
  loadProposals();
});
</script>

<style scoped>
.container {
  min-height: calc(
    100vh - 200px
  ); /* Ajuster selon la hauteur de votre navbar + footer */
  position: relative;
  z-index: 20;
  overflow: visible;
}
</style>
