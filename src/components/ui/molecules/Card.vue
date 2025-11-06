<template>
  <div
    :class="[
      'space-card relative overflow-hidden rounded-lg transition-all duration-300',
      {
        'space-card--interactive': interactive,
        'space-card--hover': hover,
        'space-card--floating': floating,
      },
      variantClasses,
      elevationClasses,
      section ? `space-card--section-${section}` : '',
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
        class="absolute inset-0 bg-gradient-to-t from-space-bg to-transparent opacity-90"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div :class="['relative z-10', contentPadding ? 'p-6' : '']">
      <!-- En-tête -->
      <div v-if="$slots.header" class="space-card-header">
        <slot name="header"></slot>
      </div>

      <!-- Corps -->
      <div class="space-card-body">
        <slot></slot>
      </div>

      <!-- Pied de page -->
      <div
        v-if="$slots.footer"
        class="space-card-footer mt-4 pt-4 border-t border-space-bg-light"
      >
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- Éléments décoratifs spatiaux -->
    <div v-if="decorated" class="space-card-decorations pointer-events-none">
      <!-- Ligne supérieure -->
      <div class="space-card-line top"></div>

      <!-- Ligne inférieure -->
      <div class="space-card-line bottom"></div>

      <!-- Coin supérieur droit -->
      <div class="space-card-corner top-right"></div>

      <!-- Coin inférieur gauche -->
      <div class="space-card-corner bottom-left"></div>
    </div>

    <!-- Effet de particules d'étoiles -->
    <div v-if="stars" class="space-card-stars pointer-events-none">
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

    <!-- Effet de particules d'étoiles -->
    <div v-if="stars" class="card-stars pointer-events-none">
      <div
        v-for="n in 5"
        :key="n"
        class="card-star"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
        }"
      ></div>
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
      return "bg-space-bg-light border border-space-primary/30";
    case "secondary":
      return "bg-space-bg-light border border-space-secondary/30";
    case "accent":
      return "bg-space-bg-light border border-space-accent/30";
    case "dark":
      return "bg-space-bg border border-space-bg-light/30";
    case "gold":
      return "bg-space-bg-light border border-space-gold/30";
    case "silver":
      return "bg-space-bg-light border border-space-silver/30";
    case "bronze":
      return "bg-space-bg-light border border-space-bronze/30";
    default:
      return "bg-space-bg-light border border-space-primary/30";
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
.space-card {
  background: var(--space-card-bg) !important;
  backdrop-filter: blur(10px);
  border: 1px solid var(--space-card-border) !important;
  box-shadow: var(--shadow-card-base), 0 0 15px var(--space-card-shadow) !important;
}

.space-card--interactive {
  cursor: pointer;
}

.space-card--hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -10px var(--space-bg-dark);
}

.space-card--floating {
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

.space-card-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  width: 50%;
  opacity: 0.5;
}

.space-card-line.top {
  top: 10px;
  left: 25%;
}

.space-card-line.bottom {
  bottom: 10px;
  right: 25%;
}

.space-card-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: currentColor;
  opacity: 0.7;
}

.space-card-corner.top-right {
  top: 5px;
  right: 5px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.space-card-corner.bottom-left {
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

.space-card--interactive.space-card:hover
  .space-card-decorations
  .space-card-line,
.space-card--interactive.space-card:hover
  .space-card-decorations
  .space-card-corner {
  opacity: 1;
}

.space-card[data-variant="primary"] .space-card-decorations {
  color: var(--space-primary);
}

.space-card[data-variant="secondary"] .space-card-decorations {
  color: var(--space-secondary);
}

.space-card[data-variant="accent"] .space-card-decorations {
  color: var(--space-accent);
}

.space-card[data-variant="gold"] .space-card-decorations {
  color: var(--space-gold);
}

.space-card[data-variant="silver"] .space-card-decorations {
  color: var(--space-silver);
}

.space-card[data-variant="bronze"] .space-card-decorations {
  color: var(--space-bronze);
}

.space-card-header {
  border-bottom: 1px solid var(--space-card-border);
  padding-bottom: 0.75rem;
  position: relative;
}

.space-card-header::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 30%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(var(--space-card-border-rgb), 0.8),
    transparent
  );
}

.space-card-orbit-system {
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
.space-card--section-profile {
  box-shadow: var(--shadow-glow-profile) !important;
  border-width: 2px !important;
  border-image: linear-gradient(
      to right,
      var(--space-section-profile-color),
      var(--space-section-profile-fade),
      var(--space-section-profile-color)
    )
    1 !important;
}

.space-card--section-statistics {
  border-image: linear-gradient(
      to bottom,
      var(--space-section-statistics-color),
      var(--space-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.space-card--section-statistics:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--space-section-statistics-rgb), 0.3) !important;
}

.space-card--section-medals {
  border-image: linear-gradient(
      to bottom,
      var(--space-section-medals-color),
      var(--space-section-medals-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-medals) !important;
}

.space-card--section-medals:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--space-section-medals-rgb), 0.3) !important;
}

.space-card--section-activity {
  border-image: linear-gradient(
      to right,
      var(--space-section-statistics-fade),
      var(--space-section-statistics-color),
      var(--space-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.space-card--section-performance {
  border-image: linear-gradient(
      45deg,
      var(--space-section-profile-color),
      var(--space-section-profile-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-performance) !important;
}

.space-card--section-performance:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--space-section-profile-rgb), 0.3) !important;
}

.space-card--section-collaborations {
  border-image: linear-gradient(
      135deg,
      var(--space-section-statistics-color),
      var(--space-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.space-card--section-badges {
  border-image: linear-gradient(
      to right,
      var(--space-section-profile-fade),
      var(--space-section-profile-color),
      var(--space-section-profile-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-profile) !important;
}

.space-card--section-records {
  border-image: linear-gradient(
      to right,
      var(--space-section-medals-color),
      var(--space-section-medals-fade),
      var(--space-section-medals-color)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-medals) !important;
}

/* Animation effects for section cards */
.space-card--section-profile:hover,
.space-card--section-badges:hover,
.space-card--section-records:hover {
  transform: translateY(-8px) !important;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.space-card--section-statistics:hover,
.space-card--section-activity:hover,
.space-card--section-collaborations:hover {
  transform: translateY(-5px) scale(1.01) !important;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.space-card--section-medals:hover,
.space-card--section-performance:hover {
  transform: translateY(-6px) scale(1.02) !important;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Special effects for child cards based on parent section */
.space-card--section-performance .space-card {
  border-color: rgba(var(--space-section-profile-rgb), 0.4) !important;
  transition: all 0.3s ease;
}

.space-card--section-collaborations .space-card {
  border-color: rgba(var(--space-section-statistics-rgb), 0.4) !important;
  transition: all 0.3s ease;
}

.space-card--section-records .space-card {
  border-color: rgba(var(--space-section-medals-rgb), 0.4) !important;
  transition: all 0.3s ease;
}
</style>
