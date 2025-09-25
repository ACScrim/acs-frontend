<!--
  🎃 HORROR BUTTON COMPONENT - Documentation d'utilisation

  📋 PROPS DISPONIBLES :
  
  • variant (optionnel) : string = "primary"
    - Style du bouton adapté au thème Halloween
    - Valeurs : "primary", "secondary", "accent", "outline", "ghost", 
               "outline-error", "error", "success", "warning"
    - primary : Orange citrouille (couleur principale Halloween)
    - secondary : Rouge sang sombre
    - accent : Violet mystique
    - error : Rouge danger
    - success : Vert poison
    - warning : Orange attention
    - Exemple : variant="secondary"

  • size (optionnel) : string = "md"
    - Taille du bouton
    - Valeurs : "sm", "md", "lg"
    - sm : Petit bouton (px-4 py-2)
    - md : Bouton moyen (px-6 py-3)
    - lg : Grand bouton (px-8 py-4)
    - Exemple : size="lg"

  • disabled (optionnel) : boolean = false
    - Désactive le bouton (grisé, non cliquable)
    - Exemple : :disabled="true"

  • loading (optionnel) : boolean = false
    - Affiche un spinner de chargement
    - Désactive automatiquement le bouton pendant le chargement
    - Exemple : :loading="isSubmitting"

  • icon (optionnel) : boolean = false
    - Indique si le bouton contient une icône
    - Ajoute un espacement pour l'icône via le slot "icon"
    - Exemple : :icon="true"

  • className (optionnel) : string = ""
    - Classes CSS additionnelles à appliquer
    - Exemple : className="ml-4 w-full"

  🎨 SLOTS DISPONIBLES :
  
  • default : Contenu principal du bouton (texte)
  • icon : Icône du bouton (affiché avant le texte si :icon="true")

  🎨 EFFETS VISUELS HALLOWEEN :
  
  • Police : Police classique lisible (var(--font-body))
  • Couleurs : Palette Halloween (orange, rouge sang, violet mystique)
  • Hover : Léger tremblement terrifiant + changement de couleur
  • Active : Effet d'enfoncement subtil
  • Loading : Animation de pulsation + spinner
  • Disabled : Opacité réduite + curseur interdit

  💡 EXEMPLES D'UTILISATION :

  1. Bouton principal Halloween :
     <Button variant="primary" size="lg">
       Rejoindre la Terreur
     </Button>

  2. Bouton avec icône :
     <Button variant="secondary" :icon="true">
       <template #icon>👻</template>
       Fantômes
     </Button>

  3. Bouton de chargement :
     <Button :loading="isSubmitting" variant="accent">
       Lancer Sortilège
     </Button>

  4. Bouton d'erreur :
     <Button variant="error" :disabled="hasError">
       Danger Mortel
     </Button>

  5. Bouton fantôme simple :
     <Button variant="ghost" className="w-full">
       Menu Mystique
     </Button>

-->
<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-all duration-300',
      'font-body text-color-text border',
      sizeClasses,
      variantClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
        'animate-pulse-slow': loading,
      },
      'horror-button',
      className,
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <!-- Icône de chargement -->
    <span v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>

    <!-- Icône -->
    <span v-if="icon && !loading" class="mr-2">
      <slot name="icon"></slot>
    </span>

    <!-- Contenu -->
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "outline-error"
    | "error"
    | "success"
    | "warning";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  icon: false,
  className: "",
});

// Classes de taille
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-4 py-2 text-sm"; // Taille augmentée (était px-3 py-1.5 text-xs)
    case "lg":
      return "px-8 py-4 text-xl"; // Taille augmentée (était px-6 py-3 text-lg)
    default:
      return "px-6 py-3 text-base"; // Taille augmentée (était px-4 py-2 text-sm)
  }
});

// Classes de variante
const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-color-primary hover:bg-color-primary-light border-color-primary-dark text-white shadow-glow-primary hover:shadow-lg group relative";
    case "secondary":
      return "bg-color-secondary hover:bg-color-secondary-light border-color-secondary-dark text-white shadow-glow-secondary hover:shadow-lg";
    case "accent":
      return "bg-color-accent hover:bg-color-accent-light border-color-accent-dark text-color-bg shadow-glow-accent hover:shadow-lg";
    case "outline":
      return "bg-transparent hover:bg-color-bg-light border-color-primary text-color-primary hover:text-color-primary-light";
    case "ghost":
      return "bg-transparent hover:bg-color-bg-light border-transparent text-color-text hover:text-white";
    case "outline-error":
      return "bg-transparent hover:bg-color-error/10 border-color-error text-color-error hover:text-color-error-light";
    case "error":
      return "bg-color-error hover:bg-color-error-light border-color-error-dark text-white shadow-glow-error hover:shadow-lg";
    case "success":
      return "bg-color-success hover:bg-color-success-light border-color-success-dark text-white shadow-glow-success hover:shadow-lg";
    case "warning":
      return "bg-color-warning hover:bg-color-warning-light border-color-warning-dark text-color-bg shadow-glow-warning hover:shadow-lg";
    default:
      return "bg-color-primary hover:bg-color-primary-light border-color-primary-dark text-white";
  }
});
</script>

<style>
button {
  font-family: var(--font-body);
  position: relative;
  transform: translateZ(0);
  will-change: transform;
  cursor: pointer;
}

/* Style de base du bouton Halloween */
.horror-button {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5);
  border-width: 2px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Effet de tremblement terrifiant au hover */
.horror-button:hover {
  animation: horror-shake 0.5s ease-in-out;
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 3px 6px rgba(0, 0, 0, 0.6);
}

.horror-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Animation de tremblement Halloween */
@keyframes horror-shake {
  0%,
  100% {
    transform: translateX(0) translateY(-1px);
  }
  10% {
    transform: translateX(-1px) translateY(-1px);
  }
  20% {
    transform: translateX(1px) translateY(-1px);
  }
  30% {
    transform: translateX(-1px) translateY(-1px);
  }
  40% {
    transform: translateX(1px) translateY(-1px);
  }
  50% {
    transform: translateX(-1px) translateY(-1px);
  }
  60% {
    transform: translateX(1px) translateY(-1px);
  }
  70% {
    transform: translateX(-1px) translateY(-1px);
  }
  80% {
    transform: translateX(1px) translateY(-1px);
  }
  90% {
    transform: translateX(-1px) translateY(-1px);
  }
}

/* Ombres pour les variantes */
.shadow-glow-primary {
  box-shadow: var(--shadow-glow-primary);
}

.shadow-glow-secondary {
  box-shadow: var(--shadow-glow-secondary);
}

.shadow-glow-accent {
  box-shadow: var(--shadow-glow-accent);
}

.shadow-glow-error {
  box-shadow: 0 0 15px rgba(220, 38, 38, 0.5);
}

.shadow-glow-success {
  box-shadow: 0 0 15px rgba(22, 163, 74, 0.5);
}

.shadow-glow-warning {
  box-shadow: 0 0 15px rgba(217, 119, 6, 0.5);
}

/* Animation de pulsation lente pour le loading */
.animate-pulse-slow {
  animation: pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
