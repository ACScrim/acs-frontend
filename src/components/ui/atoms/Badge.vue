<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs',
      'font-heading border transition-all duration-300',
      variantClasses,
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
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  className: "",
});

// Classes de variante
const variantClasses = computed(() => {
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
});
</script>

<style scoped>
/* Styles spécifiques pour les badges */

.inline-flex {
  font-family: var(--font-heading);
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
</style>
