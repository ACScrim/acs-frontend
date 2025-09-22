<template>
  <div
    class="stream-card bg-color-card-bg rounded-lg border border-color-secondary/30 overflow-hidden hover:border-color-secondary/60 transition-all cursor-pointer transform hover:scale-105"
    @click="$emit('openTwitch', user.stream)"
  >
    <!-- Thumbnail du stream -->
    <div class="stream-thumbnail relative aspect-video bg-color-bg-dark">
      <img
        :src="getThumbnailUrl()"
        :alt="`Stream de ${user.username}`"
        class="w-full h-full object-cover"
        loading="lazy"
      />

      <!-- Badge LIVE -->
      <div
        class="live-badge absolute top-2 left-2 bg-color-error text-color-text px-2 py-1 rounded text-xs font-semibold font-body animate-pulse"
      >
        LIVE
      </div>

      <!-- Badge participant -->
      <div
        v-if="user.isParticipant"
        class="participant-badge absolute top-2 right-2 bg-color-accent text-color-text px-2 py-1 rounded text-xs font-semibold font-body"
      >
        PARTICIPANT
      </div>

      <!-- Viewers -->
      <div
        class="viewers-badge absolute bottom-2 left-2 bg-color-bg/80 text-color-text px-2 py-1 rounded text-xs"
      >
        👥 {{ formatViewers() }}
      </div>

      <!-- Durée -->
      <div
        class="duration-badge absolute bottom-2 right-2 bg-color-bg/80 text-color-text px-2 py-1 rounded text-xs"
      >
        ⏱️ {{ formatDuration() }}
      </div>
    </div>

    <!-- Informations du stream -->
    <div class="stream-info p-4">
      <h5
        class="stream-title font-semibold text-color-text truncate flex items-center font-body"
      >
        {{ user.username }}
        <!-- Icône participant -->
        <svg
          v-if="user.isParticipant"
          class="h-4 w-4 text-color-accent ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </h5>

      <p
        class="stream-description text-sm text-color-text-muted truncate font-body"
        :title="user.stream?.title"
      >
        {{ user.stream?.title }}
      </p>

      <p class="game-name text-xs text-color-accent mt-1 font-body">
        {{ user.stream?.gameName }}
      </p>
      <div class="stream-footer flex justify-between items-center mt-3">
        <span class="twitch-username text-xs text-color-text-dark font-body"
          >@{{ user.twitchUsername }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import streamService from "../..//services/streamService";
import type { UserWithTwitch } from "../../types";

// ========================================
// PROPS ET EMITS
// ========================================

interface Props {
  user: UserWithTwitch;
}

const props = defineProps<Props>();

defineEmits<{
  openTwitch: [stream: any];
}>();

// ========================================
// MÉTHODES
// ========================================

const getThumbnailUrl = () => {
  if (!props.user.stream?.thumbnailUrl) return "";
  return streamService.getStreamThumbnail(
    props.user.stream.thumbnailUrl,
    320,
    180
  );
};

const formatViewers = () => {
  if (!props.user.stream?.viewerCount) return "0";
  return streamService.formatViewerCount(props.user.stream.viewerCount);
};

const formatDuration = () => {
  if (!props.user.stream?.startedAt) return "0m";
  return streamService.getStreamDuration(props.user.stream.startedAt);
};
</script>

<style scoped>
/* Composant principale - Carte de stream Halloween */
.stream-card {
  background: var(--color-card-bg);
  box-shadow: var(--shadow-card-base);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-color: rgba(var(--color-secondary-rgb), 0.3);
}

.stream-card:hover {
  box-shadow: var(--shadow-glow-secondary);
  border-color: rgba(var(--color-secondary-rgb), 0.6);
  transform: scale(1.02) translateY(-2px);
}

/* Thumbnail container */
.stream-thumbnail {
  background: var(--color-bg-dark);
  position: relative;
  overflow: hidden;
}

.stream-thumbnail::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(var(--color-secondary-rgb), 0.1) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.stream-card:hover .stream-thumbnail::before {
  opacity: 1;
}

/* Badge LIVE avec animation Halloween */
.live-badge {
  background: var(--color-error);
  color: var(--color-text);
  box-shadow: 0 0 15px rgba(var(--color-error-rgb), 0.6);
  animation: live-pulse 2s infinite;
  z-index: 2;
}

@keyframes live-pulse {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(var(--color-error-rgb), 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 25px rgba(var(--color-error-rgb), 0.8);
    transform: scale(1.05);
  }
}

/* Badge participant Halloween */
.participant-badge {
  background: var(--color-accent);
  color: var(--color-text);
  box-shadow: 0 0 12px rgba(var(--color-accent-rgb), 0.5);
  z-index: 2;
}

/* Badges viewers et duration */
.viewers-badge,
.duration-badge {
  background: rgba(var(--color-bg-rgb), 0.9);
  color: var(--color-text);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  z-index: 2;
}

.stream-card:hover .viewers-badge,
.stream-card:hover .duration-badge {
  background: rgba(var(--color-bg-rgb), 0.95);
  border-color: rgba(var(--color-primary-rgb), 0.4);
  box-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.3);
}

/* Informations du stream */
.stream-info {
  background: var(--color-card-bg);
  border-top: 1px solid rgba(var(--color-primary-rgb), 0.2);
}

/* Titre du stream */
.stream-title {
  color: var(--color-text);
  text-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.2);
  transition: all 0.3s ease;
}

.stream-card:hover .stream-title {
  color: var(--color-primary);
  text-shadow: var(--shadow-glow-primary);
}

/* Description du stream */
.stream-description {
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.stream-card:hover .stream-description {
  color: var(--color-text);
}

/* Nom du jeu */
.game-name {
  color: var(--color-accent);
  text-shadow: 0 0 6px rgba(var(--color-accent-rgb), 0.3);
}

/* Footer du stream */
.stream-footer {
  padding-top: 0.75rem;
  border-top: 1px solid rgba(var(--color-bg-light), 0.3);
}

.twitch-username {
  color: var(--color-text-dark);
  transition: color 0.3s ease;
}

.stream-card:hover .twitch-username {
  color: var(--color-accent);
}

/* Animation d'apparition */
.stream-card {
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Effet de hover spécial pour l'image */
.stream-card:hover img {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* Responsive - Mobile */
@media (max-width: 480px) {
  .stream-card {
    border-radius: 0.5rem;
  }

  .stream-info {
    padding: 0.75rem;
  }

  .live-badge,
  .participant-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
  }

  .viewers-badge,
  .duration-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
  }

  .stream-title {
    font-size: 0.875rem;
  }

  .stream-description {
    font-size: 0.75rem;
  }

  .game-name,
  .twitch-username {
    font-size: 0.625rem;
  }
}

/* Responsive - Tablet */
@media (min-width: 481px) and (max-width: 768px) {
  .stream-info {
    padding: 0.875rem;
  }

  .live-badge,
  .participant-badge,
  .viewers-badge,
  .duration-badge {
    font-size: 0.6875rem;
  }
}
</style>
