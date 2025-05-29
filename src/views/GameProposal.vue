<template>
  <div class="container mx-auto p-8 sm:p-8 pt-20 sm:pt-24 pb-16 relative">
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
                  activeFilter === filter.value
                    ? filter.value === 'approved'
                      ? 'cyberpunk-btn-green'
                      : filter.value === 'pending'
                      ? 'cyberpunk-btn-amber'
                      : 'cyberpunk-btn-purple'
                    : 'cyberpunk-btn-gray',
                ]"
                class="px-3 py-1.5 rounded-md text-xs sm:text-sm font-orbitron transition-all duration-300"
              >
                {{ filter.label }}
              </button>
            </div>

            <!-- Menu de tri ajouté -->
            <div class="relative w-auto">
              <select
                v-model="sortOption"
                class="w-full bg-gray-900 border border-cyan-500/50 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-purple-500 focus:shadow-glow font-orbitron text-xs"
              >
                <option value="default">Tri par défaut</option>
                <option value="votesDesc">Votes (+)</option>
                <option value="votesAsc">Votes (-)</option>
              </select>
              <div
                v-show="sortOption === 'votesDesc' || sortOption === 'votesAsc'"
                class="mt-2 flex items-center"
              >
                <label
                  class="cyber-checkbox-container relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="positiveVotesOnly"
                    v-model="onlyPositiveVotes"
                    class="absolute opacity-0 w-0 h-0"
                  />
                  <span
                    class="cyber-checkbox flex items-center justify-center w-5 h-5 bg-gray-900 border border-cyan-500/70 mr-2 transition-all duration-200 overflow-hidden"
                  >
                    <span
                      class="check-inner absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 transition-opacity duration-200"
                      :class="{ 'opacity-100': onlyPositiveVotes }"
                    ></span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 text-black transform scale-0 transition-transform duration-200"
                      :class="{ 'scale-100': onlyPositiveVotes }"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span
                    class="text-xs text-cyan-300 font-orbitron hover:text-pink-300 transition-colors duration-200"
                  >
                    Compter uniquement les votes positifs
                  </span>
                </label>
              </div>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              ></div>
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
                class="cyberpunk-btn-pink px-4 py-2 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 text-sm w-full sm:w-auto"
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
        <CyberpunkLoader />
      </div>

      <!-- Message si aucune proposition -->
      <CyberTerminal
        v-else-if="proposals.length === 0"
        :command="`list_proposals --filter=${activeFilter} ${
          searchTerm ? '--search=\'' + searchTerm + '\'' : ''
        }`"
        errorCode="404_NO_PROPOSALS"
        :message="emptyStateMessage"
        class="my-8"
      />

      <CyberTerminal
        v-else-if="filteredProposals.length === 0"
        :command="`search_proposals --query='${searchTerm}' --filter=${activeFilter}`"
        errorCode="404_NO_RESULTS"
        :message="emptyStateMessage"
        class="my-8"
      />

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
        <CyberpunkPagination
          v-if="filteredProposals.length > itemsPerPage"
          class="mt-8"
          :current-page="currentPage"
          :total-pages="totalPages"
          prev-label="Précédent"
          next-label="Suivant"
          color="pink"
          :show-dots="totalPages > 5"
          @prev-page="prevPage"
          @next-page="nextPage"
          @page-select="goToPage"
        />
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
            class="cyberpunk-btn-gray px-4 py-2 mr-2 rounded-lg font-orbitron text-sm"
          >
            Annuler
          </button>
          <button
            @click="submitProposal"
            :disabled="!isProposalValid || submitting"
            :class="[
              'px-4 py-2 rounded-lg flex items-center justify-center font-orbitron text-sm',
              isProposalValid && !submitting
                ? 'cyberpunk-btn-purple'
                : 'opacity-50 bg-gray-700 text-gray-300 cursor-not-allowed',
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
            class="cyberpunk-btn-gray px-4 py-2 mr-2 rounded-lg font-orbitron text-sm"
          >
            Annuler
          </button>
          <button
            @click="rejectProposal"
            class="cyberpunk-btn-pink px-4 py-2 rounded-lg font-orbitron text-sm"
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
import CyberpunkPagination from "../shared/CyberpunkPagination.vue";
import CyberTerminal from "../shared/CyberTerminal.vue";
import CyberpunkLoader from "../shared/CyberpunkLoader.vue";

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
  position: fixed;
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

.cyber-checkbox-container:hover .cyber-checkbox {
  box-shadow: 0 0 8px rgba(45, 212, 191, 0.5);
  border-color: rgba(45, 212, 191, 0.9);
}

.cyber-checkbox {
  position: relative;
  transform: skewX(-10deg);
}

.cyber-checkbox .check-inner {
  clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);
}

.cyber-checkbox::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #0ff, #f0f);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-checkbox-container:hover .cyber-checkbox::before {
  opacity: 0.5;
}
</style>
