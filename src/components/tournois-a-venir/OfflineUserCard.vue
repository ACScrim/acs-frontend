<template>
  <div
    class="group relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:border-gray-500/50 p-3 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/10"
  >
    <!-- Effet de brillance au hover -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
    ></div>

    <!-- Avatar placeholder avec initiales -->
    <div class="relative z-10 mb-3">
      <div
        class="mx-auto w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600/50 group-hover:border-gray-500/70 transition-colors"
      >
        <span class="text-gray-300 font-bold text-sm font-orbitron">
          {{ getInitials(user.username) }}
        </span>
      </div>

      <!-- Badge participant (petite version) -->
      <div
        v-if="user.isParticipant"
        class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-slate-800"
      >
        <svg
          class="h-2.5 w-2.5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Nom d'utilisateur -->
    <div class="relative z-10 space-y-1">
      <h5
        class="username text-sm font-semibold text-color-text group-hover:text-color-primary transition-colors truncate font-heading"
      >
        {{ user.username }}
      </h5>

      <!-- Nom Twitch avec icône -->
      <div
        class="flex items-center justify-center text-xs text-gray-400 group-hover:text-gray-300 transition-colors"
      >
        <svg
          class="h-3 w-3 mr-1 text-purple-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.429h-3.429l-3 3v-3H6.857V1.714h13.714Z"
          />
        </svg>
        <span class="truncate">{{ user.twitchUsername }}</span>
      </div>

      <!-- Statut offline mystique -->
      <div
        class="offline-status flex items-center justify-center text-xs text-color-text-dark"
      >
        <div
          class="offline-indicator w-2 h-2 bg-color-secondary rounded-full mr-1.5 opacity-75"
        ></div>
        <span class="font-body">Dans les ombres</span>
      </div>

      <!-- Badge participant textuel -->
      <div
        v-if="user.isParticipant"
        class="inline-flex items-center px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-orbitron rounded-full border border-blue-500/30 mt-2"
      >
        <svg class="h-2.5 w-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Participant
      </div>
    </div>

    <!-- Ligne décorative en bas -->
    <div
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent group-hover:via-gray-400/50 transition-colors"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { UserWithTwitch } from "../../types";

// ========================================
// PROPS
// ========================================

interface Props {
  user: UserWithTwitch;
}

defineProps<Props>();

// ========================================
// MÉTHODES
// ========================================

/**
 * Génère les initiales du nom d'utilisateur
 */
const getInitials = (username: string): string => {
  if (!username) return "?";

  const words = username.split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};
</script>

<style scoped>
/* Animation d'apparition */
.group {
  animation: fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Effet au hover sur l'avatar */
.group:hover .w-12 {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
</style>
