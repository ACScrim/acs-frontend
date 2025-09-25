<!--
  🎃 HORROR CARD COMPONENT - Documentation d'utilisation
  
  Composant de carte polyvalent avec thème Halloween gothique.
  
  📋 PROPS PRINCIPAUX :
  • variant : "primary" | "secondary" | "accent" | "dark" | "gold" | "silver" | "bronze"
  • section : "profile" | "statistics" | "medals" | "activity" | "performance" | "collaborations" | "badges" | "records"
  • elevation : "flat" | "low" | "medium" | "high" - Profondeur d'ombre
  • interactive : boolean - Rend la carte cliquable
  • hover : boolean - Active l'effet de survol
  
  🎨 SLOTS :
  • header : En-tête de la carte
  • default : Contenu principal
  • footer : Pied de page
  • badge : Badge de statut (coin supérieur droit)
  
  💡 EXEMPLE :
  <Card variant="primary" section="profile" :hover="true">
    <template #header>Profil Joueur</template>
    Contenu de la carte...
  </Card>
-->
<template>
  <div
    :class="[
      'card relative overflow-hidden rounded-lg transition-all duration-300',
      {
        'card--interactive': interactive,
        'card--hover': hover,
        'card--floating': floating,
      },
      variantClasses,
      elevationClasses,
      section ? `card--section-${section}` : '',
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
        class="absolute inset-0 bg-gradient-to-t from-color-bg to-transparent opacity-90"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div :class="['relative z-10', contentPadding ? 'p-6' : '']">
      <!-- En-tête -->
      <div v-if="$slots.header" class="card-header">
        <slot name="header"></slot>
      </div>

      <!-- Corps -->
      <div class="card-body">
        <slot></slot>
      </div>

      <!-- Pied de page -->
      <div
        v-if="$slots.footer"
        class="card-footer mt-4 pt-4 border-t border-color-bg-light"
      >
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- Éléments décoratifs -->
    <div v-if="decorated" class="card-decorations pointer-events-none">
      <!-- Ligne supérieure -->
      <div class="card-line top"></div>

      <!-- Ligne inférieure -->
      <div class="card-line bottom"></div>

      <!-- Coin supérieur droit -->
      <div class="card-corner top-right"></div>

      <!-- Coin inférieur gauche -->
      <div class="card-corner bottom-left"></div>
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
  contentPadding: true,
  bgImage: "",
  className: "",
});

// Classes de variante
const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-color-bg-light border border-color-primary/30";
    case "secondary":
      return "bg-color-bg-light border border-color-secondary/30";
    case "accent":
      return "bg-color-bg-light border border-color-accent/30";
    case "dark":
      return "bg-color-bg border border-color-bg-light/30";
    case "gold":
      return "bg-color-bg-light border border-color-gold/30";
    case "silver":
      return "bg-color-bg-light border border-color-silver/30";
    case "bronze":
      return "bg-color-bg-light border border-color-bronze/30";
    default:
      return "bg-color-bg-light border border-color-primary/30";
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
.card {
  background: var(--color-card-bg) !important;
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-card-border) !important;
  box-shadow: var(--shadow-card-base), 0 0 15px var(--color-card-shadow) !important;
}

.card--interactive {
  cursor: pointer;
}

.card--hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -10px var(--color-bg-dark);
}

.card--floating {
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

.card-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  width: 50%;
  opacity: 0.5;
}

.card-line.top {
  top: 10px;
  left: 25%;
}

.card-line.bottom {
  bottom: 10px;
  right: 25%;
}

.card-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: currentColor;
  opacity: 0.7;
}

.card-corner.top-right {
  top: 5px;
  right: 5px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.card-corner.bottom-left {
  bottom: 5px;
  left: 5px;
  border-bottom: 1px solid;
  border-left: 1px solid;
}

.card-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: var(--color-primary);
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

.card--interactive.card:hover .card-decorations .card-line,
.card--interactive.card:hover .card-decorations .card-corner {
  opacity: 1;
}

.card[data-variant="primary"] .card-decorations {
  color: var(--color-primary);
}

.card[data-variant="secondary"] .card-decorations {
  color: var(--color-secondary);
}

.card[data-variant="accent"] .card-decorations {
  color: var(--color-accent);
}

.card[data-variant="gold"] .card-decorations {
  color: var(--color-gold);
}

.card[data-variant="silver"] .card-decorations {
  color: var(--color-silver);
}

.card[data-variant="bronze"] .card-decorations {
  color: var(--color-bronze);
}

.card-header {
  border-bottom: 1px solid var(--color-card-border);
  padding-bottom: 0.75rem;
  position: relative;
}

.card-header::before {
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

/* Section-specific card styles */
.card--section-profile {
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

.card--section-statistics {
  border-image: linear-gradient(
      to bottom,
      var(--color-section-statistics-color),
      var(--color-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.card--section-statistics:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--color-section-statistics-rgb), 0.3) !important;
}

.card--section-medals {
  border-image: linear-gradient(
      to bottom,
      var(--color-section-medals-color),
      var(--color-section-medals-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-medals) !important;
}

.card--section-medals:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--color-section-medals-rgb), 0.3) !important;
}

.card--section-activity {
  border-image: linear-gradient(
      to right,
      var(--color-section-statistics-fade),
      var(--color-section-statistics-color),
      var(--color-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.card--section-performance {
  border-image: linear-gradient(
      45deg,
      var(--color-section-profile-color),
      var(--color-section-profile-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-performance) !important;
}

.card--section-performance:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(var(--color-section-profile-rgb), 0.3) !important;
}

.card--section-collaborations {
  border-image: linear-gradient(
      135deg,
      var(--color-section-statistics-color),
      var(--color-section-statistics-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-statistics) !important;
}

.card--section-badges {
  border-image: linear-gradient(
      to right,
      var(--color-section-profile-fade),
      var(--color-section-profile-color),
      var(--color-section-profile-fade)
    )
    1 !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-profile) !important;
}

.card--section-records {
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
.card--section-profile:hover,
.card--section-badges:hover,
.card--section-records:hover {
  transform: translateY(-8px) !important;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card--section-statistics:hover,
.card--section-activity:hover,
.card--section-collaborations:hover {
  transform: translateY(-5px) scale(1.01) !important;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card--section-medals:hover,
.card--section-performance:hover {
  transform: translateY(-6px) scale(1.02) !important;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Special effects for child cards based on parent section */
.card--section-performance .card {
  border-color: rgba(var(--color-section-profile-rgb), 0.4) !important;
  transition: all 0.3s ease;
}

.card--section-collaborations .card {
  border-color: rgba(var(--color-section-statistics-rgb), 0.4) !important;
  transition: all 0.3s ease;
}

.card--section-records .card {
  border-color: rgba(var(--color-section-medals-rgb), 0.4) !important;
  transition: all 0.3s ease;
}
</style>
