<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs',
      'font-heading border transition-all duration-300',
      variantClasses,
      filled ? 'badge-filled' : '',
      size === 'sm'
        ? 'text-xs min-w-5 h-5'
        : size === 'lg'
        ? 'text-sm min-w-7 h-7'
        : '',
      className,
    ]"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info";
  filled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  filled: false,
  size: "md",
  className: "",
});

// Classes de variante
const variantClasses = computed(() => {
  if (props.filled) {
    switch (props.variant) {
      case "primary":
        return "bg-space-primary text-white border-space-primary";
      case "secondary":
        return "bg-space-secondary text-white border-space-secondary";
      case "accent":
        return "bg-space-accent text-white border-space-accent";
      case "success":
        return "bg-success text-white border-success";
      case "warning":
        return "bg-warning text-black border-warning";
      case "error":
        return "bg-error text-white border-error";
      case "info":
        return "bg-info text-white border-info";
      default:
        return "bg-space-primary text-white border-space-primary";
    }
  } else {
    switch (props.variant) {
      case "primary":
        return "bg-space-primary/20 text-space-primary-light border-space-primary-light/30";
      case "secondary":
        return "bg-space-secondary/20 text-space-secondary-light border-space-secondary-light/30";
      case "accent":
        return "bg-space-accent/20 text-space-accent-light border-space-accent-light/30";
      case "success":
        return "bg-success/20 text-success border-success/30";
      case "warning":
        return "bg-warning/20 text-warning border-warning/30";
      case "error":
        return "bg-error/20 text-error border-error/30";
      case "info":
        return "bg-info/20 text-info border-info/30";
      default:
        return "bg-space-primary/20 text-space-primary-light border-space-primary-light/30";
    }
  }
});
</script>

<style scoped>
/* Styles spécifiques pour les badges */

.inline-flex {
  font-family: var(--font-heading);
}

.badge-filled {
  font-weight: bold;
  box-shadow: 0 0 10px rgba(var(--r), var(--g), var(--b), 0.5);
}

.bg-success\/20 {
  background-color: rgba(74, 222, 128, 0.2);
}
.text-success {
  color: var(--space-success);
}
.border-success\/30 {
  border-color: rgba(74, 222, 128, 0.3);
}

.bg-warning\/20 {
  background-color: rgba(250, 204, 21, 0.2);
}
.text-warning {
  color: var(--space-warning);
}
.border-warning\/30 {
  border-color: rgba(250, 204, 21, 0.3);
}

.bg-error\/20 {
  background-color: rgba(248, 113, 113, 0.2);
}
.text-error {
  color: var(--space-error);
}
.border-error\/30 {
  border-color: rgba(248, 113, 113, 0.3);
}

.bg-info\/20 {
  background-color: rgba(96, 165, 250, 0.2);
}
.text-info {
  color: var(--space-info);
}
.border-info\/30 {
  border-color: rgba(96, 165, 250, 0.3);
}

/* Styles pour les badges pleins */
.bg-space-primary {
  background-color: var(--space-primary);
  --r: var(--space-primary-rgb);
}
.bg-space-secondary {
  background-color: var(--space-secondary);
  --r: var(--space-secondary-rgb);
}
.bg-space-accent {
  background-color: var(--space-accent);
  --r: var(--space-accent-rgb);
}
.bg-success {
  background-color: var(--space-success);
  --r: var(--space-success-rgb);
}
.bg-warning {
  background-color: var(--space-warning);
  --r: var(--space-warning-rgb);
}
.bg-error {
  background-color: var(--space-error);
  --r: var(--space-error-rgb);
}
.bg-info {
  background-color: var(--space-info);
  --r: var(--space-info-rgb);
}
</style>
