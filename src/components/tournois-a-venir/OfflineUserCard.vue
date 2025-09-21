<template>
  <div
    class="user-card group relative overflow-hidden bg-color-card-bg rounded-lg border border-color-primary/30 hover:border-color-primary/60 p-3 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow-primary"
  >
    <!-- Effet mystique au hover -->
    <div
      class="mystical-glow absolute inset-0 bg-gradient-to-r from-transparent via-color-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
    ></div>

    <!-- Avatar avec initiales -->
    <div class="relative z-10 mb-3">
      <div
        class="avatar-container mx-auto w-12 h-12 bg-gradient-to-br from-color-bg-light to-color-bg rounded-full flex items-center justify-center border border-color-accent/30 group-hover:border-color-accent/70 transition-colors"
      >
        <span class="text-color-text font-bold text-sm font-body">
          {{ getInitials(user.username) }}
        </span>
      </div>

      <!-- Badge participant Halloween -->
      <div
        v-if="user.isParticipant"
        class="participant-badge absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-color-secondary to-color-secondary-light rounded-full flex items-center justify-center border-2 border-color-bg"
      >
        <svg
          class="h-2.5 w-2.5 text-color-text"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Informations utilisateur -->
    <div class="user-info relative z-10 space-y-1">
      <h5
        class="username text-sm font-semibold text-color-text group-hover:text-color-primary transition-colors truncate font-heading"
      >
        {{ user.username }}
      </h5>

      <!-- Nom Twitch avec icône Halloween -->
      <div
        class="twitch-info flex items-center justify-center text-xs text-color-text-muted group-hover:text-color-accent transition-colors"
      >
        <svg
          class="h-3 w-3 mr-1 text-color-accent"
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

      <!-- Badge participant textuel Halloween -->
      <div
        v-if="user.isParticipant"
        class="participant-text inline-flex items-center px-2 py-0.5 bg-color-secondary/20 text-color-secondary-light text-xs font-body rounded-full border border-color-secondary/30 mt-2"
      >
        <svg class="h-2.5 w-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Participant
      </div>
    </div>

    <!-- Ligne décorative mystique -->
    <div
      class="halloween-border absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-color-primary/30 to-transparent group-hover:via-color-primary/60 transition-colors"
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
/* Composant principale - Carte utilisateur Halloween */
.user-card {
  background: var(--color-card-bg);
  box-shadow: var(--shadow-card-base);
  animation: fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.user-card:hover {
  box-shadow: var(--shadow-glow-primary);
}

/* Effet mystique au hover */
.mystical-glow {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--color-primary-rgb), 0.1),
    transparent
  );
}

/* Avatar container avec effet Halloween */
.avatar-container {
  position: relative;
  background: linear-gradient(135deg, var(--color-bg-light), var(--color-bg));
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.user-card:hover .avatar-container {
  box-shadow: var(--shadow-glow-accent);
  transform: scale(1.05);
}

/* Badge participant Halloween */
.participant-badge {
  box-shadow: 0 2px 8px rgba(var(--color-secondary-rgb), 0.4);
  animation: mystical-pulse 2s infinite;
}

@keyframes mystical-pulse {
  0%,
  100% {
    box-shadow: 0 2px 8px rgba(var(--color-secondary-rgb), 0.4);
  }
  50% {
    box-shadow: 0 4px 16px rgba(var(--color-secondary-rgb), 0.6);
  }
}

/* Informations utilisateur */
.username {
  text-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.3);
}

.user-card:hover .username {
  text-shadow: var(--shadow-glow-primary);
}

/* Indicateur offline mystique */
.offline-indicator {
  background: var(--color-secondary);
  box-shadow: 0 0 6px rgba(var(--color-secondary-rgb), 0.6);
  animation: mystical-blink 3s infinite;
}

@keyframes mystical-blink {
  0%,
  90%,
  100% {
    opacity: 0.75;
  }
  45% {
    opacity: 0.3;
  }
}

/* Badge participant textuel */
.participant-text {
  background: rgba(var(--color-secondary-rgb), 0.2);
  border-color: rgba(var(--color-secondary-rgb), 0.3);
  box-shadow: 0 0 10px rgba(var(--color-secondary-rgb), 0.2);
}

/* Ligne décorative Halloween */
.halloween-border {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--color-primary-rgb), 0.3),
    transparent
  );
}

.user-card:hover .halloween-border {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--color-primary-rgb), 0.6),
    transparent
  );
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.4);
}

/* Animation d'apparition */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive - Mobile */
@media (max-width: 480px) {
  .user-card {
    padding: 0.75rem;
  }

  .avatar-container {
    width: 2.5rem;
    height: 2.5rem;
  }

  .avatar-container span {
    font-size: 0.75rem;
  }

  .participant-badge {
    width: 1rem;
    height: 1rem;
  }

  .participant-badge svg {
    width: 0.5rem;
    height: 0.5rem;
  }
}

/* Responsive - Tablet */
@media (min-width: 481px) and (max-width: 768px) {
  .user-card {
    padding: 0.875rem;
  }
}
</style>
