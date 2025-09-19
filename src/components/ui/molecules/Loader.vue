<!--
  🎃 HORROR LOADER COMPONENT - Documentation d'utilisation
  
  Composant de chargement avec thème Halloween terrifiant.
  
  📋 PROPS :
  • size : "sm" | "md" | "lg" - Taille du loader (défaut: "md")
  • text : string - Texte affiché sous le loader (défaut: "Chargement...")
  • showText : boolean - Affiche/cache le texte (défaut: true)
  
  💡 EXEMPLES :
  <Loader size="lg" text="Invocation en cours..." />
  <Loader :showText="false" />
  <Loader size="sm" text="Rituel mystique..." />
-->
<template>
  <div :class="['loader-container', sizeClass]">
    <div class="loader">
      <!-- Cercle principal tournant -->
      <div class="loader-ring"></div>

      <!-- Cercle intérieur avec pulsation -->
      <div class="loader-inner">
        <div class="loader-core"></div>
      </div>

      <!-- Particules mystiques -->
      <div
        v-for="n in 6"
        :key="`particle-${n}`"
        class="loader-particle"
        :style="{
          top: `${25 + Math.random() * 50}%`,
          left: `${25 + Math.random() * 50}%`,
          animationDelay: `${Math.random() * 2}s`,
        }"
      ></div>

      <!-- Texte de chargement -->
      <div v-if="showText" class="loader-text">
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

/* Anneau principal tournant avec couleurs Halloween */
.loader-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid var(--color-primary);
  border-right: 3px solid var(--color-secondary);
  border-radius: 50%;
  animation: rotate 2s linear infinite;
  box-shadow: var(--shadow-glow-primary);
}

/* Cercle intérieur */
.loader-inner {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  border: 2px solid transparent;
  border-top: 2px solid var(--color-accent);
  border-left: 2px solid var(--color-secondary-light);
  border-radius: 50%;
  animation: rotate 1.5s linear infinite reverse;
}

/* Cœur central pulsant */
.loader-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px var(--color-primary), 0 0 20px var(--color-primary);
  animation: pulse 1s ease-in-out infinite;
}

/* Particules mystiques */
.loader-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: var(--color-accent-light);
  border-radius: 50%;
  opacity: 0.8;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 0 6px var(--color-accent-light);
}

/* Texte de chargement */
.loader-text {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -30px;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text);
  animation: fade 2s infinite;
  text-shadow: 0 0 10px rgba(217, 119, 6, 0.3);
}

/* Animations Halloween */
@keyframes rotate {
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
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.7;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  33% {
    transform: translateY(-10px) scale(1.2);
    opacity: 0.6;
  }
  66% {
    transform: translateY(5px) scale(0.8);
    opacity: 0.9;
  }
}

@keyframes fade {
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
  .loader-container {
    padding: 1rem;
  }

  .loader--large .loader {
    width: 100px;
    height: 100px;
  }
}
</style>
