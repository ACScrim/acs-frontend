<template>
  <div class="container mx-auto p-8 sm:p-8 pt-20 sm:pt-24">
    <div class="max-w-5xl mx-auto">
      <!-- En-tête -->
      <div class="mb-8 text-center relative">
        <!-- Lignes déco horizontales -->
        <div
          class="hidden sm:block absolute top-1/2 left-0 w-1/6 h-0.5 bg-gradient-to-r from-transparent to-pink-500"
        ></div>
        <div
          class="hidden sm:block absolute top-1/2 right-0 w-1/6 h-0.5 bg-gradient-to-l from-transparent to-pink-500"
        ></div>

        <!-- Titre principal avec effet néon -->
        <h1
          class="text-4xl text-white mb-8 neon-text font-audiowide text-center"
        >
          Propositions de jeux
        </h1>
        <p
          class="text-gray-300 max-w-2xl mx-auto font-orbitron text-sm bg-black/80 backdrop-blur-sm rounded-xl border border-pink-500/70 shadow-lg shadow-pink-500/30 p-4 transition-all duration-300 hover:shadow-pink-500/50 hover:border-pink-400 transform hover:-translate-y-1"
        >
          Seuls les jeux approuvés par les administrateurs seront votables.<br />
          Les propositions rejetées seront supprimées après un certain délai.
        </p>
      </div>
      <!-- Grille de fond -->
      <div class="cyber-grid"></div>

      <!-- Filtres et bouton d'ajout -->
      <div class="cyberpunk-panel mb-6 relative overflow-hidden">
        <div class="flex flex-col space-y-4 z-10 relative">
          <!-- Filtres + Recherche sur une ligne (desktop) ou empilés (mobile) -->
          <div class="flex flex-wrap justify-between items-center gap-4">
            <div class="space-x-1 sm:space-x-2 flex flex-wrap gap-2">
              <button
                v-for="filter in filters"
                :key="filter.value"
                @click="
                  activeFilter = filter.value;
                  currentPage = 1;
                "
                :class="[
                  'cyber-button',
                  activeFilter === filter.value ? 'active' : '',
                ]"
              >
                {{ filter.label }}
              </button>
            </div>

            <!-- Champ de recherche -->
            <div
              class="relative w-full sm:w-auto flex-grow sm:flex-grow-0 sm:max-w-xs"
            >
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Rechercher un jeu..."
                class="w-full bg-gray-900 border border-cyan-500/50 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-purple-500 focus:shadow-glow font-orbitron text-xs"
                @input="handleSearch"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  v-if="!searchTerm"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
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
                <button
                  v-else
                  @click="clearSearch"
                  class="text-gray-400 hover:text-cyan-400 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="w-full sm:w-auto">
              <button
                @click="showProposalForm = true"
                class="cyber-button-add w-full sm:w-auto"
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
              </button>
            </div>
          </div>
        </div>

        <!-- Effet d'angle -->
        <div class="cyber-angle top-right"></div>
        <div class="cyber-angle bottom-left"></div>
      </div>

      <!-- État de chargement -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="cyberpunk-loader"></div>
      </div>

      <!-- Message si aucune proposition -->
      <div
        v-else-if="proposals.length === 0"
        class="text-center py-12 bg-black/75 backdrop-blur-sm rounded-xl border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707m-9.9 9.9l-.707.707m12.728 0l-.707-.707"
          />
        </svg>
        <p class="text-xl text-pink-400 font-orbitron">
          Aucune proposition pour le moment
        </p>
        <p class="text-cyan-400 mt-2 font-orbitron">
          Soyez le premier à proposer un jeu!
        </p>
      </div>

      <!-- Liste des propositions -->
      <div v-else class="space-y-4">
        <game-proposal-card
          v-for="proposal in paginatedProposals"
          :key="proposal._id"
          :proposal="proposal"
          :is-admin="isAdmin"
          :is-authenticated="isAuthenticated"
          @vote="handleVote"
          @approve="approveProposal"
          @reject="openRejectDialog"
          @delete="confirmDelete"
        />

        <!-- Pagination -->
        <div
          v-if="filteredProposals.length > itemsPerPage"
          class="mt-8 flex justify-center"
        >
          <div class="cyberpunk-pagination">
            <button
              @click="currentPage > 1 ? currentPage-- : null"
              :disabled="currentPage === 1"
              class="pagination-button"
              :class="{ disabled: currentPage === 1 }"
              aria-label="Page précédente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div class="pagination-info">
              <span class="text-cyan-500 font-orbitron">{{ currentPage }}</span>
              <span class="text-gray-400">/</span>
              <span class="text-gray-400">{{ totalPages }}</span>
            </div>

            <button
              @click="currentPage < totalPages ? currentPage++ : null"
              :disabled="currentPage === totalPages"
              class="pagination-button"
              :class="{ disabled: currentPage === totalPages }"
              aria-label="Page suivante"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de proposition de jeu -->
    <div
      v-if="showProposalForm"
      class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-black/90 border border-purple-500 rounded-xl max-w-2xl w-full mx-auto p-6 shadow-2xl shadow-purple-500/30"
      >
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-white font-audiowide neon-text">
            <span class="cyber-bracket">⌜⌝</span>
            Proposer un nouveau jeu
            <span class="cyber-bracket">⌞⌟</span>
          </h2>
          <button
            @click="showProposalForm = false"
            class="text-gray-400 hover:text-pink-500 transition-colors"
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

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-cyan-400 mb-1 font-orbitron"
          >
            Rechercher un jeu
          </label>
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="debounceSearch"
              type="text"
              placeholder="Entrez le nom d'un jeu..."
              class="w-full bg-gray-900 border border-pink-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 focus:shadow-glow font-orbitron text-sm"
            />

            <div
              v-if="searching"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <div
                class="h-4 w-4 border-t-2 border-pink-500 rounded-full animate-spin"
              ></div>
            </div>
          </div>

          <!-- Résultats de recherche -->
          <div
            v-if="searchResults.length > 0"
            class="mt-2 border border-purple-500/30 rounded-lg overflow-hidden max-h-60 overflow-y-auto bg-black/80"
          >
            <div
              v-for="game in searchResults"
              :key="game.id"
              @click="selectGame(game)"
              class="p-3 flex items-center hover:bg-purple-900/20 cursor-pointer border-b border-pink-700/30 transition-all"
            >
              <div class="relative overflow-hidden rounded">
                <img
                  :src="game.background_image || '/img/game-placeholder.jpg'"
                  :alt="game.name"
                  class="w-12 h-12 object-cover rounded border border-cyan-500/50"
                  @error="(e) => ((e.target as HTMLImageElement).src = '/img/game-placeholder.jpg')"
                />
                <!-- Scanline overlay -->
                <div class="absolute inset-0 bg-scanline opacity-20"></div>
              </div>
              <div class="ml-3">
                <p class="text-white font-medium font-orbitron">
                  {{ game.name }}
                </p>
                <p class="text-cyan-400 text-xs">
                  <span v-if="game.released">{{
                    formatGameReleaseDate(game.released)
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-cyan-400 mb-1 font-orbitron"
            >Nom du jeu</label
          >
          <input
            v-model="newProposal.name"
            type="text"
            class="w-full bg-gray-900 border border-pink-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 focus:shadow-glow"
          />
        </div>

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-cyan-400 mb-1 font-orbitron"
            >Description (optionnelle)</label
          >
          <textarea
            v-model="newProposal.description"
            rows="3"
            class="w-full bg-gray-900 border border-pink-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 focus:shadow-glow"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            @click="showProposalForm = false"
            class="px-4 py-2 mr-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg font-orbitron text-sm transition-colors"
          >
            Annuler
          </button>
          <button
            @click="submitProposal"
            :disabled="!isProposalValid || submitting"
            :class="[
              'px-4 py-2 rounded-lg font-medium flex items-center text-sm font-orbitron transition-all',
              isProposalValid && !submitting
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-glow text-white'
                : 'bg-purple-600/30 text-white/70 cursor-not-allowed',
            ]"
          >
            <span
              v-if="submitting"
              class="h-4 w-4 border-t-2 border-white rounded-full animate-spin mr-2"
            ></span>
            <span>{{
              submitting ? "Envoi en cours..." : "Proposer ce jeu"
            }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de rejet -->
    <div
      v-if="showRejectDialog"
      class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-black/90 border border-red-500 rounded-xl max-w-md w-full mx-auto p-6 shadow-2xl shadow-red-500/30"
      >
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-bold text-white font-audiowide">
            <span class="cyber-bracket text-red-400 opacity-60">⌜⌝</span>
            Motif du rejet
            <span class="cyber-bracket text-red-400 opacity-60">⌞⌟</span>
          </h2>
          <button
            @click="showRejectDialog = false"
            class="text-gray-400 hover:text-pink-500 transition-colors"
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

        <div class="mb-4">
          <label
            class="block text-sm font-medium text-red-400 mb-1 font-orbitron"
            style="text-shadow: 0 0 5px rgba(239, 68, 68, 0.5)"
          >
            Raison du rejet (visible par tous les utilisateurs)
          </label>
          <textarea
            v-model="rejectionReason"
            rows="3"
            placeholder="Expliquez pourquoi cette proposition ne convient pas..."
            class="w-full bg-gray-900 border border-red-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 focus:shadow-glow-red"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            @click="showRejectDialog = false"
            class="px-4 py-2 mr-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg font-orbitron text-sm"
          >
            Annuler
          </button>
          <button
            @click="rejectProposal"
            class="px-4 py-2 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-lg font-medium font-orbitron text-sm hover:shadow-glow-red transform hover:-translate-y-1 transition-all duration-300"
          >
            Rejeter la proposition
          </button>
        </div>
      </div>
    </div>

    <!-- Toast via le composant partagé -->
    <Toast
      v-if="toastInfo.visible"
      :type="toastInfo.type"
      :message="toastInfo.message"
    />

    <!-- Dialog de confirmation de suppression -->
    <confirmation-dialog
      v-if="deleteDialogVisible"
      title="Supprimer cette proposition"
      message="Êtes-vous sûr de vouloir supprimer définitivement cette proposition de jeu ? Cette action est irréversible."
      @confirm="deleteProposal"
      @cancel="deleteDialogVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import gameProposalService from "../services/gameProposalService";
import rawgService from "../services/rawgService";
import type { GameProposal, RawgGame } from "../types";
import ConfirmationDialog from "../shared/ConfirmationDialog.vue";
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
  { label: "Tous", value: "all" },
];

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
  if (!searchTerm.value.trim()) {
    return proposals.value;
  }

  const searchTermLower = searchTerm.value.toLowerCase();

  return proposals.value.filter(
    (proposal) =>
      proposal.name.toLowerCase().includes(searchTermLower) ||
      (proposal.description &&
        proposal.description.toLowerCase().includes(searchTermLower))
  );
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

// ===================================
// CHARGEMENT DES DONNÉES
// ===================================

/**
 * Charge les propositions selon le filtre actif
 */
const loadProposals = async () => {
  try {
    loading.value = true;
    const status =
      activeFilter.value === "all" ? undefined : activeFilter.value;
    const result = await gameProposalService.getProposals(status);
    proposals.value = result;
  } catch (error) {
    showToast("Erreur lors du chargement des propositions", "error");
    console.error("Erreur lors du chargement des propositions:", error);
  } finally {
    loading.value = false;
  }
};

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
/* Titre Cyberpunk Synthwave avec glitch */
.cyber-glitch-title {
  font-family: "Audiowide", cursive;
  position: relative;
  color: #ffffff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff;
  letter-spacing: 2px;
  animation: cyber-glow 3s infinite alternate;
  margin-bottom: 1rem;
}

.cyber-glitch-title::before,
.cyber-glitch-title::after {
  content: "Propositions de jeux";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0.8;
}

.cyber-glitch-title::before {
  color: #0ff;
  z-index: -1;
  animation: cyber-glitch 3s infinite alternate-reverse;
}

.cyber-glitch-title::after {
  color: #f0f;
  z-index: -2;
  animation: cyber-glitch 2s infinite alternate;
}

@keyframes cyber-glitch {
  0%,
  5%,
  100% {
    transform: none;
    opacity: 0.8;
  }
  1% {
    transform: translate(4px, -4px);
    opacity: 0.6;
  }
  2% {
    transform: translate(-3px, 2px);
    opacity: 0.7;
  }
  3% {
    transform: none;
    opacity: 0.8;
  }
  4% {
    transform: translate(2px, 3px);
    opacity: 0.6;
  }
}

@keyframes cyber-glow {
  0% {
    text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
  }
  100% {
    text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff,
      0 0 50px #ff00ff;
  }
}

/* Effet de grille cyberpunk */
.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      to right,
      rgba(139, 92, 246, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
  pointer-events: none;
  transform: perspective(500px) rotateX(30deg);
  opacity: 0.5;
}

/* Panneau cyberpunk avec angle coupé */
.cyberpunk-panel {
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  border: 1px solid rgb(236, 72, 153);
  box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.3);
  padding: 1.25rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  position: relative;
}

