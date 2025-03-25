<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\GameProposalCard.vue -->
<template>
  <div
    class="bg-black/80 backdrop-blur-sm rounded-xl border border-pink-500/70 shadow-lg shadow-pink-500/30 p-4 transition-all duration-300 hover:shadow-pink-500/50 hover:border-pink-400 transform hover:-translate-y-1"
  >
    <div class="flex flex-col sm:flex-row">
      <!-- Image du jeu -->
      <div class="sm:w-1/4 mb-4 sm:mb-0 flex-shrink-0 relative overflow-hidden">
        <div class="relative group">
          <img
            :src="proposal.imageUrl || '/img/game-placeholder.jpg'"
            :alt="proposal.name"
            class="w-full h-40 object-cover rounded-lg border border-cyan-500/50 transition-all duration-300 group-hover:border-cyan-400"
            @error="(e) => ((e.target as HTMLImageElement).src = '/img/game-placeholder.jpg')"
          />
          <!-- Scanline overlay -->
          <div
            class="absolute inset-0 bg-scanline opacity-10 pointer-events-none"
          ></div>
          <!-- Border glow effect -->
          <div
            class="absolute inset-0 rounded-lg border border-cyan-500/0 group-hover:border-cyan-500/70 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.5)]"
          ></div>
        </div>
      </div>

      <!-- Contenu -->
      <div class="sm:w-3/4 sm:pl-4 flex flex-col">
        <div class="flex justify-between items-start mb-2">
          <h3
            class="text-xl font-bold text-white font-orbitron text-shadow-cyan"
          >
            {{ proposal.name }}
          </h3>
          <div class="flex space-x-1">
            <!-- Badge statut -->
            <span
              v-if="proposal.status !== 'pending'"
              :class="[
                'px-3 py-1 text-xs rounded-full font-bold font-orbitron tracking-wider flex items-center',
                proposal.status === 'approved'
                  ? 'bg-green-900/20 text-green-300 border border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                  : 'bg-red-900/20 text-red-300 border border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
              ]"
            >
              <span v-if="proposal.status === 'approved'" class="mr-1">✓</span>
              <span v-else class="mr-1">✗</span>
              {{ proposal.status === "approved" ? "Approuvé" : "Rejeté" }}
            </span>
            <span
              v-else
              class="px-3 py-1 text-xs rounded-full font-bold font-orbitron tracking-wider flex items-center bg-yellow-900/20 text-yellow-300 border border-yellow-500 shadow-[0_0_8px_rgba(250,204,21,0.5)]"
            >
              <span class="mr-1">⏳</span>
              En attente
            </span>
          </div>
        </div>

        <p class="text-gray-300 text-sm mb-4 flex-grow">
          {{ proposal.description || "Aucune description fournie." }}
        </p>

        <!-- Raison du rejet si applicable -->
        <div
          v-if="proposal.status === 'rejected' && proposal.rejectionReason"
          class="mb-4 bg-black/50 border border-red-500/70 rounded-lg p-3 relative overflow-hidden shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
        >
          <!-- Glitch effect lines -->
          <div class="absolute inset-0 opacity-20 pointer-events-none">
            <div class="glitch-line"></div>
            <div class="glitch-line"></div>
          </div>

          <p
            class="text-sm font-medium text-red-400 mb-1 font-orbitron tracking-wide"
          >
            Raison du rejet :
          </p>
          <p class="text-sm text-red-300/90 font-obitron">
            {{ proposal.rejectionReason }}
          </p>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between sm:items-end mt-2 space-y-3 sm:space-y-0"
        >
          <!-- Info proposant -->
          <div
            class="text-sm text-cyan-400 font-orbitron space-y-1 sm:space-y-0"
          >
            <div class="flex items-center">
              <span
                class="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"
              ></span>
              <span
                >Proposé par
                <span class="text-cyan-300">{{
                  getUsernameFromProposal(proposal)
                }}</span></span
              >
            </div>
            <div class="flex items-center sm:mt-0 sm:ml-6">
              <span
                class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2"
              ></span>
              <span class="text-pink-400">{{
                formatDate(proposal.createdAt)
              }}</span>
            </div>
          </div>

          <!-- Système de vote -->
          <div class="flex items-center space-x-3">
            <button
              @click="handleVote(1)"
              :disabled="
                !isAuthenticated ||
                proposal.status === 'pending' ||
                proposal.status === 'rejected'
              "
              :class="getVoteButtonClass(1)"
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
            </button>

            <span
              class="text-lg font-bold font-orbitron"
              :class="getVoteCountClass()"
            >
              {{ proposal.totalVotes }}
            </span>

            <button
              @click="handleVote(-1)"
              :disabled="
                !isAuthenticated ||
                proposal.status === 'pending' ||
                proposal.status === 'rejected'
              "
              :class="getVoteButtonClass(-1)"
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
            </button>

            <!-- Bouton d'information sur les votes -->
            <button
              v-if="proposal.votes && proposal.votes.length > 0"
              @click="toggleVoteInfo"
              class="p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-gray-700/60 hover:text-purple-300 hover:border hover:border-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
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
            </button>
          </div>

          <!-- filepath: d:\Dev\ACS\acs-frontend\src\components\GameProposalCard.vue -->
          <!-- Modale d'information sur les votes -->
          <Teleport to="body">
            <div
              v-if="showVoteInfo"
              class="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-md"
              @click.self="closeVoteModal"
            >
              <div
                class="w-full max-w-md mx-4 transform transition-all duration-300"
                :class="{
                  'vote-modal-enter': voteModalEnter,
                  'vote-modal-active': !voteModalEnter,
                }"
              >
                <!-- En-tête décoratif -->
                <div class="vote-modal-header">
                  <div class="glitch-line"></div>
                  <div class="glitch-line"></div>
                </div>

                <!-- Corps de la modale -->
                <div
                  class="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/60 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.4)] overflow-hidden"
                >
                  <!-- En-tête avec titre -->
                  <div class="relative p-5 border-b border-cyan-600/30">
                    <!-- Décorations d'angle -->
                    <div
                      class="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple-500"
                    ></div>
                    <div
                      class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-500"
                    ></div>

                    <div class="flex justify-between items-center">
                      <h3
                        class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 font-audiowide tracking-wider"
                      >
                        Votes : {{ proposal.name }}
                      </h3>
                      <button
                        @click="closeVoteModal"
                        class="text-gray-400 hover:text-pink-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Détail des votes -->
                    <div class="mt-2 flex justify-between items-center">
                      <div class="flex items-center">
                        <span class="text-xs text-gray-400 font-orbitron">
                          Total:
                          <span
                            class="font-medium"
                            :class="{
                              'text-green-400': proposal.totalVotes > 0,
                              'text-red-400': proposal.totalVotes < 0,
                              'text-gray-300': proposal.totalVotes === 0,
                            }"
                            >{{ proposal.totalVotes }}</span
                          >
                        </span>
                        <span class="inline-block mx-2 text-gray-500">•</span>
                        <span class="text-xs text-green-400 font-orbitron"
                          >+{{ positiveVotes.length }}</span
                        >
                        <span class="inline-block mx-2 text-gray-500">/</span>
                        <span class="text-xs text-red-400 font-orbitron"
                          >-{{ negativeVotes.length }}</span
                        >
                      </div>
                      <div class="text-xs text-gray-400 font-orbitron">
                        {{ formatDate(proposal.createdAt) }}
                      </div>
                    </div>
                  </div>

                  <!-- Onglets Votes Pour/Contre -->
                  <div
                    class="flex space-x-1 p-4 border-b border-cyan-600/30 bg-cyan-900/10"
                  >
                    <button
                      @click="activeTab = 'positive'"
                      class="relative flex-1 py-2 px-3 text-sm font-medium rounded transition-all duration-300"
                      :class="
                        activeTab === 'positive'
                          ? 'bg-green-900/40 text-green-300'
                          : 'bg-gray-800/40 text-gray-400 hover:bg-gray-700/60 hover:text-green-400'
                      "
                    >
                      <!-- Bordure animée si actif -->
                      <div
                        v-if="activeTab === 'positive'"
                        class="active-tab-border green"
                      ></div>

                      <div class="flex items-center justify-center">
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
                      </div>
                    </button>
                    <button
                      @click="activeTab = 'negative'"
                      class="relative flex-1 py-2 px-3 text-sm font-medium rounded transition-all duration-300"
                      :class="
                        activeTab === 'negative'
                          ? 'bg-red-900/40 text-red-300'
                          : 'bg-gray-800/40 text-gray-400 hover:bg-gray-700/60 hover:text-red-400'
                      "
                    >
                      <!-- Bordure animée si actif -->
                      <div
                        v-if="activeTab === 'negative'"
                        class="active-tab-border red"
                      ></div>

                      <div class="flex items-center justify-center">
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
                      </div>
                    </button>
                  </div>

                  <!-- Liste des votants -->
                  <div
                    class="h-60 overflow-y-auto cyber-scrollbar p-4 bg-gray-950/60"
                  >
                    <div
                      v-if="currentVotesList.length === 0"
                      class="flex flex-col items-center justify-center h-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12 text-gray-600 mb-3"
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
                      <p class="text-sm text-gray-400 font-orbitron">
                        Aucun vote
                        {{ activeTab === "positive" ? "positif" : "négatif" }}
                      </p>
                    </div>
                    <div
                      v-for="(vote, index) in currentVotesList"
                      :key="index"
                      class="vote-card"
                      :class="[
                        activeTab === 'positive'
                          ? 'vote-card-positive'
                          : 'vote-card-negative',
                      ]"
                    >
                      <!-- Effet glitch aléatoire -->
                      <div
                        class="vote-card-glitch"
                        :style="`--offset: ${index * 0.1}s`"
                      ></div>

                      <!-- Avatar -->
                      <div
                        class="voter-avatar"
                        :class="[
                          activeTab === 'positive'
                            ? 'bg-green-900/50 border-green-500/40'
                            : 'bg-red-900/50 border-red-500/40',
                        ]"
                      >
                        <span
                          :class="[
                            activeTab === 'positive'
                              ? 'text-green-300'
                              : 'text-red-300',
                          ]"
                          >{{ getInitials(getVoterName(vote)) }}</span
                        >
                      </div>

                      <!-- Infos du votant -->
                      <div class="flex-grow ml-3">
                        <p
                          class="font-medium font-orbitron text-sm tracking-wide"
                          :class="
                            activeTab === 'positive'
                              ? 'text-green-300'
                              : 'text-red-300'
                          "
                        >
                          {{ getVoterName(vote) }}
                        </p>
                        <p class="text-xs text-gray-400">
                          {{ formatDate(vote.createdAt || proposal.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Pied de la modale -->
                  <div
                    class="p-4 border-t border-cyan-600/30 flex justify-end bg-gray-900/70"
                  >
                    <button
                      @click="closeVoteModal"
                      class="px-4 py-2 bg-gradient-to-r from-cyan-900/80 to-purple-900/80 text-cyan-300 border border-cyan-700/50 rounded font-orbitron text-xs transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-800/80 hover:to-purple-800/80 hover:text-cyan-200 hover:shadow-[0_0_10px_rgba(8,145,178,0.4)]"
                    >
                      Fermer
                    </button>
                  </div>
                </div>

                <!-- Pied décoratif -->
                <div class="vote-modal-footer">
                  <div class="glitch-line"></div>
                  <div class="glitch-line"></div>
                </div>
              </div>
            </div>
          </Teleport>
        </div>

        <!-- Actions admin -->
        <div
          v-if="isAdmin"
          class="mt-4 flex justify-end space-x-3 border-t border-pink-500/40 pt-3"
        >
          <!-- Actions sur les propositions en attente -->
          <template v-if="proposal.status === 'pending'">
            <button
              @click="$emit('approve', proposal._id)"
              class="inline-flex items-center px-3 py-1 rounded font-orbitron text-xs transition-all duration-300 transform hover:-translate-y-0.5 bg-green-900/30 text-green-400 border border-green-500/50 hover:bg-green-900/50 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)]"
              aria-label="Approuver la proposition"
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
            </button>
            <button
              @click="$emit('reject', proposal._id)"
              class="inline-flex items-center px-3 py-1 rounded font-orbitron text-xs transition-all duration-300 transform hover:-translate-y-0.5 bg-red-900/30 text-red-400 border border-red-500/50 hover:bg-red-900/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.6)]"
              aria-label="Rejeter la proposition"
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
            </button>
          </template>

          <!-- Bouton de suppression (pour toutes les propositions) -->
          <button
            @click="$emit('delete', proposal._id)"
            class="inline-flex items-center px-3 py-1 rounded font-orbitron text-xs transition-all duration-300 transform hover:-translate-y-0.5 bg-gray-800/40 text-gray-400 border border-gray-600/50 hover:bg-gray-800/60 hover:text-pink-400 hover:border-pink-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            aria-label="Supprimer la proposition"
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
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\GameProposalCard.vue -->
<script setup lang="ts">
// ================================================
// IMPORTS ET DÉFINITIONS
// ================================================
import { defineProps, defineEmits, ref, computed } from "vue";

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
 * Détermine les classes CSS pour les boutons de vote
 * @param {number} voteType - Type de vote: 1 (positif) ou -1 (négatif)
 * @returns {string} Les classes CSS à appliquer
 */
const getVoteButtonClass = (voteType: number) => {
  // Si l'utilisateur n'est pas connecté ou la proposition n'est pas approuvée
  if (
    !props.isAuthenticated ||
    props.proposal.status === "pending" ||
    props.proposal.status === "rejected"
  ) {
    return "p-2 rounded-full bg-gray-800/50 text-gray-500 opacity-50 cursor-not-allowed";
  }

  // Si le bouton correspond au vote actuel de l'utilisateur
  if (props.proposal.userVote === voteType) {
    // Style différent selon le type de vote
    return voteType === 1
      ? "p-2 rounded-full transition-all bg-green-900/30 text-green-400 border border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-glow-subtle"
      : "p-2 rounded-full transition-all bg-red-900/30 text-red-400 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-glow-subtle";
  }

  // Style par défaut (pas de vote ou vote opposé)
  return "p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-gray-700/60 hover:text-cyan-300 hover:border hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]";
};

/**
 * Détermine les classes CSS pour l'affichage du nombre de votes
 * @returns {string} Les classes CSS à appliquer
 */
const getVoteCountClass = () => {
  if (props.proposal.totalVotes > 0) return "text-green-400 text-shadow-green";
  if (props.proposal.totalVotes < 0) return "text-red-400 text-shadow-red";
  return "text-cyan-400";
};

// ================================================
// MODALE DES VOTES
// ================================================
/**
 * État pour la modale d'information sur les votes
 */
const showVoteInfo = ref(false);
const voteModalEnter = ref(true);
const activeTab = ref<"positive" | "negative">("positive");

/**
 * Ouvre/ferme la modale des informations de vote
 */
const toggleVoteInfo = () => {
  if (!showVoteInfo.value) {
    // Animation d'ouverture
    voteModalEnter.value = true;
    showVoteInfo.value = true;
    setTimeout(() => {
      voteModalEnter.value = false;
    }, 10);
  } else {
    showVoteInfo.value = false;
  }
};

/**
 * Ferme la modale avec animation
 */
const closeVoteModal = () => {
  voteModalEnter.value = true;
  setTimeout(() => {
    showVoteInfo.value = false;
  }, 100);
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
</script>

<style scoped>
.text-shadow-cyan {
  text-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
}

.text-shadow-green {
  text-shadow: 0 0 5px rgba(34, 197, 94, 0.7);
}

.text-shadow-red {
  text-shadow: 0 0 5px rgba(239, 68, 68, 0.7);
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

/* Animation de pulsation */
@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    box-shadow: 0 0 15px currentColor;
  }
}

.animate-glow-subtle {
  animation: glow-pulse 2s infinite;
}

/* Effet de lignes glitch */
.glitch-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: rgba(255, 0, 0, 0.5);
  animation: glitch 2s infinite;
}

.glitch-line:nth-child(1) {
  top: 30%;
  animation-delay: 0s;
}

.glitch-line:nth-child(2) {
  top: 70%;
  animation-delay: 0.3s;
}

@keyframes glitch {
  0%,
  5%,
  10%,
  100% {
    transform: translateX(-100%);
  }
  5.1%,
  9.9% {
    transform: translateX(0);
  }
}

.vote-modal-enter {
  opacity: 0;
  transform: translateY(-20px) scale(0.96);
}

.vote-modal-active {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

.vote-modal-header,
.vote-modal-footer {
  height: 10px;
  position: relative;
  overflow: hidden;
}

.glitch-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(8, 145, 178, 0.8),
    transparent
  );
  opacity: 0.5;
}

.vote-modal-header .glitch-line:first-child {
  top: 3px;
  animation: glitch-slide-1 2s infinite linear;
}

.vote-modal-header .glitch-line:last-child {
  bottom: 3px;
  animation: glitch-slide-2 3s infinite linear;
}

.vote-modal-footer .glitch-line:first-child {
  top: 3px;
  animation: glitch-slide-2 2.5s infinite linear;
}

.vote-modal-footer .glitch-line:last-child {
  bottom: 3px;
  animation: glitch-slide-1 3.5s infinite linear;
}

@keyframes glitch-slide-1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes glitch-slide-2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Bordure animée pour l'onglet actif */
.active-tab-border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  z-index: 1;
}

