<!--
  🎃 HORROR TITLE COMPONENT - Documentation d'utilisation
  

  📋 PROPS DISPONIBLES :
  
  • tag (optionnel) : string = "h2"
    - Balise HTML à utiliser pour le titre
    - Valeurs : "h1", "h2", "h3", "h4", "h5", "h6", "div", "span", etc.
    - Exemple : tag="h1"

  • size (optionnel) : string = "xl"
    - Taille du titre basée sur les classes Tailwind
    - Valeurs : "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"
    - Exemple : size="3xl"

  • decorated (optionnel) : boolean = true
    - Affiche les décorations Halloween (lignes stylisées)
    - true = avec décorations | false = titre simple
    - Exemple : :decorated="false"

  • className (optionnel) : string = ""
    - Classes CSS additionnelles à appliquer
    - Exemple : className="mb-4 text-center"

  🎨 EFFETS VISUELS :
  
  • Couleur principale : Orange citrouille (var(--color-primary))
  • Text-shadow : Lueur orange avec ombre noire
  • Hover : Effet de tremblement terrifiant avec lueurs renforcées
  • Décorations : Lignes inclinées avec gradient orange-rouge
  • Police : Font heading définie dans le thème Halloween

  💡 EXEMPLES D'UTILISATION :

  1. Titre principal de page :
     <Title tag="h1" size="4xl" className="text-center mb-8">
       Bienvenue dans l'Horreur
     </Title>

  2. Sous-titre de section :
     <Title tag="h2" size="2xl">
       Tournois de la Terreur
     </Title>

  3. Titre simple sans décorations :
     <Title :decorated="false" size="lg">
       Menu Navigation
     </Title>

  4. Titre personnalisé :
     <Title 
       tag="h3" 
       size="xl" 
       className="uppercase tracking-wider"
     >
       Classements Sanglants
     </Title>
-->
<template>
  <component
    :is="tag"
    :class="[
      'font-heading relative',
      sizeClasses,
      {
        'horror-title--hovered': isHovered,
      },
      className,
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Élément décoratif supérieur Halloween -->
    <div v-if="decorated" class="horror-title-decoration top-decoration"></div>

    <!-- Contenu principal -->
    <div class="horror-title-content">
      <slot></slot>
    </div>

    <!-- Élément décoratif inférieur Halloween -->
    <div
      v-if="decorated"
      class="horror-title-decoration bottom-decoration"
    ></div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  tag?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  decorated?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "h2",
  size: "xl",
  decorated: true,
  className: "",
});

const isHovered = ref(false);

// Classes de taille
const sizeClasses = computed(() => {
  switch (props.size) {
    case "xs":
      return "text-xs";
    case "sm":
      return "text-sm";
    case "md":
      return "text-base";
    case "lg":
      return "text-lg";
    case "xl":
      return "text-xl";
    case "2xl":
      return "text-2xl";
    case "3xl":
      return "text-3xl";
    case "4xl":
      return "text-4xl";
    default:
      return "text-xl";
  }
});
</script>

<style scoped>
component {
  font-family: var(--font-heading);
  color: var(--color-primary);
  text-shadow: 0 0 8px rgba(217, 119, 6, 0.4), 1px 1px 2px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

/* Effet de tremblement au hover */
.horror-title--hovered {
  animation: horror-shake 0.5s ease-in-out infinite;
  text-shadow: 0 0 12px rgba(217, 119, 6, 0.8), 0 0 20px rgba(220, 38, 38, 0.4),
    2px 2px 4px rgba(0, 0, 0, 0.9);
}

/* Animation de tremblement Halloween */
@keyframes horror-shake {
  0%,
  100% {
    transform: translateX(0) translateY(0);
  }
  10% {
    transform: translateX(-1px) translateY(-1px);
  }
  20% {
    transform: translateX(1px) translateY(1px);
  }
  30% {
    transform: translateX(-1px) translateY(1px);
  }
  40% {
    transform: translateX(1px) translateY(-1px);
  }
  50% {
    transform: translateX(-1px) translateY(-1px);
  }
  60% {
    transform: translateX(1px) translateY(1px);
  }
  70% {
    transform: translateX(-1px) translateY(1px);
  }
  80% {
    transform: translateX(1px) translateY(-1px);
  }
  90% {
    transform: translateX(-1px) translateY(-1px);
  }
}

/* Décorations Halloween */
.horror-title-decoration {
  position: absolute;
  height: 2px;
  width: 40%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary),
    var(--color-secondary),
    var(--color-primary),
    transparent
  );
  box-shadow: 0 0 4px rgba(217, 119, 6, 0.4);
}

.top-decoration {
  top: -10px;
  left: 0;
  transform: skewX(-15deg);
}

.bottom-decoration {
  bottom: -10px;
  right: 0;
  transform: skewX(15deg);
}

/* Contenu du titre */
.horror-title-content {
  position: relative;
  z-index: 1;
}
</style>
