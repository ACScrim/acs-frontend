<template>
  <div
    :class="`tournament-card w-full rounded-lg p-1.5 sm:p-2 border backdrop-blur-md ${getVariantClass} relative overflow-hidden transition-all duration-300 hover:shadow-lg`"
  >
    <!-- Effet de brillance au survol -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
    ></div>

    <!-- Cercle décoratif -->
    <div
      :class="`absolute -top-10 -right-10 w-24 h-24 rounded-full ${getDecorationClass} blur-xl`"
    ></div>

    <!-- Contenu -->
    <div class="z-10 relative">
      <!-- Image du jeu (version compacte) -->
      <div
        v-if="tournament.game && tournament.game.imageUrl"
        class="flex items-center mb-1"
      >
        <div class="game-image-container mr-1.5 flex-shrink-0">
          <div class="game-image-glow" :style="getImageGlowStyle"></div>
          <img
            :src="tournament.game.imageUrl"
            :alt="tournament.game.name"
            class="game-image w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 object-cover rounded border border-white/10"
          />
        </div>
        <h3
          :class="`text-sm xs:text-base sm:text-lg font-nasa ${getTitleClass}`"
        >
          {{ tournament.name }}
        </h3>
      </div>
      <h3
        v-else
        :class="`text-sm xs:text-base sm:text-lg font-nasa mb-1 ${getTitleClass}`"
      >
        {{ tournament.name }}
      </h3>
      <!-- Contenu personnalisable (slot par défaut) -->
      <slot>
        <div class="tournament-details space-y-0.5">
          <div
            class="flex items-center text-color-text-muted text-3xs xs:text-2xs sm:text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="`h-2.5 w-2.5 mr-1 ${getIconClass}`"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
              />
            </svg>
            <span>{{
              tournament.game ? tournament.game.name : "Jeu non spécifié"
            }}</span>
          </div>
          <div
            class="flex items-center text-color-text-muted text-3xs xs:text-2xs sm:text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="`h-2.5 w-2.5 mr-1 ${getIconClass}`"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>
              {{ tournament.players ? tournament.players.length : 0 }} joueurs
            </span>
          </div>
        </div>
      </slot>
    </div>

    <!-- Ligne décorative -->
    <div
      :class="`absolute bottom-0 left-0 right-0 h-0.5 ${getDecorationLineClass}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Tournament } from "../../../types";

interface Props {
  tournament: Tournament;
  variant?: "primary" | "secondary" | "accent" | "dark";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

// Déclaration des slots (Volar/TS)
defineSlots<{
  default?: () => any;
}>();

// Calcule les classes CSS pour la variante de carte
const getVariantClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "border-color-primary/30 bg-color-primary/10 hover:border-color-primary/50";
    case "secondary":
      return "border-color-secondary/30 bg-color-secondary/10 hover:border-color-secondary/50";
    case "accent":
      return "border-color-accent/30 bg-color-accent/10 hover:border-color-accent/50";
    case "dark":
      return "border-color-text/20 bg-color-bg-dark/80 hover:border-color-text/30";
    default:
      return "border-color-primary/30 bg-color-primary/10 hover:border-color-primary/50";
  }
});

// Calcule les classes CSS pour le titre
const getTitleClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "text-color-primary-light";
    case "secondary":
      return "text-color-secondary-light";
    case "accent":
      return "text-color-accent-light";
    case "dark":
      return "text-color-text";
    default:
      return "text-color-primary-light";
  }
});

// Calcule les classes CSS pour les icônes
const getIconClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "text-color-primary-light";
    case "secondary":
      return "text-color-secondary-light";
    case "accent":
      return "text-color-accent-light";
    case "dark":
      return "text-color-text";
    default:
      return "text-color-primary-light";
  }
});

// Calcule les classes CSS pour les éléments décoratifs
const getDecorationClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-color-primary/10";
    case "secondary":
      return "bg-color-secondary/10";
    case "accent":
      return "bg-color-accent/10";
    case "dark":
      return "bg-color-text/10";
    default:
      return "bg-color-primary/10";
  }
});

// Calcule les classes CSS pour la ligne décorative
const getDecorationLineClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-gradient-to-r from-transparent via-color-primary/50 to-transparent";
    case "secondary":
      return "bg-gradient-to-r from-transparent via-color-secondary/50 to-transparent";
    case "accent":
      return "bg-gradient-to-r from-transparent via-color-accent/50 to-transparent";
    case "dark":
      return "bg-gradient-to-r from-transparent via-color-text/30 to-transparent";
    default:
      return "bg-gradient-to-r from-transparent via-color-primary/50 to-transparent";
  }
});

// Calcule le style pour le glow de l'image du jeu
const getImageGlowStyle = computed(() => {
  switch (props.variant) {
    case "primary":
      return {
        background:
          "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(67, 56, 202, 0.05) 70%, transparent 100%)",
      };
    case "secondary":
      return {
        background:
          "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.05) 70%, transparent 100%)",
      };
    case "accent":
      return {
        background:
          "radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.05) 70%, transparent 100%)",
      };
    case "dark":
      return {
        background:
          "radial-gradient(circle, rgba(209, 213, 219, 0.1) 0%, rgba(156, 163, 175, 0.05) 70%, transparent 100%)",
      };
    default:
      return {
        background:
          "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(67, 56, 202, 0.05) 70%, transparent 100%)",
      };
  }
});
</script>

<style scoped>
.tournament-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.tournament-card:hover {
  transform: translateY(-2px);
}

/* Styles pour l'image du jeu */
.game-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
}

@media (min-width: 400px) {
  .game-image-container {
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (min-width: 640px) {
  .game-image-container {
    width: 1.75rem;
    height: 1.75rem;
  }
}

.game-image {
  transition: all 0.3s ease;
  z-index: 5;
  position: relative;
}

.game-image:hover {
  transform: scale(1.1);
}

.game-image-glow {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  border-radius: 0.375rem;
}

.tournament-card:hover .game-image-glow {
  opacity: 1;
}

/* Extra small text class */
.text-2xs {
  font-size: 0.7rem;
}

.text-3xs {
  font-size: 0.6rem;
}

@media (max-width: 360px) {
  .text-2xs {
    font-size: 0.65rem;
  }

  .text-3xs {
    font-size: 0.55rem;
  }
}
</style>
