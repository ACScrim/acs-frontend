<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs',
      'font-heading border transition-all duration-300 uppercase tracking-wide badge-west',
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

// Classes de variante (utilise les variables du thème far west)
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
        return "bg-color-primary/20 text-color-primary border-color-primary/30";
      case "secondary":
        return "bg-color-secondary/20 text-color-secondary border-color-secondary/30";
      case "accent":
        return "bg-color-accent/20 text-color-accent border-color-accent/30";
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
        return "bg-color-primary/20 text-color-primary border-color-primary/30";
    }
  }
});
</script>

<style scoped>
/* Base Far West badge look */
.inline-flex {
  font-family: var(--font-heading);
}
.badge-west {
  letter-spacing: 0.04em;
}

/* Filled badges: subtle grain + glow using theme RGB */
.badge-filled {
  font-weight: 700;
  position: relative;
  box-shadow: 0 0 10px rgba(var(--badge-rgb), 0.35);
}
.badge-filled::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.06), rgba(255, 255, 255, 0.04));
  border-radius: 9999px;
  pointer-events: none;
}

/* Outline look: rope-like dashed overlay */
.badge-west:not(.badge-filled) {
  position: relative;
}
.badge-west:not(.badge-filled)::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 9999px;
  border: 1px dashed rgba(var(--color-accent-rgb), 0.35);
  pointer-events: none;
}

/* Semantic helpers using theme variables */
.bg-success\/20 {
  background-color: rgba(var(--color-success-rgb), 0.2);
}
.text-success {
  color: var(--color-success);
}
.border-success\/30 {
  border-color: rgba(var(--color-success-rgb), 0.3);
}
.border-success {
  border-color: var(--color-success);
}

.bg-warning\/20 {
  background-color: rgba(var(--color-warning-rgb), 0.2);
}
.text-warning {
  color: var(--color-warning);
}
.border-warning\/30 {
  border-color: rgba(var(--color-warning-rgb), 0.3);
}
.border-warning {
  border-color: var(--color-warning);
}

.bg-error\/20 {
  background-color: rgba(var(--color-error-rgb), 0.2);
}
.text-error {
  color: var(--color-error);
}
.border-error\/30 {
  border-color: rgba(var(--color-error-rgb), 0.3);
}
.border-error {
  border-color: var(--color-error);
}

.bg-info\/20 {
  background-color: rgba(var(--color-info-rgb), 0.2);
}
.text-info {
  color: var(--color-info);
}
.border-info\/30 {
  border-color: rgba(var(--color-info-rgb), 0.3);
}
.border-info {
  border-color: var(--color-info);
}

/* Filled background classes also define badge RGB for glow */
.bg-color-primary {
  background-color: var(--color-primary);
  --badge-rgb: var(--color-primary-rgb);
}
.bg-color-secondary {
  background-color: var(--color-secondary);
  --badge-rgb: var(--color-secondary-rgb);
}
.bg-color-accent {
  background-color: var(--color-accent);
  --badge-rgb: var(--color-accent-rgb);
}
.bg-success {
  background-color: var(--color-success);
  --badge-rgb: var(--color-success-rgb);
}
.bg-warning {
  background-color: var(--color-warning);
  --badge-rgb: var(--color-warning-rgb);
}
.bg-error {
  background-color: var(--color-error);
  --badge-rgb: var(--color-error-rgb);
}
.bg-info {
  background-color: var(--color-info);
  --badge-rgb: var(--color-info-rgb);
}
.bg-color-gold {
  background-color: var(--color-gold);
  --badge-rgb: var(--color-gold-rgb);
}
.bg-color-silver {
  background-color: var(--color-silver);
  --badge-rgb: var(--color-silver-rgb);
}
.bg-color-bronze {
  background-color: var(--color-bronze);
  --badge-rgb: var(--color-bronze-rgb);
}

/* Outlined helpers for primary/secondary/accent */
.bg-color-primary\/20 {
  background-color: rgba(var(--color-primary-rgb), 0.2);
}
.bg-color-secondary\/20 {
  background-color: rgba(var(--color-secondary-rgb), 0.2);
}
.bg-color-accent\/20 {
  background-color: rgba(var(--color-accent-rgb), 0.2);
}
.border-color-secondary\/30 {
  border-color: rgba(var(--color-secondary-rgb), 0.3);
}
.border-color-accent\/30 {
  border-color: rgba(var(--color-accent-rgb), 0.3);
}

/* Metals outlined (already used by component) */
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
