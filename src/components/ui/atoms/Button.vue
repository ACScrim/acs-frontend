<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-all duration-300',
      'font-heading text-color-text border',
      sizeClasses,
      variantClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
        'animate-pulse-slow': loading,
      },
      'button-animate',
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
    <!-- Effet d'orbite pour variant primary -->
    <div
      v-if="variant === 'primary' && !disabled && !loading"
      class="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
    >
      <div
        class="absolute -inset-0.5 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg bg-color-primary-light blur-sm"
      ></div>
      <div
        class="absolute h-1 w-1 rounded-full bg-color-primary-light animate-orbit"
      ></div>
    </div>

    <!-- Effet de particules pour les boutons secondaires -->
    <div
      v-if="variant === 'secondary' && !disabled && !loading"
      class="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
    >
      <div
        class="absolute h-1 w-1 rounded-full bg-color-secondary-light animate-particle-1"
      ></div>
      <div
        class="absolute h-1 w-1 rounded-full bg-color-secondary-light animate-particle-2"
      ></div>
      <div
        class="absolute h-1 w-1 rounded-full bg-color-secondary-light animate-particle-3"
      ></div>
    </div>

    <!-- Effet de pulsation pour tous les autres boutons -->
    <div
      v-if="
        !['primary', 'secondary'].includes(variant) && !disabled && !loading
      "
      class="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
    >
      <div
        class="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity rounded-lg bg-current animate-pulse-glow"
      ></div>
    </div>
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
  font-family: var(--font-heading);
  position: relative; /* Assurez-vous que les boutons sont en position relative pour les animations */
  transform: translateZ(0); /* Optimisation pour les animations */
  will-change: transform; /* Optimisation des performances */
  overflow: hidden; /* Contenir les effets d'animation */
}

/* Augmentation générale des boutons et ajout d'effet 3D subtil */
.button-animate {
  transform: perspective(1px) translateZ(0);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-animate:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
}

.button-animate:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

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
  box-shadow: 0 0 15px rgba(var(--color-error-rgb), 0.5);
}

.shadow-glow-success {
  box-shadow: 0 0 15px rgba(var(--color-success-rgb), 0.5);
}

.shadow-glow-warning {
  box-shadow: 0 0 15px rgba(var(--color-warning-rgb), 0.5);
}

/* Animation d'orbite améliorée */
.animate-orbit {
  animation: orbit 20s linear infinite;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(50px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(50px) rotate(-360deg);
  }
}

/* Nouvelles animations de particules */
.animate-particle-1 {
  animation: particle1 10s ease-in-out infinite;
}

.animate-particle-2 {
  animation: particle2 15s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-particle-3 {
  animation: particle3 12s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes particle1 {
  0%,
  100% {
    top: 10%;
    left: 10%;
    opacity: 0.7;
  }
  25% {
    top: 70%;
    left: 30%;
    opacity: 0.4;
  }
  50% {
    top: 30%;
    left: 80%;
    opacity: 0.6;
  }
  75% {
    top: 60%;
    left: 50%;
    opacity: 0.8;
  }
}

@keyframes particle2 {
  0%,
  100% {
    top: 50%;
    left: 10%;
    opacity: 0.5;
  }
  33% {
    top: 20%;
    left: 80%;
    opacity: 0.7;
  }
  66% {
    top: 70%;
    left: 30%;
    opacity: 0.3;
  }
}

@keyframes particle3 {
  0%,
  100% {
    top: 30%;
    left: 60%;
    opacity: 0.6;
  }
  50% {
    top: 60%;
    left: 20%;
    opacity: 0.8;
  }
}

/* Animation de pulsation luisante */
.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.2;
    transform: scale(1);
  }
}

/* Animation de pulsation lente déjà utilisée */
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
