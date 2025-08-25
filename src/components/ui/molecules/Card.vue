<template>
  <div
    :class="[
      'color-card relative overflow-hidden rounded-lg transition-all duration-300',
      {
        'color-card--interactive': interactive,
        'color-card--hover': hover,
        'color-card--floating': floating,
      },
      variantClasses,
      elevationClasses,
      section ? `color-card--section-${section}` : '',
      className,
    ]"
    :data-variant="variant"
    :data-section="section"
  >
    <!-- Badge de statut -->
    <div v-if="$slots.badge" class="absolute top-4 right-4 z-10">
      <slot name="badge"></slot>
    </div>

    <!-- Image de fond avec effet parallaxe -->
    <div
      v-if="bgImage"
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-background-bg to-transparent opacity-90"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div :class="['relative z-10', contentPadding ? 'p-6' : '']">
      <!-- En-tête -->
      <div v-if="$slots.header" class="color-card-header">
        <slot name="header"></slot>
      </div>

      <!-- Corps -->
      <div class="color-card-body">
        <slot></slot>
      </div>

      <!-- Pied de page -->
      <div
        v-if="$slots.footer"
        class="color-card-footer mt-4 pt-4 border-t border-background-bg-light"
      >
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- Éléments décoratifs spatiaux -->
    <div v-if="decorated" class="color-card-decorations pointer-events-none">
      <!-- Ligne supérieure -->
      <div class="color-card-line top"></div>

      <!-- Ligne inférieure -->
      <div class="color-card-line bottom"></div>

      <!-- Coin supérieur droit -->
      <div class="color-card-corner top-right"></div>

      <!-- Coin inférieur gauche -->
      <div class="color-card-corner bottom-left"></div>
    </div>

    <!-- Décors spatiaux supprimés pour le style Far West -->
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "dark"
    | "gold"
    | "silver"
    | "bronze";
  section?:
    | "profile"
    | "statistics"
    | "medals"
    | "activity"
    | "performance"
    | "collaborations"
    | "badges"
    | "records";
  elevation?: "flat" | "low" | "medium" | "high";
  interactive?: boolean;
  hover?: boolean;
  floating?: boolean;
  decorated?: boolean;
  stars?: boolean;
  contentPadding?: boolean;
  bgImage?: string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  section: undefined,
  elevation: "medium",
  interactive: false,
  hover: false,
  floating: false,
  decorated: true,
  stars: true,
  contentPadding: true,
  bgImage: "",
  className: "",
});

// Classes de variante
const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-background-bg-light border border-color-primary/30";
    case "secondary":
      return "bg-background-bg-light border border-color-secondary/30";
    case "accent":
      return "bg-background-bg-light border border-color-accent/30";
    case "dark":
      return "bg-background-bg border border-background-bg-light/30";
    case "gold":
      return "bg-background-bg-light border border-color-gold/30";
    case "silver":
      return "bg-background-bg-light border border-color-silver/30";
    case "bronze":
      return "bg-background-bg-light border border-color-bronze/30";
    default:
      return "bg-background-bg-light border border-color-primary/30";
  }
});

// Classes d'élévation
const elevationClasses = computed(() => {
  switch (props.elevation) {
    case "flat":
      return "";
    case "low":
      return "shadow-sm";
    case "high":
      return "shadow-xl";
    default:
      return "shadow-md";
  }
});
</script>

<style scoped>
.color-card {
  background: var(--color-card-bg) !important;
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-card-border) !important;
  /* Warm, dusty glow for Far West */
  box-shadow: var(--shadow-card-base), 0 0 15px var(--color-card-shadow) !important;
  /* Parchment/leather-like texture (no denim stripes) */
  background-image: radial-gradient(
      120% 100% at 50% 0%,
      rgba(0, 0, 0, 0.08),
      transparent 65%
    ),
    linear-gradient(
      to bottom,
      rgba(var(--background-bg-light-rgb), 0.06),
      rgba(var(--background-bg-light-rgb), 0.02)
    ),
    radial-gradient(circle at 20% 15%, rgba(0, 0, 0, 0.05), transparent 35%),
    radial-gradient(circle at 80% 85%, rgba(0, 0, 0, 0.04), transparent 40%);
  background-blend-mode: multiply, normal, multiply, multiply;
}

.color-card--interactive {
  cursor: pointer;
}

.color-card--hover:hover {
  transform: translateY(-5px);
  /* Slightly warmer drop shadow */
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.6);
}