.cyberpunk-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    120deg,
    rgba(139, 92, 246, 0.05) 50%,
    rgba(236, 72, 153, 0.05) 100%
  );
  z-index: -1;
  border-radius: inherit;
}

/* Angles cyberpunk */
.cyber-angle {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid rgb(236, 72, 153);
}

.cyber-angle.top-right {
  top: 0;
  right: 0;
  border-bottom: 0;
  border-left: 0;
}

.cyber-angle.bottom-left {
  bottom: 0;
  left: 0;
  border-top: 0;
  border-right: 0;
}

/* Boutons cyberpunk */
.cyber-button {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: "Orbitron", sans-serif;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  background-color: rgba(31, 41, 55, 0.7);
  color: rgb(209, 213, 219);
  border: 1px solid rgba(139, 92, 246, 0.4);
}

.cyber-button:hover {
  background-color: rgb(55, 65, 81);
  color: white;
  border-color: rgb(139, 92, 246);
}

.cyber-button.active {
  background-image: linear-gradient(
    to right,
    rgb(124, 58, 237),
    rgb(236, 72, 153)
  );
  color: white;
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
}

.cyber-button-add {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: "Orbitron", sans-serif;
  background-image: linear-gradient(
    to right,
    rgb(124, 58, 237),
    rgb(236, 72, 153)
  );
  color: white;
  border: 1px solid rgb(244, 114, 182);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transform: translateY(0);
}

