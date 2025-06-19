<template>
  <SpaceCard
    variant="primary"
    :interactive="true"
    :stars="true"
    :decorated="true"
    :className="
      [
        'mb-4',
        proposal.status === 'approved'
          ? 'proposal-approved'
          : proposal.status === 'pending'
          ? 'proposal-pending'
          : 'proposal-rejected',
      ].join(' ')
    "
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
                  ? 'border-space-gold'
                  : 'border-space-silver',
              ]"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-5 h-5 border-b border-l transition-all duration-300"
              :class="[
                proposal.status === 'approved'
                  ? 'border-space-gold'
                  : 'border-space-silver',
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
          <SpaceBadge v-else variant="warning" size="sm">
            En attente
          </SpaceBadge>
        </div>

        <!-- Description -->
        <p class="text-space-text-muted text-sm mb-4 flex-grow">
          {{ proposal.description || "Aucune description fournie." }}
        </p>
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
              :disabled="!isAuthenticated || proposal.status === 'pending'"
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
              :disabled="!isAuthenticated || proposal.status === 'pending'"
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
              @click="$emit('show-vote-info', proposal)"
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
</template>

<script setup lang="ts">
// ================================================
// IMPORTS ET DÉFINITIONS
// ================================================
import { computed, onBeforeUnmount } from "vue";

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
 * @event delete - Émis lorsqu'un admin supprime une proposition
 */
const emit = defineEmits<{
  (e: "vote", proposalId: string, value: number): void;
  (e: "approve", proposalId: string): void;
  (e: "delete", proposalId: string): void;
  (e: "show-vote-info", proposal: GameProposal): void; // Nouvel événement
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
  if (!props.isAuthenticated || props.proposal.status === "pending") {
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
  if (!props.isAuthenticated || props.proposal.status === "pending") {
    return "ghost";
  }

  // Si le bouton correspond au vote actuel de l'utilisateur
  if (props.proposal.userVote === voteType) {
    // Style différent selon le type de vote
    return voteType === 1 ? "gold" : "error";
  }

  // Style par défaut (pas de vote ou vote opposé)
  return "outline";
};

/**
 * Détermine les classes CSS pour l'affichage du nombre de votes
 * @returns {string} Les classes CSS à appliquer
 */
const getVoteCountClass = () => {
  if (displayVoteCount.value > 0) return "text-space-gold";
  if (displayVoteCount.value < 0) return "text-space-error";
  return "text-space-text";
};

// ================================================
// MODALE DES VOTES
// ================================================

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
