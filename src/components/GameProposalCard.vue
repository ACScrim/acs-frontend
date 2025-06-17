<template>
  <SpaceCard
    variant="primary"
    :interactive="true"
    :stars="true"
    :decorated="true"
    className="mb-4"
  >
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Image du jeu -->
      <div class="sm:w-1/4 flex-shrink-0 relative overflow-hidden">
        <div class="relative group h-40 rounded-lg overflow-hidden">
          <img
            :src="proposal.imageUrl || '/img/game-placeholder.jpg'"
            :alt="proposal.name"
            class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            @error="(e) => ((e.target as HTMLImageElement).src = '/img/game-placeholder.jpg')"
          />
          <div
            class="absolute inset-0 bg-space-bg/50 group-hover:bg-space-bg/30 transition-all duration-300"
          ></div>

          <!-- Élément décoratif -->
          <div class="absolute inset-0 pointer-events-none">
            <div
              class="absolute top-0 right-0 w-5 h-5 border-t border-r transition-all duration-300"
              :class="[
                proposal.status === 'approved'
                  ? 'border-space-success'
                  : proposal.status === 'rejected'
                  ? 'border-space-error'
                  : 'border-space-warning',
              ]"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-5 h-5 border-b border-l transition-all duration-300"
              :class="[
                proposal.status === 'approved'
                  ? 'border-space-success'
                  : proposal.status === 'rejected'
                  ? 'border-space-error'
                  : 'border-space-warning',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="sm:w-3/4 flex flex-col">
        <!-- En-tête avec titre et badge de statut -->
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-xl font-heading text-space-text font-medium">
            {{ proposal.name }}
          </h3>

          <!-- Badge statut -->
          <SpaceBadge
            v-if="proposal.status === 'approved'"
            variant="success"
            size="sm"
          >
            Approuvé
          </SpaceBadge>
          <SpaceBadge
            v-else-if="proposal.status === 'rejected'"
            variant="error"
            size="sm"
          >
            Rejeté
          </SpaceBadge>
          <SpaceBadge v-else variant="warning" size="sm">
            En attente
          </SpaceBadge>
        </div>

        <!-- Description -->
        <p class="text-space-text-muted text-sm mb-4 flex-grow">
          {{ proposal.description || "Aucune description fournie." }}
        </p>

        <!-- Raison du rejet si applicable -->
        <SpaceAlert
          v-if="proposal.status === 'rejected' && proposal.rejectionReason"
          variant="error"
          className="mb-4"
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
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          <div class="text-sm">
            <p class="font-heading font-medium mb-1">Raison du rejet :</p>
            <p>{{ proposal.rejectionReason }}</p>
          </div>
        </SpaceAlert>

        <!-- Footer avec informations proposant et système de vote -->
        <div
          class="flex flex-col sm:flex-row justify-between sm:items-end mt-2 space-y-3 sm:space-y-0"
        >
          <!-- Info proposant -->
          <div
            class="text-sm space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4"
          >
            <div class="flex items-center text-space-primary-light">
              <div
                class="w-2 h-2 rounded-full bg-space-primary animate-pulse mr-2"
              ></div>
              <span
                >Proposé par
                <span class="font-medium">{{
                  getUsernameFromProposal(proposal)
                }}</span></span
              >
            </div>
            <div class="flex items-center text-space-secondary-light sm:mt-0">
              <div class="w-2 h-2 rounded-full bg-space-secondary mr-2"></div>
              <span>{{ formatDate(proposal.createdAt) }}</span>
            </div>
          </div>

          <!-- Système de vote -->
          <div class="flex items-center space-x-4">
            <SpaceButton
              @click="handleVote(1)"
              size="sm"
              :variant="getVoteButtonVariant(1)"
              :disabled="
                !isAuthenticated ||
                proposal.status === 'pending' ||
                proposal.status === 'rejected'
              "
              aria-label="Vote positif"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </SpaceButton>

            <span
              class="text-lg font-mono font-bold"
              :class="getVoteCountClass()"
            >
              {{ displayVoteCount }}
            </span>

            <SpaceButton
              @click="handleVote(-1)"
              size="sm"
              :variant="getVoteButtonVariant(-1)"
              :disabled="
                !isAuthenticated ||
                proposal.status === 'pending' ||
                proposal.status === 'rejected'
              "
              aria-label="Vote négatif"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
            </SpaceButton>

            <!-- Bouton d'information sur les votes -->
            <SpaceButton
              v-if="proposal.votes && proposal.votes.length > 0"
              @click="toggleVoteInfo"
              variant="ghost"
              size="sm"
              aria-label="Voir qui a voté"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </SpaceButton>
          </div>
        </div>

        <!-- Actions admin -->
        <div
          v-if="isAdmin"
          class="mt-4 flex justify-end space-x-3 border-t border-space-bg-light/20 pt-3"
        >
          <!-- Actions sur les propositions en attente -->
          <template v-if="proposal.status === 'pending'">
            <SpaceButton
              @click="$emit('approve', proposal._id)"
              variant="success"
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Approuver
            </SpaceButton>
            <SpaceButton
              @click="$emit('reject', proposal._id)"
              variant="error"
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
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
              Rejeter
            </SpaceButton>
          </template>

          <!-- Bouton de suppression (pour toutes les propositions) -->
          <SpaceButton
            @click="$emit('delete', proposal._id)"
            variant="ghost"
            size="sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Supprimer
          </SpaceButton>
        </div>
      </div>
    </div>
  </SpaceCard>

  <!-- Modale d'information sur les votes -->
  <SpaceModal v-model="showVoteInfo" title="DÉTAILS DES VOTES">
    <div class="space-y-6">
      <!-- Détails de la proposition -->
      <div class="mb-4 text-center">
        <h4 class="text-space-text text-lg font-heading mb-2">
          {{ proposal.name }}
        </h4>
        <div
          class="flex justify-center items-center text-sm text-space-text-muted space-x-4"
        >
          <div>
            <span class="text-space-secondary">Total:</span>
            <span :class="getVoteCountClass()"> {{ displayVoteCount }}</span>
          </div>
          <div>
            <span class="text-space-success">+{{ positiveVotes.length }}</span>
            <span class="mx-1 text-space-text-muted">/</span>
            <span class="text-space-error">-{{ negativeVotes.length }}</span>
          </div>
        </div>
      </div>

      <!-- Onglets Votes Pour/Contre -->
      <div class="flex space-x-2">
        <SpaceButton
          @click="activeTab = 'positive'"
          :variant="activeTab === 'positive' ? 'success' : 'outline'"
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
                  ? 'bg-space-success/10 border border-space-success/30 text-space-success'
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
              <p class="text-xs text-space-text-muted">
                {{ formatDate(vote.createdAt || proposal.createdAt) }}
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
// ================================================
// IMPORTS ET DÉFINITIONS
// ================================================
import { ref, computed, onBeforeUnmount } from "vue";