.cyber-button-add:hover {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
  transform: translateY(-2px);
}

/* Loader cyberpunk synthwave */
.cyberpunk-loader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(225deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%);
  animation: spin 1.5s linear infinite;
  position: relative;
}

.cyberpunk-loader::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background: #000;
  border-radius: 50%;
}

.cyberpunk-loader::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(225deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.7;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Effet de scanlines */
.bg-scanline {
  background: repeating-linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 0.5%,
    transparent 1%
  );
  background-size: 100% 4px;
}

/* Effet de brillance pour les boutons et textes */
.shadow-glow {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

.shadow-glow-red {
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.focus\:shadow-glow:focus {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

.focus\:shadow-glow-red:focus {
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

/* Déco du titre dans les modales */
.cyber-bracket {
  color: rgba(139, 92, 246, 0.6);
  font-size: 1.1em;
  vertical-align: middle;
}

.cyberpunk-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgb(139, 92, 246, 0.5);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6px;
  background-color: rgba(31, 41, 55, 0.7);
  color: rgb(209, 213, 219);
  border: 1px solid rgba(139, 92, 246, 0.4);
  transition: all 0.3s ease;
}

.pagination-button:not(.disabled):hover {
  background-color: rgba(55, 65, 81, 0.8);
  color: white;
  border-color: rgb(124, 58, 237);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  transform: translateY(-2px);
}

.pagination-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: rgb(75, 85, 99);
}

.pagination-info {
  display: flex;
  align-items: center;
  font-family: "Orbitron", sans-serif;
  gap: 0.5rem;
  min-width: 4rem;
  justify-content: center;
  font-size: 1.1rem;
}
</style>
