<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-all duration-300',
      'font-heading text-space-text border',
      sizeClasses,
      variantClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
        'animate-pulse-slow': loading,
      },
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
        class="absolute -inset-0.5 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg bg-space-primary-light blur-sm"
      ></div>
      <div
        class="absolute h-1 w-1 rounded-full bg-space-primary-light animate-orbit"
      ></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
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
      return "px-3 py-1.5 text-xs";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-4 py-2 text-sm";
  }
});

// Classes de variante
const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-space-primary hover:bg-space-primary-light border-space-primary-dark text-white shadow-glow-primary hover:shadow-lg group relative";
    case "secondary":
      return "bg-space-secondary hover:bg-space-secondary-light border-space-secondary-dark text-white shadow-glow-secondary hover:shadow-lg";
    case "accent":
      return "bg-space-accent hover:bg-space-accent-light border-space-accent-dark text-space-bg shadow-glow-accent hover:shadow-lg";
    case "outline":
      return "bg-transparent hover:bg-space-bg-light border-space-primary text-space-primary hover:text-space-primary-light";
    case "ghost":
      return "bg-transparent hover:bg-space-bg-light border-transparent text-space-text hover:text-white";
    default:
      return "bg-space-primary hover:bg-space-primary-light border-space-primary-dark text-white";
  }
});
</script>

<style>
button {
  font-family: var(--font-heading);
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
</style>
