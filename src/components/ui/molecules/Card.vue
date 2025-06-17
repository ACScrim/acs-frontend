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
      className,
    ]"
    :data-variant="variant"
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
      <div v-if="$slots.header" class="space-card-header mb-4">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "accent" | "dark";
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
  background: rgba(3, 7, 18, 0.85) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 201, 240, 0.3) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(76, 201, 240, 0.2) !important;
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

.space-card-header {
  border-bottom: 1px solid rgba(76, 201, 240, 0.3);
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
  background: linear-gradient(90deg, rgba(76, 201, 240, 0.8), transparent);
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
  border: 1px dashed rgba(255, 255, 255, 0.2);
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
  background: linear-gradient(135deg, #ff6b6b, #ff9e53);
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.7);
}

.planet-2 {
  top: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #4cc9f0, #4361ee);
  box-shadow: 0 0 8px rgba(76, 201, 240, 0.7);
}

.planet-3 {
  top: 0;
  left: 50%;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #f72585, #b5179e);
  box-shadow: 0 0 6px rgba(247, 37, 133, 0.7);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