.active-tab-border.green {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(34, 197, 94, 0.8),
    transparent
  );
  animation: scan-line-green 2s infinite linear;
}

.active-tab-border.red {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(239, 68, 68, 0.8),
    transparent
  );
  animation: scan-line-red 2s infinite linear;
}

@keyframes scan-line-green {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes scan-line-red {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

/* Carte de vote */
.vote-card {
  display: flex;
  align-items: center;
  padding: 0.875rem;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.vote-card-positive {
  background-color: rgba(21, 128, 61, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.vote-card-positive:hover {
  background-color: rgba(21, 128, 61, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.2);
}

.vote-card-negative {
  background-color: rgba(153, 27, 27, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.vote-card-negative:hover {
  background-color: rgba(153, 27, 27, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.2);
}

.vote-card-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 10%,
    rgba(255, 255, 255, 0) 10.1%
  );
  background-size: 100% 300%;
  animation: glitch-scan 4s ease infinite;
  animation-delay: var(--offset, 0s);
}

@keyframes glitch-scan {
  0%,
  100% {
    background-position: 0 -150%;
  }
  50% {
    background-position: 0 150%;
  }
}

.voter-avatar {
  height: 2rem;
  width: 2rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: "Orbitron", sans-serif;
}

/* Scrollbar customisée */
.cyber-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(8, 145, 178, 0.5) rgba(17, 24, 39, 0.8);
}

.cyber-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.cyber-scrollbar::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.8);
}

.cyber-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(8, 145, 178, 0.5);
  border-radius: 3px;
}

.cyber-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(8, 145, 178, 0.7);
}
</style>
