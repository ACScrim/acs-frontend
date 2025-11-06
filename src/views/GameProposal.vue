<template>
  <SpaceContainer>
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
      <SpaceCard variant="dark" className="mb-6 text-center">
        <p class="text-space-text font-body">
          Seuls les jeux approuvés par les administrateurs seront votables.
        </p>
        <br />
        <p class="font-body text-red-400 font-bold">
          En proposant des jeux sur serveurs privés, vous vous engagez à gérer les serveurs si votre jeu est choisi
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
              className="w-full hover:scale-105 transition-transform duration-300 shine-effect"
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

      <!-- Liste des propositions avec mise en page améliorée -->
      <div v-else class="proposals-grid space-y-6">
        <!-- Card pour chaque proposition avec effet de survol -->
        <div
          v-for="proposal in paginatedProposals"
          :key="proposal._id"
          class="proposal-card-wrapper transform transition-all duration-300 hover:scale-[1.01]"
          :class="[
            proposal.status === 'approved'
              ? 'proposal-approved'
              : 'proposal-pending',
          ]"
        >
          <game-proposal-card
            :proposal="proposal"
            :is-admin="isAdmin"
            :is-authenticated="isAuthenticated"
            :show-positive-only="onlyPositiveVotes"
            @vote="handleVote"
            @approve="approveProposal"
            @delete="confirmDelete"
            @show-vote-info="showVoteInfoModal"
            class="proposal-card"
          />
        </div>

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
            class="mt-2 border border-space-primary/30 rounded-lg overflow-hidden max-h-60 overflow-y-auto bg-space-bg/80 custom-scrollbar"
          >
            <div
              v-for="game in searchResults"
              :key="game.id"
              @click="selectGame(game)"
              class="game-search-result p-3 flex items-center hover:bg-space-primary/10 cursor-pointer border-b border-space-primary/20 transition-all"
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
            class="w-full rounded-lg border border-space-primary/30 bg-space-bg-light text-space-text px-4 py-2 focus:ring-2 focus:ring-space-primary/30 focus:outline-none transition-all duration-300 custom-scrollbar"
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
            className="min-w-[150px]"
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
  </SpaceContainer>
  <SpaceModal v-model="showVoteInfo" title="DÉTAILS DES VOTES">
    <div class="space-y-6" v-if="selectedProposal">
      <!-- Détails de la proposition -->
      <div class="mb-4 text-center">
        <h4 class="text-color-text text-lg font-heading mb-2">
          {{ selectedProposal.name }}
        </h4>
        <div
          class="flex justify-center items-center text-sm text-space-text-muted space-x-4"
        >
          <div>
            <span class="text-color-secondary">Total:</span>
            <span :class="getVoteCountClass(selectedProposal)">
              {{ getDisplayVoteCount(selectedProposal) }}
            </span>
          </div>
          <div>
            <span class="text-space-gold">+{{ positiveVotes.length }}</span>
            <span class="mx-1 text-space-text-muted">/</span>
            <span class="text-space-error">-{{ negativeVotes.length }}</span>
          </div>
        </div>
      </div>
      <!-- Onglets Votes Pour/Contre -->
      <div class="flex space-x-2">
        <SpaceButton
          @click="activeTab = 'positive'"
          :variant="activeTab === 'positive' ? 'gold' : 'outline'"
          size="sm"
          className="flex-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Pour ({{ positiveVotes.length }})
        </SpaceButton>
        <SpaceButton
          @click="activeTab = 'negative'"
          :variant="activeTab === 'negative' ? 'error' : 'outline'"
          size="sm"
          className="flex-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clip-rule="evenodd"
            />
          </svg>
          Contre ({{ negativeVotes.length }})
        </SpaceButton>
      </div>
      <!-- Liste des votants -->
      <SpaceCard
        variant="dark"
        className="h-60 overflow-y-auto p-0 border-none"
      >
        <!-- Onglets de votes -->
        <div
          v-if="currentVotesList.length === 0"
          class="flex flex-col items-center justify-center h-full p-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-space-text-muted mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-space-text-muted font-mono">
            Aucun vote {{ activeTab === "positive" ? "positif" : "négatif" }}
          </p>
        </div>

        <div v-else class="divide-y divide-space-bg-light/10">
          <div
            v-for="(vote, index) in currentVotesList"
            :key="index"
            class="p-3 hover:bg-space-bg-light/10 transition-all flex items-center"
            :class="{ 'space-voter-animate': true }"
          >
            <!-- Avatar (initiales) -->
            <div
              class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3"
              :class="[
                activeTab === 'positive'
                  ? 'bg-space-gold/20 border border-space-gold/50 text-space-gold'
                  : 'bg-space-error/10 border border-space-error/30 text-space-error',
              ]"
            >
              {{ getInitials(getVoterName(vote)) }}
            </div>

            <!-- Infos du votant -->
            <div>
              <p class="font-heading text-sm">
                {{ getVoterName(vote) }}
              </p>
              <p class="text-xs text-color-text-muted">
                {{ formatDate(vote.createdAt || selectedProposal.createdAt) }}
              </p>
            </div>
          </div>
        </div>
      </SpaceCard>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <SpaceButton @click="showVoteInfo = false">Fermer</SpaceButton>
      </div>
    </template>
  </SpaceModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import gameProposalService from "../services/gameProposalService";