import type { GameProposal } from "../types";

// ================================================
// PROPS ET ÉMISSIONS
// ================================================
/**
 * Props du composant
 * @prop {GameProposal} proposal - La proposition de jeu à afficher
 * @prop {boolean} isAdmin - Indique si l'utilisateur actuel est administrateur
 * @prop {boolean} isAuthenticated - Indique si l'utilisateur est connecté
 */
const props = defineProps<{
  proposal: GameProposal;
  isAdmin: boolean;
  isAuthenticated: boolean;
  showPositiveOnly: boolean; // Nouveau prop
}>();

/**
 * Événements émis par le composant
 * @event vote - Émis lorsque l'utilisateur vote pour une proposition
 * @event approve - Émis lorsqu'un admin approuve une proposition
 * @event reject - Émis lorsqu'un admin rejette une proposition
 * @event delete - Émis lorsqu'un admin supprime une proposition
 */
const emit = defineEmits<{
  (e: "vote", proposalId: string, value: number): void;
  (e: "approve", proposalId: string): void;
  (e: "reject", proposalId: string): void;
  (e: "delete", proposalId: string): void;
}>();

// ================================================
// FONCTIONS UTILITAIRES
// ================================================
/**
 * Récupère le nom d'utilisateur du proposant
 * @param {GameProposal} proposal - La proposition de jeu
 * @returns {string} Le nom d'utilisateur ou une identification par défaut
 */
const getUsernameFromProposal = (proposal: GameProposal) => {
  if (!proposal.proposedBy) return "Utilisateur inconnu";

  if (typeof proposal.proposedBy === "object" && proposal.proposedBy.username) {
    return proposal.proposedBy.username;
  }

  return typeof proposal.proposedBy === "string"
    ? `Utilisateur #${proposal.proposedBy.slice(-6)}`
    : "Utilisateur inconnu";
};

