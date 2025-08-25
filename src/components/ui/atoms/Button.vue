<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md transition-all duration-300',
      'font-heading text-normal-text border tracking-wider uppercase cursor-pointer select-none',
      sizeClasses,
      variantClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
        'animate-pulse-slow': loading,
      },
      'button-animate western-emboss',
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
    <!-- Effets spécifiques Western: subtle brass sheen on primary -->
    <div
      v-if="variant === 'primary' && !disabled && !loading"
      class="absolute inset-0 overflow-hidden rounded-md pointer-events-none"
    >
      <div
        class="absolute -inset-0.5 opacity-0 group-hover:opacity-20 transition-opacity rounded-md bg-color-accent-light blur-sm"
      ></div>
      <div
        class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-color-accent to-transparent opacity-0 group-hover:opacity-70 transition-opacity"
      ></div>
    </div>

  <!-- Retrait des particules "étoiles" pour un rendu Far West plus cohérent -->

    <!-- Effet de pulsation pour tous les autres boutons -->
    <div
      v-if="
        !['primary', 'secondary'].includes(variant) && !disabled && !loading
      "
      class="absolute inset-0 overflow-hidden rounded-md pointer-events-none"
    >
      <div
        class="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity rounded-md bg-current animate-pulse-glow"
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
  return "bg-color-primary hover:bg-color-primary-light border-color-primary-dark text-white shadow-glow-primary hover:shadow-lg group relative western-grain western-stitched western-brand";
    case "secondary":
  return "bg-color-secondary hover:bg-color-secondary-light border-color-secondary-dark text-white shadow-glow-secondary hover:shadow-lg western-grain western-stitched western-brand";
    case "accent":
  return "bg-color-accent hover:bg-color-accent-light border-color-accent-dark text-background-bg shadow-glow-accent hover:shadow-lg western-grain western-stitched western-brand";
    case "outline":
      return "bg-transparent hover:bg-background-bg-light border-color-primary text-color-primary hover:text-color-primary-light western-ink";
    case "ghost":
      return "bg-transparent hover:bg-background-bg-light border-transparent text-normal-text hover:text-white western-ink";
    case "outline-error":
      return "bg-transparent hover:bg-color-error/10 border-color-error text-color-error hover:text-color-error-light";
    case "error":
      return "bg-color-error hover:bg-color-error-light border-color-error-dark text-white shadow-glow-error hover:shadow-lg western-grain";
    case "success":
      return "bg-color-success hover:bg-color-success-light border-color-success-dark text-white shadow-glow-success hover:shadow-lg western-grain";
    case "warning":
      return "bg-color-warning hover:bg-color-warning-light border-color-warning-dark text-background-bg shadow-glow-warning hover:shadow-lg western-grain";
    default:
      return "bg-color-primary hover:bg-color-primary-light border-color-primary-dark text-white";
  }
});
</script>

<style>
button {
  font-family: var(--font-heading);
  position: relative; /* Needed for effects */
  transform: translateZ(0);
  will-change: transform;
  overflow: hidden;
}

/* Augmentation générale des boutons et ajout d'effet 3D subtil */
.button-animate {
  transform: perspective(1px) translateZ(0);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.18);
}

.button-animate:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.22);
}

.button-animate:active {
  transform: translateY(1px) scale(0.985);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
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

/* Western texture helpers */
.western-grain {
  background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    radial-gradient(
      120% 120% at 50% 0%,
      rgba(255, 255, 255, 0.06),
      rgba(0, 0, 0, 0) 60%
    );
  background-blend-mode: multiply;
}
.western-emboss {
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
  border-radius: 0.375rem;
}

.western-ink {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.03),
    rgba(255, 255, 255, 0.02)
  );
}

/* Couture/pointillés façon selle de cheval */
.western-stitched {
  position: relative;
}
.western-stitched::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 0.3rem;
  border: 1px dashed rgba(var(--color-accent-rgb), 0.35);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.western-stitched:hover::after {
  opacity: 1;
}

/* Suppression des particules astro (non-western) */

/* Effet "marque au fer" (branding) au clic */
.western-brand {
  position: relative;
}
.western-brand::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 60%, rgba(176,83,69,0), rgba(176,83,69,0) 30%, rgba(0,0,0,0) 31%);
  opacity: 0;
  transition: opacity 0.12s ease;
  pointer-events: none;
}
.western-brand:active::before {
  background: radial-gradient(circle at 50% 60%, rgba(176,83,69,0.35), rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 65%);
  opacity: 1;
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
