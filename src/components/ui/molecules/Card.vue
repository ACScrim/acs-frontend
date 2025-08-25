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

    <!-- Effet de particules d'étoiles -->
    <div v-if="stars" class="color-card-stars pointer-events-none">
      <div
        v-for="n in 5"
        :key="n"
        class="space-star"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
        }"
      ></div>
    </div>

    <!-- Système orbital décoratif -->
    <div class="orbit-system">
      <div class="planet-orbit">
        <div class="planet planet-1"></div>
      </div>
      <div class="planet-orbit orbit-2">
        <div class="planet planet-2"></div>
      </div>
      <div class="planet-orbit orbit-3">
        <div class="planet planet-3"></div>
      </div>
    </div>
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
  box-shadow: var(--shadow-card-base), 0 0 15px var(--color-card-shadow) !important;
}

.color-card--interactive {
  cursor: pointer;
}

.color-card--hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -10px var(--background-bg-dark);
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

.color-card-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  width: 50%;
  opacity: 0.5;
}

.color-card-line.top {
  top: 10px;
  left: 25%;
}

.color-card-line.bottom {
  bottom: 10px;
  right: 25%;
}

.color-card-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: currentColor;
  opacity: 0.7;
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

.space-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}

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

.color-card-orbit-system {
  position: relative;
}

.orbit-system {
  position: absolute;
  right: -60px;
  top: -60px;
  width: 200px;
  height: 200px;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

.planet-orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--space-orbit-border);
  border-radius: 50%;
  animation: rotate 60s linear infinite;
}

.orbit-2 {
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  animation-duration: 40s;
}

.orbit-3 {
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  animation-duration: 20s;
}

.planet {
  position: absolute;
  border-radius: 50%;
}

.planet-1 {
  top: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  background: linear-gradient(
    135deg,
    var(--space-planet1-start),
    var(--space-planet1-end)
  );
  box-shadow: 0 0 10px var(--space-planet1-glow);
}

.planet-2 {
  top: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  background: linear-gradient(
    135deg,
    var(--space-planet2-start),
    var(--space-planet2-end)
  );
  box-shadow: 0 0 8px var(--space-planet2-glow);
}

.planet-3 {
  top: 0;
  left: 50%;
  width: 6px;
  height: 6px;
  background: linear-gradient(
    135deg,
    var(--space-planet3-start),
    var(--space-planet3-end)
  );
  box-shadow: 0 0 6px var(--space-planet3-glow);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

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
