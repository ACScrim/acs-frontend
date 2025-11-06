<template>
  <div class="flex space-x-1.5 justify-center">
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
      <span class="time-label text-2xs xs:text-xs mt-1 text-space-text-muted">{{
        unit.label
      }}</span>
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
      return "text-space-primary-light border-space-primary/30 bg-space-primary/10";
    case "secondary":
      return "text-space-secondary-light border-space-secondary/30 bg-space-secondary/10";
    case "accent":
      return "text-space-accent-light border-space-accent/30 bg-space-accent/10";
    case "dark":
      return "text-space-text border-space-text/20 bg-space-bg-dark/80";
    default:
      return "text-space-primary-light border-space-primary/30 bg-space-primary/10";
  }
});
</script>

<style scoped>
.countdown-unit {
  position: relative;
}

.time-value {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.time-value:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

.time-label {
  font-family: "Courier New", monospace;
  letter-spacing: 0.5px;
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
    opacity: 0.1;
  }
  50% {
    opacity: 0.25;
  }
}

.pulse-animation {
  animation: pulse-bg 2s infinite;
}
</style>
