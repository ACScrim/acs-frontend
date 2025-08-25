<template>
  <div :class="['loader-container', sizeClass]">
    <div class="loader" role="status" aria-live="polite">
      <div class="lasso">
        <span class="knot" aria-hidden="true"></span>
      </div>
      <div v-if="showText" class="loader-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: "sm" | "md" | "lg";
  text?: string;
  showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  text: "Chargement...",
  showText: true,
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "loader--small";
    case "lg":
      return "loader--large";
    default:
      return "";
  }
});
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
}

.loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.loader--small .loader {
  width: 50px;
  height: 50px;
}

.loader--large .loader {
  width: 120px;
  height: 120px;
}

.lasso {
  position: absolute;
  inset: 0;
  border: 3px dashed rgba(var(--color-accent-rgb, 210, 160, 80), 0.7);
  border-radius: 50%;
  animation: spin 1.6s linear infinite;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
}

.lasso .knot {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: rgba(var(--color-accent-rgb, 210, 160, 80), 0.95);
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(var(--color-accent-rgb, 210, 160, 80), 0.45);
}

.loader-text {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -30px;
  font-family: var(--font-body, "Roboto Slab", serif);
  font-size: 0.875rem;
  color: var(--normal-text);
  animation: pulse 2s infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .loader-container {
    padding: 1rem;
  }

  .loader--large .loader {
    width: 100px;
    height: 100px;
  }
}
</style>