.color-card--floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Decorative stitches (replaces sci-fi lines) */
.color-card-line {
  position: absolute;
  height: 2px;
  width: 50%;
  /* Subtle burn-like line, no dots */
  background: linear-gradient(
    90deg,
    transparent 0%,
    currentColor 20%,
    currentColor 80%,
    transparent 100%
  );
  opacity: 0.22;
}

.color-card-line.top {
  top: 10px;
  left: 25%;
}

.color-card-line.bottom {
  bottom: 10px;
  right: 25%;
}

/* Rope-like corner notches */
.color-card-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: currentColor;
  opacity: 0.6;
}

.color-card-corner.top-right {
  top: 5px;
  right: 5px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.color-card-corner.bottom-left {
  bottom: 5px;
  left: 5px;
  border-bottom: 1px solid;
  border-left: 1px solid;
}

/* Stars removed */

.color-card--interactive.color-card:hover
  .color-card-decorations
  .color-card-line,
.color-card--interactive.color-card:hover
  .color-card-decorations
  .color-card-corner {
  opacity: 1;
}

.color-card[data-variant="primary"] .color-card-decorations {
  color: var(--color-primary);
}

.color-card[data-variant="secondary"] .color-card-decorations {
  color: var(--color-secondary);
}

.color-card[data-variant="accent"] .color-card-decorations {
  color: var(--color-accent);
}

.color-card[data-variant="gold"] .color-card-decorations {
  color: var(--color-gold);
}

.color-card[data-variant="silver"] .color-card-decorations {
  color: var(--color-silver);
}

.color-card[data-variant="bronze"] .color-card-decorations {
  color: var(--color-bronze);
}

/* No orbit tinting */

.color-card-header {
  border-bottom: 1px solid var(--color-card-border);
  padding-bottom: 0.75rem;
  position: relative;
}

.color-card-header::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 30%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(var(--color-card-border-rgb), 0.8),
    transparent
  );
}

/* Orbit/planet rules removed */

/* Section-specific card styles */
.color-card--section-profile {
  box-shadow: var(--shadow-glow-profile) !important;
  border-width: 2px !important;
  border-image: linear-gradient(
      to right,
      var(--color-section-profile-color),
      var(--color-section-profile-fade),
      var(--color-section-profile-color)
    )
    1 !important;
}

.color-card--section-statistics {
  border-image: linear-gradient(
      to bottom,
      var(--color-section-statistics-color),
      var(--color-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.color-card--section-statistics:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--color-section-statistics-rgb), 0.3) !important;
}

.color-card--section-medals {
  border-image: linear-gradient(
      to bottom,
      var(--color-section-medals-color),
      var(--color-section-medals-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-medals) !important;
}

.color-card--section-medals:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--color-section-medals-rgb), 0.3) !important;
}

.color-card--section-activity {
  border-image: linear-gradient(
      to right,
      var(--color-section-statistics-fade),
      var(--color-section-statistics-color),
      var(--color-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.color-card--section-performance {
  border-image: linear-gradient(
      45deg,
      var(--color-section-profile-color),
      var(--color-section-profile-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-performance) !important;
}

.color-card--section-performance:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--color-section-profile-rgb), 0.3) !important;
}

.color-card--section-collaborations {
  border-image: linear-gradient(
      135deg,
      var(--color-section-statistics-color),
      var(--color-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.color-card--section-badges {
  border-image: linear-gradient(
      to right,
      var(--color-section-profile-fade),
      var(--color-section-profile-color),
      var(--color-section-profile-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-profile) !important;
}

.color-card--section-records {
  border-image: linear-gradient(
      to right,
      var(--color-section-medals-color),
      var(--color-section-medals-fade),
      var(--color-section-medals-color)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-medals) !important;
}

/* Animation effects for section cards */
.color-card--section-profile:hover,
.color-card--section-badges:hover,
.color-card--section-records:hover {
  transform: translateY(-8px) !important;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.color-card--section-statistics:hover,
.color-card--section-activity:hover,
.color-card--section-collaborations:hover {
  transform: translateY(-5px) scale(1.01) !important;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.color-card--section-medals:hover,
.color-card--section-performance:hover {
  transform: translateY(-6px) scale(1.02) !important;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Special effects for child cards based on parent section */
.color-card--section-performance .color-card {
  border-color: rgba(var(--color-section-profile-rgb), 0.4) !important;
  transition: all 0.3s ease;
}

.color-card--section-collaborations .color-card {
  border-color: rgba(var(--color-section-statistics-rgb), 0.4) !important;
  transition: all 0.3s ease;
}

.color-card--section-records .color-card {
  border-color: rgba(var(--color-section-medals-rgb), 0.4) !important;
  transition: all 0.3s ease;
}
</style>