import rawgService from "../services/rawgService";
import type { GameProposal, RawgGame } from "../types";
import GameProposalCard from "../components/GameProposalCard.vue";
import Toast from "../shared/Toast.vue";
import SpaceContainer from "@/components/ui/layout/Container.vue";

// ===================================
// ÉTAT ET RÉFÉRENCES
// ===================================

const showVoteInfo = ref(false);
const activeTab = ref<"positive" | "negative">("positive");
const selectedProposal = ref<GameProposal | null>(null);

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

// Ouvrir la modale d'information des votes
const showVoteInfoModal = (proposal: GameProposal) => {
  selectedProposal.value = proposal;
  activeTab.value = "positive"; // Reset à l'onglet positif par défaut
  showVoteInfo.value = true;
};

// Listes des votes
const positiveVotes = computed(() => {
  if (!selectedProposal.value?.votes) return [];
  return selectedProposal.value.votes.filter((vote) => vote.value === 1);
});

const negativeVotes = computed(() => {
  if (!selectedProposal.value?.votes) return [];
  return selectedProposal.value.votes.filter((vote) => vote.value === -1);
});

const currentVotesList = computed(() => {
  return activeTab.value === "positive"
    ? positiveVotes.value
    : negativeVotes.value;
});

// Récupère le nombre de votes à afficher selon le mode sélectionné
const getDisplayVoteCount = (proposal: GameProposal) => {
  if (onlyPositiveVotes.value) {
    // Si on veut voir uniquement les votes positifs, compter seulement ceux-ci
    return proposal.votes?.filter((v) => v.value > 0).length || 0;
  } else {
    // Sinon afficher le total normal (votes pour - votes contre)
    return proposal.totalVotes;
  }
};

// Détermine les classes CSS pour l'affichage du nombre de votes
const getVoteCountClass = (proposal: GameProposal) => {
  const count = getDisplayVoteCount(proposal);
  if (count > 0) return "text-color-gold";
  if (count < 0) return "text-color-error";
  return "text-color-text";
};

// Récupère le nom d'un votant depuis un objet vote
const getVoterName = (vote: any): string => {
  if (!vote || !vote.player) return "Utilisateur inconnu";

  if (typeof vote.player === "object" && vote.player && vote.player.username) {
    return vote.player.username;
  }

  if (typeof vote.player === "string") {
    return `Utilisateur #${vote.player.slice(-6)}`;
  }

  return "Utilisateur inconnu";
};

// Calcule les initiales d'un nom d'utilisateur
const getInitials = (name: string): string => {
  if (!name) return "?";

  // Si c'est un ID d'utilisateur
  if (name.includes("#")) {
    return name.slice(-2).toUpperCase();
  }

  // Sinon, extraire les initiales
  const parts = name.split(" ");
  if (parts.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

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

/**
 * Formate une date pour l'affichage
 */
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Date inconnue";

  try {
    const date = new Date(dateString);

    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return "Date invalide";
    }

    // Formater la date avec l'API Intl pour le support des locales
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Erreur de formatage de date:", error);
    return "Erreur de date";
  }
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
/* Stylisation générale */
.proposals-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Stylisation des cartes de proposition avec effets spatiaux */
.proposal-card-wrapper {
  position: relative;
  transition: all 0.3s ease;
  will-change: transform, box-shadow;
}

.proposal-card-wrapper:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--space-primary-rgb), 0.2);
  z-index: 2;
}

.proposal-card {
  height: 100%;
  backdrop-filter: blur(5px);
}

/* Animations améliorées */
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(var(--space-primary-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(var(--space-primary-rgb), 0.5),
      0 0 30px rgba(var(--space-primary-rgb), 0.2);
  }
  100% {
    box-shadow: 0 0 5px rgba(var(--space-primary-rgb), 0.3);
  }
}

.game-search-result {
  position: relative;
  overflow: hidden;
}

.game-search-result:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary),
    transparent
  );
  animation: scanline 1s ease-out;
}

@keyframes scanline {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Scrollbar personnalisée */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 30, 45, 0.2);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(109, 40, 217, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(109, 40, 217, 0.7);
}

/* Ajouter les styles pour l'animation des votants */
.space-voter-animate {
  position: relative;
  overflow: hidden;
}

.space-voter-animate::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: voter-slide 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes voter-slide {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

/* Styles spécifiques pour les propositions de différents statuts */
.proposal-approved {
  border-left: 3px solid var(--space-gold);
}

.proposal-pending {
  border-left: 3px solid var(--space-secondary);
}

/* Amélioration des transitions */
.proposal-card-wrapper,
.game-search-result,
.space-voter-animate {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Effet de surbrillance pour les boutons importants */
.shine-effect {
  position: relative;
  overflow: hidden;
}

.shine-effect::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: shine 4s infinite linear;
  pointer-events: none;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) rotate(30deg);
  }
}

/* Réactivité améliorée */
@media (max-width: 640px) {
  .proposals-grid {
    gap: 1rem;
  }
}
</style>
