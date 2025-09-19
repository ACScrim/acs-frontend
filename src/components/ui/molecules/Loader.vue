<template>
  <div :class="['space-loader-container', sizeClass]">
    <div class="space-loader">
      <!-- Cercle orbital principal -->
      <div class="space-loader-orbit">
        <div class="space-loader-planet"></div>
      </div>

      <!-- Cercle orbital secondaire -->
      <div class="space-loader-orbit secondary">
        <div class="space-loader-moon"></div>
      </div>

      <!-- Étoiles en arrière-plan -->
      <div
        v-for="n in 8"
        :key="`star-${n}`"
        class="space-loader-star"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
        }"
      ></div>

      <!-- Texte de chargement -->
      <div v-if="showText" class="space-loader-text">
        {{ text }}
      </div>
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
      return "space-loader--small";
    case "lg":
      return "space-loader--large";
    default:
      return "";
  }
});
</script>

<style scoped>
.space-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
}

.space-loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.space-loader--small .space-loader {
  width: 50px;
  height: 50px;
}

.space-loader--large .space-loader {
  width: 120px;
  height: 120px;
}

.space-loader-orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  animation: spin 6s linear infinite;
}

.space-loader-orbit.secondary {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-color: rgba(56, 189, 248, 0.3);
  animation: spin 4s linear infinite reverse;
}

.space-loader-planet {
  position: absolute;
  top: -6px;
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-light)
  );
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(109, 40, 217, 0.7);
}

.space-loader-moon {
  position: absolute;
  top: -4px;
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
  background: linear-gradient(
    135deg,
    var(--color-secondary),
    var(--color-secondary-light)
  );
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(2, 132, 199, 0.7);
}

.space-loader-star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.7;
  animation: twinkle 3s ease-in-out infinite;
}

.space-loader-text {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -30px;
  font-family: "Space Mono", monospace;
  font-size: 0.875rem;
  color: var(--color-text);
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

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
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

/* Responsive */
@media (max-width: 640px) {
  .space-loader-container {
    padding: 1rem;
  }

  .space-loader--large .space-loader {
    width: 100px;
    height: 100px;
  }
}
</style>
