<template>
  <div
    class="countdown flex space-x-1.5 justify-center"
    :data-variant="props.variant"
  >
    <div
      v-for="(unit, index) in units"
      :key="index"
      class="countdown-unit flex flex-col items-center"
    >
      <div
        :class="`time-value relative flex items-center justify-center h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-xs xs:text-sm sm:text-base md:text-lg font-bold rounded border backdrop-blur-sm ${getVariantClass}`"
      >
        <div class="pulse-animation absolute inset-0 rounded"></div>
        <span class="relative z-10">{{ unit.value }}</span>
      </div>
      <span
        class="time-label text-2xs xs:text-xs mt-1 text-normal-text-muted"
        >{{ unit.label }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface CountdownUnit {
  value: number;
  label: string;
}

interface Props {
  units: CountdownUnit[];
  variant?: "primary" | "secondary" | "accent" | "dark";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

// Calcule la classe CSS en fonction de la variante
const getVariantClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "text-color-primary-light border-color-primary/30 bg-color-primary/10";
    case "secondary":
      return "text-color-secondary-light border-color-secondary/30 bg-color-secondary/10";
    case "accent":
      return "text-color-accent-light border-color-accent/30 bg-color-accent/10";
    case "dark":
      return "text-normal-text border-normal-text/20 bg-background-bg-dark/80";
    default:
      return "text-color-primary-light border-color-primary/30 bg-color-primary/10";
  }
});
</script>

<style scoped>
.countdown-unit {
  position: relative;
}

.time-value {
  /* Leather/parchment tile with subtle emboss and inner accent */
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.05),
      rgba(0, 0, 0, 0.08)
    ),
    radial-gradient(140% 100% at 50% -20%, rgba(0, 0, 0, 0.12), transparent 50%);
  box-shadow: inset 0 0 0 1px
      rgba(var(--timer-accent-rgb, var(--color-primary-rgb)), 0.25),
    inset 0 6px 10px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}

.time-value:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px
      rgba(var(--timer-accent-rgb, var(--color-primary-rgb)), 0.3),
    inset 0 7px 12px rgba(0, 0, 0, 0.28), 0 4px 10px rgba(0, 0, 0, 0.34);
}

.time-label {
  font-family: var(--font-body, "Roboto Slab", serif);
  letter-spacing: 0.3px;
}

/* Classes for extra small text */
.text-2xs {
  font-size: 0.7rem;
}

.text-3xs {
  font-size: 0.6rem;
}

@media (max-width: 360px) {
  .text-2xs {
    font-size: 0.65rem;
  }

  .text-3xs {
    font-size: 0.55rem;
  }
}

@keyframes pulse-bg {
  0%,
  100% {
    opacity: 0.12;
  }
  50% {
    opacity: 0.28;
  }
}

.pulse-animation {
  /* Ember-like pulse using the variant accent */
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--timer-accent-rgb, var(--color-primary-rgb)), 0.18) 0%,
    transparent 60%
  );
  mix-blend-mode: screen;
  animation: pulse-bg 2s infinite;
}

/* Variant bindings for accent color */
.countdown[data-variant="primary"] {
  --timer-accent-rgb: var(--color-primary-rgb);
}
.countdown[data-variant="secondary"] {
  --timer-accent-rgb: var(--color-secondary-rgb);
}
.countdown[data-variant="accent"] {
  --timer-accent-rgb: var(--color-accent-rgb);
}
.countdown[data-variant="dark"] {
  --timer-accent-rgb: var(--background-bg-light-rgb);
}
</style>