/**
 * Formate une date en format lisible français
 * @param {string} dateString - La date au format ISO
 * @returns {string} La date formatée en français
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ================================================
// GESTION DES VOTES
// ================================================
/**
 * Gère les différentes actions de vote selon le contexte
 * @param {number} voteType - Type de vote: 1 (positif) ou -1 (négatif)
 */
const handleVote = (voteType: number) => {
  // Vérification des conditions préalables
  if (
    !props.isAuthenticated ||
    props.proposal.status === "pending" ||
    props.proposal.status === "rejected"
  ) {
    return;
  }

  // Récupère la valeur actuelle du vote (0 si undefined)
  const currentVote = props.proposal.userVote ?? 0;

  // Cas 1: L'utilisateur clique sur le même bouton que son vote actuel
  if (currentVote === voteType) {
    emit("vote", props.proposal._id, 0);
  }
  // Cas 2: L'utilisateur a déjà voté mais dans l'autre sens
  else if (currentVote !== 0 && currentVote !== voteType) {
    emit("vote", props.proposal._id, 0);
  }
  // Cas 3: L'utilisateur n'a pas encore voté (currentVote === 0)
  else {
    emit("vote", props.proposal._id, voteType);
  }
};

// ================================================
// CLASSES DYNAMIQUES
// ================================================
/**
 * Détermine les variantes de bouton pour les votes
 */
const getVoteButtonVariant = (voteType: number) => {
  // Si l'utilisateur n'est pas connecté ou la proposition n'est pas approuvée
  if (
    !props.isAuthenticated ||
    props.proposal.status === "pending" ||
    props.proposal.status === "rejected"
  ) {
    return "ghost";
  }

  // Si le bouton correspond au vote actuel de l'utilisateur
  if (props.proposal.userVote === voteType) {
    // Style différent selon le type de vote
    return voteType === 1 ? "success" : "error";
  }

  // Style par défaut (pas de vote ou vote opposé)
  return "outline";
};

/**
 * Détermine les classes CSS pour l'affichage du nombre de votes
 * @returns {string} Les classes CSS à appliquer
 */
const getVoteCountClass = () => {
  if (displayVoteCount.value > 0) return "text-space-success";
  if (displayVoteCount.value < 0) return "text-space-error";
  return "text-space-text";
};

// ================================================
// MODALE DES VOTES
// ================================================
/**
 * État pour la modale d'information sur les votes
 */
const showVoteInfo = ref(false);
const activeTab = ref<"positive" | "negative">("positive");

/**
 * Ouvre/ferme la modale des informations de vote
 */
const toggleVoteInfo = () => {
  showVoteInfo.value = !showVoteInfo.value;
};

/**
 * Liste des votes positifs
 */
const positiveVotes = computed(() => {
  if (!props.proposal.votes) return [];
  return props.proposal.votes.filter((vote) => vote.value === 1);
});

/**
 * Liste des votes négatifs
 */
const negativeVotes = computed(() => {
  if (!props.proposal.votes) return [];
  return props.proposal.votes.filter((vote) => vote.value === -1);
});

/**
 * Liste des votes actuellement affichés selon l'onglet actif
 */
const currentVotesList = computed(() => {
  return activeTab.value === "positive"
    ? positiveVotes.value
    : negativeVotes.value;
});

/**
 * Calcule le nombre de votes à afficher selon le mode sélectionné
 */
const displayVoteCount = computed(() => {
  if (props.showPositiveOnly) {
    // Si on veut voir uniquement les votes positifs, compter seulement ceux-ci
    return props.proposal.votes?.filter((v) => v.value > 0).length || 0;
  } else {
    // Sinon afficher le total normal (votes pour - votes contre)
    return props.proposal.totalVotes;
  }
});

/**
 * Récupère le nom d'un votant depuis un objet vote
 * @param {any} vote - L'objet vote
 * @returns {string} - Le nom du votant formaté
 */
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

/**
 * Calcule les initiales d'un nom d'utilisateur
 * @param {string} name - Nom d'utilisateur
 * @returns {string} - Les initiales (max 2 caractères)
 */
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

// S'assurer que le défilement est réactivé quand le composant est détruit
onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* Animation pour les votants */
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
</style>
