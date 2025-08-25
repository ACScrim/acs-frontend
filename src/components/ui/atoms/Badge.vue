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
    | "info"
    | "gold"
    | "silver"
    | "bronze";
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
        return "bg-color-primary text-white border-color-primary";
      case "secondary":
        return "bg-color-secondary text-white border-color-secondary";
      case "accent":
        return "bg-color-accent text-white border-color-accent";
      case "gold":
        return "bg-color-gold text-black border-color-gold";
      case "silver":
        return "bg-color-silver text-black border-color-silver";
      case "bronze":
        return "bg-color-bronze text-black border-color-bronze";
      case "success":
        return "bg-success text-white border-success";
      case "warning":
        return "bg-warning text-black border-warning";
      case "error":
        return "bg-error text-white border-error";
      case "info":
        return "bg-info text-white border-info";
      default:
        return "bg-color-primary text-white border-color-primary";
    }
  } else {
    switch (props.variant) {
      case "primary":
        return "bg-color-primary/20 text-color-primary-light border-color-primary-light/30";
      case "secondary":
        return "bg-color-secondary/20 text-color-secondary-light border-color-secondary-light/30";
      case "accent":
        return "bg-color-accent/20 text-color-accent-light border-color-accent-light/30";
      case "gold":
        return "bg-color-gold/20 text-color-gold border-color-gold/30";
      case "silver":
        return "bg-color-silver/20 text-color-silver border-color-silver/30";
      case "bronze":
        return "bg-color-bronze/20 text-color-bronze border-color-bronze/30";
      case "success":
        return "bg-success/20 text-success border-success/30";
      case "warning":
        return "bg-warning/20 text-warning border-warning/30";
      case "error":
        return "bg-error/20 text-error border-error/30";
      case "info":
        return "bg-info/20 text-info border-info/30";
      default:
        return "bg-color-primary/20 text-color-primary-light border-color-primary-light/30";
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
  color: var(--color-success);
}
.border-success\/30 {
  border-color: rgba(74, 222, 128, 0.3);
}

.bg-warning\/20 {
  background-color: rgba(250, 204, 21, 0.2);
}
.text-warning {
  color: var(--color-warning);
}
.border-warning\/30 {
  border-color: rgba(250, 204, 21, 0.3);
}

.bg-error\/20 {
  background-color: rgba(248, 113, 113, 0.2);
}
.text-error {
  color: var(--color-error);
}
.border-error\/30 {
  border-color: rgba(248, 113, 113, 0.3);
}

.bg-info\/20 {
  background-color: rgba(96, 165, 250, 0.2);
}
.text-info {
  color: var(--color-info);
}
.border-info\/30 {
  border-color: rgba(96, 165, 250, 0.3);
}

/* Styles pour les badges pleins */
.bg-color-primary {
  background-color: var(--color-primary);
  --r: var(--color-primary-rgb);
}
.bg-color-secondary {
  background-color: var(--color-secondary);
  --r: var(--color-secondary-rgb);
}
.bg-color-accent {
  background-color: var(--color-accent);
  --r: var(--color-accent-rgb);
}
.bg-success {
  background-color: var(--color-success);
  --r: var(--color-success-rgb);
}
.bg-warning {
  background-color: var(--color-warning);
  --r: var(--color-warning-rgb);
}
.bg-error {
  background-color: var(--color-error);
  --r: var(--color-error-rgb);
}
.bg-info {
  background-color: var(--color-info);
  --r: var(--color-info-rgb);
}
.bg-color-gold {
  background-color: var(--color-gold);
  --r: var(--color-gold-rgb);
}
.bg-color-silver {
  background-color: var(--color-silver);
  --r: var(--color-silver-rgb);
}
.bg-color-bronze {
  background-color: var(--color-bronze);
  --r: var(--color-bronze-rgb);
}

.bg-color-gold\/20 {
  background-color: rgba(var(--color-gold-rgb), 0.2);
}
.text-color-gold {
  color: var(--color-gold);
}
.border-color-gold\/30 {
  border-color: rgba(var(--color-gold-rgb), 0.3);
}

.bg-color-silver\/20 {
  background-color: rgba(var(--color-silver-rgb), 0.2);
}
.text-color-silver {
  color: var(--color-silver);
}
.border-color-silver\/30 {
  border-color: rgba(var(--color-silver-rgb), 0.3);
}

.bg-color-bronze\/20 {
  background-color: rgba(var(--color-bronze-rgb), 0.2);
}
.text-color-bronze {
  color: var(--color-bronze);
}
.border-color-bronze\/30 {
  border-color: rgba(var(--color-bronze-rgb), 0.3);
}
</style>
